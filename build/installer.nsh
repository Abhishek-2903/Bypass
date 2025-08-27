!macro customInit
  ; Check for Python installation
  ReadRegStr $R0 HKLM "SOFTWARE\Python\PythonCore\3.11\InstallPath" ""
  StrCmp $R0 "" check_python310 python_found
  
  check_python310:
  ReadRegStr $R0 HKLM "SOFTWARE\Python\PythonCore\3.10\InstallPath" ""
  StrCmp $R0 "" check_python39 python_found
  
  check_python39:
  ReadRegStr $R0 HKLM "SOFTWARE\Python\PythonCore\3.9\InstallPath" ""
  StrCmp $R0 "" check_python38 python_found
  
  check_python38:
  ReadRegStr $R0 HKLM "SOFTWARE\Python\PythonCore\3.8\InstallPath" ""
  StrCmp $R0 "" no_python python_found
  
  python_found:
    ; Python is installed, check for required packages
    DetailPrint "Python found at: $R0"
    ExecWait '"$R0\python.exe" -m pip install pyserial websockets' $1
    IntCmp $1 0 deps_ok deps_failed deps_failed
    
    deps_ok:
      DetailPrint "Python dependencies installed successfully"
      Goto init_done
    
    deps_failed:
      MessageBox MB_YESNO|MB_ICONQUESTION "Failed to install Python dependencies. The hardware interface may not work correctly.$\n$\nWould you like to continue with the installation?" IDYES init_done IDNO quit_install
      Goto init_done
  
  no_python:
    MessageBox MB_YESNO|MB_ICONQUESTION "Python is not installed on this system. The hardware interface will not work without Python.$\n$\nWould you like to continue with the installation anyway?" IDYES init_done IDNO quit_install
    Goto init_done
  
  quit_install:
    Quit
  
  init_done:
!macroend

!macro customInstall
  ; Create additional shortcuts
  CreateDirectory "$SMPROGRAMS\Sci-Fi Simulator"
  CreateShortCut "$SMPROGRAMS\Sci-Fi Simulator\Sci-Fi Simulator.lnk" "$INSTDIR\sci-fi-simulator.exe"
  CreateShortCut "$SMPROGRAMS\Sci-Fi Simulator\Uninstall.lnk" "$INSTDIR\Uninstall Sci-Fi Simulator.exe"
  
  ; Create readme file with Python requirements
  FileOpen $4 "$INSTDIR\README.txt" w
  FileWrite $4 "Sci-Fi Simulator$\r$\n"
  FileWrite $4 "===================$\r$\n$\r$\n"
  FileWrite $4 "Requirements:$\r$\n"
  FileWrite $4 "- Python 3.8 or higher$\r$\n"
  FileWrite $4 "- Python packages: pyserial, websockets$\r$\n$\r$\n"
  FileWrite $4 "To install Python packages, run:$\r$\n"
  FileWrite $4 "pip install pyserial websockets$\r$\n$\r$\n"
  FileWrite $4 "For hardware interface, connect your device to a COM port$\r$\n"
  FileWrite $4 "and configure the port settings in the application.$\r$\n"
  FileClose $4
!macroend

!macro customUnInstall
  ; Remove additional shortcuts
  RMDir /r "$SMPROGRAMS\Sci-Fi Simulator"
!macroend