import { createFileRoute } from "@tanstack/react-router";
import ToonHubHero from "@/components/ToonHubHero";
import ToonHubWebsite from "@/components/ToonHubWebsite";
import { ToonHubThemeProvider } from "@/components/ToonHubTheme";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TOONHUB Casuals — Easy miles, bright colors" },
      {
        name: "description",
        content: "Everyday sneakers built for easy miles. Explore the TOONHUB Casuals collection.",
      },
      { property: "og:title", content: "TOONHUB Casuals — Easy miles, bright colors" },
      { property: "og:description", content: "Everyday sneakers built for easy miles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ToonHubThemeProvider>
      <main>
        <h1 className="sr-only">TOONHUB Casuals everyday sneaker collection</h1>
        <ToonHubHero />
        <ToonHubWebsite />
      </main>
    </ToonHubThemeProvider>
  );
}
