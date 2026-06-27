@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ================================
echo   開始部署到 GitHub Pages...
echo ================================

echo.
echo [1/4] 執行 npm run build...
call npm run build
if errorlevel 1 (
    echo Build 失敗！請檢查錯誤訊息。
    pause
    exit /b 1
)

echo.
echo [2/4] 進入 dist 資料夾...
cd dist
if errorlevel 1 (
    echo 找不到 dist 資料夾！
    pause
    exit /b 1
)

echo.
echo [3/4] 初始化 git 並提交...
if exist .git rmdir /s /q .git
git init
git add .
git commit -m "deploy"
git branch -M gh-pages
git remote remove origin 2>nul
git remote add origin https://github.com/Daisy6988/my-portfolio.git

echo.
echo [4/4] 推送到 GitHub gh-pages 分支...
git push -f origin gh-pages
if errorlevel 1 (
    echo 推送失敗！請確認網路連線與 GitHub 權限。
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo ================================
echo   部署完成！網站約 1~2 分鐘後生效
echo ================================
pause