# Campus Connect Backend

A scalable Node.js backend for the Campus Connect web application.

## Features

- **Authentication**: JWT based auth with roles (Junior, Senior, Admin).
- **Users**: Profile management, search, and senior filtering.
- **Resources**: Upload notes/PYQs with Cloudinary integration.
- **Mentorship**: Juniors can request mentorship from seniors.
- **Real-time Chat**: Socket.io integrated real-time messaging.
- **Updates**: Admin broadcasted university updates.
- **Notifications**: Alerts for new uploads, chats, and mentorships.
- **Admin**: Dashboard stats and user/resource management.

## Tech Stack

- Node.js, Express.js
- MongoDB, Mongoose
- Socket.io
- JWT, Bcrypt.js
- Multer, Cloudinary
- Zod, Helmet, Express Rate Limit

## Setup Instructions

1. **Install Dependencies**

   ```bash
   bun install
   ```

2. **Environment Variables**
   Rename `.env.example` to `.env` and fill in your details:

   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/campus_connect
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=30d
   CLOUDINARY_CLOUD_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   ```

3. **Run the Server**
   ```bash
   bun run dev
   ```

## API Documentation

A detailed Postman collection is available in `docs/CampusConnect.postman_collection.json`. You can import this into Postman to test all endpoints.
