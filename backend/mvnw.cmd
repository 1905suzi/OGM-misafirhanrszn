@REM Maven Wrapper script for Windows
@REM Download Maven if not present, then run it
@echo off
setlocal

set MAVEN_HOME=%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.6
set MAVEN_CMD=%MAVEN_HOME%\bin\mvn.cmd

if exist "%MAVEN_CMD%" goto runMaven

echo Downloading Maven 3.9.6...
mkdir "%MAVEN_HOME%\bin" 2>nul
powershell -Command "Invoke-WebRequest -Uri 'https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip' -OutFile '%TEMP%\maven.zip'"
powershell -Command "Expand-Archive -Path '%TEMP%\maven.zip' -DestinationPath '%USERPROFILE%\.m2\wrapper\dists' -Force"
move "%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.6" "%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.6-tmp" 2>nul
move "%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.6-tmp" "%MAVEN_HOME%" 2>nul

:runMaven
"%MAVEN_CMD%" %*
