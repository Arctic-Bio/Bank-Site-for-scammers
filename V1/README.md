# FakeBank Honeypot 🏦🔒

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.18.2-blue.svg)](https://expressjs.com/)

A sophisticated honeypot designed to mimic a Bank of America online banking portal, crafted to waste scammers' and hackers' time by engaging them with endless, procedurally generated tasks while logging their activities for analysis.

## 🚨 Purpose

FakeBank is a security tool intended to deter and distract malicious actors attempting to infiltrate systems or scam users. By presenting a hyper-realistic banking interface, it lures potential scammers into a trap where they are bombarded with pointless, random verification challenges—ranging from math problems to riddles—designed to consume their time and resources. After 50 tasks, the system displays a faux "system down" message, further frustrating attackers while reassuring them that no data has been saved.

**Note**: This project is for educational and defensive purposes only. Ensure compliance with local laws and regulations when deploying a honeypot.

## 🌟 Features

- **Hyper-Realistic Design**: Meticulously styled to replicate the Bank of America online banking experience with accurate branding, layouts, and fake account data.
- **Procedural Task Generation**: Over 10 unique challenge types including math problems, translations, riddles, and logic puzzles to keep scammers engaged indefinitely.
- **Logging Mechanism**: Captures IP addresses, login attempts, and session details for monitoring and analysis.
- **Time-Wasting Mechanism**: After 50 tasks, displays a 404 "system down" error to frustrate attackers.
- **Lightweight & Easy to Deploy**: Built with Node.js and Express for quick setup on local or remote servers.

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Setup Port Forwarding](#setup-port-forwarding)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)
- [Disclaimer](#disclaimer)

## 🛠 Installation

Follow these steps to set up FakeBank on your local machine or server.

### Prerequisites

- **Node.js** (v16 or higher) and **npm** installed on your system. Download from [nodejs.org](https://nodejs.org/).
- A basic understanding of command-line operations.

### Steps

1. **Clone the Repository** (if applicable) or download the project files to your desired directory.

   ```bash
   git clone https://github.com/yourusername/fakebank.git
   cd fakebank
   ```

2. **Install Dependencies** to set up the required Node.js packages.

   ```bash
   npm install
   ```

3. **Add Logo Image** for enhanced realism. Replace the placeholder in `public/images/logo.png` with an actual Bank of America logo image. Ensure compliance with copyright and trademark laws when sourcing the image.

   - Path: `public/images/logo.png`

## 🚀 Usage

Run the honeypot server to start luring scammers.

### Starting the Server

1. From the project directory, start the Node.js server.

   ```bash
   npm start
   ```

2. The server will run on `http://localhost:3000` by default. Open this URL in a browser to verify the honeypot is active.

### Monitoring Logs

- Access logs are stored in the `logs` directory with timestamps. Two primary log files are generated daily:
  - `access-YYYY-MM-DD.json`: Records all access attempts with IP addresses and user agents.
  - `login-attempts-YYYY-MM-DD.json`: Logs login credentials entered by users.
- Review these logs to analyze scammer behavior and patterns.

### Stopping the Server

- Press `Ctrl + C` in the terminal where the server is running to stop it.

## 🌐 Setup Port Forwarding

To make the honeypot accessible from the internet (e.g., for remote testing or deployment), you may need to set up port forwarding on your router. This allows external traffic to reach your local server.

### Basics of Port Forwarding

Port forwarding maps a port on your router to a port on your local machine, enabling external devices to access services hosted on your internal network.

**Warning**: Exposing a honeypot to the internet can attract real malicious activity. Ensure you have proper security measures and legal permissions in place before proceeding.

### Steps to Configure Port Forwarding

1. **Access Your Router Settings**:
   - Open a browser and enter your router's IP address (commonly `192.168.1.1` or `192.168.0.1`).
   - Log in with your admin credentials (check your router manual or sticker on the device for default username/password).

2. **Locate Port Forwarding Settings**:
   - Navigate to the "Port Forwarding" or "Virtual Server" section (terminology varies by router brand).

3. **Add a New Port Forwarding Rule**:
   - **Service Name**: Enter a name like "FakeBank".
   - **External Port**: Choose a port (e.g., `8080`) for external access.
   - **Internal Port**: Set to `3000` (the port FakeBank runs on).
   - **Internal IP Address**: Enter your local machine's IP address (find it using `ipconfig` on Windows or `ifconfig`/`ip addr` on Linux/Mac).
   - **Protocol**: Select `TCP` or `Both` (TCP/UDP).

4. **Save and Apply Changes**:
   - Save the settings and restart your router if required.

5. **Test External Access**:
   - Use an external device or online tool to access `http://your-public-ip:external-port` (e.g., `http://123.456.789.012:8080`).
   - Find your public IP by searching "what is my IP" on Google or using a service like [ipify.org](https://www.ipify.org/).

**Security Note**: Consider using a firewall or VPN to restrict access to known IPs, and monitor logs closely for malicious activity.

## 🎨 Customization

Enhance the honeypot's realism or functionality by modifying the following:

- **Branding**: Adjust colors, logos, and text in `public/css/styles.css` and HTML files to mimic other banks if desired.
- **Challenges**: Add more task types in `public/js/dashboard.js` under `challengeTypes` to increase variety.
- **Port**: Change the server port in `server/index.js` by modifying the `port` variable (default: `3000`).

## 🤝 Contributing

Contributions are welcome! If you have ideas to improve FakeBank, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

Please ensure your code adheres to the project's style and includes appropriate documentation.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

FakeBank is a honeypot tool designed for educational and defensive purposes. The creators are not responsible for any misuse or legal consequences arising from its deployment. Ensure compliance with local laws regarding deception, data collection, and online security practices. Use at your own risk.

---

**FakeBank Honeypot** - Wasting scammers' time, one task at a time. 🕒
