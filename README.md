# Volunteer Management Mini System

A production-ready full-stack application for managing volunteers.

## Tech Stack
- **Frontend**: Next.js 14+ (App Router, TypeScript, Tailwind CSS, Lucide React)
- **Backend**: Laravel 10 (PHP, Sanctum for Auth)
- **Database**: MySQL (configured for SQLite as fallback in current environment)

## Features
- JWT-based authentication (Laravel Sanctum)
- Volunteer CRUD operations
- Server-side pagination, search, and filtering
- Dashboard with real-time stats
- Image upload with preview
- Status management (Active/Inactive)
- Responsive design for mobile and desktop

## Project Structure
- `backend/`: Laravel API application
- `frontend/`: Next.js frontend application

## Setup Instructions

### Backend (Laravel)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   composer install
   ```
3. Configure environment:
   ```bash
   cp .env.example .env
   # Update DB_DATABASE, DB_USERNAME, DB_PASSWORD in .env
   ```
4. Generate application key:
   ```bash
   php artisan key:generate
   ```
5. Run migrations and seeders:
   ```bash
   php artisan migrate --seed
   ```
6. Link storage:
   ```bash
   php artisan storage:link
   ```
7. Start the server:
   ```bash
   php artisan serve
   ```

### Frontend (Next.js)
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation
- `POST /api/login`: Authenticate and get token
- `POST /api/logout`: Revoke token (Protected)
- `GET /api/me`: Get current user info (Protected)
- `GET /api/volunteers`: List volunteers (Protected, Paginated)
- `POST /api/volunteers`: Create volunteer (Protected)
- `GET /api/volunteers/{id}`: Get volunteer details (Protected)
- `PUT /api/volunteers/{id}`: Update volunteer (Protected)
- `DELETE /api/volunteers/{id}`: Delete volunteer (Protected)
- `POST /api/volunteers/{id}/toggle-status`: Toggle activity status (Protected)
- `GET /api/volunteers/stats`: Get dashboard metrics (Protected)

## Credentials (after seeding)
- **Email**: `admin@example.com`
- **Password**: `password`
