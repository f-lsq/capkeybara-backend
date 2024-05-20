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
Given the relationship between entities, a relational DB (in this case MySQL) would be more ideal to store the data. The schema is as shown below.
![SQL Schema](assets/images/readme/schema.png)

Do note that the *password* field will be hashed using [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) before it is stored in the DB. 

The following has not been implemented 
* `Discounts` for products
* `2FA` for account signups forgot and update password (nodemailer)

### API Routes for Buyers
Base URL for buyers `http://<domain-name.com>/api/buyers`.
| Endpoint | Method | Description | Request Body | Response | Authentication Response |
|----------|--------|-------------|--------------|----------|-------------------------|
| `/` | GET | Get information of all buyers |   | Status 200 - returns data of all buyers <br>Status 500 - returns an error message |   |
| `/` | POST | Creates a new buyer <br> (Incomplete data) | { <br>&emsp;"username": string, <br>&emsp;"email": string, <br>&emsp;"password": string, <br>&emsp;"confirm_password": string <br> } | Status 200 - returns a message requesting for more signup details <br>Status 409 - returns an error message indicating that the buyer username and/or email already exist <br>Status 500 - returns an error message |   |
| `/` | POST | Creates a new buyer <br> (Full data) | { <br>&emsp;"username": string, <br>&emsp;"email": string, <br>&emsp;"password": string, <br>&emsp;"confirm_password": string, <br>&emsp;"first_name": string, <br>&emsp;"last_name": string, <br>&emsp;"contact": string, <br>&emsp;"address": string <br> } | Status 201 - returns a success message and data of the new buyer created <br>Status 400 - returns an error message indicating an error during new account creation <br>Status 500 - returns an error message |   |
| `/:buyerId` | GET | Get information of a buyer with ID *buyerId* |   | Status 200 - returns a success message and data of the found buyer <br> Status 400 - returns an error message indicating that the buyer is not found <br> Status 500 - returns an error message |   |
| `/profile` | POST | Get profile of an authenticated buyer | Valid access token retrieved from cookies  | Status 200 - returns payload of the authenticated buyer <br> Status 500 - returns an error message | Status 401 - returns an error message requiring buyers to login <br> Status 403 - returns an error message indicating an invalid access token |
| `/login` | POST | Verifies the login credential of a buyer | { <br>&emsp;"username": string, <br>&emsp;"password": string <br> }  | Status 201 - returns a success message <br> Status 401 - returns an error message indicating invalid login credentials <br>Status 500 - returns an error message |   |
| `/refresh` | POST | Refresh an expired access token using the refresh token | Valid refresh token retrieved from cookies  | Status 200 - returns a new access token <br> Status 500 - returns an error message | Status 401 - returns an error message indicating no refresh token found <br> Status 403 - returns an error message indicating an invalid refresh token |
| `/logout` | POST | Removes the access and refresh tokens from cookie, and blacklists refresh token when a buyer logs out | Valid refresh token retrieved from cookies  | Status 204 - no response <br> Status 500 - returns an error message | Status 401 - returns an error message indicating no refresh token found <br> Status 403 - returns an error message indicating an invalid refresh token |

Potential Improvement for Buyers API route
1. **Hashing password in the frontend before it is sent to the backend.** <br>Currently the new buyer data is sent over to the backend, with the *password* and *confirm-password* field being strings. This will be subject to [MITM attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack). A better alternative is to hash the passwords after the new buyer has submitted his/her datato prevent information from being stolen during transmission.
2. **Filtering the payload information for buyer profile before it is sent to the frontend.** <br> Upon successful decryption of buyer access token, the payload containing the id, email, first name, username and role of the buyer is returned. Additionally, the 'exp' and 'iat' of the payload is also returned. These information can be filtered out before sending back the data of the buyer to the frontend as they are crucial information for hackers who make use of the access tokens.

### API Routes for Sellers
Base URL for sellers `http://<domain-name.com>/api/sellers`.
| Endpoint | Method | Description | Request Body | Response | Authentication Response |
|----------|--------|-------------|--------------|----------|-------------------------|
| `/` | GET | Get information of all sellers |   | Status 200 - returns data of all sellers <br>Status 500 - returns an error message |   |
| `/` | POST | Creates a new seller <br> (Incomplete data) | { <br>&emsp;"username": string, <br>&emsp;"email": string, <br>&emsp;"password": string, <br>&emsp;"confirm_password": string <br> } | Status 200 - returns a message requesting for more signup details <br>Status 409 - returns an error message indicating that the seller username and/or email already exist <br>Status 500 - returns an error message |   |
| `/` | POST | Creates a new seller <br> (Full data) | { <br>&emsp;"username": string, <br>&emsp;"email": string, <br>&emsp;"password": string, <br>&emsp;"confirm_password": string, <br>&emsp;"name": string, <br>&emsp;"contact": string, <br>&emsp;"image_url": string <br> } | Status 201 - returns a success message and data of the new seller created <br>Status 400 - returns an error message indicating an error during new account creation <br>Status 500 - returns an error message |   |
| `/:sellerId` | GET | Get information of a seller with ID *sellerId* |   | Status 200 - returns a success message and data of the found seller <br> Status 400 - returns an error message indicating that the seller is not found <br> Status 500 - returns an error message |
| `/profile` | POST | Get profile of an authenticated seller | Valid access token retrieved from cookies  | Status 200 - returns payload of the authenticated seller <br> Status 500 - returns an error message | Status 401 - returns an error message requiring sellers to login <br> Status 403 - returns an error message indicating an invalid access token |
| `/login` | POST | Verifies the login credential of a seller | { <br>&emsp;"username": string, <br>&emsp;"password": string <br> }  | Status 201 - returns a success message <br> Status 401 - returns an error message indicating invalid login credentials <br>Status 500 - returns an error message |   |
| `/refresh` | POST | Refresh an expired access token using the refresh token | Valid refresh token retrieved from cookies  | Status 200 - returns a new access token <br> Status 500 - returns an error message | Status 401 - returns an error message indicating no refresh token found <br> Status 403 - returns an error message indicating an invalid refresh token |
| `/logout` | POST | Removes the access and refresh tokens from cookie, and blacklists refresh token when a seller logs out | Valid refresh token retrieved from cookies  | Status 204 - no response <br> Status 500 - returns an error message | Status 401 - returns an error message indicating no refresh token found <br> Status 403 - returns an error message indicating an invalid refresh token |

Potential Improvement for Sellers API route are similar to that of [Buyers](#api-routes-for-buyers).
1. There should also be a **validity check done on the sellers** (possibly using the vendor's UEN), before allowing them to list their products on the website. An additional column can be added to the 'sellers' table in the database to store this information.

### API Routes for Products
Base URL for products `http://<domain-name.com>/api/products`.
| Endpoint | Method | Description | Request Body | Response | Authentication Response |
|----------|--------|-------------|--------------|----------|-------------------------|
| `/` | GET | Get information of all products |   | Status 200 - returns data of all products <br>Status 500 - returns an error message |   |
| `/categories` | GET | Get information of all product categories |   | Status 200 - returns data of all product categories <br>Status 500 - returns an error message |   |
| `/seller/:sellerId` | GET | Get all products of a seller with ID *sellerId* |  | Status 200 - returns a success message and data of all products of the specified seller <br> Status 404 - returns an error message indicating that the specified seller does not exist <br> Status 500 - returns an error message |   |
| `/` | POST | Creates a new product | { <br>&emsp;"name": string, <br>&emsp;"description": string, <br>&emsp;"price": float, <br>&emsp;"cost": float, <br>&emsp;"quantity_available": integer, <br>&emsp;"image_url": string, <br>&emsp;"category_id": integer, <br>&emsp;"seller_id": integer <br> } | Status 200 - returns a success message indicating that the new product has been created <br> Status 400 - returns an error message indicating any missing required fields <br> Status 500 - returns an error message | Status 401 - returns an error message requiring sellers to login <br> Status 403 - returns an error message indicating an invalid access token |
| `/:productId` | GET | Get information of product with ID *productId* |  | Status 200 - returns a success message and data of the specified product <br> Status 404 - returns an error message indicating that the specified product does not exist <br> Status 500 - returns an error message |   |
| `/:productId` | PUT | Updates an existing product with ID *productId* | { <br>&emsp;"name": string, <br>&emsp;"description": string, <br>&emsp;"price": float, <br>&emsp;"cost": float, <br>&emsp;"quantity_available": integer, <br>&emsp;"image_url": string, <br>&emsp;"category_id": integer, <br>&emsp;"seller_id": integer <br> } | Status 200 - returns a success message and the data of the product that was updated <br> Status 400 - returns an error message indicating any missing or invalid fields <br> Status 404 - returns an error message indicating that the specified product does not exist <br> Status 500 - returns an error message | Status 401 - returns an error message requiring sellers to login <br> Status 403 - returns an error message indicating an invalid access token |
| `/:productId` | DELETE | Deletes an existing product with ID *productId* |   | Status 200 - returns a success message and the data of the product that was deleted <br> Status 404 - returns an error message indicating that the specified product does not exist <br> Status 500 - returns an error message | Status 401 - returns an error message requiring sellers to login <br> Status 403 - returns an error message indicating an invalid access token |

Potential Improvement for Products API route 
1. **Role specification.** <br> Currently, any users with a valid access token can perform CRUD operations on the products. Role specification can be added to allow only users with 'seller' and 'admin' roles (and valid access tokens) to manage the products.

### API Routes for Cart
Base URL for cart `http://<domain-name.com>/api/cart`.
| Endpoint | Method | Description | Request Body | Response | Authentication Response |
|----------|--------|-------------|--------------|----------|-------------------------|
| `/:buyerId` | GET | Retrieves the cart items of buyer with ID *buyerId* |   | Status 200 - returns a success message and the data of the cart items of the specified buyer <br> Status 403 - returns an error message indicating that the specified buyer cannot view another buyer's cart <br> Status 500 - returns an error message | Status 401 - returns an error message requiring buyers to login <br> Status 403 - returns an error message indicating an invalid access token |
| `/:buyerId` | POST | Add or increase the quantity by 1 of a cart item for buyer with ID *buyerId* | { <br>&emsp;"product_id": int <br> } | Status 200 - returns a success message and the data of the cart item added <br> Status 400 - returns an error message indicating that the quantity to be added exceeded the quantity available <br> Status 403 - returns an error message indicating that the specified buyer cannot view another buyer's cart <br> Status 404 - returns an error message indicating that the specified product does not exist <br> Status 500 - returns an error message | Status 401 - returns an error message requiring buyers to login <br> Status 403 - returns an error message indicating an invalid access token |
| `/remove/:buyerId` | POST | Reduce the quantity of a cart item by 1 for buyer with ID *buyerId* | { <br>&emsp;"product_id": int <br> } | Status 200 - returns a success message and the data of the cart item reduced <br> Status 400 - returns an error message indicating that the cart item do not exist or quantity cannot be negative <br> Status 403 - returns an error message indicating that the specified buyer cannot view another buyer's cart <br> Status 404 - returns an error message indicating that the specified product does not exist <br> Status 500 - returns an error message | Status 401 - returns an error message requiring buyers to login <br> Status 403 - returns an error message indicating an invalid access token |
| `/:buyerId` | PUT | Add or increase the quantity of a cart item for buyer with ID *buyerId* | { <br>&emsp;"product_id": int <br>&emsp;"new_quantity": int <br> } | Status 200 - returns a success message and the data of the cart item updated <br> Status 400 - returns an error message indicating that the quantity to be added exceeded the quantity available <br> Status 403 - returns an error message indicating that the specified buyer cannot view another buyer's cart <br> Status 404 - returns an error message indicating that the specified product does not exist <br> Status 500 - returns an error message | Status 401 - returns an error message requiring buyers to login <br> Status 403 - returns an error message indicating an invalid access token |
| `/:buyerId` | DELETE | Remove a cart item entirely for buyer with ID *buyerId* | { <br>&emsp;"product_id": int <br> } | Status 200 - returns a success message and the data of the cart item removed <br> Status 400 - returns an error message indicating that the cart item was not removed <br> Status 403 - returns an error message indicating that the specified buyer cannot view another buyer's cart <br> Status 404 - returns an error message indicating that the specified product does not exist <br> Status 500 - returns an error message | Status 401 - returns an error message requiring buyers to login <br> Status 403 - returns an error message indicating an invalid access token |

Potential Improvement for Cart API route 
1. **Role specification.** <br> Currently, any users with a valid access token can perform CRUD operations on the cart items. Role specification can be added to allow only users with 'buyer' and 'admin' roles (and valid access tokens) to manage their cart items.
2. **More specific error validation.** <br> The error that returns status 400 is does not take into other instances where, for example, users enter data of inapproperiate datatype.

### API Routes for Orders
Base URL for orders `http://<domain-name.com>/api/orders`.
| Endpoint | Method | Description | Request Body | Response | Authentication Response |
|----------|--------|-------------|--------------|----------|-------------------------|
| `/:buyerId` | GET | Retrieves all orders of buyer with ID *buyerId* |   | Status 200 - returns a success message and the data of the orders of the specified buyer <br> Status 404 - returns an error message indicating that the specified product does not exist <br> Status 500 - returns an error message | Status 401 - returns an error message requiring buyers to login <br> Status 403 - returns an error message indicating an invalid access token |
| `/seller/:sellerId` | GET | Retrieves all orders of seller with ID *sellerId* |   | Status 200 - returns a success message and the data of the orders of the specified seller <br> Status 403 - returns an error message indicating that the specified seller cannot view another seller's orders <br> Status 500 - returns an error message | Status 401 - returns an error message requiring buyers to login <br> Status 403 - returns an error message indicating an invalid access token |
| `/:buyerId` | POST | Creates a new order for buyer with *buyerId* based on his/her cart items |   | Status 200 - returns a success message and the data of the order created for the specified buyer <br> Status 500 - returns an error message | Status 401 - returns an error message requiring buyers to login <br> Status 403 - returns an error message indicating an invalid access token |
| `/:orderId` | PUT | Updates the order status of order with ID *orderId* | { <br>&emsp;"order_status": string <br> } | Status 200 - returns a success message and the data of the updated order <br> Status 400 - returns an error message indicating that the specified order was not updated <br> Status 404 - returns an error message indicating that the specified order does not exist <br> Status 500 - returns an error message | Status 401 - returns an error message requiring buyers to login <br> Status 403 - returns an error message indicating an invalid access token |

Potential Improvement for Order API route 
1. **Segregation of order status based on sellers.** <br> Since a order can consist of many products from different sellers, the order status for a order should be separated for each seller. Currently, the order status will update across all sellers with the same order, instead, the order status could be updated from 'Unfulfilled' to 'Completed' after all sellers have updated the status of the order to 'Delivered'.

### API Routes for Checkout
Base URL for checkout `http://<domain-name.com>/api/checkout`.

| Endpoint | Method | Description | Request Body | Response | Authentication Response |
|----------|--------|-------------|--------------|----------|-------------------------|
| `/:userId` | GET | Retrieves the Stripe session ID for payment processing for user with ID *userId* | { <br>&emsp;"user_id": <br>&emsp; [{ "product": { "id": "productId", <br>&emsp; "name": "productName", "cost": 10 }, "quantity": 2 }] <br>&emsp;"new_quantity": int <br> }| Status 200 - returns a success message and the data of the cart items of the specified buyer <br> Status 403 - returns an error message indicating that the specified buyer cannot view another buyer's cart <br> Status 500 - returns an error message | Status 401 - returns an error message requiring buyers to login <br> Status 403 - returns an error message indicating an invalid access token |


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

