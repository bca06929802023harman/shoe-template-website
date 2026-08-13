import { createFileRoute } from "@tanstack/react-router";

const SUPPORTED_EVENTS = new Set(["payment.captured", "payment.failed"]);
const processedWebhookEventIds = new Set<string>();
const MAX_REMEMBERED_EVENT_IDS = 1000;

type RazorpayWebhookPayload = {
  event?: unknown;
  payload?: {
    payment?: {
      entity?: {
        id?: unknown;
        order_id?: unknown;
        amount?: unknown;
        currency?: unknown;
        status?: unknown;
        error_code?: unknown;
        error_description?: unknown;
        error_reason?: unknown;
      };
    };
  };
};

function bytesToHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function createWebhookSignature(rawBody: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  return bytesToHex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody)));
}

function signaturesMatch(expected: string, received: string) {
  if (expected.length !== received.length) return false;

  let difference = 0;
  for (let index = 0; index < expected.length; index += 1) {
    difference |= expected.charCodeAt(index) ^ received.charCodeAt(index);
  }
  return difference === 0;
}

function rememberEventId(eventId: string) {
  if (!eventId) return;
  processedWebhookEventIds.add(eventId);
  if (processedWebhookEventIds.size > MAX_REMEMBERED_EVENT_IDS) {
    const oldestEventId = processedWebhookEventIds.values().next().value;
    if (typeof oldestEventId === "string") processedWebhookEventIds.delete(oldestEventId);
  }
}

export const Route = createFileRoute("/api/razorpay/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (!webhookSecret) {
          return Response.json(
            { error: "Razorpay webhook secret is not configured on the server." },
            { status: 500 },
          );
        }

        const signature = request.headers.get("x-razorpay-signature");
        if (!signature) {
          return Response.json({ error: "Missing Razorpay webhook signature." }, { status: 400 });
        }

        const rawBody = await request.text();
        const expectedSignature = await createWebhookSignature(rawBody, webhookSecret);
        if (!signaturesMatch(expectedSignature, signature)) {
          return Response.json({ error: "Invalid Razorpay webhook signature." }, { status: 400 });
        }

        let payload: RazorpayWebhookPayload;
        try {
          payload = JSON.parse(rawBody) as RazorpayWebhookPayload;
        } catch {
          return Response.json({ error: "Invalid Razorpay webhook payload." }, { status: 400 });
        }

        const event = typeof payload.event === "string" ? payload.event : "";
        const eventId = request.headers.get("x-razorpay-event-id") ?? "";

        if (!SUPPORTED_EVENTS.has(event)) {
          return Response.json({ received: true, ignored: true, event });
        }

        if (eventId && processedWebhookEventIds.has(eventId)) {
          return Response.json({ received: true, duplicate: true, eventId });
        }

        const payment = payload.payload?.payment?.entity;
        const paymentDetails = {
          event,
          eventId: eventId || undefined,
          paymentId: typeof payment?.id === "string" ? payment.id : undefined,
          orderId: typeof payment?.order_id === "string" ? payment.order_id : undefined,
          amount: typeof payment?.amount === "number" ? payment.amount : undefined,
          currency: typeof payment?.currency === "string" ? payment.currency : undefined,
          status: typeof payment?.status === "string" ? payment.status : undefined,
          errorCode: typeof payment?.error_code === "string" ? payment.error_code : undefined,
          errorDescription:
            typeof payment?.error_description === "string" ? payment.error_description : undefined,
          errorReason: typeof payment?.error_reason === "string" ? payment.error_reason : undefined,
        };

        rememberEventId(eventId);
        console.info("Razorpay payment webhook received", paymentDetails);

        return Response.json({
          received: true,
          event,
          eventId: eventId || undefined,
        });
      },
    },
  },
});
