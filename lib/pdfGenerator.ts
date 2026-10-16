import { jsPDF } from 'jspdf';
import type { ProjectIdea } from '@/types';

// ─── helpers ────────────────────────────────────────────────────────────────

function newPageIfNeeded(doc: jsPDF, y: number, needed = 15): number {
  if (y + needed > 278) {
    doc.addPage();
    addPageHeader(doc);
    return 26;
  }
  return y;
}

function addPageHeader(doc: jsPDF) {
  doc.setFillColor(99, 102, 241);
  doc.rect(0, 0, 210, 8, 'F');
  doc.setFontSize(8);
  doc.setTextColor(200, 200, 255);
  doc.text('AI/ML Project Idea Generator', 105, 5.5, { align: 'center' });
}

function sectionTitle(doc: jsPDF, label: string, y: number, r = 99, g = 102, b = 241): number {
  y = newPageIfNeeded(doc, y, 14);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(r, g, b);
  doc.text(label, 20, y);
  doc.setDrawColor(r, g, b);
  doc.setLineWidth(0.4);
  doc.line(20, y + 1.5, 190, y + 1.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 40, 40);
  return y + 9;
}

function writeBullet(doc: jsPDF, text: string, y: number, indent = 26, width = 160): number {
  y = newPageIfNeeded(doc, y, 8);
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  const lines = doc.splitTextToSize(`-  ${text}`, width);
  doc.text(lines, indent, y);
  return y + lines.length * 5.5 + 1;
}

// ─── main export ────────────────────────────────────────────────────────────

export function generatePDF(idea: ProjectIdea) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  doc.setFont('helvetica', 'normal');

  // ── PAGE 1 HEADER ─────────────────────────────────────────────────────────
  addPageHeader(doc);

  let y = 18;

  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 30, 30);
  const titleLines = doc.splitTextToSize(idea.title, 170);
  doc.text(titleLines, 105, y, { align: 'center' });
  y += titleLines.length * 9 + 3;

  // Level / Category / Industry row
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  const meta = `${idea.level.toUpperCase()}  |  ${idea.category.replace(/-/g, ' ').toUpperCase()}  |  ${idea.industry.toUpperCase()}`;
  doc.setTextColor(99, 102, 241);
  doc.text(meta, 105, y, { align: 'center' });
  y += 8;

  // Divider
  doc.setDrawColor(200, 200, 220);
  doc.setLineWidth(0.3);
  doc.line(20, y, 190, y);
  y += 6;

  // Quick stats
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text(`Duration: ${idea.estimatedTime}`, 20, y);
  doc.text(`Techniques: ${idea.techniques.length}`, 80, y);
  doc.text(`Datasets: ${idea.datasetLinks?.length ?? idea.datasets.length}`, 130, y);
  y += 10;

  // ── Description ───────────────────────────────────────────────────────────
  y = sectionTitle(doc, 'Description', y);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  const descLines = doc.splitTextToSize(idea.description, 170);
  doc.text(descLines, 20, y);
  y += descLines.length * 5.5 + 10;

  // ── Project Size ──────────────────────────────────────────────────────────
  if (idea.projectSize) {
    y = newPageIfNeeded(doc, y, 38);
    y = sectionTitle(doc, 'Estimasi Ukuran Project', y, 22, 120, 80);

    const boxes = [
      { label: 'Dataset',       value: idea.projectSize.datasetSize   },
      { label: 'Model',         value: idea.projectSize.modelSize     },
      { label: 'Total Storage', value: idea.projectSize.totalStorage  },
      { label: 'Training Time', value: idea.projectSize.trainingTime  },
    ];

    const bW = 40, bH = 18, gap = 3, startX = 20;
    // Light gray background for each box
    boxes.forEach((box, i) => {
      const bx = startX + i * (bW + gap);
      doc.setFillColor(245, 245, 252);
      doc.setDrawColor(180, 180, 220);
      doc.setLineWidth(0.4);
      doc.roundedRect(bx, y, bW, bH, 2, 2, 'FD');

      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(99, 102, 180);
      doc.text(box.label, bx + bW / 2, y + 6, { align: 'center' });

      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(30, 30, 30);
      const vLines = doc.splitTextToSize(box.value, bW - 4);
      doc.text(vLines, bx + bW / 2, y + 12, { align: 'center' });
    });
    y += bH + 10;
  }

  // ── Platform Recommendation ───────────────────────────────────────────────
  if (idea.recommendedPlatform) {
    y = newPageIfNeeded(doc, y, 35);

    const isColab = idea.recommendedPlatform === 'colab';
    const isBoth  = idea.recommendedPlatform === 'both';
    const pr = isColab ? 59  : isBoth ? 139 : 22;
    const pg = isColab ? 130 : isBoth ? 92  : 163;
    const pb = isColab ? 246 : isBoth ? 246 : 74;

    const platLabel = isColab
      ? 'Google Colab (Gratis)'
      : isBoth ? 'Local + Google Colab' : 'Jalankan Lokal';

    y = sectionTitle(doc, 'Platform Rekomendasi', y, pr, pg, pb);

    const reason = idea.platformReason ?? '';
    const reasonLines = doc.splitTextToSize(reason, 160);
    const boxH = 10 + reasonLines.length * 5.5 + (isColab || isBoth ? 8 : 2);

    doc.setFillColor(248, 248, 255);
    doc.setDrawColor(pr, pg, pb);
    doc.setLineWidth(0.5);
    doc.roundedRect(18, y - 3, 174, boxH, 2, 2, 'FD');

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(pr, pg, pb);
    doc.text(platLabel, 24, y + 4);
    y += 9;

    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(reasonLines, 24, y);
    y += reasonLines.length * 5.5 + 4;

    if (isColab || isBoth) {
      doc.setFontSize(8.5);
      doc.setTextColor(59, 130, 246);
      doc.text('https://colab.research.google.com/', 24, y);
      y += 5;
    }
    y += 6;
  }

  // ── Algorithm Recommendations ──────────────────────────────────────────────
  if (idea.algorithms && idea.algorithms.length > 0) {
    y = newPageIfNeeded(doc, y, 20);
    y = sectionTitle(doc, 'Algoritma yang Direkomendasikan', y, 79, 70, 229);

    idea.algorithms.forEach((algo, idx) => {
      const reasonLines = doc.splitTextToSize(algo.reason, 155);
      const needed = 22 + reasonLines.length * 5.5;
      y = newPageIfNeeded(doc, y, needed);

      const isPrimary = idx === 0;
      doc.setFillColor(isPrimary ? 238 : 248, isPrimary ? 236 : 248, isPrimary ? 255 : 250);
      doc.setDrawColor(isPrimary ? 99 : 180, isPrimary ? 102 : 180, isPrimary ? 241 : 200);
      doc.setLineWidth(isPrimary ? 0.6 : 0.3);
      const algoBoxH = 8 + reasonLines.length * 5.5 + 8;
      doc.roundedRect(18, y - 3, 174, algoBoxH, 2, 2, 'FD');

      // Labels on one line
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      let labelX = 22;

      if (isPrimary) {
        doc.setFillColor(99, 102, 241);
        doc.roundedRect(labelX, y - 1, 22, 5, 1, 1, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text('PRIMARY', labelX + 2, y + 3);
        labelX += 25;
      }

      // Complexity badge
      const cpxR = algo.complexity === 'simple' ? 34 : algo.complexity === 'moderate' ? 200 : 220;
      const cpxG = algo.complexity === 'simple' ? 197 : algo.complexity === 'moderate' ? 160 : 38;
      const cpxB = algo.complexity === 'simple' ? 94  : algo.complexity === 'moderate' ? 8   : 38;
      doc.setFillColor(cpxR, cpxG, cpxB);
      const cpxW = doc.getTextWidth(algo.complexity) + 5;
      doc.roundedRect(labelX, y - 1, cpxW, 5, 1, 1, 'F');
      doc.setTextColor(255, 255, 255);
      doc.text(algo.complexity, labelX + 2.5, y + 3);

      // Algo name
      doc.setFontSize(10.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 30, 30);
      doc.text(algo.name, 22, y + 10);

      // Reason
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(70, 70, 70);
      doc.text(reasonLines, 24, y + 16);

      y += algoBoxH + 4;
    });
    y += 4;
  }

  // ── Key Techniques ────────────────────────────────────────────────────────
  y = newPageIfNeeded(doc, y, 20);
  y = sectionTitle(doc, 'Key Techniques', y);
  idea.techniques.forEach(tech => {
    y = writeBullet(doc, tech, y);
  });
  y += 5;

  // ── Datasets ──────────────────────────────────────────────────────────────
  y = newPageIfNeeded(doc, y, 20);
  if (idea.datasetLinks && idea.datasetLinks.length > 0) {
    y = sectionTitle(doc, 'Dataset (Link Langsung)', y, 22, 163, 74);

    const srcBgColors: Record<string, [number, number, number]> = {
      kaggle:      [59,  130, 246],
      huggingface: [180, 130, 10 ],
      uci:         [34,  150, 60 ],
      github:      [50,  50,  50 ],
      official:    [130, 80,  230],
      other:       [100, 100, 100],
    };

    idea.datasetLinks.forEach(ds => {
      y = newPageIfNeeded(doc, y, 18);

      const [dr, dg, db] = srcBgColors[ds.source] ?? [100, 100, 100];
      const srcLabel = ds.source.toUpperCase();
      const srcW = doc.getTextWidth(srcLabel) + 6;

      doc.setFillColor(dr, dg, db);
      doc.roundedRect(20, y - 3.5, srcW, 5.5, 1, 1, 'F');
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(srcLabel, 23, y);

      // Dataset name
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 30, 30);
      const nameLines = doc.splitTextToSize(ds.name, 155 - srcW);
      doc.text(nameLines, 22 + srcW, y);
      y += nameLines.length * 5.5;

      // URL
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(59, 130, 246);
      doc.text(ds.url, 26, y);

      // Size (right-aligned)
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      doc.text(ds.size, 188, y, { align: 'right' });

      y += 9;
    });
  } else {
    y = sectionTitle(doc, 'Datasets', y, 22, 163, 74);
    idea.datasets.forEach(ds => {
      y = writeBullet(doc, ds, y);
    });
  }
  y += 5;

  // ── Learning Outcomes ─────────────────────────────────────────────────────
  y = newPageIfNeeded(doc, y, 20);
  y = sectionTitle(doc, "What You'll Learn", y, 220, 80, 20);
  idea.learningOutcomes.forEach(outcome => {
    y = newPageIfNeeded(doc, y, 8);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 40, 40);
    const lines = doc.splitTextToSize(`*  ${outcome}`, 165);
    doc.text(lines, 26, y);
    y += lines.length * 5.5 + 1;
  });

  // ── ROADMAP PAGE ──────────────────────────────────────────────────────────
  if (idea.roadmap?.phases?.length) {
    doc.addPage();
    addPageHeader(doc);
    y = 18;

    doc.setFontSize(17);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 30);
    doc.text('Implementation Roadmap', 105, y, { align: 'center' });
    y += 13;

    doc.setDrawColor(200, 200, 220);
    doc.setLineWidth(0.3);
    doc.line(20, y, 190, y);
    y += 8;

    idea.roadmap.phases.forEach((phase, idx) => {
      y = newPageIfNeeded(doc, y, 24);

      // Phase number circle
      doc.setFillColor(99, 102, 241);
      doc.circle(23, y - 1, 4, 'F');
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(String(idx + 1), 23, y + 2, { align: 'center' });

      // Phase name & duration
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 30, 30);
      doc.text(phase.name, 30, y + 1);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(phase.duration, 30, y + 6.5);
      y += 12;

      phase.tasks.forEach(task => {
        y = newPageIfNeeded(doc, y, 8);
        doc.setFontSize(9.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50);
        const taskLines = doc.splitTextToSize(`*  ${task}`, 155);
        doc.text(taskLines, 31, y);
        y += taskLines.length * 5.5 + 1;
      });
      y += 6;
    });

    // Resources
    if (idea.roadmap.resources?.length) {
      y = newPageIfNeeded(doc, y, 20);
      y = sectionTitle(doc, 'Recommended Resources', y, 37, 99, 235);
      idea.roadmap.resources.forEach(res => {
        y = writeBullet(doc, res, y);
      });
      y += 5;
    }

    // Tips
    if (idea.roadmap.tips?.length) {
      y = newPageIfNeeded(doc, y, 20);
      y = sectionTitle(doc, 'Pro Tips', y, 180, 130, 10);
      idea.roadmap.tips.forEach(tip => {
        y = newPageIfNeeded(doc, y, 8);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50);
        const tipLines = doc.splitTextToSize(`>  ${tip}`, 165);
        doc.text(tipLines, 26, y);
        y += tipLines.length * 5.5 + 2;
      });
    }
  }

  // ── Footer on every page ──────────────────────────────────────────────────
  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setFillColor(240, 240, 250);
    doc.rect(0, 285, 210, 12, 'F');
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text(
      'Generated by AI/ML Project Idea Generator | Secure | Fast | Free',
      105, 291, { align: 'center' }
    );
    doc.text(`${p} / ${pageCount}`, 188, 291);
  }

  // ── Download Trigger ──────────────────────────────────────────────────────
  const fileName = `${idea.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_ai_project.pdf`;
  try {
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 500);
  } catch {
    doc.save(fileName);
  }
}
