# Booking Uni

### SoftUni - JS Back-end - Exam 2020

## Used in this project:

- Provided HTML & CSS resources 
- Express.js as a back-end framework
- MongoDB as a database with mongoose
- Express-handlebars as a template
- Bcrypt for hashing the password
- Application must start from file "index.js" on port 3000

## Start:
- download this repo
- npm install
- npm run start
- open http://localhost:3000
- enjoy

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

### User

- Email - string (required), unique,
- Username – string (required), unique,
- Password - string (required),
- Booked hotels - a collection of Hotels the user have booked already,
- Offered Hotels – a collection of Hotels the user offers

### Hotel

- Name - string (required), unique
- City - string (required),
- Image Url - string (required),
- Free Rooms – number (required), must be between 1 and 100,
- Users Booked a room - a collection of Users
- Owner – string (required)

## Application Pages

### Home Page(Logged Out User)

List the **hotels ordered by the count of free rooms** (free rooms are the rooms at the current time, not by hotel creation) in descending order.
If the user is NOT logged in by clicking on the hotels picture should be redirected to Login page.

![Home Page View](https://github.com/yveette/Booking-Uni/blob/main/readme_files/home_page.png)

If there are NO hotels in the database yet, display "There are no hotels found…"

![Home Page View](https://github.com/yveette/Booking-Uni/blob/main/readme_files/home_page_not_found.png)

### Register Page (Logged Out User)  

![Register Page View](https://github.com/yveette/Booking-Uni/blob/main/readme_files/register_page.png)

Register a user inside the database with email, username and password. Both passwords must match! After successful registration, you should redirect to Home page and the user should be already logged in.

### Login Page (Logged Out User)  

Login the user with email and password. After successful login, you should redirect to Home page.

![Login Page View](https://github.com/yveette/Booking-Uni/blob/main/readme_files/login_page.png)

### Add Hotel Page (Logged in User)

Navigation bar changed for logged in user.

Enter hotel name, city, image URL and free rooms. After the hotel is created successfully, you should redirect to Home page.

![Login Page View](https://github.com/yveette/Booking-Uni/blob/main/readme_files/create_page.png)

### Hotel Details Page
By clicking the picture of a hotel on Home page listed hotels, the user should see the Details page.


#### Not booked hotel (Logged in User)
If the user has no reservation for this hotel, you should display Book button (a-tag) and the user can book a room.
#### Booked Hotel (Logged in User)
After the user has booked a room, the "You already have booking" should be shown instead of the [Book] button.
#### Hotel Creator (Logged in User)
The creator of the hotel should see [Delete] [Edit]


### Edit Hotel (Logged in User)
All form fields should be filled with the corresponding information of the selected hotel. When a put request is sent (clicking over [Edit] button), you should be redirected to the Details page.


### Delete Hotel (Logged in User)
Upon deleting a lecture (clicking over [Delete] button), you should be redirected to the home page.


### Profile Page
Profile Page shows the information of the user as shown on the picture.
Reservations – is a string:  all the names of the booked from the user hotels separated by semi-colon.




## Validation and Error Handling
The application should notify the users about result of their actions.

### Login / Register
- The email should be a valid email and should consist english letters and digits
- The password should be at least 5 characters long and should consist only english letters and digits
- The repeat password should be equal to the password

### Hotel
- The name should be at least 4 characters
- The city should be at least 3 characters long
- The imageUrl should starts with http or https
- The number of free rooms should be between 1 and 100

## Security Requirements

The Security Requirements are mainly access requirements. Configurations about which users can access specific functionalities and pages.
- Guest (not logged in) users can access Home page.
- Guest (not logged in) users can access Login page and functionality.
- Guest (not logged in) users can access Register page and functionality.
- Users (logged in) can access Home page page and functionality.
- Users (logged in) can access Hotel Details page and functionality.
- Users (not hotel creator) can Book once a room for hotel.
- Users (hotel creator) can Edit and Delete the current hotel
- Users (logged in) can access Create Hotel page and functionality.
- Users (logged in) can access Logout functionality.