import { createFileRoute } from "@tanstack/react-router";

const TEST_AMOUNT_PAISE = 100;
const RAZORPAY_PAYMENTS_URL = "https://api.razorpay.com/v1/payments";

type VerificationPayload = {
  razorpayOrderId?: unknown;
  razorpayPaymentId?: unknown;
  razorpaySignature?: unknown;
  orderId?: unknown;
};

function bytesToHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function createSignature(orderId: string, paymentId: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  return bytesToHex(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${orderId}|${paymentId}`)),
  );
}

export const Route = createFileRoute("/api/razorpay/verify")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!keyId || !keySecret) {
          return Response.json(
            { error: "Razorpay test keys are not configured on the server." },
            { status: 500 },
          );
        }

        let body: VerificationPayload;
        try {
          body = (await request.json()) as VerificationPayload;
        } catch {
          return Response.json({ error: "Invalid verification payload." }, { status: 400 });
        }

        const razorpayOrderId =
          typeof body.razorpayOrderId === "string" ? body.razorpayOrderId : "";
        const razorpayPaymentId =
          typeof body.razorpayPaymentId === "string" ? body.razorpayPaymentId : "";
        const razorpaySignature =
          typeof body.razorpaySignature === "string" ? body.razorpaySignature : "";
        const orderId = typeof body.orderId === "string" ? body.orderId : "";

        if (
          !razorpayOrderId ||
          !razorpayPaymentId ||
          !razorpaySignature ||
          !orderId ||
          razorpayOrderId !== orderId
        ) {
          return Response.json(
            { error: "Incomplete or mismatched payment details." },
            { status: 400 },
          );
        }

        const expectedSignature = await createSignature(orderId, razorpayPaymentId, keySecret);
        if (expectedSignature !== razorpaySignature) {
          return Response.json(
            { error: "Payment signature verification failed." },
            { status: 400 },
          );
        }

        const paymentResponse = await fetch(
          `${RAZORPAY_PAYMENTS_URL}/${encodeURIComponent(razorpayPaymentId)}`,
          {
            headers: {
              Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}`,
            },
          },
        );
        const payment = await paymentResponse.json();

        if (
          !paymentResponse.ok ||
          payment.order_id !== orderId ||
          payment.amount !== TEST_AMOUNT_PAISE ||
          payment.currency !== "INR"
        ) {
          return Response.json(
            { error: "The Razorpay payment could not be validated." },
            { status: 400 },
          );
        }

        return Response.json({
          verified: true,
          paymentId: razorpayPaymentId,
          orderId,
          status: payment.status,
        });
      },
    },
  },
});
