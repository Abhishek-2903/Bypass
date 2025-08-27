// pages/api/session-control.js
const { exec, spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

let isRunning = false;
let currentProcess = null;
let currentPort = null;

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action, port, baud } = req.body;

  if (action === "start") {
    if (isRunning) {
      return res.status(400).json({ 
        success: false, 
        error: `Session is already running on ${currentPort}` 
      });
    }

    // Validate COM port format
    if (!port || !port.match(/^COM\d+$/i)) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid COM port format. Please use format like COM3, COM7, etc." 
      });
    }

    // Validate baud rate (optional, defaults to 115200)
    const baudRate = baud || 115200;
    const validBaudRates = [9600, 19200, 38400, 57600, 115200];
    if (!validBaudRates.includes(parseInt(baudRate))) {
      return res.status(400).json({
        success: false,
        error: `Invalid baud rate: ${baudRate}. Valid rates: ${validBaudRates.join(', ')}`
      });
    }

    const componentsPath = path.join(process.cwd(), "components");
    const scriptPath = path.join(componentsPath, "esp.py");

    // Check if Python script exists
    if (!fs.existsSync(scriptPath)) {
      return res.status(500).json({
        success: false,
        error: `Python script not found at: ${scriptPath}. Please ensure esp.py is in the components directory.`,
      });
    }

    // Check available COM ports first
    const checkPortsCommand = process.platform === "win32"
      ? `python -c "import serial.tools.list_ports; ports = list(serial.tools.list_ports.comports()); print([p.device for p in ports])"`
      : `python3 -c "import serial.tools.list_ports; ports = list(serial.tools.list_ports.comports()); print([p.device for p in ports])"`;

    console.log("Checking available COM ports...");
    exec(checkPortsCommand, (error, stdout, stderr) => {
      if (error) {
        console.error("Failed to check COM ports:", error);
      } else {
        console.log("Available COM ports:", stdout.trim());
      }
    });

    // Build command with port and baud rate arguments
    const pythonCmd = process.platform === "win32" ? "python" : "python3";
    const command = `${pythonCmd} esp.py ${port.toUpperCase()} --baud ${baudRate}`;
    
    console.log("Executing command:", command);
    console.log("Working directory:", componentsPath);

    try {
      // Use spawn instead of exec for better process control
      currentProcess = spawn(pythonCmd, ["esp.py", port.toUpperCase(), "--baud", baudRate.toString()], {
        cwd: componentsPath,
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { 
          ...process.env, 
          PYTHONIOENCODING: "utf-8",
          PYTHONUNBUFFERED: "1"  // For real-time output
        },
      });

      if (!currentProcess) {
        return res.status(500).json({ 
          success: false, 
          error: "Failed to create Python process" 
        });
      }

      isRunning = true;
      currentPort = port.toUpperCase();
      
      console.log(`Python script started with PID: ${currentProcess.pid}`);
      console.log(`Monitoring ${currentPort} at ${baudRate} baud`);

      // Handle process output
      currentProcess.stdout.on('data', (data) => {
        const output = data.toString().trim();
        if (output) {
          console.log(`[Python STDOUT]: ${output}`);
        }
      });

      currentProcess.stderr.on('data', (data) => {
        const error = data.toString().trim();
        if (error && !error.includes('WARNING') && !error.includes('INFO')) {
          console.error(`[Python STDERR]: ${error}`);
        }
      });

      // Handle process events
      currentProcess.on("error", (error) => {
        console.error("Python process error:", error);
        isRunning = false;
        currentProcess = null;
        currentPort = null;
      });

      currentProcess.on("exit", (code, signal) => {
        console.log(`Python process exited with code: ${code}, signal: ${signal}`);
        isRunning = false;
        currentProcess = null;
        currentPort = null;
      });

      currentProcess.on("close", (code, signal) => {
        console.log(`Python process closed with code: ${code}, signal: ${signal}`);
        isRunning = false;
        currentProcess = null;
        currentPort = null;
      });

      return res.status(200).json({
        success: true,
        message: `Python script started successfully on ${currentPort} at ${baudRate} baud`,
        pid: currentProcess.pid,
        port: currentPort,
        baud: baudRate,
      });

    } catch (error) {
      console.error("Failed to start Python script:", error);
      isRunning = false;
      currentProcess = null;
      currentPort = null;
      
      return res.status(500).json({ 
        success: false, 
        error: `Failed to start Python script: ${error.message}` 
      });
    }

  } else if (action === "stop") {
    if (!isRunning && !currentProcess) {
      return res.status(400).json({ 
        success: false, 
        error: "No session is currently running" 
      });
    }

    console.log(`Stopping Python script (PID: ${currentProcess?.pid})...`);

    try {
      if (currentProcess) {
        // Graceful shutdown first
        if (process.platform === "win32") {
          // For Windows, try graceful shutdown first, then force kill
          exec(`taskkill /pid ${currentProcess.pid} /t`, (error) => {
            if (error) {
              console.log("Graceful shutdown failed, forcing termination...");
              exec(`taskkill /pid ${currentProcess.pid} /t /f`, (forceError) => {
                if (forceError) {
                  console.error("Force kill also failed:", forceError);
                  // Fallback: kill all python processes running esp.py
                  exec('wmic process where "commandline like \'%esp.py%\'" delete', (fallbackError) => {
                    if (fallbackError) console.error("Fallback kill error:", fallbackError);
                    else console.log("Fallback: Killed all esp.py processes");
                  });
                } else {
                  console.log("Process force killed successfully");
                }
              });
            } else {
              console.log("Process terminated gracefully");
            }
          });
        } else {
          // For Unix-like systems
          currentProcess.kill("SIGTERM");
          setTimeout(() => {
            if (currentProcess && !currentProcess.killed) {
              console.log("Graceful shutdown failed, sending SIGKILL...");
              currentProcess.kill("SIGKILL");
            }
          }, 3000);
        }
      }

      // Also kill any orphaned Python processes
      const killAllCommand = process.platform === "win32"
        ? "taskkill /f /im python.exe /fi \"WINDOWTITLE eq esp.py*\""
        : "pkill -f esp.py";

      exec(killAllCommand, (error) => {
        if (error) {
          console.log("No additional Python processes found to kill");
        } else {
          console.log("Additional Python processes terminated");
        }
      });

      // Reset state
      isRunning = false;
      const stoppedPort = currentPort;
      currentProcess = null;
      currentPort = null;

      return res.status(200).json({ 
        success: true, 
        message: `Python script stopped successfully. Port ${stoppedPort} is now available.` 
      });

    } catch (error) {
      console.error("Error during shutdown:", error);
      // Force reset state even on error
      isRunning = false;
      currentProcess = null;
      currentPort = null;
      
      return res.status(500).json({ 
        success: false, 
        error: `Failed to stop session: ${error.message}` 
      });
    }

  } else if (action === "status") {
    return res.status(200).json({
      success: true,
      running: isRunning,
      pid: currentProcess ? currentProcess.pid : null,
      port: currentPort,
      uptime: isRunning ? process.uptime() : 0,
    });

  } else if (action === "list-ports") {
    // New action to list available COM ports
    const listPortsCommand = process.platform === "win32"
      ? `python -c "import serial.tools.list_ports; ports = list(serial.tools.list_ports.comports()); [print(f'{p.device}: {p.description}') for p in ports]"`
      : `python3 -c "import serial.tools.list_ports; ports = list(serial.tools.list_ports.comports()); [print(f'{p.device}: {p.description}') for p in ports]"`;

    exec(listPortsCommand, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({
          success: false,
          error: `Failed to list COM ports: ${error.message}`
        });
      }

      const portLines = stdout.trim().split('\n').filter(line => line.length > 0);
      const ports = portLines.map(line => {
        const [device, ...descParts] = line.split(': ');
        return {
          device: device.trim(),
          description: descParts.join(': ').trim()
        };
      });

      return res.status(200).json({
        success: true,
        ports: ports
      });
    });

  } else {
    return res.status(400).json({
      success: false,
      error: 'Invalid action. Use "start", "stop", "status", or "list-ports"',
    });
  }
}

// Cleanup handlers
process.on("exit", () => {
  if (currentProcess) {
    try {
      console.log("Cleaning up on exit...");
      if (process.platform === "win32") {
        exec(`taskkill /pid ${currentProcess.pid} /t /f`);
      } else {
        currentProcess.kill("SIGKILL");
      }
    } catch (e) {
      console.error("Error during exit cleanup:", e);
    }
  }
});

process.on("SIGINT", () => {
  console.log("Received SIGINT, cleaning up...");
  if (currentProcess) {
    try {
      if (process.platform === "win32") {
        exec(`taskkill /pid ${currentProcess.pid} /t /f`);
      } else {
        currentProcess.kill("SIGTERM");
      }
    } catch (e) {
      console.error("Error during SIGINT cleanup:", e);
    }
  }
  process.exit();
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM, cleaning up...");
  if (currentProcess) {
    try {
      if (process.platform === "win32") {
        exec(`taskkill /pid ${currentProcess.pid} /t /f`);
      } else {
        currentProcess.kill("SIGTERM");
      }
    } catch (e) {
      console.error("Error during SIGTERM cleanup:", e);
    }
  }
  process.exit();
});