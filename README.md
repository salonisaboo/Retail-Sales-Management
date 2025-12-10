# Retail Sales Management System

A full-stack Retail Sales Management System built using the MERN Stack (MongoDB, Express, React, Node.js). This project supports advanced Search, Multi-Select Filtering, Sorting, Pagination, and real-time Metrics as per the assignment requirements.

---

## Live Deployment

Frontend: https://retail-sales-management-gkwx.onrender.com
Backend API: https://retail-sales-management-backend-0d88.onrender.com
Database: MongoDB Atlas  

(Replace URLs after final deployment)

---

---

## Features Implemented

Search
- Customer Name
- Phone Number
- Case-insensitive
- Works with filters and sorting

Filters (Multi-Select)
- Customer Region
- Gender
- Age Range
- Product Category
- Tags
- Payment Method
- Date

All filters work:
- Independently
- In combination
- With pagination and sorting maintained

Sorting
- Customer Name (A–Z)
- Quantity
- Date (Newest First)

Pagination
- 10 records per page
- Next / Previous navigation
- Retains filter and search state

Dashboard Metrics
- Total Units Sold
- Total Amount
- Total Discount

---

## Tech Stack

Frontend:
- React (Vite)
- Axios
- CSS

Backend:
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Dotenv
- CORS

---

## Environment Variables

Backend .env file:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  

---

## Local Setup Guide

Clone the Repository

git clone https://github.com/salonisaboo/Retail-Sales-Management.git  
cd Retail-Sales-Management  

---

Backend Setup

cd backend  
npm install  
npm start  

Backend runs on:  
http://localhost:5000  

---

Frontend Setup

cd frontend  
npm install  
npm run dev  

Frontend runs on:  
http://localhost:5173  

---

## API Endpoint

GET /api/sales  

Query Parameters:
- search
- region
- gender
- category
- tags
- paymentMethod
- minAge
- maxAge
- startDate
- endDate
- sortBy
- page
- limit

---

## Deployment on Render

Backend:
- Service Type: Web Service
- Build Command:
  npm install
- Start Command:
  node index.js
- Add Environment Variables in Render Dashboard:
  - MONGO_URI
  - PORT

Frontend:
- Service Type: Static Site
- Build Command:
  npm install && npm run build
- Publish Directory:
  dist

---

## Edge Cases Handled

- No search results
- Conflicting filters
- Invalid age ranges
- Large filter combinations
- Missing optional fields

---

## Developer

Saloni Saboo  
GitHub: https://github.com/salonisaboo  

---

## License

This project is built for educational and evaluation purposes only.

---

## Status

Frontend Completed  
Backend Completed  
MongoDB Integrated  
Deployed on Render  
Assignment Requirements Fulfilled
