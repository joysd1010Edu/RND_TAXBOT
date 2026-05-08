# PATTENS Tax Bot - Authentication System

## Overview

Complete authentication system implementation with login, forgot password, route guards, and context management.

## Project Structure

```
├── app/
│   ├── layout.tsx                    # Root layout with providers
│   ├── (Auth)/
│   │   ├── Login/page.tsx           # Login page route
│   │   └── Forgot/page.tsx          # Forgot password route
│   └── (Admin)/
│       └── Dashboard/page.tsx       # Protected dashboard
├── Components/
│   ├── Authentication/
│   │   ├── Login/Login.tsx          # Login form component
│   │   └── Forgot/ForgotPassword.tsx # Forgot password component
│   └── Providers/
│       ├── AuthProvider.tsx         # Authentication context
│       ├── AxiosProvider.tsx        # Axios instance with interceptors
│       └── RouteGuard.tsx           # Client-side route protection
├── Hooks/
│   ├── useAxios.tsx                 # Axios context setup
│   └── useAxiosInstance.tsx         # Hook to access axios
├── Type/
│   └── Authentication/
│       ├── Login.ts                 # Login type definitions
│       └── Forgot.ts                # Forgot password types
└── middleware.ts                    # Next.js middleware for auth

```

## Features Implemented

### 1. Authentication System

- ✅ Login form with React Hook Form validation
- ✅ Forgot password flow
- ✅ User state management with Context API
- ✅ Token-based authentication (ready for API integration)
- ✅ Remember me functionality
- ✅ Secure logout

### 2. Route Protection

- ✅ Middleware-based route protection
- ✅ Client-side route guards
- ✅ Automatic redirects for unauthorized access
- ✅ Public routes (Login, Forgot Password)
- ✅ Protected routes (Dashboard, etc.)

### 3. Axios Configuration

- ✅ Centralized axios instance
- ✅ Request interceptors for authentication
- ✅ Response interceptors for error handling
- ✅ Token refresh logic (ready for API)
- ✅ Background tab request optimization

### 4. UI/UX Features

- ✅ Fully responsive design
- ✅ Mobile-friendly layouts
- ✅ Form validation with error messages
- ✅ Loading states
- ✅ Password visibility toggle
- ✅ Clean and modern design

## Code Style

All code follows the specified comment format:

```typescript
/================ Comment Header ===========
// or
{/*========= Comment Header =========*/}
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Access the Application

- Login: http://localhost:3000/Login
- Forgot Password: http://localhost:3000/Forgot
- Dashboard: http://localhost:3000/Dashboard (requires authentication)

## Usage

### Authentication Context

```typescript
import { useAuth } from "@/Components/Providers/AuthProvider";

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  // Use authentication methods and state
};
```

### Axios Instance

```typescript
import { useAxios } from "@/Hooks/useAxiosInstance";

const MyComponent = () => {
  const axios = useAxios();

  // Make API calls with configured axios instance
  const fetchData = async () => {
    const response = await axios.get("/endpoint");
  };
};
```

## Authentication Flow

1. **Login Process**:

   - User submits credentials
   - AuthProvider validates (currently mock)
   - Token stored in localStorage/sessionStorage
   - Cookie set for middleware
   - Redirect to Dashboard

2. **Route Protection**:

   - Middleware checks cookie for server-side protection
   - RouteGuard checks auth state for client-side protection
   - Unauthorized users redirected to /Login
   - Authenticated users on public routes redirected to /Dashboard

3. **Logout Process**:
   - Clear all tokens from storage
   - Remove authentication cookie
   - Update auth state
   - Redirect to /Login

## Current Implementation Status

### ✅ Completed

- Login page with validation
- Forgot password page
- Dashboard with logout
- Authentication context
- Axios provider with interceptors
- Route guards (middleware + client-side)
- Type definitions
- Responsive design

### 🔄 Ready for API Integration

The system uses mock authentication currently. To integrate with a real API:

1. **Update AuthProvider login function** ([AuthProvider.tsx](Components/Providers/AuthProvider.tsx#L48-L81)):

   ```typescript
   const response = await axios.post("/auth/login", { email, password });
   const { accessToken, refreshToken, user } = response.data;
   // Store tokens and user data
   ```

2. **Update token refresh logic** in [AxiosProvider.tsx](Components/Providers/AxiosProvider.tsx#L125-L178)

3. **Add forgot password API call** in [ForgotPassword.tsx](Components/Authentication/Forgot/ForgotPassword.tsx#L23-L35)

## Type Definitions

### Login Types ([Login.ts](Type/Authentication/Login.ts))

- `loginFormValues`: Login form data
- `User`: User object structure
- `AuthState`: Authentication state
- `AuthContextType`: Auth context interface
- `LoginResponse`: API response structure

### Forgot Password Types ([Forgot.ts](Type/Authentication/Forgot.ts))

- `ForgotPasswordFormValues`: Form data
- `ResetPasswordFormValues`: Reset form data

## Security Features

- Password field with show/hide toggle
- Form validation for email and password
- Secure token storage
- HTTP-only cookie support (ready)
- Token refresh mechanism
- Automatic logout on token expiration
- Request cancellation for background tabs

## Next Steps

1. **API Integration**:

   - Replace mock login with real API calls
   - Implement token refresh endpoint
   - Add forgot password API endpoint

2. **Enhanced Security**:

   - Implement HTTP-only cookies (requires API support)
   - Add CSRF protection
   - Implement rate limiting

3. **Additional Features**:
   - Email verification
   - Two-factor authentication
   - Password strength indicator
   - Session management

## Dependencies

- **next**: ^16.0.10
- **react**: ^19.2.1
- **react-hook-form**: ^7.x
- **axios**: ^1.x
- **typescript**: ^5.x
- **tailwindcss**: ^4.x

## Notes

- All routes except `/Login` and `/Forgot` are protected
- Mock user is created with email prefix as name
- Tokens expire based on "Remember Me" selection
- Middleware and client-side guards work together for robust protection
- Clean, maintainable code following best practices
