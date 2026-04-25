# Setup and Installation Guide

This guide will walk you through the steps to set up and run the Personality Test Backend locally.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **MongoDB** (Local instance or MongoDB Atlas URI)

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd personalitytest-backend
```

## Step 2: Install Dependencies

Run the following command to install all necessary packages:

```bash
npm install
```

## Step 3: Environment Configuration

Create a `.env` file in the root directory and populate it with the required keys. You can use the `.env.example` file as a template:

```bash
cp .env.example .env
```

### Required Variables:

| Variable | Description |
|----------|-------------|
| `PORT` | The port the server will run on (default: 8001). |
| `MONGO_URI` | Your MongoDB connection string. |
| `JWT_SECRET` | A secure string for signing JSON Web Tokens. |
| `CLIENT_URL` | The URL of your frontend application (e.g., http://localhost:3000). |
| `GROQ_API_KEY` | API Key from [Groq](https://console.groq.com/) for AI features. |
| `RAZORPAY_KEY_ID` | Your Razorpay API Key ID. |
| `RAZORPAY_KEY_SECRET` | Your Razorpay API Key Secret. |
| `EMAIL_USER` | SMTP email address for sending reports. |
| `EMAIL_PASS` | SMTP password or App Password. |

## Step 4: Run the Application

### For Development:
Runs the server with `nodemon` for automatic restarts on code changes.

```bash
npm run dev
```

### For Production:
Starts the server using standard `node`.

```bash
npm start
```

## Step 5: Verification

Once the server is running, you should see a message in the console:
`Server is running on port 8001`
`Connected to MongoDB successfully`

You can verify the API is alive by visiting `http://localhost:8001/` in your browser. You should see:
`Personality Test Backend API is running`

## Troubleshooting

- **MongoDB Connection Error**: Ensure your IP address is whitelisted in MongoDB Atlas or that your local MongoDB service is running.
- **Port Already in Use**: If port 8001 is busy, change the `PORT` variable in your `.env` file.
- **AI/Payment Failures**: Double-check your API keys in the `.env` file.
