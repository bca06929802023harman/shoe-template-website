import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Heart,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  X,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

import shoe1 from "@/assets/shoe-1.png";
import shoe2 from "@/assets/shoe-2.png";
import shoe3 from "@/assets/shoe-3.png";
import shoe4 from "@/assets/shoe-4.png";
import { TOONHUB_THEMES, useToonHubTheme } from "@/components/ToonHubTheme";
import ToonHubParallax from "@/components/ToonHubParallax";
import ToonHubCustomizer from "@/components/ToonHubCustomizer";

type Sneaker = {
  id: string;
  number: string;
  name: string;
  category: string;
  price: number;
  src: string;
  alt: string;
  color: string;
  soft: string;
  copy: string;
};

const SNEAKERS: Sneaker[] = [
  {
    id: "sunset",
    number: "01",
    name: "Sunset Low",
    category: "Everyday leather",
    price: 118,
    src: shoe1,
    alt: "White sneaker with an orange heel",
    color: "#F4845F",
    soft: "#FDE2D7",
    copy: "Soft leather, a warm hit of color, and an easy sole for every plan that runs late.",
  },
  {
    id: "meadow",
    number: "02",
    name: "Meadow Court",
    category: "Canvas skate",
    price: 112,
    src: shoe2,
    alt: "Green canvas sneaker with a cream sole",
    color: "#6BBF7A",
    soft: "#DCF2E0",
    copy: "A bright canvas classic with a durable gum edge and a relaxed, all-day feel.",
  },
  {
    id: "petal",
    number: "03",
    name: "Petal Pace",
    category: "Cushion runner",
    price: 128,
    src: shoe3,
    alt: "Pink runner with a chunky white sole",
    color: "#E882B4",
    soft: "#FBE0EE",
    copy: "A little lift in every step. Responsive cushioning with unapologetically soft color.",
  },
  {
    id: "sky",
    number: "04",
    name: "Sky Slip",
    category: "Knit slip-on",
    price: 104,
    src: shoe4,
    alt: "Light blue knit slip-on sneaker",
    color: "#6EB5FF",
    soft: "#DCEEFF",
    copy: "The no-laces, no-rush pair made for early coffee, late flights, and everything between.",
  },
];

const money = (amount: number) => `$${amount}`;

export default function ToonHubWebsite() {
  const { theme } = useToonHubTheme();
  const [bag, setBag] = useState<Sneaker[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const activeIndex = Math.max(0, TOONHUB_THEMES.findIndex((item) => item.id === theme.id));
  const bagTotal = useMemo(() => bag.reduce((sum, item) => sum + item.price, 0), [bag]);

  const addToBag = (sneaker: Sneaker) => {
    setBag((items) => [...items, sneaker]);
    setCartOpen(true);
  };

  const addCustomPair = (laceColor: string, soleColor: string) => {
    const base = SNEAKERS[activeIndex]!;
    addToBag({
      ...base,
      id: `custom-${Date.now()}`,
      name: "Your custom pair",
      category: `Laces ${laceColor} / sole ${soleColor}`,
      price: 156,
    });
  };

  return (
    <div className="text-[#172134]" style={{ backgroundColor: theme.soft, color: theme.ink, fontFamily: "Inter, sans-serif", transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1), color 450ms cubic-bezier(0.4,0,0.2,1)" }}>
      <section className="overflow-hidden border-y border-[#172134]/10 bg-[#172134] py-5 text-white sm:py-6">
        <div className="toonhub-marquee flex w-max items-center gap-10 whitespace-nowrap text-[clamp(2rem,5vw,5.2rem)] font-black uppercase leading-[0.92] tracking-[-0.025em]" style={{ fontFamily: "Anton, sans-serif", color: theme.soft, transition: "color 450ms ease" }}>
          <span>Made for easy miles</span><span style={{ color: theme.background }}>✳</span><span>Made for easy miles</span><span style={{ color: theme.background }}>✳</span><span>Made for easy miles</span><span style={{ color: theme.background }}>✳</span><span>Made for easy miles</span><span style={{ color: theme.background }}>✳</span>
        </div>
      </section>

      <ToonHubParallax strength={30}>
        <section id="shop" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#172134]/50">01 / The daily drop</p>
            <h2 className="mt-5 max-w-3xl text-[clamp(3.5rem,8vw,8.2rem)] font-black uppercase leading-[0.78] tracking-[-0.02em]" style={{ fontFamily: "Anton, sans-serif" }}>
              Pick your<br />
              <span style={{ color: theme.background, transition: "color 400ms ease" }}>pace.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[#172134]/65">Every pair begins with the same idea: sneakers should make your day feel lighter. Start with the color that feels most like you.</p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SNEAKERS.map((sneaker, index) => {
            const isSelected = index === activeIndex;
            return (
              <article
                key={sneaker.id}
                className="group relative overflow-hidden rounded-[2rem] border border-[#172134]/10 p-4 transition-all duration-300 hover:-translate-y-2"
                style={{ backgroundColor: isSelected ? sneaker.soft : "#ffffff", boxShadow: isSelected ? `0 22px 42px ${sneaker.color}33` : "none" }}
              >
                <div className="block w-full text-left" aria-current={isSelected ? "true" : undefined}>
                  <div className="flex items-start justify-between">
                    <span className="rounded-full bg-white/70 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-[#172134]/65">{sneaker.number} / 04</span>
                    {isSelected && <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#172134] text-white"><Check className="h-3.5 w-3.5" /></span>}
                  </div>
                  <div className="relative my-5 flex aspect-square items-center justify-center rounded-[1.5rem] bg-white/60">
                    <div className="absolute inset-7 rounded-full opacity-70" style={{ backgroundColor: sneaker.color }} />
                    <img src={sneaker.src} alt={sneaker.alt} className="relative z-10 w-[112%] object-contain transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[-4deg]" />
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#172134]/50">{sneaker.category}</p>
                  <div className="mt-2 flex items-end justify-between gap-3"><h3 className="text-xl font-black uppercase leading-[0.92] tracking-[-0.06em]">{sneaker.name}</h3><span className="text-sm font-black">{money(sneaker.price)}</span></div>
                </div>
                <button type="button" onClick={() => addToBag(sneaker)} className="mt-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] transition-all hover:gap-3" style={{ color: sneaker.color }}>
                  Add to bag <Plus className="h-3.5 w-3.5" />
                </button>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col justify-between gap-5 rounded-[1.75rem] bg-[#172134] p-5 text-white sm:flex-row sm:items-center sm:p-7">
          <div className="flex items-center gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: theme.background }}><ShoppingBag className="h-5 w-5" /></span><div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Your bag</p><p className="mt-1 text-sm font-bold">{bag.length ? `${bag.length} ${bag.length === 1 ? "pair" : "pairs"} · ${money(bagTotal)}` : "Your bag is ready when you are."}</p></div></div>
          <button type="button" onClick={() => setCartOpen(true)} className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.15em] text-[#172134] transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97]">View bag <ArrowRight className="h-4 w-4" /></button>
        </div>

        </section>
      </ToonHubParallax>

      <ToonHubParallax strength={22}>
        <section className="border-y border-[#172134]/10 px-5 py-20 sm:px-8 sm:py-28 lg:px-12" style={{ backgroundColor: theme.soft, transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)" }}>
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#172134]/50">02 / The easy part</p>
            <h2 className="mt-5 text-[clamp(3.25rem,7vw,7.4rem)] font-black uppercase leading-[0.9] tracking-[-0.02em]" style={{ fontFamily: "Anton, sans-serif" }}>Everyday<br /><span style={{ color: theme.background, transition: "color 400ms ease" }}>looks good</span><br />on you.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:pt-16">
            <InfoCard icon={<Truck className="h-5 w-5" />} title="Free shipping" copy="On all orders over $100, always." color={theme.background} />
            <InfoCard icon={<RotateCcw className="h-5 w-5" />} title="Easy returns" copy="Take 30 days. Take a walk. Decide." color={theme.background} />
            <InfoCard icon={<ShieldCheck className="h-5 w-5" />} title="Made to last" copy="Thoughtful materials. Better wear." color={theme.background} />
          </div>
        </div>
        </section>
      </ToonHubParallax>

      <ToonHubParallax strength={40}>
        <ToonHubCustomizer onAddToBag={addCustomPair} />
      </ToonHubParallax>

      <ToonHubParallax strength={36}>
        <section id="story" className="px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12" style={{ backgroundColor: theme.ink, transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)" }}>
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/45">03 / Our point of view</p>
            <h2 className="mt-5 text-[clamp(3.5rem,8vw,8.5rem)] font-black uppercase leading-[0.78] tracking-[-0.09em]" style={{ fontFamily: "Anton, sans-serif" }}>Walk more.<br /><span style={{ color: theme.background, transition: "color 400ms ease" }}>Worry less.</span></h2>
            <p className="mt-8 max-w-md text-sm leading-7 text-white/60">TOONHUB is built for the part of the day where plans change. Soft steps, breathable uppers, honest colors—and no complicated rules.</p>
            <a href="#journal" className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/25 px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.16em] transition-colors hover:bg-white/10">Read the story <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] p-7 text-[#172134] sm:min-h-[500px] sm:p-10" style={{ backgroundColor: theme.soft, transition: "background-color 400ms ease" }}>
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#172134]/15" /><div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full border border-[#172134]/15" />
            <p className="relative z-10 text-[10px] font-black uppercase tracking-[0.22em] text-[#172134]/50">The numbers feel good</p>
            <div className="relative z-10 mt-28 grid gap-5 sm:grid-cols-2"><div className="rounded-3xl bg-white/70 p-5"><p className="text-5xl font-black tracking-[-0.02em]">4.8<span style={{ color: theme.background }}>/5</span></p><p className="mt-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#172134]/55">Comfort rating</p></div><div className="rounded-3xl bg-[#172134] p-5 text-white"><p className="text-5xl font-black tracking-[-0.02em]">30</p><p className="mt-3 text-[10px] font-black uppercase tracking-[0.16em] text-white/50">Days to decide</p></div></div>
            <div className="relative z-10 mt-5 rounded-3xl border border-[#172134]/10 bg-white/45 p-5"><div className="flex items-center justify-between"><span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#172134]/55">Fits real life</span><Heart className="h-4 w-4" style={{ color: theme.background }} /></div><p className="mt-4 max-w-sm text-sm font-semibold leading-6">“The pair I actually reach for when I have a full day and no idea where it ends.”</p></div>
          </div>
        </div>
        </section>
      </ToonHubParallax>

      <ToonHubParallax strength={26}>
        <section id="journal" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#172134]/50">04 / Community notes</p><h2 className="mt-5 text-[clamp(3.25rem,7vw,7.2rem)] font-black uppercase leading-[0.9] tracking-[-0.02em]" style={{ fontFamily: "Anton, sans-serif" }}>Good days,<br /><span style={{ color: theme.background, transition: "color 400ms ease" }}>great shoes.</span></h2></div><div className="flex gap-1 text-[#F6B73C]">{[0, 1, 2, 3, 4].map((star) => <Star key={star} className="h-4 w-4 fill-current" />)}</div></div>
        <div className="mt-12 grid gap-4 md:grid-cols-3"><QuoteCard quote="Finally: sneakers that are bright without being loud. They make every outfit more fun." author="Rhea M. / Brooklyn" accent={theme.background} /><QuoteCard quote="Soft on day one, somehow even better on day sixty. I wore them through an airport twice." author="Jon P. / Seattle" accent={theme.background} /><QuoteCard quote="The Sky Slip is my unofficial work-from-anywhere uniform now. Zero regrets." author="Mina L. / Austin" accent={theme.background} /></div>
        </section>
      </ToonHubParallax>

      <ToonHubParallax strength={18}>
        <section className="border-t border-[#172134]/10 px-5 py-20 sm:px-8 lg:px-12" style={{ backgroundColor: theme.soft, transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)" }}><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#172134]/50">Stay in step</p><h2 className="mt-4 text-[clamp(3rem,6vw,6rem)] font-black uppercase leading-[0.82] tracking-[-0.02em]" style={{ fontFamily: "Anton, sans-serif" }}>Fresh drops.<br />No noise.</h2></div><form className="flex w-full max-w-md border-b border-[#172134]/35 pb-3" onSubmit={(event) => event.preventDefault()}><input aria-label="Email address" type="email" placeholder="Your email address" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#172134]/45" /><button type="submit" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: theme.background }}>Sign up <ArrowRight className="h-4 w-4" /></button></form></div></section>
      </ToonHubParallax>

      <footer className="px-5 py-8 text-white sm:px-8 lg:px-12" style={{ backgroundColor: theme.ink, transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)" }}><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-5 text-[9px] font-black uppercase tracking-[0.16em] text-white/45 sm:flex-row"><span>© 2026 TOONHUB Casuals</span><span>Easy miles since day one</span><span>Privacy / Terms / Contact</span></div></footer>

      <ToonHubCartDrawer open={cartOpen} checkout={checkoutOpen} items={bag} onClose={() => { setCartOpen(false); setCheckoutOpen(false); }} onRemove={(index) => setBag((items) => items.filter((_, itemIndex) => itemIndex !== index))} onCheckout={() => setCheckoutOpen(true)} onComplete={() => { setBag([]); setCheckoutOpen(false); setCartOpen(false); }} />

      <style>{`@keyframes toonhubTicker { from { transform: translateX(0); } to { transform: translateX(-35%); } } .toonhub-marquee { animation: toonhubTicker 22s linear infinite; } @media (prefers-reduced-motion: reduce) { .toonhub-marquee { animation: none; } }`}</style>
    </div>
  );
}

function InfoCard({ icon, title, copy, color }: { icon: React.ReactNode; title: string; copy: string; color: string }) {
  return <article className="rounded-[1.5rem] bg-white p-5"><span className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ backgroundColor: color }}>{icon}</span><h3 className="mt-8 text-sm font-black uppercase tracking-[-0.03em]">{title}</h3><p className="mt-2 text-xs leading-5 text-[#172134]/60">{copy}</p></article>;
}

function QuoteCard({ quote, author, accent }: { quote: string; author: string; accent: string }) {
  return <article className="rounded-[2rem] border border-[#172134]/10 bg-white p-6 transition-transform duration-300 hover:-translate-y-2 sm:p-8"><span className="block h-1.5 w-14 rounded-full" style={{ backgroundColor: accent }} /><p className="mt-10 text-xl font-black leading-[1.05] tracking-[-0.01em]">“{quote}”</p><p className="mt-8 text-[10px] font-black uppercase tracking-[0.16em] text-[#172134]/50">{author}</p></article>;
}


function ToonHubCartDrawer({
  open,
  checkout,
  items,
  onClose,
  onRemove,
  onCheckout,
  onComplete,
}: {
  open: boolean;
  checkout: boolean;
  items: Sneaker[];
  onClose: () => void;
  onRemove: (index: number) => void;
  onCheckout: () => void;
  onComplete: () => void;
}) {
  const { theme } = useToonHubTheme();
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={`fixed inset-0 z-[90] ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
      <button type="button" aria-label="Close cart" onClick={onClose} className={`absolute inset-0 bg-[#172134]/35 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto p-6 shadow-2xl transition-transform duration-500 sm:p-8 ${open ? "translate-x-0" : "translate-x-full"}`} style={{ backgroundColor: theme.soft, color: theme.ink, transitionProperty: "transform, background-color, color", transitionDuration: "500ms, 650ms, 450ms" }}>
        <div className="flex items-start justify-between">
          <div><p className="text-[10px] font-black uppercase tracking-[0.22em] opacity-55">{checkout ? "Secure checkout" : "Your bag"}</p><h2 className="mt-2 text-3xl font-black uppercase leading-[0.92] tracking-[-0.015em]" style={{ fontFamily: "Anton, sans-serif" }}>{checkout ? "Almost there." : items.length ? `${items.length} ${items.length === 1 ? "pair" : "pairs"}` : "Nothing yet."}</h2></div>
          <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20 transition-colors hover:bg-white/30" aria-label="Close cart"><X className="h-4 w-4" /></button>
        </div>

        {checkout ? (
          <form className="mt-10 space-y-5" onSubmit={(event) => { event.preventDefault(); onComplete(); }}>
            <div className="rounded-3xl p-5 text-white" style={{ backgroundColor: theme.ink, transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)" }}><p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/50">Order total</p><p className="mt-2 text-3xl font-black tracking-[-0.06em]">{money(total)}</p><p className="mt-3 text-xs leading-5 text-white/60">Free shipping and 30-day easy returns are included.</p></div>
            <CheckoutField label="Email" type="email" placeholder="you@example.com" />
            <div className="grid grid-cols-2 gap-3"><CheckoutField label="First name" placeholder="First" /><CheckoutField label="Last name" placeholder="Last" /></div>
            <CheckoutField label="Card number" placeholder="4242 4242 4242 4242" />
            <div className="grid grid-cols-2 gap-3"><CheckoutField label="Expiry" placeholder="MM / YY" /><CheckoutField label="CVC" placeholder="123" /></div>
            <button type="submit" className="mt-2 flex w-full items-center justify-center gap-3 rounded-full px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-white transition-transform hover:-translate-y-0.5 active:scale-[0.98]" style={{ backgroundColor: theme.background, transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)" }}>Place order · {money(total)} <Check className="h-4 w-4" /></button>
          </form>
        ) : items.length === 0 ? (
          <div className="mt-24 rounded-3xl border border-current/10 bg-white/35 p-6 text-sm leading-6 opacity-70">Your next step is waiting. Choose a pair from the collection or make one in the 3D customizer.</div>
        ) : (
          <div className="mt-10 flex flex-1 flex-col">
            <div className="space-y-3">{items.map((item, index) => <div key={`${item.id}-${index}`} className="flex items-center gap-3 rounded-2xl border border-current/10 bg-white/35 p-3"><span className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/55"><img src={item.src} alt="" className="h-full w-full object-contain" /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-black uppercase">{item.name}</p><p className="mt-1 truncate text-xs opacity-60">{item.category}</p></div><div className="flex flex-col items-end gap-2"><span className="text-sm font-black">{money(item.price)}</span><button type="button" onClick={() => onRemove(index)} className="text-current/45 transition-colors hover:text-current" aria-label={`Remove ${item.name}`}><Trash2 className="h-3.5 w-3.5" /></button></div></div>)}</div>
            <div className="mt-auto border-t border-current/15 pt-5"><div className="flex items-center justify-between text-sm font-black uppercase"><span>Subtotal</span><span>{money(total)}</span></div><p className="mt-2 text-xs leading-5 opacity-55">Taxes calculated at checkout. Shipping is free over $100.</p><button type="button" onClick={onCheckout} className="mt-5 flex w-full items-center justify-center gap-3 rounded-full px-5 py-4 text-[10px] font-black uppercase tracking-[0.18em] text-white transition-transform hover:-translate-y-0.5 active:scale-[0.98]" style={{ backgroundColor: theme.ink, transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)" }}>Continue to checkout <ArrowRight className="h-4 w-4" /></button></div>
          </div>
        )}
      </aside>
    </div>
  );
}

function CheckoutField({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return <label className="block text-[9px] font-black uppercase tracking-[0.16em] opacity-65">{label}<input required type={type} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-current/15 bg-white/45 px-3 py-3 text-sm font-medium normal-case tracking-normal outline-none transition-colors focus:border-current/45" /></label>;
}
