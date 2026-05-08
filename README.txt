# Bespoke Furniture Creations Management System

## Project Overview

This project is a web-based management system created for a fictional company called Bespoke Furniture Creations. The system was designed to help the company manage customer orders, manufacturing tasks, deliveries, and customer accounts more efficiently.

Before this project, the company relied mostly on spreadsheets and manual organisation to manage bespoke furniture orders. Customer information, manufacturing schedules, and delivery planning were all handled separately, which made the workflow harder to manage as more orders were added.

The aim of this project was to create one central system that could handle these tasks in a more organised way. Customers are able to browse products, place bespoke furniture orders, upload design files, create accounts, track their orders, and view their order history.

The system also includes features for staff and admin users. Staff members are able to manage orders, update order statuses, prioritise urgent orders, view analytics, manage manufacturing lists, and organise deliveries.

The project was developed using Django and SQLite. Other libraries such as Pillow and ReportLab were also used for image uploads and PDF exports.

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
- Access analytics charts
- View manufacturing lists
- Plan deliveries
- Export order data to CSV
- Generate PDF order summaries

---

# Technologies Used

| Technology | Purpose |
|---|---|
| Django | Backend framework |
| SQLite | Database |
| HTML/CSS | Frontend design |
| Chart.js | Analytics charts |
| Pillow | Image uploads |
| ReportLab | PDF exports |

---

# System Structure

The project follows Django’s Model-View-Template (MVT) structure.

- Models store database information.
- Views handle requests and application logic.
- Templates display information to users.

Django’s authentication system was also used to separate customer and staff/admin functionality.

---

# Installation & Setup

## 1. Download the Project

Download or extract the project folder.

Open the project folder inside Visual Studio Code or another Python IDE.

---

## 2. Create a Virtual Environment

Open a terminal inside the project folder and run:

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

## 4. Install Required Packages

Install the required packages using:

```bash
python -m pip install -r requirements.txt
```

This will install all libraries needed for the project, including Django, Pillow, and ReportLab.

---

## 5. Run Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 6. Run the Server

```bash
python manage.py runserver
```

Open the website in a browser:

```text
http://127.0.0.1:8000/
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
| Homepage | http://127.0.0.1:8000/ |
| Products | http://127.0.0.1:8000/products/ |
| Create Order | http://127.0.0.1:8000/create/ |
| Register | http://127.0.0.1:8000/register/ |
| Login | http://127.0.0.1:8000/login/ |
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

Staff and admin users can also:
- manage customer orders
- update statuses and priorities
- access analytics charts
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

# Challenges Faced During Development

One challenge during development was separating customer and staff functionality while keeping the interface simple and easy to use. This was solved using Django’s authentication system and conditional rendering inside templates.

Another challenge was handling image and file uploads correctly. This required configuring Django media settings and integrating the Pillow library.

Creating the analytics dashboard and export features also required additional testing and research, especially when integrating Chart.js and PDF generation into Django.

---

# Future Improvements

Possible future improvements include:
- route optimisation using maps APIs
- automated email notifications
- live delivery tracking
- mobile app support
- predictive delivery batching
- real-time dashboard updates

---

# Conclusion

Overall, the project successfully meets the main objectives outlined in the brief. The system improves how bespoke furniture orders are managed by replacing manual spreadsheet-based workflows with a centralised web application.

The project demonstrates the use of Django features such as authentication, database management, file uploads, analytics, exports, and role-based functionality. It also provides a strong base that could be expanded further in the future.