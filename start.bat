@echo off
chcp 65001 >nul
title 音乐应用启动器

echo ================================
echo   正在检查并安装后端依赖...
echo ================================
cd /d "%~dp0music_api"
if not exist "node_modules" (
    echo 后端依赖未安装，正在安装...
    npm install
) else (
    echo 后端依赖已就绪
)

echo.
echo ================================
echo   正在检查并安装前端依赖...
echo ================================
cd /d "%~dp0electron-app"
if not exist "node_modules" (
    echo 前端依赖未安装，正在安装...
    npm install
) else (
    echo 前端依赖已就绪
)

echo.
echo ================================
echo   启动后端服务...
echo ================================
cd /d "%~dp0music_api"
start "音乐后端" npm start

echo 等待后端启动（5秒）...
timeout /t 5 /nobreak >nul

echo.
echo ================================
echo   启动前端应用...
echo ================================
cd /d "%~dp0electron-app"
start "音乐前端" npm run dev

echo.
echo ================================
echo   启动完成！后端：http://localhost:3000
echo   前端 Electron 窗口将自动打开
echo ================================
pause