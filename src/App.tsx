import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { ATMOSPHERE_LAYERS, type LayerInfo } from "./data/atmosphereData";
import { EarthGlobe } from "./components/EarthGlobe";

const LAYERS = ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere", "Exosphere"];
const YEARS = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

export default function App() {
  const [activeLayer, setActiveLayer] = useState<string>("Troposphere");
  const [selectedYear, setSelectedYear] = useState<number>(2010);
  const [region, setRegion] = useState<string>("South Asia");
  const [stepIndex, setStepIndex] = useState<number>(1);

  const layerData: LayerInfo = ATMOSPHERE_LAYERS[activeLayer];

  const handleNextStep = () => {
    const next = stepIndex < 6 ? stepIndex + 1 : 1;
    setStepIndex(next);
    if (next <= 5) setActiveLayer(LAYERS[next - 1]);
  };

  const handlePrevStep = () => {
    const prev = stepIndex > 1 ? stepIndex - 1 : 6;
    setStepIndex(prev);
    if (prev <= 5) setActiveLayer(LAYERS[prev - 1]);
  };

  const handleLayerSelect = (name: string, index: number) => {
    setActiveLayer(name);
    setStepIndex(index + 1);
  };

  return (
    <div className="relative w-screen h-screen bg-[#02050E] text-white overflow-hidden font-sans">
      
      {/* 1. FULL-SCREEN 3D GLOBE (BACKGROUND) */}
      <div className="absolute inset-0 z-0">
        <EarthGlobe activeShellCount={layerData.shellCount} />
      </div>

      {/* 2. SCI-FI HUD OVERLAY (FOREGROUND) 
          pointer-events-none allows dragging the background to rotate the Earth */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between pointer-events-none">
        
        {/* TOP NAVBAR */}
        {/* pointer-events-auto re-enables clicking for this specific panel */}
        <header className="pointer-events-auto flex items-center justify-between px-8 py-4 backdrop-blur-sm bg-black/10 border-b border-white/5">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-400 to-cyan-300 p-[2px] flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <div className="w-full h-full bg-[#02050E] rounded-full flex items-center justify-center text-[10px] font-bold">
                25
              </div>
            </div>
            <span className="font-semibold tracking-wider text-xs shadow-black drop-shadow-md">ATMOSPHERE 25</span>
          </div>

          <nav className="flex items-center gap-10 text-xs font-medium text-slate-200 drop-shadow-md">
            <button className="hover:text-white transition">Home</button>
            <button className="hover:text-white transition">Mars</button>
            <button className="text-white border-b-2 border-blue-400 pb-1">Earth</button>
            <button className="hover:text-white transition">Venus</button>
            <button className="hover:text-white transition">Jupiter</button>
          </nav>

          <div className="flex items-center gap-5 text-xs">
            <button className="text-slate-200 hover:text-white transition drop-shadow-md">Login</button>
            <button className="px-5 py-2 rounded-full bg-blue-600/80 hover:bg-blue-500 backdrop-blur-md border border-blue-400/30 text-white font-medium transition shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              Sign Up
            </button>
          </div>
        </header>

        {/* MAIN WORKSPACE (Left & Right Panels) */}
        <main className="flex-1 w-full px-8 flex items-center justify-between">
          
          {/* Left Controls - Frosted Glass Card */}
          <div className="pointer-events-auto w-52 flex flex-col gap-5 backdrop-blur-xl bg-[#0b1221]/40 border border-white/10 p-4 rounded-2xl shadow-2xl">
            <div className="flex flex-col gap-2">
              {LAYERS.map((layer, idx) => {
                const isActive = activeLayer === layer;
                return (
                  <button
                    key={layer}
                    onClick={() => handleLayerSelect(layer, idx)}
                    className={`px-4 py-2.5 rounded-lg text-xs font-semibold text-left transition-all duration-300 ${
                      isActive
                        ? "bg-white text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-[1.02]"
                        : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5"
                    }`}
                  >
                    {layer}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 block mb-2 uppercase">
                Regions
              </span>
              <button 
                onClick={() => setRegion(region === "South Asia" ? "Global" : "South Asia")}
                className="w-full bg-white/5 border border-white/10 px-3 py-2 rounded text-xs text-left flex items-center justify-between hover:bg-white/10 transition"
              >
                <span>{region}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            <div className="pt-1">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 block mb-2 uppercase">
                Timeline Grid
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {YEARS.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`py-1.5 px-1 text-[11px] rounded transition border ${
                      selectedYear === yr
                        ? "bg-blue-500/30 text-blue-100 font-bold border-blue-400/50"
                        : "bg-white/5 text-slate-300 border-white/5 hover:bg-white/10"
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Inspector Panel - Frosted Glass Card */}
          <div className="pointer-events-auto w-80 backdrop-blur-xl bg-[#0b1221]/50 border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-xs font-bold tracking-widest text-slate-100 uppercase drop-shadow-md">
                What Change in Earth
              </h2>
              <span className="text-[10px] px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold">
                {layerData.altitude}
              </span>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">1. What is Changing?</p>
              <p className="text-xs text-slate-200 mt-1 drop-shadow-sm">{layerData.what}</p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">2. Where?</p>
              <p className="text-xs text-slate-200 mt-1 drop-shadow-sm">{layerData.where}</p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">3. How Much?</p>
              <p className="text-xs font-bold text-amber-400 mt-1 drop-shadow-sm">{layerData.howMuch}</p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">4. Is it Significant?</p>
              <p className="text-xs text-emerald-400 mt-1 font-bold drop-shadow-sm">{layerData.significant}</p>
            </div>

            <div className="border-t border-white/10 pt-3">
              <p className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold">5. System Connection</p>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed drop-shadow-sm">{layerData.impactStory}</p>
            </div>
          </div>
        </main>

        {/* BOTTOM HUD */}
        <footer className="pointer-events-auto relative flex flex-col items-center pb-6 gap-3">
          <div className="backdrop-blur-xl bg-[#0b1221]/60 border border-white/10 rounded-xl px-8 py-3 w-[560px] flex items-center justify-between shadow-2xl">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">{region}</span>
              <span className="text-xs font-bold text-slate-100">{layerData.trendMetric}</span>
              <span className="text-xs font-extrabold text-amber-400 ml-3">{layerData.trendRate}</span>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-2.5 text-[9px] text-slate-300 font-bold">
                <span>DECREASING</span>
                <div className="w-28 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-slate-500 to-orange-500 shadow-inner" />
                <span>INCREASING</span>
              </div>
              <span className="text-[8px] text-slate-400 tracking-widest font-semibold">ANALYSIS PERIOD: 2000 - 2025</span>
            </div>
          </div>

          <div className="flex items-center gap-4 backdrop-blur-md bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs text-slate-200 shadow-lg">
            <button onClick={handlePrevStep} className="hover:text-white hover:scale-110 transition">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-[11px] font-bold tracking-widest">{stepIndex} / 6</span>
            <button onClick={handleNextStep} className="hover:text-white hover:scale-110 transition">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}