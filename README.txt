# Bespoke Furniture Creations Management System

## Project Overview

This project is a web-based management system created for a fictional company called Bespoke Furniture Creations. The system was designed to help the company manage customer orders, manufacturing tasks, deliveries, analytics, and customer accounts more efficiently.

Before this project was developed, the company relied heavily on spreadsheets and manual organisation to manage bespoke furniture orders. Customer information, manufacturing schedules, and delivery planning were handled separately, making the workflow inefficient and difficult to manage as order volumes increased.

The aim of this project was to create one centralised system that could handle these tasks in a more organised way. Customers are able to browse products, place bespoke furniture orders, upload design files, register accounts, track orders, and view their order history.

The system also includes features for staff and admin users. Staff members are able to manage orders, update statuses, prioritise urgent orders, view analytics, manage manufacturing lists, organise deliveries, and export operational data.

The project uses a React frontend connected to a Django REST API backend with SQLite as the database solution.

---

# Main Features

## Customer Features

- Browse furniture products
- View product details
- Submit bespoke furniture orders
- Upload design/sketch files
- Register customer accounts
- Login/logout system
- Track order progress
- View order history through profile pages

## Staff/Admin Features

- Manage customer orders
- Update order statuses
- Prioritise urgent orders
- Access analytics dashboards
- View manufacturing lists
- Plan deliveries
- Export order data to CSV
- Generate PDF order summaries

---

# Technologies Used

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Django REST Framework | Backend API |
| SQLite | Database |
| HTML/CSS | Styling and layout |
| Chart.js | Analytics charts |
| Pillow | Image uploads |
| ReportLab | PDF exports |

---

# System Structure

The project uses a React frontend connected to a Django REST API backend.

## React Frontend
The React frontend handles:
- page routing
- user interface
- forms
- customer/staff views
- analytics dashboards

## Django Backend
The Django backend handles:
- database models
- API endpoints
- authentication
- file uploads
- PDF/CSV exports
- admin panel functionality

The project also uses Django’s authentication system to separate customer and staff/admin functionality.

---

# Installation & Setup

## 1. Download the Project

Download or extract the project folder.

Open the project folder in Visual Studio Code or another IDE.

---

# Backend Setup (Django)

## 2. Create a Virtual Environment

Open a terminal inside the backend project folder and run:

```bash
python -m venv venv
```

---

## 3. Activate the Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

---

## 4. Install Python Dependencies

Install required backend packages:

```bash
python -m pip install -r requirements.txt
```

This installs:
- Django
- Django REST Framework
- Pillow
- ReportLab
- other required dependencies

---

## 5. Run Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 6. Start Django Backend Server

```bash
python manage.py runserver
```

Backend runs at:

```text
http://127.0.0.1:8000/
```

---

# Frontend Setup (React)

## 7. Open React Frontend Folder

Open a second terminal and move into the frontend folder:

```bash
cd frontend
```

---

## 8. Install React Dependencies

```bash
npm install
```

---

## 9. Start React Frontend

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173/
```

---

# Admin Login Details

A pre-configured admin account is included for testing purposes.

| Username | Password |
|---|---|
| amaan | password |

Admin panel:

```text
http://127.0.0.1:8000/admin/
```

---

# Important URLs

| Page | URL |
|---|---|
| React Frontend | http://localhost:5173/ |
| Django Backend API | http://127.0.0.1:8000/ |
| Admin Panel | http://127.0.0.1:8000/admin/ |

---

# User Roles

## Customers

Customers can:
- browse products
- create bespoke furniture orders
- upload design files
- register/login accounts
- track their orders
- access profile pages and order history

## Staff/Admin Users

Staff and admin users can additionally:
- manage customer orders
- update statuses and priorities
- access analytics dashboards
- manage manufacturing workflows
- organise deliveries
- export CSV and PDF reports

---

# Database Overview

The project mainly uses two database models.

## Furniture

Stores product information such as:
- product name
- description
- pricing
- product images

## CustomOrder

Stores customer order information such as:
- customer details
- dimensions
- materials
- requirements
- uploaded design files
- order statuses
- priorities

The project also uses Django’s built-in authentication system for customer and admin accounts.

---

# Analytics & Reporting

The system includes analytics dashboards for staff users.

Charts were added to help staff monitor:
- order statuses
- order activity over time

The project also includes:
- CSV export functionality
- PDF order summary generation

These features help reduce manual work and improve organisation.

---

# File Uploads

The system supports:
- product image uploads
- customer sketch/design uploads

Uploaded files are stored inside the `/media/` directory.

---