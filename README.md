# Bila Node Server Example

This is a sample Node.js Express server that demonstrates how to integrate with the Bila payment gateway.

## Features

- Request payment via mobile
- Request payment via card
- Disbursement via mobile

## Prerequisites

- Node.js (v20 or higher)
- yarn (v1.22.22 or higher)

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/Bila-Fintech/bila-node-server-example.git
   ```

2. Navigate to the project directory:

   ```
   cd bila-node-server-example
   ```

3. Install dependencies:

   ```bash
   # Using yarn
   yarn install

   # Using npm
   npm install
   ```

## Running the Server

1. Start the server with Nodemon (for automatic restart on file changes):

   ```bash
   # Using yarn
   yarn dev

   # Using npm
   npm run dev
   ```

2. Or start the server normally:

   ```bash
   # Using yarn
   yarn start

   # Using npm
   npm start
   ```

3. The server will run on [http://localhost:4000](http://localhost:4000).

## API Endpoints

- **POST** `/request-payment-mobile`

  - Request payment via mobile money.
  - **Body**: `{ "amount": Float, "msisdn": String, "currency": String }`

- **POST** `/request-payment-card`

  - Request payment via card.
  - **Body**: `{ "amount": Float, "card_number": Float, "card_cvv": String, "card_expiration": String, "currency": String }`

- **POST** `/disbursement-mobile`
  - Disburse money via mobile money.
  - **Body**: `{ "amount": Float, "msisdn": String }`

## Dependencies

- **express**: Web framework for Node.js.
- **graphql-request**: A minimal GraphQL client.
- **graphql**: Required by graphql-request.

## License

This project is licensed under the MIT License.
