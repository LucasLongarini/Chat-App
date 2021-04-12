# Express Starter

This starter repo will be used for building applications using React, Material-UI, React-Router, Node, & Express.js.

## Getting started

The project is broken down into a client and server folder.

## Setting up Json Web Tokens
This project uses Json Web Tokens (JWT) for authentication.
1. Navigate to the server directory `cd server`
2. Create a `.env` file if one does not exist already
3. Add the variable `JWT_SECRET=<your secret>` to the `.env`

## Connecting to the Database locally
This project uses MongoDB. You can either run it locally, or connect to a remote database.
1. Navigate to the server directory `cd server`
2. Create a `.env` file if one does not exist already
3. Add the variable `DB_CONNECTION=<your connection string>` to the `.env`