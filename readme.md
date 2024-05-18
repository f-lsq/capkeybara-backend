# Capkeybara (Backend)
[Capkeybara](#) is THE ultimate e-commerce platform for top-notch mechanical keyboard components that cater to all your needs! 

<p align="center">
  <img src="assets/images/readme/logo.webp" width="200" margin="auto">
</p>

Whether you're a seasoned keyboard enthusiast, a newbie exploring the world of mechanical keyboards, or simply on the hunt for a quick upgrade, we've got you covered! We are here guide you with expert advice to ensure you make the perfect choice every time you hit that "add to cart" button!

* [Frontend Repository](https://github.com/f-lsq/capkeybara-frontend) (ReactJS - useForm, Toastify, Styled Components)
* [Backend Repository](https://github.com/f-lsq/capkeybara-backend) (NodeJS - Express, Handlebars, Bookshelf ORM with knex, DB-migrate, Cloudinary, Stripe, and MySQL)

## Table of Contents
1. [System Design](#system-design)
2. [Functionalities](#functionalities)
2. [Technologies Used](#technologies-used)
3. [References](#references)

## System Design
### Entity Relationship Diagram
![Entity Relationship Diagram](assets/images/readme/erd.png)

### SQL Schema Diagram
The relational DB, MySQL, was chosen due the relationship between entities. The schema is as shown below.
![SQL Schema](assets/images/readme/schema.png)

Do note that the *password* field will be hashed using [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) before it is stored in the DB. 

The following has not been implemented 
* `Discounts` for products
* `2FA` for account signups forgot and update password (nodemailer)

### API Routes for Buyers
Base URL for buyers `http://<your-domain-name.com>/api/buyers`.
| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/` | GET | Get information of all buyers |   | Status 200 - returns data of all buyers <br>Status 500 - returns an error message |
| `/` | POST | Creates a new buyer <br> (Incomplete data) | { <br>&emsp;"username": string, <br>&emsp;"email": string, <br>&emsp;"password": string, <br>&emsp;"confirm_password": string <br> } | Status 200 - returns a message requesting for more signup details <br>Status 409 - returns an error message indicating that the buyer username and/or email already exist <br>Status 500 - returns an error message   |
| `/` | POST | Creates a new buyer <br> (Full data) | { <br>&emsp;"username": string, <br>&emsp;"email": string, <br>&emsp;"password": string, <br>&emsp;"confirm_password": string, <br>&emsp;"first_name": string, <br>&emsp;"last_name": string, <br>&emsp;"contact": string, <br>&emsp;"address": string <br> } | Status 201 - returns a success message and data of the new buyer created <br>Status 400 - returns an error message indicating an error during new account creation <br>Status 500 - returns an error message   |
| `/:buyerId` | GET | Get information of a buyer with ID *buyerId* |   | Status 200 - returns a success message and data of the found buyer <br> Status 400 - returns an error message indicating that the buyer is not found <br> Status 500 - returns an error message |
| `/profile` | POST | Get profile of an authenticated buyer | Valid access token retrieved from cookies  | Status 200 - returns payload of the authenticated buyer <br> Status 401 - returns an error message requiring buyers to login <br> Status 403 - returns an error message indicating an invalid access token <br> Status 500 - returns an error message |
| `/login` | POST | Verifies the login credential of a buyer | { <br>&emsp;"username": string, <br>&emsp;"password": string <br> }  | Status 201 - returns a success message <br> Status 401 - returns an error message indicating invalid login credentials <br>Status 500 - returns an error message |
| `/refresh` | POST | Refresh an expired access token using the refresh token | Valid refresh token retrieved from cookies  | Status 200 - returns a new access token <br> Status 401 - returns an error message indicating no refresh token found <br> Status 403 - returns an error message indicating an invalid refresh token <br> Status 500 - returns an error message |
| `/logout` | POST | Removes the access and refresh tokens from cookie, and blacklists refresh token when a buyer logs out | Valid refresh token retrieved from cookies  | Status 204 - no response <br> Status 401 - returns an error message indicating no refresh token found <br> Status 403 - returns an error message indicating an invalid refresh token <br> Status 500 - returns an error message |

Possible Improvement for Buyers API route
1. **Hashing password in the frontend before it is sent to the backend.** <br>Currently the new buyer data is sent over to the backend, with the *password* and *confirm-password* field being strings. This will be subject to [MITM attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack). A better alternative is to hash the passwords after the new buyer has submitted his/her datato prevent information from being stolen during transmission.
2. **Filtering the payload information for buyer profile before it is sent to the frontend.** <br> Upon successful decryption of buyer access token, the payload containing the id, email, first name, username and role of the buyer is returned. Additionally, the 'exp' and 'iat' of the payload is also returned. These information can be filtered out before sending back the data of the buyer to the frontend as they are crucial information for hackers who make use of the access tokens.

### API Routes for Sellers
Base URL for sellers `http://<your-domain-name.com>/api/sellers`.
| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/` | GET | Get information of all sellers |   | Status 200 - returns data of all sellers <br>Status 500 - returns an error message |
| `/` | POST | Creates a new seller <br> (Incomplete data) | { <br>&emsp;"username": string, <br>&emsp;"email": string, <br>&emsp;"password": string, <br>&emsp;"confirm_password": string <br> } | Status 200 - returns a message requesting for more signup details <br>Status 409 - returns an error message indicating that the seller username and/or email already exist <br>Status 500 - returns an error message   |
| `/` | POST | Creates a new seller <br> (Full data) | { <br>&emsp;"username": string, <br>&emsp;"email": string, <br>&emsp;"password": string, <br>&emsp;"confirm_password": string, <br>&emsp;"first_name": string, <br>&emsp;"last_name": string, <br>&emsp;"contact": string, <br>&emsp;"address": string <br> } | Status 201 - returns a success message and data of the new seller created <br>Status 400 - returns an error message indicating an error during new account creation <br>Status 500 - returns an error message   |
| `/:sellerId` | GET | Get information of a seller with ID *sellerId* |   | Status 200 - returns a success message and data of the found seller <br> Status 400 - returns an error message indicating that the seller is not found <br> Status 500 - returns an error message |
| `/profile` | POST | Get profile of an authenticated seller | Valid access token retrieved from cookies  | Status 200 - returns payload of the authenticated seller <br> Status 401 - returns an error message requiring sellers to login <br> Status 403 - returns an error message indicating an invalid access token <br> Status 500 - returns an error message |
| `/login` | POST | Verifies the login credential of a seller | { <br>&emsp;"username": string, <br>&emsp;"password": string <br> }  | Status 201 - returns a success message <br> Status 401 - returns an error message indicating invalid login credentials <br>Status 500 - returns an error message |
| `/refresh` | POST | Refresh an expired access token using the refresh token | Valid refresh token retrieved from cookies  | Status 200 - returns a new access token <br> Status 401 - returns an error message indicating no refresh token found <br> Status 403 - returns an error message indicating an invalid refresh token <br> Status 500 - returns an error message |
| `/logout` | POST | Removes the access and refresh tokens from cookie, and blacklists refresh token when a seller logs out | Valid refresh token retrieved from cookies  | Status 204 - no response <br> Status 401 - returns an error message indicating no refresh token found <br> Status 403 - returns an error message indicating an invalid refresh token <br> Status 500 - returns an error message |

Possible Improvement for Sellers API route are similar to that of [Buyers](#api-routes-for-buyers).

### API Routes for Products
Base URL for products `http://<your-domain-name.com>/api/products`.
| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/` | GET | Get information of all products |   | Status 200 - returns data of all products <br>Status 500 - returns an error message |
| `/categories` | GET | Get information of all product categories |   | Status 200 - returns data of all product categories <br>Status 500 - returns an error message |
| `/seller/:sellerId` | GET | Get all products of a seller with ID *sellerId* |   | Status 200 - returns data of all product categories <br>Status 500 - returns an error message |

### API Routes for Cart
Base URL for cart `http://<your-domain-name.com>/api/cart`.

### API Routes for Orders
Base URL for orders `http://<your-domain-name.com>/api/orders`.

### API Routes for Checkout
Base URL for checkout `http://<your-domain-name.com>/api/checkout`.


## Functionalities
### User Authentication

### Product Management

### Cart Item Management

### Order Creation and Status Management

### Payment Processing

## Technologies Used
### Frontend
* [ReactJS](https://react.dev/reference/react) - Route access restriction, navigation between pages, form control using useForm
* [Cloudinary](https://cloudinary.com/documentation/upload_widget) - Image upload widget for buyer and seller and product images

### Backend
* [NodeJS](https://nodejs.org/en) - Server environment. [ExpressJS](https://expressjs.com/), [Handlebars](https://handlebarsjs.com/) for admin page templating, [Sessions](https://expressjs.com/en/resources/middleware/session.html), JWT with bcrypt for Authentication, [Bookshelf ORM](https://bookshelfjs.org/) with knex, [Stripe](https://stripe.com/) for payment processing and [caolan form](https://github.com/caolan/forms) for form control.
* [MySQL](https://www.mysql.com/) - Database management, used in conjuntion with [db-migrate](https://db-migrate.readthedocs.io/en/latest/)

## References
* [Nadin, P. (2022 September 12). REST API Naming Conventions and Best Practices.](https://medium.com/@nadinCodeHat/rest-api-naming-conventions-and-best-practices-1c4e781eb6a5)

