const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Logging middleware to capture IP and session details
app.use((req, res, next) => {
  const ip = req.ip;
  const userAgent = req.get('User-Agent');
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    ip,
    userAgent,
    method: req.method,
    url: req.url
  };
  
  // Append log entry to file
  const logFilePath = path.join(logsDir, `access-${new Date().toISOString().split('T')[0]}.json`);
  let logs = [];
  if (fs.existsSync(logFilePath)) {
    const existingLogs = fs.readFileSync(logFilePath, 'utf8');
    logs = existingLogs ? JSON.parse(existingLogs) : [];
  }
  logs.push(logEntry);
  fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2), 'utf8');
  
  next();
});

 // Handle login attempts
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const ip = req.ip;
  const timestamp = new Date().toISOString();
  const loginLog = {
    timestamp,
    ip,
    username,
    password,
    result: 'success' // Log as success since we allow all logins for honeypot purposes
  };
  
  // Append login attempt to log file
  const loginLogFilePath = path.join(logsDir, `login-attempts-${new Date().toISOString().split('T')[0]}.json`);
  let loginLogs = [];
  if (fs.existsSync(loginLogFilePath)) {
    const existingLogs = fs.readFileSync(loginLogFilePath, 'utf8');
    loginLogs = existingLogs ? JSON.parse(existingLogs) : [];
  }
  loginLogs.push(loginLog);
  fs.writeFileSync(loginLogFilePath, JSON.stringify(loginLogs, null, 2), 'utf8');
  
  // Allow login regardless of credentials
  res.status(200).json({ message: 'Login successful', redirect: '/dashboard.html' });
});

// Start the server
app.listen(port, () => {
  console.log(`Honeypot server running at http://localhost:${port}`);
});
