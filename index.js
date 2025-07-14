const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_your_stripe_key_here'); // Replace with real key
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Stripe server running on port 3000');
});

