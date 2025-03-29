# EmployWise User Management 

A React application that integrates with the Reqres API to perform basic user management functions including authentication, listing users, and CRUD operations.

## Features

- **Authentication**: Login functionality with token-based authentication
- **User Management**: View, edit, and delete users
- **Pagination**: Navigate through pages of users
- **Responsive Design**: Works well on both desktop and mobile devices
- **Error Handling**: Graceful handling of API errors with user-friendly messages
- **Form Validation**: Input validation for login and user edit forms
- **Route Protection**: Authenticated routes with redirection

## Demo

You can access the live demo of the application at: [Live Link](https://employ-wise-chi.vercel.app/)

## Technologies Used

- **React**: Frontend library for building user interfaces
- **React Router**: For navigation between different pages
- **Axios**: For making HTTP requests to the Reqres API
- **Redux**: For state management
- **React Hook Form**: For form handling and validation
- **Tailwind CSS**: For styling and responsive design
- **React Toastify**: For displaying notifications

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/Pritthish20/EmployWise.git
   cd EmployWise
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## API Integration

This application integrates with the Reqres API (https://reqres.in/) for user management:
- **Authentication**: POST /api/login
- **List Users**: GET /api/users?page={page_number}
- **Edit User**: PUT /api/users/{id}
- **Delete User**: DELETE /api/users/{id}

## Usage Instructions

1. **Login**:
   - Use the provided credentials:
   - Email: eve.holt@reqres.in
   - Password: cityslicka

2. **User List**:
   - View all users in a card format
   - Navigate through pages using pagination controls
   - Search users by name or email
   - Click on "Edit" or "Delete" buttons for respective actions

3. **Edit User**:
   - Update user's first name, last name, and email
   - Click "Save" to update the user details
   - Click "Cancel" to return to the user list without making changes

## Implementation Details

### Authentication
- Token-based authentication using the Reqres API
- Token stored in localStorage for persistence
- Protected routes redirect to login page if token is missing

### User Management
- Paginated list of users with card-based UI
- CRUD operations integrated with the API
- Optimistic UI updates for better user experience

### Error Handling
- Form validation for required fields and email format
- API error handling with user-friendly messages
- Loading states for better UX during API calls

## Assumptions and Considerations

1. The Reqres API is a mock API, so real updates are not persisted between sessions
2. The API doesn't support filtering, so search functionality is implemented client-side
3. Token expiration is not handled as the mock API doesn't include expiration information

