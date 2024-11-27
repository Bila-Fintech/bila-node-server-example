require("dotenv").config(); // Load environment variables

const express = require("express");
const { GraphQLClient } = require("graphql-request");

const app = express();
const PORT = 4000;

// Load environment variables
const endpoint = process.env.API_URL; // Bila API endpoint
const headers = {
  "x-client-key": process.env.CLIENT_KEY, // Load client key from .env
  "x-client-secret": process.env.CLIENT_SECRET, // Load client secret from .env
};

// GraphQL client with authentication headers
const client = new GraphQLClient(endpoint, { headers });

app.use(express.json());

// Request Payment via Mobile
app.post("/request-payment-mobile", async (req, res) => {
  const { amount, msisdn, currency } = req.body;

  const query = `
    mutation RequestPaymentViaMobile($amount: Float!, $msisdn: String!, $currency: String!) {
      requestPaymentViaMobile(amount: $amount, msisdn: $msisdn, currency: $currency) {
        id
        transaction_id
        status
      }
    }
  `;

  const variables = { amount, msisdn, currency };

  try {
    const data = await client.request(query, variables);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Request Payment via Card
app.post("/request-payment-card", async (req, res) => {
  const { amount, card_number, card_cvv, card_expiration, currency } = req.body;

  const query = `
    mutation RequestPaymentViaCard($amount: Float!, $card_number: Float!, $card_cvv: String!, $card_expiration: String!, $currency: String!) {
      requestPaymentViaCard(amount: $amount, card_number: $card_number, card_cvv: $card_cvv, card_expiration: $card_expiration, currency: $currency) {
        id
        transaction_id
        status
      }
    }
  `;

  const variables = {
    amount,
    card_number,
    card_cvv,
    card_expiration,
    currency,
  };

  try {
    const data = await client.request(query, variables);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Disbursement via Mobile
app.post("/disbursement-mobile", async (req, res) => {
  const { amount, msisdn } = req.body;

  const query = `
    mutation DisbursementViaMobile($amount: Float!, $msisdn: String!) {
      disbursementViaMobile(amount: $amount, msisdn: $msisdn) {
        id
        transaction_id
        status
      }
    }
  `;

  const variables = { amount, msisdn };

  try {
    const data = await client.request(query, variables);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Transaction
app.post("/verify-transaction", async (req, res) => {
  const { transactionId } = req.body;

  const query = `
    query GetTransactionStatus($transactionId: String!) {
      getTransactionStatus(transactionId: $transactionId) {
        transactionId
        status
        amount
        currency
        createdAt
        updatedAt
        errorCode
        errorMessage
      }
    }
  `;

  const variables = { transactionId };

  try {
    const data = await client.request(query, variables);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Wallet Balance
app.post("/wallet-balance", async (req, res) => {
  const { walletId } = req.body;

  const query = `
    query WalletBalance($walletId: String!) {
      walletBalance(walletId: $walletId) {
        available_balance
        actual_balance
      }
    }
  `;

  const variables = { walletId };

  try {
    const data = await client.request(query, variables);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Wallet Transactions
app.post("/wallet-transactions", async (req, res) => {
  const { walletId, skip = 0, take = 50 } = req.body;

  const query = `
    query WalletTransactions($walletId: String!, $skip: Float!, $take: Float!) {
      walletTransactions(walletId: $walletId, skip: $skip, take: $take) {
        id
        amount
        transaction_id
        status
        form
        type
        currency
        created_at
        updated_at
      }
    }
  `;

  const variables = { walletId, skip, take };

  try {
    const data = await client.request(query, variables);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Welcome Route
app.get("/", (req, res) => {
  res.send("Welcome to Bila Node Server Example");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
