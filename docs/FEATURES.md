# Project Features

This project is a comprehensive MBTI-based personality assessment and career guidance platform. Below are the key features implemented in the backend.

## 1. Core MBTI Assessment
- **Deterministic Scoring**: A 60-question psychometric test with a precise scoring engine.
- **Session Management**: Users can start, pause, and resume tests. Progress is saved automatically.
- **Quota System**: Users have a limited number of test attempts, managed through a subscription/plan model.

## 2. Advanced Result Analysis
- **Detailed Dimensions**: Breakdown of scores for Mind, Energy, Nature, and Tactics.
- **Type Metadata**: Extensive data for all 16 MBTI types, including strengths, weaknesses, and personality traits.
- **Career Mapping**: Direct mapping of MBTI types to suitable career paths and job roles.

## 3. AI-Powered Insights ("Success Blueprint")
- **Personalized Advice**: Using Large Language Models (LLMs) via Groq, the system generates a "Success Blueprint" tailored to the user's specific scores, age, and country.
- **Academic Guidance**: Suggests academic streams and subjects based on personality fit.
- **Growth Roadmap**: Provides a 90-day growth plan and self-care recommendations.
- **Cognitive Function Analysis**: Deep dive into dominant, auxiliary, tertiary, and inferior functions.

## 4. Report Generation & Delivery
- **PDF Generation**: Automatically generates a high-quality, multi-page PDF report.
- **Email Integration**: Delivers the generated report directly to the user's registered email address.
- **Manual Downloads**: Users can download their latest or historical reports at any time.

## 5. AI Assistance (Quick Assessments)
- **Psychometric AI Test**: Quick, AI-generated psychometric tests for immediate insights.
- **Career Guidance AI**: Interactive AI chat/test to narrow down career options.
- **Follow-up Logic**: Intelligent follow-up questions based on previous answers to refine results.

## 6. Subscription & Payments
- **Plan Management**: Multiple plans for different user needs (e.g., Single Test vs. Professional Pack).
- **Payment Gateway**: Integration with Razorpay for secure transactions.
- **Coupon System**: Support for discount coupons with validation logic.

## 7. User Authentication
- **Multi-method Login**: Support for traditional Email/Password and Google OAuth.
- **JWT Protection**: Secure API endpoints using JSON Web Tokens.
