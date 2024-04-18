# Shopping Router Generator

## Description
Using a combination of the SQL database and express, I present to you a shopping system for administrators to ensure they are able to keep track of the products prices.
By utilsing primary and foreign keys, we are able to tie multiple variables together and through using routers we were able to see whether or not these products were able to be passed through.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Usage](#usage)
- [Video-Walkthrough](#Youtube-Link)


## Technology Used
- Javascript
- Express
- MySQL Database
- Dotenv
- Insomnia


## User Story

```md
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

## Acceptance Criteria

```md
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete data in my database
```

## Usage
- Upon retrieving the data, you must create your own 'env' file in order for the sequelize database to work
- Your must also run the 'npm i' and 'npm run seed' commands.
- Once the above commands are completed, you are able to run the code through 'npm run start'
- By also opening up Insomnia, you are able to see the routes work.
- To get to the following routes, insert the down below into Insomnia:
    - Tag Route: /api/tags
    - Category Route: /api/categories
    - Product Route: /api/products

## Youtube-Link
- Video URL: https://www.youtube.com/watch?v=UlawYArAvrg
