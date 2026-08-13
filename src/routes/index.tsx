import { createFileRoute } from "@tanstack/react-router";
import ToonHubHero from "@/components/ToonHubHero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TOONHUB — Collectible Character Figurines" },
      {
        name: "description",
        content:
          "TOONHUB crafts premium 3D character figurines with flawless finishes. Browse the collection and order your favorite today.",
      },
      { property: "og:title", content: "TOONHUB — Collectible Character Figurines" },
      {
        property: "og:description",
        content:
          "Premium 3D character figurines with flawless finishes. Browse the TOONHUB collection.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <h1 className="sr-only">TOONHUB collectible character figurines</h1>
      <ToonHubHero />
    </main>
  );
}
