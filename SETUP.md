# Backend
## Installation

```bash
cd backend
npm install
```

## Setup Database

1. Create PostgreSQL database:
```bash
psql -U postgres
CREATE DATABASE ngo_db;
\c ngo_db
\i src/migrations/001_init_schema.sql
```

2. Configure `.env` file:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

## Run Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

---

# Frontend
## Installation

```bash
cd frontend
npm install
```

## Setup Environment

```bash
cp .env.example .env
```

## Run Development Server

```bash
npm start
```

The application will be available at `http://localhost:3000`

---

# API Endpoints

## Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

## Volunteers
- `GET /api/volunteers` - List all volunteers
- `POST /api/volunteers` - Create volunteer
- `GET /api/volunteers/:id` - Get volunteer details
- `PUT /api/volunteers/:id` - Update volunteer
- `DELETE /api/volunteers/:id` - Delete volunteer
- `POST /api/volunteers/:id/hours` - Log volunteer hours

## Donations
- `GET /api/donations` - List all donations
- `POST /api/donations` - Create donation
- `GET /api/donations/:id` - Get donation details
- `PUT /api/donations/:id` - Update donation
- `GET /api/donations/stats/total` - Get total donations
- `GET /api/donations/stats/category` - Get donations by category

## Beneficiaries
- `GET /api/beneficiaries` - List all beneficiaries
- `POST /api/beneficiaries` - Create beneficiary
- `GET /api/beneficiaries/:id` - Get beneficiary details
- `PUT /api/beneficiaries/:id` - Update beneficiary
- `POST /api/beneficiaries/:id/progress` - Record progress

## Events
- `GET /api/events` - List all events
- `POST /api/events` - Create event
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id` - Update event
- `POST /api/events/:id/volunteers/:volunteerId` - Assign volunteer
- `GET /api/events/:id/volunteers` - Get event volunteers

## Reports
- `GET /api/reports/dashboard/stats` - Get dashboard statistics
- `GET /api/reports/impact-report` - Generate impact report

## Communications
- `POST /api/communications/send` - Send notification/email

---

# Features

✅ **User Authentication** - Secure JWT-based authentication  
✅ **Volunteer Management** - Track volunteers, skills, and hours  
✅ **Donation Management** - Record and categorize donations  
✅ **Beneficiary Management** - Track youth participants  
✅ **Event Management** - Plan and manage events  
✅ **Reporting** - Generate impact reports and statistics  
✅ **Communications** - Send notifications and updates  
✅ **Dashboard** - Real-time insights and metrics  
✅ **Responsive Design** - Works on desktop and mobile  

---

# Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React.js, Tailwind CSS
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Email**: Nodemailer

---

# License

MIT License - See LICENSE file for details
