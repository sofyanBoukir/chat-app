# Real-Time Chat Application

![Screenshot from 2025-05-24 22-41-20](https://github.com/user-attachments/assets/de108f14-c778-401c-8ee1-2e45ac6fe4e9)

A modern real-time chat application built with React.js, TypeScript, Tailwind CSS, and shadcn/ui and express js. Features include user authentication, profile customization, real-time messaging, and user search functionality.

## Features

- **Real-Time Messaging**: Instant message delivery with WebSocket integration
- **User Profiles**: Customizable usernames and profile pictures and password
- **Dark/Light Mode**: Theme toggle with system preference detection
- **User Search**: Find and connect with other users
- **Responsive Design**: Works on all device sizes
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## Technologies Used

- **Frontend**:
  - React.js
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - Redux Toolkit (State management)

- **Backend**:
  - Node.js with Express
  - WebSocket (Socket.io for real-time communication)
  - JWT Authentication
  - MongoDB (mongoose)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm
- Git
- MongoDB (Local or Atlas)

### Installation

1. Clone the repository:
   ```bash
     git clone https://github.com/sofyanBoukir/chat-app.git
     cd chat-app
   ```

2. frontend setup
  ```bash
    npm install
  ```

3. configure frontend .env
   ```bash
     VITE_API_BASE_URL=http://localhost:5000
   ```
4. backend setup
  ```bash
    npm install
  ```

5. configure backend .env
    ```bash
      MONGOURL=mongodb://127.0.0.1:27017/chat
      PORT=5000
      BASE_URL=http://localhost:5000
      JWT_SECRET=okeruro3oi14u23ldwkjd8923urd28jkqwdhuy2y98e
      NODE_ENV=developement
    ```

> **ℹ️ Note**
> 
> you can modify the variables content as you want


## Run servers
  ```bash
    npm run dev //frontend
    npm run dev //backend
  ```

## open your browser and type localhost:5173

built with ❤️ by **soufian**.
