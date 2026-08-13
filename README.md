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
