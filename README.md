# MeetX Backend API

RESTful API for the MeetX application, enabling users to register, log in, view activities, and book them.

---

## Technology Stack

- **Runtime**: Node.js (v16+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Language**: TypeScript

---

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

---

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/meetx-backend.git
   cd meetx-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/meetx
   JWT_SECRET=your_jwt_secret_key_change_in_production
   JWT_EXPIRES_IN=3600
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## API Endpoints

### Authentication

#### 1. **Register User**
- **Method**: `POST`
- **Endpoint**: `/api/auth/register`
- **Body**:
  ```json
  {
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "password": "Password123"
  }
  ```
- **Response**: User data with JWT token.

---

#### 2. **Login User**
- **Method**: `POST`
- **Endpoint**: `/api/auth/login`
- **Body**:
  ```json
  {
    "email": "test@example.com",
    "password": "Password123"
  }
  ```
- **Response**: User data with JWT token.

---

#### 3. **Get User Profile**
- **Method**: `GET`
- **Endpoint**: `/api/auth/me`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response**: User data.

---

### Activities

#### Overview
To interact with activities, you must first create an activity. Once created, you can retrieve, update, or delete it using the provided endpoints.

---

#### Example Data for Creating an Activity
```json
{
  "date": "2025-05-10",
  "title": "Cricket Match",
  "description": "Exciting cricket match between local teams.",
  "location": "Sports Ground A",
  "time": "10:00 AM",
  "capacity": 100
}
```

---

#### Endpoints

1. **Get All Activities**
   - **Method**: `GET`
   - **Endpoint**: `/api/activities`
   - **Access**: Public
   - **Description**: Retrieves a list of all activities.
   - **Response**: List of activities.

---

2. **Create Activity**
   - **Method**: `POST`
   - **Endpoint**: `/api/activities/createActivity`
   - **Headers**: 
     - `Authorization: Bearer <token>`
   - **Body**:
     ```json
     {
       "title": "Cricket Match",
       "description": "Exciting cricket match between local teams.",
       "location": "Sports Ground A",
       "date": "2025-05-10",
       "time": "10:00 AM",
       "capacity": 100
     }
     ```
   - **Description**: Creates a new activity.
   - **Response**: Details of the created activity.

---

3. **Get Single Activity**
   - **Method**: `GET`
   - **Endpoint**: `/api/activities/:id`
   - **Access**: Public
   - **Description**: Retrieves details of a single activity by its ID.
   - **Response**: Activity details.

---

4. **Update Activity**
   - **Method**: `PUT`
   - **Endpoint**: `/api/activities/:id`
   - **Headers**: 
     - `Authorization: Bearer <token>`
   - **Body**: Fields to update (e.g., `title`, `description`, etc.)
     ```json
     {
       "title": "Updated Cricket Match",
       "description": "Updated description of the match."
     }
     ```
   - **Description**: Updates an existing activity.
   - **Response**: Updated activity details.

---

5. **Delete Activity**
   - **Method**: `DELETE`
   - **Endpoint**: `/api/activities/:id`
   - **Headers**: 
     - `Authorization: Bearer <token>`
   - **Description**: Deletes an activity by its ID.
   - **Response**: Success message.

---

### Bookings

1. **Create Booking**
   - **Method**: `POST`
   - **Endpoint**: `/api/bookings`
   - **Headers**: 
     - `Authorization: Bearer <token>`
   - **Body**:
     ```json
     {
       "activityId": "activity_id_here"
     }
     ```
   - **Response**: Booking details.

---

2. **Get User Bookings**
   - **Method**: `GET`
   - **Endpoint**: `/api/bookings/me`
   - **Headers**: 
     - `Authorization: Bearer <token>`
   - **Response**: All bookings for the authenticated user.

---

3. **Get Single Booking**
   - **Method**: `GET`
   - **Endpoint**: `/api/bookings/:id`
   - **Headers**: 
     - `Authorization: Bearer <token>`
   - **Response**: Single booking details.

---

4. **Update Booking Status**
   - **Method**: `PATCH`
   - **Endpoint**: `/api/bookings/:id`
   - **Headers**: 
     - `Authorization: Bearer <token>`
   - **Body**:
     ```json
     {
       "status": "confirmed"
     }
     ```
   - **Response**: Updated booking.

---

5. **Delete Booking**
   - **Method**: `DELETE`
   - **Endpoint**: `/api/bookings/:id`
   - **Headers**: 
     - `Authorization: Bearer <token>`
   - **Response**: Success message.

---

## Security

- Passwords are hashed using bcrypt.
- Authentication is handled via JWT tokens.
- Protected routes use auth middleware.
- Input validation is implemented with Zod.

---

## Testing Tips

- Use tools like **Postman** or **cURL** to test the API endpoints.
- Ensure you include the `Authorization` header with a valid JWT token for protected routes.
- Replace `:id` in the endpoints with the actual ID of the activity or booking you want to interact with.