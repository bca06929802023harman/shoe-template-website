import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import shoe1 from "@/assets/shoe-1.png";
import shoe2 from "@/assets/shoe-2.png";
import shoe3 from "@/assets/shoe-3.png";
import shoe4 from "@/assets/shoe-4.png";

const IMAGES = [
  { src: shoe1, alt: "White leather low-top sneaker with orange heel", bg: "#F4845F", panel: "#F79B7F" },
  { src: shoe2, alt: "Green canvas skate sneaker with cream sole", bg: "#6BBF7A", panel: "#85CC92" },
  { src: shoe3, alt: "Pink suede runner with chunky white sole", bg: "#E882B4", panel: "#ED9DC4" },
  { src: shoe4, alt: "Light blue knit slip-on sneaker", bg: "#6EB5FF", panel: "#8DC4FF" },
];


const EASE = "cubic-bezier(0.4,0,0.2,1)";
const DURATION = 650;

const GRAIN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="200" height="200" filter="url(#n)" opacity="0.08"/></svg>`,
  );

type Role = "center" | "left" | "right" | "back";

export default function ToonHubHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navigate = useCallback(
    (dir: "next" | "prev") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) => (dir === "next" ? (prev + 1) % 4 : (prev + 3) % 4));
      window.setTimeout(() => setIsAnimating(false), DURATION);
    },
    [isAnimating],
  );

  const roleFor = (index: number): Role => {
    if (index === activeIndex) return "center";
    if (index === (activeIndex + 3) % 4) return "left";
    if (index === (activeIndex + 1) % 4) return "right";
    return "back";
  };

  const styleFor = (role: Role): React.CSSProperties => {
    switch (role) {
      case "center":
        return {
          transform: `translateX(-50%) scale(${isMobile ? 1.05 : 1.2})`,
          filter: "blur(0px)",
          opacity: 1,
          zIndex: 20,
          left: "50%",
          height: isMobile ? "42%" : "62%",
          bottom: isMobile ? "24%" : "6%",
        };
      case "left":
        return {
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? "20%" : "30%",
          height: isMobile ? "16%" : "28%",
          bottom: isMobile ? "32%" : "12%",
        };
      case "right":
        return {
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? "80%" : "70%",
          height: isMobile ? "16%" : "28%",
          bottom: isMobile ? "32%" : "12%",
        };
      case "back":
      default:
        return {
          transform: "translateX(-50%) scale(1)",
          filter: "blur(4px)",
          opacity: 1,
          zIndex: 5,
          left: "50%",
          height: isMobile ? "13%" : "22%",
          bottom: isMobile ? "32%" : "12%",
        };
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: IMAGES[activeIndex]?.bg,
        transition: `background-color ${DURATION}ms ${EASE}`,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div className="relative w-full" style={{ height: "100vh", overflow: "hidden" }}>
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            backgroundImage: `url("${GRAIN}")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
            opacity: 0.4,
          }}
        />

        {/* Ghost text */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{ zIndex: 2, top: "18%" }}
        >
          <span
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(90px, 28vw, 380px)",
              fontWeight: 900,
              color: "#ffffff",
              opacity: 1,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            Step Out
          </span>
        </div>

        {/* Brand */}
        <div
          className="absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase"
          style={{ zIndex: 60, color: "#ffffff", opacity: 0.9, letterSpacing: "0.18em" }}
        >
          TOONHUB
        </div>

        {/* Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((item, index) => (
            <div
              key={item.src}
              style={{
                position: "absolute",
                aspectRatio: "1 / 1",
                transition: `transform ${DURATION}ms ${EASE}, filter ${DURATION}ms ${EASE}, opacity ${DURATION}ms ${EASE}, left ${DURATION}ms ${EASE}, height ${DURATION}ms ${EASE}, bottom ${DURATION}ms ${EASE}`,
                willChange: "transform, filter, opacity",
                ...styleFor(roleFor(index)),
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "bottom center",
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom left */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: 320 }}
        >
          <h2
            className="font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px]"
            style={{ color: "#ffffff", opacity: 0.95, letterSpacing: "0.02em" }}
          >
            TOONHUB CASUALS
          </h2>
          <p
            className="hidden sm:block text-xs sm:text-sm mb-4 sm:mb-5"
            style={{ color: "#ffffff", opacity: 0.85, lineHeight: 1.6 }}
          >
            Everyday sneakers built for easy miles. Soft cushioned soles, breathable uppers and
            colors that go with everything. Free shipping, easy returns. Order now.
          </p>

          <div className="flex items-center gap-3">
            {[
              { label: "Previous", Icon: ArrowLeft, dir: "prev" as const },
              { label: "Next", Icon: ArrowRight, dir: "next" as const },
            ].map(({ label, Icon, dir }) => (
              <button
                key={dir}
                type="button"
                aria-label={label}
                onClick={() => navigate(dir)}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid #ffffff",
                  color: "#ffffff",
                  transition: "transform 150ms, background-color 150ms",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.08)";
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <Icon size={26} strokeWidth={2.25} />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom right */}
        <div className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10" style={{ zIndex: 60 }}>
          <a
            href="#"
            className="flex items-center gap-2"
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "clamp(20px, 4vw, 56px)",
              fontWeight: 400,
              color: "#ffffff",
              opacity: 0.95,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "opacity 200ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.95")}
          >
            Discover it
            <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
          </a>
        </div>
      </div>
    </div>
  );
}
