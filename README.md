# NODE-PRODUCTS-API

## Description of the project

API for interacting with a mongodb Products database in order to perform CRUD operations.
In order to access the endpoints a user need to be registered and logged in the application.

## Endpoints
### PRODUCTS
| URL | method | description | URL params | Body params |
| --- | ----------- | ----------- | ---------- | ----------- |
|api/products | GET | Get all products | none | none |
|api/products/:id | GET | Get product with the given id | id | none |
|api/products | POST | Create a new product in the database | none | name: string, description: string, price: number |
|api/products/:id | PATCH | Update a product with the matching id | id | name: string, description: string, price: number |
|api/products/:id | DELETE | Delete product with the matching id | id | none |
### USER
| URL | method | description | URL params | Body params |
| --- | ----------- | ----------- | ---------- | ----------- |
|api/register| POST | Register a new user in the database | none | username: string, password: string |
|api/login | POST | Log into the system with a registered user | none | username: string, password: string |

## Running the project

* Clone this repo on github
* Go to the folder where the project was cloned
* In a terminal run the command: npm install   in order to install the depedencies for the project
* After running the npm install, you can run the command: npm start 

The project will be running on the port 3000

