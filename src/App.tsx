import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { EarthGlobe } from "./components/EarthGlobe";

const LAYERS = ["Earth", "Troposphere", "Stratosphere", "Mesosphere", "Thermosphere", "Exosphere"];
const YEARS = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

// Default Initial View
const DEFAULT_EARTH_DATA = {
  texture: "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
  what: "Global Earth Observation",
  where: "Planetary Surface",
  howMuch: "Baseline View",
  significant: "N/A",
  impact: "Select an atmospheric layer from the left menu to begin investigating the Vertical Fingerprint of Climate Change.",
  satellite: "NASA Earth System",
  scaleLeft: "",
  scaleRight: "",
};

// Troposphere Heatmap Data
const TROPOSPHERE_DATA = {
  "Air Temperature": {
    texture: "/temp-heatmap.jpg", // Make sure this is in your public folder
    what: "Surface/Air Temperature Anomaly (Rapid Warming)",
    where: "Global Land & Northern High Latitudes",
    howMuch: "+0.28 °C / decade",
    significant: "Yes (Mann-Kendall p < 0.01)",
    impact: "Infrared thermal energy is trapped close to the surface, driving extreme agricultural flash droughts and polar melt.",
    satellite: "NASA AIRS & MERRA-2",
    scaleLeft: "COOL (Blue)",
    scaleRight: "HOT (Red)",
  },
  "Carbon Dioxide": {
    texture: "/co2-heatmap.jpg", // Make sure this is in your public folder
    what: "Global CO₂ Concentration (Gas Trapping)",
    where: "Industrial Corridors & Mid-Latitudes",
    howMuch: "420+ ppm (Rising continuously)",
    significant: "Yes (Sen's Slope p < 0.001)",
    impact: "CO₂ acts as the primary blanket preventing thermal radiation from escaping, directly feeding the Tropospheric warming cycle.",
    satellite: "NASA OCO-2",
    scaleLeft: "LOW (Purple)",
    scaleRight: "HIGH (Yellow)",
  }
};

type ParameterKey = keyof typeof TROPOSPHERE_DATA;

export default function App() {
  const [activeLayer, setActiveLayer] = useState<string>("Earth"); // Starts on default Earth
  const [activeParameter, setActiveParameter] = useState<ParameterKey>("Air Temperature");
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [region, setRegion] = useState<string>("Global");

  // Determine which data to show in the Right Inspector Panel
  let currentData;
  if (activeLayer === "Earth") {
    currentData = DEFAULT_EARTH_DATA;
  } else if (activeLayer === "Troposphere") {
    currentData = TROPOSPHERE_DATA[activeParameter];
  } else {
    currentData = {
      texture: DEFAULT_EARTH_DATA.texture,
      what: "Data Pending...",
      where: "TBD",
      howMuch: "TBD",
      significant: "TBD",
      impact: "Researching datasets...",
      satellite: "TBD",
      scaleLeft: "MIN",
      scaleRight: "MAX",
    };
  }

  return (
    <div className="relative w-screen h-screen bg-[#02050E] text-white overflow-hidden font-sans">
      
      {/* 3D GLOBE (BACKGROUND) */}
      <div className="absolute inset-0 z-0">
        <EarthGlobe activeTextureUrl={currentData.texture} />
      </div>

      {/* HUD OVERLAY */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between pointer-events-none">
        
        {/* HEADER */}
        <header className="pointer-events-auto flex items-center justify-between px-8 py-4 backdrop-blur-sm bg-black/10 border-b border-white/5">
          <div className="flex items-center gap-3">
             <span className="font-bold tracking-wider shadow-black drop-shadow-md">ATMOSPHERE 25</span>
          </div>
        </header>

        {/* WORKSPACE */}
        <main className="flex-1 w-full px-8 flex items-center justify-between">
          
          {/* LEFT PANEL - Layer Accordion */}
          <div className="pointer-events-auto w-64 flex flex-col gap-3 backdrop-blur-xl bg-[#0b1221]/50 border border-white/10 p-4 rounded-2xl shadow-2xl">
            {LAYERS.map((layer) => {
              const isActive = activeLayer === layer;
              return (
                <div key={layer} className="flex flex-col gap-1">
                  <button
                    onClick={() => setActiveLayer(layer)}
                    className={`px-4 py-2.5 rounded-lg text-xs font-bold text-left transition-all ${
                      isActive ? "bg-white text-slate-950 shadow-lg" : "bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {layer}
                  </button>
                  
                  {/* Troposphere Sub-Menu */}
                  {isActive && layer === "Troposphere" && (
                    <div className="flex flex-col gap-1 pl-4 mt-1 border-l-2 border-white/20 ml-2">
                      {(Object.keys(TROPOSPHERE_DATA) as ParameterKey[]).map((param) => (
                        <button
                          key={param}
                          onClick={() => setActiveParameter(param)}
                          className={`px-3 py-1.5 rounded text-[11px] font-semibold text-left transition-all ${
                            activeParameter === param ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" : "text-slate-400 hover:text-white"
                          }`}
                        >
                          • {param}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-2 border-t border-white/10 mt-2">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 block mb-2 uppercase">Regions</span>
              <button 
                onClick={() => setRegion(region === "Global" ? "South Asia" : "Global")}
                className="w-full bg-white/5 border border-white/10 px-3 py-2 rounded text-xs text-left flex items-center justify-between hover:bg-white/10 transition"
              >
                <span>{region}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* RIGHT PANEL - Statistical Inspector */}
          <div className="pointer-events-auto w-80 backdrop-blur-xl bg-[#0b1221]/60 border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-xs font-bold tracking-widest text-slate-100 uppercase drop-shadow-md">
                {activeLayer} DATA
              </h2>
              <span className="text-[10px] px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {currentData.satellite}
              </span>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">1. What is Changing?</p>
              <p className="text-xs text-slate-200 mt-1">{currentData.what}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">2. How Much?</p>
              <p className="text-xs font-bold text-amber-400 mt-1">{currentData.howMuch}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">3. Statistically Significant?</p>
              <p className="text-xs text-emerald-300 mt-1">{currentData.significant}</p>
            </div>
            <div className="border-t border-white/10 pt-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">System Connection</p>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{currentData.impact}</p>
            </div>
          </div>
        </main>

        {/* BOTTOM HUD - Dynamic Legend */}
        <footer className="pointer-events-auto relative flex flex-col items-center pb-6 gap-3">
          {activeLayer !== "Earth" && (
            <div className="backdrop-blur-xl bg-[#0b1221]/80 border border-white/10 rounded-xl px-8 py-3 w-[560px] flex items-center justify-between shadow-2xl">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">CURRENT MAP</span>
                <span className="text-xs font-bold text-slate-100">{activeParameter}</span>
              </div>

              <div className="flex flex-col items-end gap-1.5">
                <div className="flex items-center gap-2.5 text-[9px] text-slate-300 font-bold">
                  <span>{currentData.scaleLeft}</span>
                  <div className={`w-32 h-1.5 rounded-full shadow-inner ${
                    activeParameter === "Carbon Dioxide" 
                      ? "bg-gradient-to-r from-purple-700 via-orange-500 to-yellow-300"
                      : "bg-gradient-to-r from-cyan-400 via-slate-500 to-red-500"
                  }`} />
                  <span>{currentData.scaleRight}</span>
                </div>
              </div>
            </div>
          )}
        </footer>

      </div>
    </div>
  );
}