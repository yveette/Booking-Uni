# Booking Uni

## SoftUni - JS Back-end - Exam 2020

## Used:

- Provided HTML & CSS resources 
- Express.js as a back-end framework
- MongoDB as a database with mongoose
- Express-handlebars as a template
- Bcrypt for hashing the password
- Application must start from file "index.js" on port 3000

## Users:

* Users (Logged In)
    * Can access Home page page and functionality.
    * Can access Hotel Details page and functionality.
    * Can Book once a room for hotel. (if not hotel creator)
    * Can Edit and Delete the current hotel. (hotel creator)
    * Can access Create Hotel page and functionality.
    * Can access Logout functionality.

* Guest (Not Logged In)
    * Can access Home page.
    * Can access Login page and functionality.
    * Can access Register page and functionality.

## Database Models

# User

- Email - string (required), unique,
- Username – string (required), unique,
- Password - string (required),
- Booked hotels - a collection of Hotels the user have booked already,
- Offered Hotels – a collection of Hotels the user offers

# Hotel

- Name - string (required), unique
- City - string (required),
- Image Url - string (required),
- Free Rooms – number (required), must be between 1 and 100,
- Users Booked a room - a collection of Users
- Owner – string (required)

## Application Pages

# Home Page(Logged Out User)

List the **hotels ordered by the count of free rooms** (free rooms are the rooms at the current time, not by hotel creation) in descending order.
If the user is NOT logged in by clicking on the hotels picture should be redirected to Login page.

![Home Page](https://github.com/yveette/Booking-Uni/readme_files/home_page.png)

If there are NO hotels in the database yet, display "There are no hotels found…"

![Home Page](https://github.com/yveette/Booking-Uni/readme_files/home_page_not_found.png)

# Register Page (Logged Out User)  
