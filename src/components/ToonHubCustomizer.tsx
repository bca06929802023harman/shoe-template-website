import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls, RoundedBox } from "@react-three/drei";
import { Shape, type Group } from "three";
import { ArrowRight, Check, Rotate3D } from "lucide-react";
import { useToonHubTheme } from "@/components/ToonHubTheme";

const LACE_COLORS = ["#FFFFFF", "#172134", "#F4845F", "#E882B4", "#6BBF7A"];
const SOLE_COLORS = ["#FFFFFF", "#172134", "#F6B73C", "#E882B4", "#6EB5FF"];

const EXTRUDE = {
  depth: 1.34,
  bevelEnabled: true,
  bevelSegments: 4,
  bevelSize: 0.09,
  bevelThickness: 0.09,
};

const soleShape = (() => {
  const shape = new Shape();
  shape.moveTo(-2.55, -0.32);
  shape.lineTo(1.78, -0.32);
  shape.quadraticCurveTo(2.42, -0.28, 2.62, 0.08);
  shape.quadraticCurveTo(2.72, 0.32, 2.4, 0.44);
  shape.lineTo(-2.3, 0.36);
  shape.quadraticCurveTo(-2.58, 0.2, -2.55, -0.32);
  return shape;
})();

const upperShape = (() => {
  const shape = new Shape();
  shape.moveTo(-2.34, 0.05);
  shape.lineTo(1.42, 0.06);
  shape.quadraticCurveTo(1.95, 0.1, 2.18, 0.42);
  shape.quadraticCurveTo(2.34, 0.66, 2.14, 0.9);
  shape.quadraticCurveTo(1.85, 1.08, 1.27, 1.1);
  shape.lineTo(0.2, 1.1);
  shape.lineTo(-0.65, 1.75);
  shape.quadraticCurveTo(-1.1, 1.97, -1.58, 1.83);
  shape.lineTo(-2.1, 1.42);
  shape.quadraticCurveTo(-2.43, 1.03, -2.34, 0.05);
  return shape;
})();

type ToonHubCustomizerProps = {
  onAddToBag: (laceColor: string, soleColor: string) => void;
};

export default function ToonHubCustomizer({ onAddToBag }: ToonHubCustomizerProps) {
  const { theme } = useToonHubTheme();
  const [laceColor, setLaceColor] = useState(LACE_COLORS[0]!);
  const [soleColor, setSoleColor] = useState(SOLE_COLORS[0]!);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  return (
    <section id="customize" className="overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-12" style={{ backgroundColor: theme.soft, transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)" }}>
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#172134]/50">02 / Make it yours</p>
          <h2 className="mt-5 text-[clamp(3.4rem,7vw,7.5rem)] font-black uppercase leading-[0.9] tracking-[-0.02em]" style={{ fontFamily: "Anton, sans-serif" }}>Color your<br /><span style={{ color: theme.background, transition: "color 400ms ease" }}>own route.</span></h2>
          <p className="mt-7 max-w-md text-sm leading-7 text-[#172134]/65">Start from the active hero color, then tune the lace and sole colors on a sneaker model with a layered upper, toe box, collar, eyelets, laces, side stripe, and tread.</p>

          <div className="mt-9 space-y-7">
            <ColorPicker label="Laces" colors={LACE_COLORS} value={laceColor} onChange={setLaceColor} />
            <ColorPicker label="Sole" colors={SOLE_COLORS} value={soleColor} onChange={setSoleColor} />
          </div>

          <button type="button" onClick={() => onAddToBag(laceColor, soleColor)} className="mt-10 inline-flex items-center gap-3 rounded-full px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-xl transition-all duration-200 hover:-translate-y-1 active:scale-[0.97]" style={{ backgroundColor: theme.ink, boxShadow: `0 16px 30px ${theme.background}55` }}>
            Add custom pair · $156 <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="relative min-h-[480px] overflow-hidden rounded-[2rem] border border-[#172134]/10 bg-white sm:min-h-[640px]" style={{ boxShadow: `0 28px 65px ${theme.background}26` }}>
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 58% 40%, ${theme.soft} 0%, #ffffff 56%, #f7f7f4 100%)`, transition: "background 650ms cubic-bezier(0.4,0,0.2,1)" }} />
          <div className="absolute left-6 top-6 z-20 flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-[#172134]/65 backdrop-blur-md"><Rotate3D className="h-3.5 w-3.5" /> Drag to rotate</div>
          <div className="absolute right-6 top-6 z-20 rounded-full px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-white shadow-sm" style={{ backgroundColor: theme.background, transition: "background-color 400ms ease" }}>Live colorway</div>

          {isClient ? (
            <Canvas className="absolute inset-0 h-full w-full" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} camera={{ position: [6.2, 3.2, 8.7], fov: 29 }} dpr={[1, 2]} shadows gl={{ antialias: true, alpha: true }}>
              <ambientLight intensity={1.7} />
              <hemisphereLight args={["#ffffff", theme.soft, 1.35]} />
              <directionalLight castShadow position={[5, 7, 5]} intensity={2.75} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
              <directionalLight position={[-4, 3, -4]} intensity={1.3} color={theme.background} />
              <Float speed={1.45} rotationIntensity={0.16} floatIntensity={0.28} floatingRange={[-0.12, 0.12]}>
                <DetailedSneaker upperColor={theme.background} laceColor={laceColor} soleColor={soleColor} />
              </Float>
              <ContactShadows position={[0, -0.82, 0]} opacity={0.28} scale={9} blur={2.4} far={4.5} color="#172134" />
              <OrbitControls enablePan={false} minDistance={7.1} maxDistance={10} minPolarAngle={0.9} maxPolarAngle={1.74} target={[0, 0.42, 0]} />
            </Canvas>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center"><div className="h-40 w-[22rem] rounded-[52%]" style={{ backgroundColor: theme.background, boxShadow: `0 35px 55px ${theme.background}55`, transition: "background-color 400ms ease" }} /></div>
          )}

          <div className="pointer-events-none absolute bottom-6 left-6 right-6 z-20 grid grid-cols-3 gap-2 rounded-2xl border border-[#172134]/5 bg-white/80 p-3 text-center text-[9px] font-black uppercase tracking-[0.13em] text-[#172134]/60 backdrop-blur-md"><span>Upper<br /><b style={{ color: theme.background }}>Hero tone</b></span><span>Laces<br /><b style={{ color: laceColor }}>Selected</b></span><span>Sole<br /><b style={{ color: soleColor }}>Selected</b></span></div>
        </div>
      </div>
    </section>
  );
}

function ColorPicker({ label, colors, value, onChange }: { label: string; colors: string[]; value: string; onChange: (color: string) => void }) {
  return (
    <div>
      <div className="flex items-center justify-between"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#172134]/60">{label}</p><span className="text-[10px] font-bold text-[#172134]/45">{value.toUpperCase()}</span></div>
      <div className="mt-3 flex flex-wrap gap-3">
        {colors.map((color) => (
          <button key={color} type="button" onClick={() => onChange(color)} aria-label={`${label} color ${color}`} aria-pressed={value === color} className="flex h-10 w-10 items-center justify-center rounded-full border-2 transition-transform hover:scale-110 active:scale-95" style={{ backgroundColor: color, borderColor: value === color ? "#172134" : "rgba(23,33,52,.15)" }}>
            {value === color && <Check className="h-4 w-4" style={{ color: color === "#FFFFFF" || color === "#F6B73C" ? "#172134" : "#FFFFFF" }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailedSneaker({ upperColor, laceColor, soleColor }: { upperColor: string; laceColor: string; soleColor: string }) {
  const group = useRef<Group>(null);
  const stripeColor = useMemo(() => "#FFFFFF", []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = -0.58 + Math.sin(state.clock.elapsedTime * 0.42) * 0.08;
    group.current.position.y = -0.18 + Math.sin(state.clock.elapsedTime * 0.9) * 0.035;
  });

  return (
    <group ref={group} scale={1.28} rotation={[-0.18, -0.58, -0.06]}>
      <mesh castShadow receiveShadow position={[0, -0.2, -0.67]}><extrudeGeometry args={[soleShape, EXTRUDE]} /><meshStandardMaterial color={soleColor} roughness={0.45} metalness={0.03} /></mesh>
      <mesh castShadow receiveShadow position={[-0.02, 0.18, -0.57]}><extrudeGeometry args={[upperShape, { ...EXTRUDE, depth: 1.14, bevelSize: 0.12 }]} /><meshStandardMaterial color={upperColor} roughness={0.62} metalness={0.02} /></mesh>

      <RoundedBox castShadow args={[1.46, 0.3, 1.12]} radius={0.15} smoothness={5} position={[1.47, 0.61, 0]} rotation={[0, 0, -0.02]}><meshStandardMaterial color={upperColor} roughness={0.54} /></RoundedBox>
      <RoundedBox castShadow args={[0.48, 0.36, 1.06]} radius={0.15} smoothness={5} position={[-2.0, 0.55, 0]} rotation={[0, 0, -0.1]}><meshStandardMaterial color={upperColor} roughness={0.58} /></RoundedBox>
      <RoundedBox args={[1.68, 0.13, 1.08]} radius={0.06} smoothness={4} position={[-0.08, 0.94, 0]} rotation={[0, 0, -0.13]}><meshStandardMaterial color={upperColor} roughness={0.5} /></RoundedBox>
      <RoundedBox args={[2.08, 0.1, 0.12]} radius={0.04} smoothness={4} position={[0.32, 0.75, 0.64]} rotation={[0, 0, -0.08]}><meshStandardMaterial color={stripeColor} roughness={0.34} /></RoundedBox>
      <RoundedBox args={[0.44, 0.42, 0.98]} radius={0.14} smoothness={4} position={[-0.68, 1.22, 0]} rotation={[0, 0, -0.23]}><meshStandardMaterial color={upperColor} roughness={0.5} /></RoundedBox>

      <mesh position={[-1.28, 1.31, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[0.68, 0.82, 0.9]}><torusGeometry args={[0.42, 0.11, 18, 50]} /><meshStandardMaterial color="#F4F1EC" roughness={0.44} /></mesh>
      <RoundedBox args={[0.36, 0.26, 1.12]} radius={0.08} smoothness={4} position={[-2.12, 0.22, 0]}><meshStandardMaterial color={soleColor} roughness={0.46} /></RoundedBox>

      {[-0.72, -0.35, 0.02, 0.39, 0.76].map((x, index) => (
        <group key={x} position={[x, 1.1 - index * 0.055, 0]} rotation={[0, 0, -0.18]}>
          <mesh castShadow rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.045, 0.045, 1.22, 16]} /><meshStandardMaterial color={laceColor} roughness={0.35} /></mesh>
          <mesh position={[0, 0, 0.56]}><sphereGeometry args={[0.075, 14, 14]} /><meshStandardMaterial color="#EDEAE3" roughness={0.3} /></mesh>
          <mesh position={[0, 0, -0.56]}><sphereGeometry args={[0.075, 14, 14]} /><meshStandardMaterial color="#EDEAE3" roughness={0.3} /></mesh>
        </group>
      ))}

      {[-1.7, -0.85, 0, 0.85, 1.65].map((x) => (
        <RoundedBox key={x} args={[0.4, 0.09, 1.48]} radius={0.03} smoothness={3} position={[x, -0.48, 0]}><meshStandardMaterial color="#172134" roughness={0.7} /></RoundedBox>
      ))}
    </group>
  );
}
