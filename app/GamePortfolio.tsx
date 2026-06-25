"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sky, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Mail, Copy, Check } from "lucide-react";
import { BlendFunction } from "postprocessing";

const INDIGO = "#6366f1";
const VIOLET = "#8b5cf6";
type ZoneId = "about" | "research" | "projects" | "contact";
type Weather = "clear" | "rain" | "snow";

const ZONES = [
  { id: "about"    as ZoneId, label: "About Me",    icon: "👤", pos: [-22,0,-24] as [number,number,number], color: "#6366f1", emissive: "#4040ff", h: 6   },
  { id: "research" as ZoneId, label: "Research Lab", icon: "🔬", pos: [ 22,0,-24] as [number,number,number], color: "#8b5cf6", emissive: "#7722ff", h: 8   },
  { id: "projects" as ZoneId, label: "Projects Hub", icon: "💻", pos: [-22,0, 24] as [number,number,number], color: "#10b981", emissive: "#00ff88", h: 7   },
  { id: "contact"  as ZoneId, label: "Contact",      icon: "✉️", pos: [ 22,0, 24] as [number,number,number], color: "#f59e0b", emissive: "#ff8800", h: 5   },
];

// ─────────────────────────────────────────────────────────────── Info Panels ──
function Panel({ children, onClose, accent = INDIGO }: { children: React.ReactNode; onClose: () => void; accent?: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(12px)" }}
      onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 28 }}
        transition={{ duration: 0.38, ease: [0.16,1,0.3,1] }}
        className="bg-[#080810] border rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl"
        style={{ borderColor: accent+"55", boxShadow: `0 0 60px ${accent}22` }}
        onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 flex items-center justify-between px-8 py-5 border-b bg-[#080810] z-10" style={{ borderColor: accent+"22" }}>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: accent, boxShadow: `0 0 12px ${accent}` }} />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase" style={{ color: accent }}>
              {ZONES.find(b => b.color === accent)?.label ?? "Info"}
            </span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all"><X size={14} /></button>
        </div>
        <div className="px-8 py-7">{children}</div>
      </motion.div>
    </motion.div>
  );
}

function AboutPanel({ onClose }: { onClose: () => void }) {
  return (
    <Panel onClose={onClose} accent={INDIGO}>
      <h2 className="font-black text-white text-3xl tracking-tight leading-tight mb-2">Scientist.<br/>Builder.<br/>Problem solver.</h2>
      <p className="text-white/40 text-[15px] leading-relaxed mb-8 font-light">I sit at a rare intersection — I can design experiments, analyze multi-omic datasets, write the pipeline to process them, and build the web app to visualize the results. Full-stack thinking from bench to browser.</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[["Focus","Multi-omics & Computational Biology"],["Education","M.S. — NYU"],["Status","PhD Prospect"],["Location","New York City"],["Target","Biotech & Tech Companies"],["Side","Indie builder & entrepreneur"]].map(([l,v]) => (
          <div key={l} className="rounded-2xl p-4 border border-white/8 bg-white/3">
            <p className="text-[10px] font-bold tracking-widest uppercase text-white/25 mb-1">{l}</p>
            <p className="text-sm font-medium text-white/70">{v}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Python","R","Bioinformatics","Machine Learning","React","TypeScript","Next.js","Data Viz"].map(s=>(
          <span key={s} className="text-[11px] px-3 py-1.5 rounded-full bg-white/8 text-white/50 border border-white/8">{s}</span>
        ))}
      </div>
    </Panel>
  );
}

function ResearchPanel({ onClose }: { onClose: () => void }) {
  return (
    <Panel onClose={onClose} accent={VIOLET}>
      <h2 className="font-black text-white text-3xl tracking-tight mb-6">The science side.</h2>
      <a href="https://github.com/noorgg22/Masters_Thesis_Multiomic_MG_Macrophage" target="_blank" rel="noopener noreferrer"
        className="group flex items-start justify-between gap-4 p-6 rounded-2xl border border-white/10 hover:border-violet-500/50 transition-all mb-5 bg-white/3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full text-white" style={{ background:`linear-gradient(135deg,${INDIGO},${VIOLET})` }}>Master's Thesis</span>
            <span className="text-[10px] text-white/30">NYU · 2025</span>
          </div>
          <h3 className="text-base font-bold text-white mb-2 leading-snug">Multiomic Integration of Monoglyceride Responses in Adipose Tissue Macrophages</h3>
          <p className="text-[13px] text-white/40 font-light">Transcriptomics, lipidomics, and spatial lipidomics to understand monoglyceride signaling in macrophage behavior.</p>
        </div>
        <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors mt-1 flex-shrink-0" />
      </a>
      {[["Genomics & Transcriptomics","RNA-seq, DESeq2, edgeR, GSEA, scRNA-seq"],["Lipidomics & Metabolomics","LC-MS data, lipid annotation, pathway analysis"],["Spatial Biology","Spatial transcriptomics, tissue-level visualization"]].map(([a,t]) => (
        <div key={a} className="rounded-2xl p-4 border border-white/8 bg-white/3 mb-3">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1.5" style={{ color: VIOLET }}>{a}</p>
          <p className="text-[13px] text-white/40 font-light">{t}</p>
        </div>
      ))}
    </Panel>
  );
}

function ProjectsPanel({ onClose }: { onClose: () => void }) {
  const P = [
    { name:"Seatd",       desc:"AI SMS receptionist for salons. Booking, reminders, reviews, Twilio.", tags:["Stripe","Twilio","Claude AI"], url:"https://seatd-deploy.vercel.app", status:"Live",     color:"#f59e0b" },
    { name:"LeHoopIQ",    desc:"NBA analytics — live scores, standings, rosters, player profiles.",    tags:["React","TypeScript","ESPN API"], url:"https://lehoopiq.vercel.app",   status:"Live",     color:"#ef4444" },
    { name:"World Cup",   desc:"Real-time 2026 FIFA tracker — scores, standings, group stage data.",   tags:["React","TypeScript","API"],     url:"#",                             status:"Built",    color:INDIGO    },
  ];
  return (
    <Panel onClose={onClose} accent="#10b981">
      <h2 className="font-black text-white text-3xl tracking-tight mb-6">Things I've built.</h2>
      <div className="grid gap-4">
        {P.map(p=>(
          <a key={p.name} href={p.url!=="#"?p.url:undefined} target={p.url!=="#"?"_blank":undefined} rel="noopener noreferrer"
            className="group flex items-start gap-4 p-5 rounded-2xl border border-white/8 hover:border-white/20 transition-all bg-white/3">
            <span className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0" style={{ background:p.color, color:"#000" }}>{p.name[0]}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-white">{p.name}</span>
                <span className={`text-[10px] font-semibold ${p.status==="Live"?"text-emerald-400":p.status==="Building"?"text-amber-400":"text-white/30"}`}>● {p.status}</span>
              </div>
              <p className="text-[13px] text-white/40 font-light mb-2">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">{p.tags.map(t=><span key={t} className="text-[10px] px-2 py-1 rounded-full bg-white/8 text-white/35">{t}</span>)}</div>
            </div>
            {p.url!=="#"&&<ArrowUpRight size={14} className="text-white/20 group-hover:text-white/50 mt-1 flex-shrink-0"/>}
          </a>
        ))}
      </div>
    </Panel>
  );
}

function ContactPanel({ onClose }: { onClose: () => void }) {
  const [ce,setCe]=useState(false); const [cp,setCp]=useState(false);
  const copy=(text:string,t:"e"|"p")=>{ navigator.clipboard.writeText(text); if(t==="e"){setCe(true);setTimeout(()=>setCe(false),2000);}else{setCp(true);setTimeout(()=>setCp(false),2000);} };
  return (
    <Panel onClose={onClose} accent="#f59e0b">
      <h2 className="font-black text-white text-3xl tracking-tight mb-2">Get in touch.</h2>
      <p className="text-white/40 text-sm mb-8 font-light">Open to roles in biotech & tech. Click to copy.</p>
      <div className="flex flex-col gap-3">
        <button onClick={()=>copy("gui.becker.trindade@gmail.com","e")} className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 hover:border-amber-500/40 transition-all text-left group bg-white/3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:`linear-gradient(135deg,${INDIGO},${VIOLET})` }}><Mail size={18} className="text-white"/></div>
          <div className="flex-1"><p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-0.5">Email</p><p className="text-[14px] font-medium text-white">gui.becker.trindade@gmail.com</p></div>
          {ce?<Check size={16} className="text-emerald-400"/>:<Copy size={16} className="text-white/30 group-hover:text-white/60"/>}
        </button>
        <button onClick={()=>copy("+12488243623","p")} className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 hover:border-amber-500/40 transition-all text-left group bg-white/3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-white/8">📞</div>
          <div className="flex-1"><p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-0.5">Phone</p><p className="text-[14px] font-medium text-white">+1 (248) 824-3623</p></div>
          {cp?<Check size={16} className="text-emerald-400"/>:<Copy size={16} className="text-white/30 group-hover:text-white/60"/>}
        </button>
      </div>
    </Panel>
  );
}

// ──────────────────────────────────────────────────── 3D World Components ──

function Terrain() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(160, 160, 80, 80);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const colors: number[] = [];
    const baseGreen  = new THREE.Color("#3a6b1e");
    const midGreen   = new THREE.Color("#4a8a28");
    const dirtBrown  = new THREE.Color("#7a5c38");
    const pathColor  = new THREE.Color("#c8a86a");

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i);
      const inRiver = Math.abs(y) < 7;
      const onPath  = (Math.abs(x) < 3.5 || Math.abs(y) < 3.5) && !inRiver;
      const nearRiver = Math.abs(y) < 9;

      if (inRiver) {
        pos.setZ(i, -0.5);
        colors.push(...baseGreen.toArray());
      } else if (onPath) {
        pos.setZ(i, 0.02);
        colors.push(...pathColor.toArray());
      } else {
        const n = Math.sin(x*0.19)*Math.cos(y*0.19)*0.9 + Math.sin(x*0.08+1.1)*0.5 + Math.cos(y*0.12+2.3)*0.4 + (Math.random()-0.5)*0.08;
        pos.setZ(i, nearRiver ? n*0.2 : n);
        const t = Math.random();
        const col = t < 0.5 ? baseGreen.clone().lerp(midGreen, Math.random()) : baseGreen;
        colors.push(...col.toArray());
      }
    }
    g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh rotation={[-Math.PI/2,0,0]} receiveShadow>
      <primitive object={geo} />
      <meshStandardMaterial vertexColors roughness={0.92} metalness={0.0} />
    </mesh>
  );
}

function River() {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const t = clock.getElapsedTime();
    matRef.current.emissiveIntensity = 0.08 + Math.sin(t * 1.5) * 0.04;
  });
  return (
    <>
      {/* Water surface */}
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI/2,0,0]} receiveShadow>
        <planeGeometry args={[160, 13, 30, 5]} />
        <meshStandardMaterial ref={matRef} color="#1a5fa8" emissive="#0d3f7a" emissiveIntensity={0.08} metalness={0.88} roughness={0.08} transparent opacity={0.92} />
      </mesh>
      {/* Sandy banks */}
      {([-7.8,7.8] as number[]).map(z=>(
        <mesh key={z} position={[0,0.03,z]} rotation={[-Math.PI/2,0,0]}>
          <planeGeometry args={[160,2.0]}/>
          <meshStandardMaterial color="#b89050" roughness={0.95} metalness={0}/>
        </mesh>
      ))}
    </>
  );
}

function Bridge() {
  const planks: React.ReactElement[] = [];
  for (let i = -5; i <= 5; i++) {
    planks.push(
      <mesh key={i} position={[0, 0.72, i * 1.1]}>
        <boxGeometry args={[6, 0.22, 0.9]} />
        <meshStandardMaterial color={i%2===0 ? "#9c7a30" : "#8a6a28"} roughness={0.85} metalness={0.05} />
      </mesh>
    );
  }
  return (
    <group>
      {planks}
      {/* Main beams */}
      {([-2.7,2.7] as number[]).map(x=>(
        <mesh key={x} position={[x,0.62,0]} castShadow receiveShadow>
          <boxGeometry args={[0.28,0.28,13]}/>
          <meshStandardMaterial color="#5a3e18" roughness={0.9} metalness={0.05}/>
        </mesh>
      ))}
      {/* Railings */}
      {([-2.85,2.85] as number[]).map(x=>(
        <mesh key={x} position={[x,1.5,0]} castShadow>
          <boxGeometry args={[0.14,1.5,13]}/>
          <meshStandardMaterial color="#3d2810" roughness={0.9}/>
        </mesh>
      ))}
      {/* Balusters */}
      {([-5,-3,-1,1,3,5] as number[]).flatMap(z=>[-2.85,2.85].map(x=>(
        <mesh key={`${x}-${z}`} position={[x,1.1,z]} castShadow>
          <boxGeometry args={[0.12,1.0,0.12]}/>
          <meshStandardMaterial color="#3d2810" roughness={0.9}/>
        </mesh>
      )))}
      {/* Arch supports */}
      {([-4,4] as number[]).map(z=>(
        <mesh key={z} position={[0,-0.3,z]} castShadow>
          <boxGeometry args={[6.5,0.6,0.6]}/>
          <meshStandardMaterial color="#4a3015" roughness={0.9}/>
        </mesh>
      ))}
    </group>
  );
}

function Building({ pos, color, emissive, h, label, id }: {
  pos:[number,number,number]; color:string; emissive:string; h:number; label:string; id:string;
}) {
  const floorCount = Math.round(h/1.4);
  const windows: React.ReactElement[] = [];
  for (let floor = 0; floor < floorCount; floor++) {
    for (let col = -1; col <= 1; col++) {
      // Front face windows
      windows.push(
        <mesh key={`f-${floor}-${col}`} position={[col*2.2, 1.2 + floor*1.6, 3.56]}>
          <boxGeometry args={[1.0, 1.1, 0.06]}/>
          <meshStandardMaterial color="#1a3050" emissive={emissive} emissiveIntensity={1.8} roughness={0.1} metalness={0.6}/>
        </mesh>
      );
      // Back face windows
      windows.push(
        <mesh key={`b-${floor}-${col}`} position={[col*2.2, 1.2 + floor*1.6, -3.56]}>
          <boxGeometry args={[1.0, 1.1, 0.06]}/>
          <meshStandardMaterial color="#1a3050" emissive={emissive} emissiveIntensity={1.2} roughness={0.1} metalness={0.6}/>
        </mesh>
      );
    }
  }

  const cHex = parseInt(color.replace("#",""),16);
  const bodyColor = new THREE.Color(color).multiplyScalar(0.18).getStyle();

  return (
    <group position={pos}>
      {/* Foundation slab */}
      <mesh position={[0,0.18,0]} receiveShadow>
        <boxGeometry args={[8.5,0.36,8.5]}/>
        <meshStandardMaterial color="#222222" roughness={0.9} metalness={0.1}/>
      </mesh>
      {/* Steps */}
      {([0.6,1.2,1.8] as number[]).map((s,i)=>(
        <mesh key={i} position={[0,(i+1)*0.12,3.8-i*0.3]}>
          <boxGeometry args={[4-i*0.4,0.14,0.55]}/>
          <meshStandardMaterial color="#2a2a2a" roughness={0.88}/>
        </mesh>
      ))}
      {/* Body */}
      <mesh position={[0, h/2+0.36, 0]} castShadow receiveShadow>
        <boxGeometry args={[7, h, 7]}/>
        <meshStandardMaterial color={bodyColor} roughness={0.78} metalness={0.12}/>
      </mesh>
      {/* Colored cornice */}
      <mesh position={[0, h+0.72, 0]} castShadow>
        <boxGeometry args={[7.3, 0.55, 7.3]}/>
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.5} roughness={0.6} metalness={0.2}/>
      </mesh>
      {/* Roof pyramid */}
      <mesh position={[0, h+2.1, 0]} castShadow>
        <coneGeometry args={[5.4,2.8,4]}/>
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.3} roughness={0.7} metalness={0.15}/>
      </mesh>
      {/* Antenna/spire */}
      <mesh position={[0, h+3.8, 0]} castShadow>
        <cylinderGeometry args={[0.08,0.12,1.6,6]}/>
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={1.5} metalness={0.8} roughness={0.1}/>
      </mesh>
      {/* Glowing tip */}
      <mesh position={[0, h+4.65, 0]}>
        <sphereGeometry args={[0.2,8,8]}/>
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={4} metalness={0} roughness={0}/>
      </mesh>
      {/* Tip glow only — no point light per building */}
      {windows}
      {/* Door */}
      <mesh position={[0,1.0,3.54]}>
        <boxGeometry args={[1.6,2.2,0.06]}/>
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.5}/>
      </mesh>
    </group>
  );
}

function Tree({ pos, seed = 0 }: { pos:[number,number,number]; seed?:number }) {
  const h = 2.2 + (seed%3)*0.8;
  const foliageColor = ["#1a5c12","#226618","#2d7520","#1e6b14"][seed%4];
  const trunkColor   = ["#5c3a1e","#4a3010","#6b4520"][seed%3];
  return (
    <group position={pos}>
      <mesh position={[0,h/2,0]}>
        <cylinderGeometry args={[0.22,0.32,h,5]}/>
        <meshStandardMaterial color={trunkColor} roughness={0.9}/>
      </mesh>
      {([0,1,2] as number[]).map(l=>(
        <mesh key={l} position={[0, h+0.8+l*1.05, 0]}>
          <coneGeometry args={[2.2-l*0.45, 2.6-l*0.3, 6]}/>
          <meshStandardMaterial color={new THREE.Color(foliageColor).offsetHSL(0,0,l*0.04).getStyle()} roughness={0.88}/>
        </mesh>
      ))}
    </group>
  );
}

const TREE_POS: [number,number,number][] = [
  [-42,0,-42],[-46,0,-28],[-40,0,8],[-38,0,40],
  [42,0,-42],[46,0,-28],[40,0,8],[38,0,40],
  [-8,0,-46],[8,0,-46],[-8,0,46],[8,0,46],
  [-34,0,-14],[-32,0,16],[34,0,-14],[32,0,16],
  [-14,0,-16],[14,0,-16],[-14,0,16],[14,0,16],
  [-6,0,-32],[6,0,-32],[-6,0,32],[6,0,32],
];

function StreetLamp({ pos }: { pos:[number,number,number] }) {
  return (
    <group position={pos}>
      <mesh position={[0,3,0]}>
        <cylinderGeometry args={[0.07,0.1,6,5]}/>
        <meshStandardMaterial color="#2a2a3a" roughness={0.6} metalness={0.7}/>
      </mesh>
      <mesh position={[0.4,5.8,0]}>
        <cylinderGeometry args={[0.06,0.07,1.0,5]}/>
        <meshStandardMaterial color="#2a2a3a" roughness={0.6} metalness={0.7}/>
      </mesh>
      <mesh position={[0.4,6.4,0]}>
        <boxGeometry args={[0.5,0.35,0.5]}/>
        <meshStandardMaterial color="#fffde0" emissive="#fff8a0" emissiveIntensity={4} roughness={0.1}/>
      </mesh>
      {/* Single shared area light instead of per-lamp point light — handled in Scene */}
    </group>
  );
}

function Fireflies({ active }: { active: boolean }) {
  const count = 60;
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const data = useMemo(() => {
    const pos = new Float32Array(count*3);
    const speed = new Float32Array(count*3);
    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random()-0.5)*80;
      pos[i*3+1] = 0.5 + Math.random()*3;
      pos[i*3+2] = (Math.random()-0.5)*80;
      speed[i*3]   = (Math.random()-0.5)*0.5;
      speed[i*3+1] = (Math.random()-0.5)*0.2;
      speed[i*3+2] = (Math.random()-0.5)*0.5;
    }
    return { pos, speed };
  }, []);

  useFrame(({ clock }) => {
    if (!geoRef.current || !active) return;
    const t = clock.getElapsedTime();
    const p = geoRef.current.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      p[i*3]   += data.speed[i*3]   * 0.04 * Math.sin(t*0.3+i);
      p[i*3+1]  = 0.5 + 2*Math.abs(Math.sin(t*0.5+i*1.2));
      p[i*3+2] += data.speed[i*3+2] * 0.04 * Math.cos(t*0.3+i*0.7);
    }
    geoRef.current.attributes.position.needsUpdate = true;
  });

  if (!active) return null;
  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[data.pos,3]}/>
      </bufferGeometry>
      <pointsMaterial color="#aaff44" size={0.18} sizeAttenuation transparent opacity={0.8}/>
    </points>
  );
}

function WeatherParticles({ weather }: { weather: Weather }) {
  const count = 1000;
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const pos = useMemo(() => {
    const a = new Float32Array(count*3);
    for (let i = 0; i < count; i++) {
      a[i*3]=(Math.random()-0.5)*120; a[i*3+1]=Math.random()*50; a[i*3+2]=(Math.random()-0.5)*120;
    }
    return a;
  }, []);

  useFrame((_,delta) => {
    if (!geoRef.current || weather==="clear") return;
    const p = geoRef.current.attributes.position.array as Float32Array;
    const spd = weather==="rain"?28:5;
    const drift = weather==="snow"?0.35:0;
    for (let i=0;i<count;i++) {
      p[i*3+1]-=spd*delta;
      if (drift) p[i*3]+=Math.sin(p[i*3+2]*0.1)*drift*delta;
      if (p[i*3+1]<-2) p[i*3+1]=50;
    }
    geoRef.current.attributes.position.needsUpdate=true;
  });

  if (weather==="clear") return null;
  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[pos,3]}/>
      </bufferGeometry>
      <pointsMaterial color={weather==="rain"?"#88bbff":"#ddeeff"} size={weather==="rain"?0.1:0.25} transparent opacity={weather==="rain"?0.55:0.9} sizeAttenuation/>
    </points>
  );
}

// ─────────────────────────────────────────────── Module-level game state ──
let _keys = new Set<string>();
let _onNear: (id: ZoneId | null) => void = () => {};

// ── Car (Bruno Simon style) ───────────────────────────────────────────────────
function Car() {
  const groupRef   = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const nearRef    = useRef<ZoneId | null>(null);

  // Physics state in refs (no re-renders)
  const speed    = useRef(0);
  const angle    = useRef(0);

  // Wheel refs for spin animation
  const wFL = useRef<THREE.Mesh>(null);
  const wFR = useRef<THREE.Mesh>(null);
  const wRL = useRef<THREE.Mesh>(null);
  const wRR = useRef<THREE.Mesh>(null);

  useEffect(() => {
    camera.position.set(0, 16, 22);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;

    const ACCEL      = 18;
    const MAX_SPEED  = 22;
    const REVERSE    = 8;
    const FRICTION   = 0.88;
    const TURN_SPEED = 2.2;

    const fwd  = _keys.has("w") || _keys.has("arrowup");
    const back = _keys.has("s") || _keys.has("arrowdown");
    const left = _keys.has("a") || _keys.has("arrowleft");
    const right= _keys.has("d") || _keys.has("arrowright");

    // Acceleration
    if (fwd)  speed.current = Math.min(speed.current + ACCEL * delta, MAX_SPEED);
    if (back) speed.current = Math.max(speed.current - REVERSE * delta, -MAX_SPEED * 0.4);

    // Friction / coast
    if (!fwd && !back) speed.current *= FRICTION;
    if (Math.abs(speed.current) < 0.05) speed.current = 0;

    // Steering (only when moving)
    const grip = Math.min(Math.abs(speed.current) / MAX_SPEED, 1);
    const dir  = speed.current >= 0 ? 1 : -1;
    if (left)  angle.current += TURN_SPEED * grip * dir * delta;
    if (right) angle.current -= TURN_SPEED * grip * dir * delta;

    // Move
    g.position.x = THREE.MathUtils.clamp(
      g.position.x + Math.sin(angle.current) * speed.current * delta, -62, 62
    );
    g.position.z = THREE.MathUtils.clamp(
      g.position.z + Math.cos(angle.current) * speed.current * delta, -62, 62
    );
    g.rotation.y = angle.current;

    // Spin wheels
    const spinDelta = speed.current * delta * 1.4;
    [wFL, wFR, wRL, wRR].forEach(w => {
      if (w.current) w.current.rotation.x += spinDelta;
    });

    // Camera: follow behind car, slight height
    const CAM_DIST   = 18;
    const CAM_HEIGHT = 11;
    const behindX = g.position.x - Math.sin(angle.current) * CAM_DIST;
    const behindZ = g.position.z - Math.cos(angle.current) * CAM_DIST;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, behindX, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, CAM_HEIGHT, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, behindZ,  0.06);
    camera.lookAt(g.position.x, 0.5, g.position.z);

    // Proximity to zones
    let nearest: ZoneId | null = null;
    let minD = 13;
    for (const b of ZONES) {
      const d = Math.hypot(g.position.x - b.pos[0], g.position.z - b.pos[2]);
      if (d < minD) { minD = d; nearest = b.id; }
    }
    if (nearest !== nearRef.current) { nearRef.current = nearest; _onNear(nearest); }
  });

  const BODY_COLOR = "#6366f1";
  const DARK_BODY  = "#4a4cc4";
  const WHEEL_COL  = "#1a1a1a";
  const HUB_COL    = "#888";

  const WHEEL_POSITIONS: [number, number, number][] = [
    [-1.05, 0, 1.45],   // FL
    [ 1.05, 0, 1.45],   // FR
    [-1.05, 0, -1.45],  // RL
    [ 1.05, 0, -1.45],  // RR
  ];
  const wheelRefs = [wFL, wFR, wRL, wRR];

  return (
    <group ref={groupRef} position={[0, 0.42, 5]}>

      {/* ── Drop shadow ── */}
      <mesh position={[0, -0.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.2, 20]} />
        <meshBasicMaterial color="#000" transparent opacity={0.18} />
      </mesh>

      {/* ── Chassis / lower body ── */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 0.38, 4.2]} />
        <meshStandardMaterial color={BODY_COLOR} roughness={0.28} metalness={0.65} />
      </mesh>

      {/* ── Upper cabin ── */}
      <mesh position={[0, 0.62, -0.15]} castShadow>
        <boxGeometry args={[1.78, 0.55, 2.3]} />
        <meshStandardMaterial color={DARK_BODY} roughness={0.28} metalness={0.65} />
      </mesh>

      {/* ── Windshield (front) ── */}
      <mesh position={[0, 0.66, 0.98]}>
        <boxGeometry args={[1.72, 0.46, 0.05]} />
        <meshStandardMaterial color="#aaddff" transparent opacity={0.55} roughness={0.05} metalness={0.4} />
      </mesh>
      {/* ── Rear window ── */}
      <mesh position={[0, 0.66, -1.27]}>
        <boxGeometry args={[1.72, 0.42, 0.05]} />
        <meshStandardMaterial color="#aaddff" transparent opacity={0.45} roughness={0.05} metalness={0.4} />
      </mesh>

      {/* ── Headlights ── */}
      {([-0.65, 0.65] as number[]).map(x => (
        <group key={x}>
          <mesh position={[x, 0.1, 2.11]}>
            <boxGeometry args={[0.45, 0.2, 0.04]} />
            <meshStandardMaterial color="#fff" emissive="#ffffcc" emissiveIntensity={4} roughness={0.05} />
          </mesh>
          <pointLight position={[x, 0.1, 2.6]} intensity={6} distance={14} color="#ffe8aa" decay={2} />
        </group>
      ))}

      {/* ── Taillights ── */}
      {([-0.65, 0.65] as number[]).map(x => (
        <mesh key={x} position={[x, 0.1, -2.11]}>
          <boxGeometry args={[0.4, 0.18, 0.04]} />
          <meshStandardMaterial color="#ff1100" emissive="#ff0000" emissiveIntensity={3} roughness={0.05} />
        </mesh>
      ))}

      {/* ── Side mirrors ── */}
      {([-1.1, 1.1] as number[]).map(x => (
        <mesh key={x} position={[x, 0.52, 0.7]}>
          <boxGeometry args={[0.06, 0.14, 0.26]} />
          <meshStandardMaterial color={DARK_BODY} roughness={0.4} metalness={0.5} />
        </mesh>
      ))}

      {/* ── Front bumper ── */}
      <mesh position={[0, -0.1, 2.15]} castShadow>
        <boxGeometry args={[2.0, 0.22, 0.12]} />
        <meshStandardMaterial color="#333" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* ── Rear bumper ── */}
      <mesh position={[0, -0.1, -2.15]} castShadow>
        <boxGeometry args={[2.0, 0.22, 0.12]} />
        <meshStandardMaterial color="#333" roughness={0.6} metalness={0.3} />
      </mesh>

      {/* ── Wheels + hubs ── */}
      {WHEEL_POSITIONS.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Tyre */}
          <mesh ref={wheelRefs[i]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.28, 16]} />
            <meshStandardMaterial color={WHEEL_COL} roughness={0.9} metalness={0.05} />
          </mesh>
          {/* Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.24, 0.24, 0.32, 10]} />
            <meshStandardMaterial color={HUB_COL} roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Hub cap */}
          <mesh position={[pos[0] < 0 ? -0.17 : 0.17, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.04, 8]} />
            <meshStandardMaterial color="#ccc" roughness={0.1} metalness={1} emissive="#ffffff" emissiveIntensity={0.2} />
          </mesh>
        </group>
      ))}

      {/* ── GT. nametag floating above car ── */}
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[1.1, 0.32, 0.04]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={3} roughness={0.1} />
      </mesh>
      <pointLight position={[0, 1.5, 0]} intensity={1.2} distance={4} color="#8888ff" />
    </group>
  );
}

function Lighting({ timeOfDay }: { timeOfDay: number }) {
  const sunAngle = ((timeOfDay-6)/24)*Math.PI*2;
  const sunY = Math.sin(sunAngle)*80;
  const sunX = Math.cos(sunAngle)*80;
  const day = sunY > 0;
  const dawn = day && sunY < 25;
  const ambI = day ? 0.12+Math.max(0,sunY/80)*0.45 : 0.04;
  const sunI = day ? Math.max(0,sunY/80)*2.6 : 0;
  const sunColor = dawn ? "#ff9a5c" : "#fff8e0";
  return (
    <>
      <ambientLight intensity={ambI} color={day ? "#ffe8c0" : "#1a1a4a"} />
      <directionalLight position={[sunX,sunY,50]} intensity={sunI} color={sunColor}
        castShadow shadow-mapSize-width={512} shadow-mapSize-height={512}
        shadow-camera-far={120} shadow-camera-left={-55} shadow-camera-right={55}
        shadow-camera-top={55} shadow-camera-bottom={-55} shadow-bias={-0.002}/>
      {/* Cool fill from opposite side */}
      <directionalLight position={[-sunX*0.3, Math.abs(sunY)*0.2+5, -30]} intensity={day?0.3:0.06} color={day?"#c8e8ff":"#2233aa"}/>
      {/* Ground bounce */}
      <hemisphereLight color="#87ceeb" groundColor="#4a7c30" intensity={day?0.3:0.05}/>
    </>
  );
}

function PostFX({ timeOfDay }: { timeOfDay: number }) {
  const sunAngle = ((timeOfDay-6)/24)*Math.PI*2;
  const isNight  = Math.sin(sunAngle) < 0;
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.4} intensity={isNight ? 1.6 : 0.6} mipmapBlur/>
      <Vignette offset={0.35} darkness={isNight ? 0.65 : 0.42} blendFunction={BlendFunction.NORMAL}/>
    </EffectComposer>
  );
}

function Scene({ timeOfDay, weather }: { timeOfDay: number; weather: Weather }) {
  const sunAngle = ((timeOfDay-6)/24)*Math.PI*2;
  const sunY  = Math.sin(sunAngle)*100;
  const sunX  = Math.cos(sunAngle)*100;
  const isNight = sunY < 0;

  return (
    <>
      <Sky sunPosition={[sunX,sunY,60]} turbidity={weather==="clear"?5:14} rayleigh={isNight?0:2.2} mieCoefficient={0.006} mieDirectionalG={0.88}/>
      {isNight && <Stars radius={120} depth={60} count={5000} factor={5} fade/>}
      <fog attach="fog" args={[isNight?"#0a0a2a":weather==="rain"?"#8898aa":"#c8e0f0", 70, 200]}/>
      <Lighting timeOfDay={timeOfDay}/>
      <Terrain/>
      <River/>
      <Bridge/>
      {ZONES.map(b=><Building key={b.id} pos={b.pos} color={b.color} emissive={b.emissive} h={b.h} label={b.label} id={b.id}/>)}
      {TREE_POS.map((p,i)=><Tree key={i} pos={p} seed={i}/>)}
      {/* Street lamps */}
      {[[-3,0,-10],[3,0,-10],[-3,0,10],[3,0,10],[-10,0,-22],[10,0,-22],[-10,0,22],[10,0,22],[-22,0,-10],[22,0,-10],[-22,0,10],[22,0,10]].map((p,i)=>(
        <StreetLamp key={i} pos={p as [number,number,number]}/>
      ))}
      <WeatherParticles weather={weather}/>
      <Car/>
    </>
  );
}

// ──────────────────────────────────────────────────────── React UI layer ──
export default function GamePortfolio() {
  const [timeOfDay, setTimeOfDay] = useState(14);
  const [weather, setWeather]   = useState<Weather>("clear");
  const [nearZone, setNearZone] = useState<ZoneId|null>(null);
  const [activePanel, setActivePanel] = useState<ZoneId|null>(null);
  const nearRef = useRef<ZoneId|null>(null);

  useEffect(()=>{ _onNear=(id)=>{ nearRef.current=id; setNearZone(id); }; }, []);

  useEffect(()=>{
    const dn=(e:KeyboardEvent)=>{
      _keys.add(e.key.toLowerCase());
      if (e.key.toLowerCase()==="e" && nearRef.current) setActivePanel(nearRef.current);
    };
    const up=(e:KeyboardEvent)=>_keys.delete(e.key.toLowerCase());
    window.addEventListener("keydown",dn);
    window.addEventListener("keyup",up);
    return ()=>{ window.removeEventListener("keydown",dn); window.removeEventListener("keyup",up); };
  },[]);

  const sunAngle = ((timeOfDay-6)/24)*Math.PI*2;
  const isNight  = Math.sin(sunAngle) < 0;

  const timeLabel=()=>{
    const h=Math.floor(timeOfDay), m=Math.floor((timeOfDay%1)*60);
    return `${h%12||12}:${m.toString().padStart(2,"0")} ${h>=12?"PM":"AM"}`;
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: isNight?"#05051a":"#87ceeb" }}>
      <Canvas shadows dpr={[1, 1.5]} camera={{ fov:55, near:0.1, far:300 }}
        gl={{ antialias:true, toneMapping:THREE.ACESFilmicToneMapping, toneMappingExposure:1.35, powerPreference:"high-performance" }}>
        <Scene timeOfDay={timeOfDay} weather={weather}/>
        <PostFX timeOfDay={timeOfDay}/>
      </Canvas>

      {/* Logo */}
      <div className="absolute top-5 left-6 z-10 pointer-events-none select-none">
        <span className="font-black text-sm tracking-tighter drop-shadow-lg" style={{ color:isNight?"#fff":"#111", textShadow:isNight?"0 0 20px #6366f1":undefined }}>
          GT<span style={{color:"#6366f1"}}>.</span>
        </span>
      </div>

      {/* Controls panel */}
      <div className="absolute top-5 right-5 z-10 flex flex-col gap-3 items-end">
        <div className="bg-black/55 backdrop-blur-xl rounded-2xl px-5 py-4 border border-white/12 w-64">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold tracking-widest uppercase text-white/55">
              {isNight?"🌙 Night":timeOfDay<8?"🌅 Dawn":timeOfDay>18?"🌆 Dusk":"☀️ Day"}
            </span>
            <span className="text-[12px] font-bold text-white/85 tabular-nums">{timeLabel()}</span>
          </div>
          <input type="range" min={0} max={24} step={0.05} value={timeOfDay}
            onChange={e=>setTimeOfDay(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ background:`linear-gradient(to right,#0d1b55 0%,#ff6b35 25%,#fff5c0 50%,#ff6b35 75%,#0d1b55 100%)` }}
          />
          <div className="flex justify-between mt-1.5 text-[9px] text-white/25">
            <span>12 AM</span><span>6 AM</span><span>12 PM</span><span>6 PM</span><span>12 AM</span>
          </div>
        </div>
        <div className="bg-black/55 backdrop-blur-xl rounded-2xl px-4 py-2.5 border border-white/12 flex items-center gap-1.5">
          {([["clear","☀️","Clear"],["rain","🌧️","Rain"],["snow","❄️","Snow"]] as const).map(([w,icon,label])=>(
            <button key={w} onClick={()=>setWeather(w)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all duration-200 ${weather===w?"bg-white/22 text-white shadow-sm":"text-white/38 hover:text-white/65"}`}>
              <span>{icon}</span>{label}
            </button>
          ))}
        </div>
      </div>

      {/* Near zone prompt */}
      <AnimatePresence>
        {nearZone && !activePanel && (
          <motion.div key={nearZone} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:14}}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <div className="flex items-center gap-3 bg-black/70 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20 shadow-xl">
              <span className="text-xl">{ZONES.find(b=>b.id===nearZone)?.icon}</span>
              <span className="text-white font-bold text-sm">{ZONES.find(b=>b.id===nearZone)?.label}</span>
              <kbd className="text-[10px] font-bold text-black bg-white rounded px-2 py-1 shadow">E</kbd>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls hint */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="flex items-center gap-3 bg-black/45 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10">
          <span className="text-white/40 text-xs">W/S accelerate · A/D steer</span>
          <span className="text-white/15">·</span>
          <span className="text-white/40 text-xs">E to enter a zone</span>
        </div>
      </div>

      {/* Info Panels */}
      <AnimatePresence>
        {activePanel==="about"    && <AboutPanel    onClose={()=>setActivePanel(null)}/>}
        {activePanel==="research" && <ResearchPanel onClose={()=>setActivePanel(null)}/>}
        {activePanel==="projects" && <ProjectsPanel onClose={()=>setActivePanel(null)}/>}
        {activePanel==="contact"  && <ContactPanel  onClose={()=>setActivePanel(null)}/>}
      </AnimatePresence>
    </div>
  );
}
