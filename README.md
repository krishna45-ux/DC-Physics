# PhysicsMaster - Class 11 & 12 Physics Platform

## Overview
This is a Next.js application for a video learning platform where students can buy courses (Class 11/12 Physics) or individual chapters. It features student and teacher dashboards, progress tracking, and Razorpay payment integration.

## Tech Stack
- **Frontend:** Next.js (React), Tailwind CSS
- **Backend:** Next.js API Routes (Serverless)
- **Database:** MongoDB (Mongoose)
- **Authentication:** Custom JWT with Cookies
- **Payments:** Razorpay

## Setup

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env.local` file in the root directory with the following variables:

    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/physicsmaster
    JWT_SECRET=your_jwt_secret_key_here
    TEACHER_SECRET=TEACHER_SECRET_123
    
    # Razorpay (Test Mode)
    NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
    RAZORPAY_KEY_ID=rzp_test_...
    RAZORPAY_KEY_SECRET=your_razorpay_secret
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```

4.  **Admin/Teacher Access:**
    - Go to `/register`.
    - Select "Teacher" role.
    - Enter the `TEACHER_SECRET` (default: `TEACHER_SECRET_123`).
    - Go to `/teacher/dashboard` to add chapters and videos.

## Features implemented
- **Authentication:** Student and Teacher login/registration.
- **Teacher Panel:** Add chapters/videos, view student stats.
- **Student Dashboard:** View courses, buy full course or chapters, watch videos, track progress.
- **Payments:** Razorpay integration for unlocking content.
