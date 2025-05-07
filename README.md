# MeetX Backend API

RESTful API for the MeetX application, enabling users to register, log in, view activities, and book them.

## Technology Stack

- **Runtime**: Node.js (v16+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Language**: TypeScript

## Project Structure

```
meetx-backend/
├── src/
│   ├── controllers/        # Business logic
│   │   ├── auth.controller.ts
│   │   ├── activities.controller.ts
│   │   └── bookings.controller.ts
│   ├── models/             # Mongoose schemas
│   │   ├── User.model.ts
│   │   ├── Activity.model.ts
│   │   └── Booking.model.ts
│   ├── routes/             # Express routers
│   │   ├── auth.routes.ts
│   │   ├── activities.routes.ts
│   │   └── bookings.routes.ts
│   ├── validations/        # All Zod schemas & middleware
│   │   ├── auth.validation.ts
│   │   ├── activity.validation.ts
│   │   └── booking.validation.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts       # JWT verification
│   │   └── validation.middleware.ts # Zod request parser
│   ├── utils/
│   │   └── generateToken.ts         # JWT helper
│   ├── config/
│   │   └── db.config.ts             # MongoDB connection
│   └── server.ts                    # Express app + mounting
├── .env
├── package.json
└── tsconfig.json
```

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/meetx
   JWT_SECRET=your_jwt_secret_key_change_in_production
   JWT_EXPIRES_IN=3600
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- **Register User**: `POST /api/auth/register`
  - Body: `{ name, email, phone, password }`
    ```
    {
  "name": "Test User",
  "email": "test@example.com",
  "phone": "1234567890",
  "password": "Password123"
}
  ```
  - Returns: User data with JWT token

- **Login User**: `POST /api/auth/login`
  - Body: `{ email, password }`

  ```
  {
  "email": "test@example.com",
  "password": "Password123"
}
  ```
  - Returns: User data with JWT token

- **Get User Profile**: `GET /api/auth/me`
  - Headers: `Authorization: Bearer <token>`
  - Returns: User data

### Activities
  ## Create a Activity First Then Access it to get its detail 

  # data for creating a activity
  ```
  {
  "date": "2025-05-10",
  "title": "Cricket Match",
  "description": "Exciting cricket match between local teams.",
  "location": "Sports Ground A",
  "time": "10:00 AM",
  "capacity": 100
}

  ```
- **Get All Activities**: `GET /api/activities`
  - Public access
  - Returns: List of all activities  
  

- **Create Activity**: `POST /api/activities/createActivity`
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ title, description, location, date, time, capacity }`
  - Returns: Created activity
  

- **Get Single Activity**: `GET /api/activities/:id`
  - Public access
  - Returns: Single activity details



- **Update Activity**: `PUT /api/activities/:id`
  - Headers: `Authorization: Bearer <token>`
  - Body: Activity fields to update
  - Returns: Updated activity

- **Delete Activity**: `DELETE /api/activities/:id`
  - Headers: `Authorization: Bearer <token>`
  - Returns: Success message

### Bookings

- **Create Booking**: `POST /api/bookings`
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ activityId }`
  - Returns: Booking details

- **Get User Bookings**: `GET /api/bookings/me`
  - Headers: `Authorization: Bearer <token>`
  - Returns: All bookings for the authenticated user

- **Get Single Booking**: `GET /api/bookings/:id`
  - Headers: `Authorization: Bearer <token>`
  - Returns: Single booking details

- **Update Booking Status**: `PATCH /api/bookings/:id`
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ status }` (confirmed/cancelled/pending)
  - Returns: Updated booking

- **Delete Booking**: `DELETE /api/bookings/:id`
  - Headers: `Authorization: Bearer <token>`
  - Returns: Success message

## Security

- Passwords are hashed using bcrypt
- Authentication is handled via JWT tokens
- Protected routes use auth middleware
- Input validation with Zod