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
2. [Technologies Used](#technologies-used)
3. [References](#references)

## System Design
### Entity Relationship Diagram
![Entity Relationship Diagram](assets/images/readme/erd.png)

### SQL Schema Diagram
![SQL Schema](assets/images/readme/schema.png)
Note that the following has not been implemented: 
* `Discounts` for products
* `2FA` for account signups forgot and update password

### API Routes
| Method/Path                         | Request Body / Parameters  | Response                           | 
| -----------------------------------| -------------------------- | ---------------------------------- | 
| GET /products                      |                            | On success,... <br/>On failure,... | 
| POST /products/add/:productId      | {<br/>"name": string, <br/> "description": string,<br/> etc <br/>}                           | On success,... <br/>On failure,... | 
| PUT /products/edit/:productId      |                            | On success,... <br/>On failure,... | 
| DELETE /products/delete/:productId |                            | On success,... <br/>On failure,... | 

## Technologies Used

### Frontend
* [ReactJS](https://react.dev/reference/react) - Route access restriction, navigation between pages, form control using useForm
* [Cloudinary](https://cloudinary.com/documentation/upload_widget) - Image upload widget for buyer and seller and product images

### Backend
* [NodeJS](https://nodejs.org/en) - Server environment. [ExpressJS](https://expressjs.com/), [Handlebars](https://handlebarsjs.com/) for admin page templating, [Sessions](https://expressjs.com/en/resources/middleware/session.html), JWT with bcrypt for Authentication, [Bookshelf ORM](https://bookshelfjs.org/) with knex, [Stripe](https://stripe.com/) for payment processing and [caolan form](https://github.com/caolan/forms) for form control.
* [MySQL](https://www.mysql.com/) - Database management, used in conjuntion with [db-migrate](https://db-migrate.readthedocs.io/en/latest/)

## References
* [Nadin, P. (2022 September 12). REST API Naming Conventions and Best Practices.](https://medium.com/@nadinCodeHat/rest-api-naming-conventions-and-best-practices-1c4e781eb6a5)

