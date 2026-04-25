# API Reference

Base URL: `/api`

## 1. User Authentication (`/student`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/StudentLogin` | Login with email and password | No |
| POST | `/googleLogin` | Login/Register via Google OAuth | No |
| POST | `/signup` | Register a new user | No |
| POST | `/logout` | Clear user session/cookies | No |

## 2. MBTI Assessment (`/mbti`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/test/start` | Start or resume an MBTI test session | Yes |
| PUT | `/test/:sessionId/answer` | Save a single answer | Yes |
| POST | `/test/:sessionId/progress` | Batch save multiple answers | Yes |
| POST | `/test/:sessionId/submit` | Finalize test and calculate result | Yes |
| GET | `/test/:sessionId` | Get details of a specific test session | Yes |
| GET | `/results/:userId/latest` | Get the user's most recent MBTI result | Yes |
| GET | `/results/:userId/history` | Get the user's last 10 results | Yes |
| GET | `/career-guidance/:mbtiType` | Get generic career paths for a type | Yes |
| POST | `/report/generate` | Trigger AI blueprint and PDF generation | Yes |
| GET | `/report/:resultId/download` | Download a generated PDF report | Yes |

## 3. Subscriptions & Payments (`/personality-sub`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/plans` | List available personality test plans | No |
| POST | `/create-order` | Create a Razorpay order | Yes |
| POST | `/verify-payment` | Verify Razorpay payment signature | Yes |
| GET | `/my-quota` | Get user's remaining test attempts | Yes |
| POST | `/validate-coupon` | Check if a coupon is valid | Yes |
| POST | `/admin/create-coupon` | (Admin) Create a new discount coupon | Yes |
| GET | `/admin/all-coupons` | (Admin) List all coupons | Yes |

## 4. AI Assistance (`/ai-assistance`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/psychometric-test` | Generate a quick psychometric test | No |
| POST | `/psychometric-result` | Analyze quick psychometric answers | No |
| POST | `/initial-career-questions` | Get initial AI career questions | Yes |
| POST | `/career-followup-questions` | Get AI follow-up career questions | Yes |
| POST | `/analyze-career-full` | Full AI career analysis based on chat | Yes |
