<h1 align="center">✨ Welcome to Quick Poll ✨</h1>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
</p>

<p align="center">A real-time polling application built with React, Socket.IO, and Express</p>

## 🌟 Overview

Quick Poll is a modern, real-time polling application that allows users to create polls, vote, and see results update instantly. Built with a React frontend and Express backend, it utilizes Socket.IO for real-time updates and MongoDB for data storage.

### ✨ Live Demo

<br/>

- **Frontend:** 👉 [Click here](https://quick-poll-rust.vercel.app/)
- **Backend API:** 👉 [Click here](https://quick-poll-backend.onrender.com)
<br/>

## 🚀 Features

- 📊 Create custom polls with a question and multiple options
- 🗳️ Vote on existing polls
- 🔄 View poll results in real-time (updates via Socket.IO)
- 📱 Responsive design for all devices
- 📈 Visual representation of results with Chart.js
- ⚡ Fast and intuitive user interface

## 🛠️ Technologies Used

<div align="center">

### Frontend
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
<img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white" alt="Chart.js">
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router">
<img src="https://img.shields.io/badge/Socket.io_Client-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.IO Client">
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">

### Backend
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
<img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.IO">

### Deployment
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
<img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render">

</div>

## 📊 Database Schema

### Poll Model

```javascript
const pollSchema = new mongoose.Schema({
  question: { 
    type: String, 
    required: true 
  },
  options: [
    {
      text: { 
        type: String, 
        required: true 
      },
      votes: { 
        type: Number, 
        default: 0 
      },
    },
  ],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});
```

The schema includes:
- `question`: The poll question (required string)
- `options`: An array of option objects, each containing:
  - `text`: The option text (required string)
  - `votes`: Number of votes for this option (default: 0)
- `createdAt`: Timestamp when the poll was created (auto-generated)

## 🌐 API Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/polls` | Get all polls | None | Array of poll objects |
| POST | `/api/polls` | Create a new poll | `{ question: String, options: Array<String> }` | Created poll object |
| POST | `/api/polls/:id/vote` | Vote on a specific poll | `{ optionIndex: Number }` | Updated poll object |

### API Examples

#### Create a Poll
```http
POST /api/polls
Content-Type: application/json

{
  "question": "What's your favorite programming language?",
  "options": ["JavaScript", "Python", "Java", "C#"]
}
```

Response:
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "question": "What's your favorite programming language?",
  "options": [
    { "text": "JavaScript", "votes": 0 },
    { "text": "Python", "votes": 0 },
    { "text": "Java", "votes": 0 },
    { "text": "C#", "votes": 0 }
  ],
  "createdAt": "2023-12-01T10:00:00.000Z"
}
```

#### Vote on a Poll
```http
POST /api/polls/60d21b4667d0d8992e610c85/vote
Content-Type: application/json

{
  "optionIndex": 0
}
```

Response:
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "question": "What's your favorite programming language?",
  "options": [
    { "text": "JavaScript", "votes": 1 },
    { "text": "Python", "votes": 0 },
    { "text": "Java", "votes": 0 },
    { "text": "C#", "votes": 0 }
  ],
  "createdAt": "2023-12-01T10:00:00.000Z"
}
```

## 🏁 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quick-poll.git
   cd quick-poll
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Create a `.env` file in the server directory:
   ```
   PORT=8085
   mongoURL=your_mongodb_connection_string
   ```

4. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

5. Update the API endpoints in `client/src/utils/api.js` if needed

### Running the Application

1. Start the server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the client:
   ```bash
   cd client
   npm npm dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

<!-- 
## 📱 Application Screenshots

<div align="center">
  <h3>Create Poll Page</h3>
  <img src="https://via.placeholder.com/800x450.png?text=Create+Poll+Page" alt="Create Poll" width="80%">
  
  <h3>Poll Details & Voting</h3>
  <img src="https://via.placeholder.com/800x450.png?text=Poll+Details+Page" alt="Poll Details" width="80%">
  
  <h3>Real-time Results</h3>
  <img src="https://via.placeholder.com/800x450.png?text=Real-time+Results" alt="Real-time Results" width="80%">
</div>
-->


## ⚡ Real-time Updates

The application uses Socket.IO to provide real-time updates:

- When a new poll is created, all connected clients are notified
- When a vote is cast, all viewers of that poll see the results update instantly
- The frontend automatically receives these updates without manual refresh

```javascript
// Socket events
socket.on("pollsUpdated", (updatedPoll) => {
  // Update the UI with new poll data
});
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

- **Your Name** - [Your GitHub Profile](https://github.com/AyushiVashisth/quick-poll)

<h1 align="center">✨ Thank You for Using Quick Poll! ✨</h1>
