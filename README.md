# Network Sniffer & Manual Firewall System

A full-stack web application designed to simulate network packet traffic, analyze it against a user-defined set of firewall rules, and visualize the results in real-time. This project demonstrates a "Manual Mode" firewall where every packet is strictly evaluated against a linear list of rules (Allow/Deny).

![Status](https://img.shields.io/badge/Status-Active-success)
![Stack](https://img.shields.io/badge/Stack-Java_Spring_+_React-blue)

## 🚀 Features

*   **Real-time Traffic Simulation**: The frontend generates simulated network packets (TCP, UDP, ICMP, HTTP, HTTPS, SSH, FTP, DNS).
*   **Manual Firewall Logic**: A Java backend processes each packet, checking it against active rules using a linear scan algorithm.
*   **Live Dashboard**: 
    *   Visualizes Allowed vs. Denied packet counts.
    *   Displays real-time logs of recent traffic.
    *   Includes ASCII art diagrams explaining the data flow.
*   **Rule Management**: Users can dynamically add new Allow/Deny rules for specific protocols and ports via the Settings interface.
*   **Session Logging**: Capture sessions can be saved and viewed later in the "Saved Logs" section.
*   **Responsive Design**: The interface is fully optimized for Desktop, Tablet, and Mobile devices.

## 🛠️ Technology Stack

### Backend (Server)
*   **Language**: Java 17+
*   **Framework**: Spring Boot 3.3.3
*   **Build Tool**: Maven
*   **Port**: 8080
*   **Key Responsibilities**: REST API endpoints, Rule Engine logic, Packet Analysis.

### Frontend (Client)
*   **Library**: React.js
*   **Build Tool**: Vite
*   **Styling**: Vanilla CSS (Responsive, Dark Mode)
*   **Port**: 3000
*   **Key Responsibilities**: UI/UX, Packet Generation (Simulation), State Management.

## 📂 Project Structure

```
/JavaProject
├── java-backend/           # Spring Boot Application
│   ├── src/main/java/      # Source code (Controller, Service, Models)
│   ├── pom.xml             # Maven dependencies
│   └── target/             # Compiled JAR files
├── react-app/              # React Frontend Application
│   ├── src/                # Components (Dashboard, LiveCapture, etc.)
│   ├── index.html          # Entry point
│   └── vite.config.js      # Vite configuration
└── README.md               # This documentation
```

## ⚡ Getting Started

### Prerequisites
*   **Java Development Kit (JDK)**: Version 17 or higher.
*   **Node.js**: Version 18 or higher (with `npm`).
*   **Maven**: For building the backend (optional if using `mvnw` or IDE).

### 1. Start the Backend
The backend must be running first to handle API requests.

```bash
cd java-backend
# Run using Maven
mvn spring-boot:run

# OR using the built JAR (if packaged)
java -jar target/sniffer-0.0.1-SNAPSHOT.jar
```
*The server will start on `http://localhost:8080`.*

### 2. Start the Frontend
Open a new terminal window.

```bash
cd react-app
# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```
*The application should now be accessible at `http://localhost:3000`.*

## 📖 Usage Guide

1.  **Dashboard**: Overview of traffic statistics. Check the "How It Works" diagram to understand the flow.
2.  **Live Capture**:
    *   Click **Start Capture** to begin simulating traffic.
    *   Watch as packets appear in the table. Green = Allowed, Red = Denied.
    *   Click **Save Log** to store the current session.
3.  **Saved Logs**: View logging history of previous sessions.
4.  **Settings**:
    *   Add new rules! Example: *Protocol: SSH, Port: 22, Action: DENY*.
    *   Go back to Live Capture to see your new rule taking effect.

## 🔧 API Endpoints

*   `POST /api/analyze`: Analyzes a single packet payload.
*   `GET /api/rules`: Retrieves the list of active firewall rules.
*   `POST /api/rules`: Adds a new rule.
*   `GET /api/logs`: Retrieves saved capture sessions.
*   `POST /api/logs/save`: Saves the current list of packets.
