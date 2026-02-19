# Deployment Guide: Vercel

This guide helps you deploy the Next.js Frontend and Laravel Backend monorepo to Vercel.

## 1. Prerequisites

- **Vercel CLI**:
  - Option A: Install globally: `npm i -g vercel`
  - Option B: Use with npx: `npx vercel` (recommended for one-off commands)
- **Remote Database**: You **MUST** have a remote MySQL database (e.g., Railway, Aiven, AWS RDS, PlanetScale). Vercel does not provide a database.

## 2. Environment Variables

You must set these environment variables in your Vercel Project Settings (Settings > Environment Variables).

### Backend (Laravel)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `APP_Key` | Your Laravel App Key | `base64:...` (Copy from your local .env) |
| `DB_CONNECTION` | Database connection type | `mysql` |
| `DB_HOST` | Database Host URL | `containers-us-west-1.railway.app` |
| `DB_PORT` | Database Port | `3306` |
| `DB_DATABASE` | Database Name | `volunteer_system` |
| `DB_USERNAME` | Database User | `root` |
| `DB_PASSWORD` | Database Password | `secret` |
| `ALLOW_URL_OPEN` | Allow external URL fopen | `true` |

### Frontend (Next.js)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | URL to your backend API | `https://your-vercel-project.vercel.app/api` |

## 3. Deploying

Run the following command in the root directory:

```bash
vercel deploy
```

Follow the prompts:
1.  Set up and deploy? **Y**
2.  Which scope? (Select your user/team)
3.  Link to existing project? **N** (or Y if you already created one)
4.  Project Name? `volunteer-system` (or your preference)
5.  In which directory is your code located? `./`
6.  Want to modify these settings? **N**

## 4. Post-Deployment

1.  **Run Migrations**: Vercel does not run migrations automatically. You should connect to your remote database from your local machine (update local `.env` with remote DB credentials temporarily) and run:
    ```bash
    cd backend
    php artisan migrate
    ```
    *Alternatively, you can add a route in Laravel to run migrations programmatically, but local CLI is safer.*

2.  **Verify**: Open your deployed URL.
