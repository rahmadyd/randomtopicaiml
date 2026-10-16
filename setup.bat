@echo off
echo.
echo ========================================
echo  AI/ML Project Idea Generator Setup
echo ========================================
echo.

echo [1/4] Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to install dependencies!
    echo Please run 'npm install' manually.
    pause
    exit /b 1
)

echo.
echo [2/4] Checking for .env.local file...
if not exist ".env.local" (
    echo .env.local not found. Creating from example...
    copy .env.local.example .env.local
    echo.
    echo ⚠️  IMPORTANT: Please edit .env.local and add your Groq API key!
    echo Get your key from: https://console.groq.com/keys
    echo.
) else (
    echo .env.local already exists ✓
)

echo.
echo [3/4] Setup complete! ✅
echo.
echo ========================================
echo  Next Steps:
echo ========================================
echo.
echo 1. Get your Groq API key from: https://console.groq.com/keys
echo 2. Edit .env.local and add your key
echo 3. Run 'npm run dev' to start the development server
echo 4. Open http://localhost:3000 in your browser
echo.
echo ========================================
echo.

pause
