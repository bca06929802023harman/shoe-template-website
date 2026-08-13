import { createFileRoute } from "@tanstack/react-router";

const TEST_AMOUNT_PAISE = 100;
const RAZORPAY_API_URL = "https://api.razorpay.com/v1/orders";

export const Route = createFileRoute("/api/razorpay/order")({
  server: {
    handlers: {
      POST: async () => {
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!keyId || !keySecret) {
          return Response.json(
            { error: "Razorpay test keys are not configured on the server." },
            { status: 500 },
          );
        }

        const razorpayResponse = await fetch(RAZORPAY_API_URL, {
          method: "POST",
          headers: {
            Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: TEST_AMOUNT_PAISE,
            currency: "INR",
            receipt: `toonhub-test-${Date.now()}`,
            notes: {
              service: "Razorpay test service",
              purpose: "Payment gateway verification",
            },
          }),
        });

        const payload = await razorpayResponse.json();

        if (!razorpayResponse.ok) {
          console.error("Razorpay order creation failed", payload);
          return Response.json(
            { error: "Razorpay could not create the test order." },
            { status: razorpayResponse.status },
          );
        }

        return Response.json({
          keyId,
          orderId: payload.id,
          amount: payload.amount,
          currency: payload.currency,
        });
      },
    },
  },
});
