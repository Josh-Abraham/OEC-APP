@echo off
cd Backend
set FLASK_APP=eq.py
set FLASK_DEBUG=1
start  /min flask run
cd ..
cd kiosk-system
cd src
start  /min npm start
