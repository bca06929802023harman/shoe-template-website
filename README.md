# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Razorpay ₹1 Test Service

The storefront includes a small **Razorpay test service** card below the bag summary. It creates a fixed ₹1 order (100 paise), opens Razorpay Standard Checkout, and verifies the returned payment signature and payment amount on the server.

Copy `.env.example` to `.env` for local development and add Razorpay **Test Mode** credentials from the Dashboard:

```sh
cp .env.example .env
```

Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` as server environment variables in the deployed environment. Do not put the secret in client-side variables or commit a real `.env` file. Use Razorpay Test Mode to avoid charging real money while checking the flow.

### Webhook setup

Set `RAZORPAY_WEBHOOK_SECRET` to the secret configured for the Razorpay webhook in the Dashboard. Point the Test Mode webhook URL to `/api/razorpay/webhook` and subscribe to `payment.captured` and `payment.failed`. The endpoint validates `X-Razorpay-Signature` against the raw request body, recognizes duplicate event IDs, and logs the payment details needed for follow-up processing.

After the browser-side payment signature and payment details are verified, the storefront opens a receipt modal showing the amount, payment ID, order ID, status, and verification time.

For this payment-gateway test, webhook handling acknowledges and logs the event details without creating an order database. The in-process event-ID cache prevents immediate duplicate processing; production fulfillment should persist webhook IDs and payment status in durable storage before performing business actions.
