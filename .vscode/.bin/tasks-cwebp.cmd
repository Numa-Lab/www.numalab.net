@echo off
cd /d "%~dp0"
cd ../libwebp-1.2.2-windows-x64

if "%1"  == ".jpg" (
  echo .jpg
) else if "%1"  == ".png" (
  echo .png
) else if "%1"  == ".jpeg" (
  echo .jpeg
) else if "%1"  == ".tiff" (
  echo .tiff
) else (
  echo T.T
  exit /b
)

cwebp.exe -lossless "%~f2" -o "%~d2%~p2%~n2.webp"