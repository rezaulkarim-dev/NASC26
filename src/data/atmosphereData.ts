export interface LayerInfo {
  id: string;
  name: string;
  altitude: string;
  shellCount: number;
  what: string;
  where: string;
  howMuch: string;
  significant: string;
  impactStory: string;
  trendMetric: string;
  trendRate: string;
  isModelDerived?: boolean;
}

export const ATMOSPHERE_LAYERS: Record<string, LayerInfo> = {
  Troposphere: {
    id: "troposphere",
    name: "Troposphere",
    altitude: "0 - 12 km",
    shellCount: 1,
    what: "Surface/Air Temperature, Water Vapor & Aerosol Optical Depth",
    where: "Global Land & Northern High Latitudes",
    howMuch: "+0.28 °C / decade",
    significant: "Mann-Kendall p = 0.0003 (p < 0.05)",
    impactStory: "Directly alters soil moisture, accelerates evaporation, and intensifies extreme agricultural flash droughts.",
    trendMetric: "Temperature trend",
    trendRate: "+0.28 °C / decade"
  },
  Stratosphere: {
    id: "stratosphere",
    name: "Stratosphere",
    altitude: "11 - 50 km",
    shellCount: 2,
    what: "Ozone Concentration Recovery & Stratospheric Radiative Cooling",
    where: "Polar Vortex & Mid-Latitudes",
    howMuch: "+3.8 DU / decade (Ozone) | -0.42 °C / decade (Temp)",
    significant: "Mann-Kendall p = 0.0012 (p < 0.05)",
    impactStory: "Modulates harmful UV radiation reaching Earth's surface, marine phytoplankton, and human populations.",
    trendMetric: "Ozone trend",
    trendRate: "+3.8 DU / decade"
  },
  Mesosphere: {
    id: "mesosphere",
    name: "Mesosphere",
    altitude: "50 - 85 km",
    shellCount: 3,
    what: "Kinetic Temperature Contraction & Water Vapor Injections",
    where: "Middle Atmosphere (South Asia Focus)",
    howMuch: "-0.75 °C / decade",
    significant: "Mann-Kendall p = 0.0008 (p < 0.05)",
    impactStory: "Middle-atmosphere cooling couples upward with atmospheric gravity waves and dynamical circulation.",
    trendMetric: "Temperature trend",
    trendRate: "+0.32 °C / decade"
  },
  Thermosphere: {
    id: "thermosphere",
    name: "Thermosphere",
    altitude: "85 - 800 km",
    shellCount: 4,
    what: "Neutral Mass Atmospheric Density",
    where: "Low Earth Orbit (LEO, 175 - 825 km)",
    howMuch: "-2.1% density / decade",
    significant: "Mann-Kendall p = 0.0021 (p < 0.05)",
    impactStory: "Modulates atmospheric drag on active satellites and increases the lifetime of hazardous space debris.",
    trendMetric: "Neutral Density trend",
    trendRate: "-2.1% / decade"
  },
  Exosphere: {
    id: "exosphere",
    name: "Exosphere",
    altitude: "> 800 km",
    shellCount: 5,
    what: "Model-Derived Exospheric Density & Escape Flux",
    where: "Planetary Boundary & Geocorona",
    howMuch: "Contracting Base Density",
    significant: "CCMC NRLMSISE-00 Reference Model Extension",
    impactStory: "Boundary zone governing light gas escape (Hydrogen/Helium) and space-weather interactions.",
    trendMetric: "Modeled Density trend",
    trendRate: "Model Projected",
    isModelDerived: true
  }
};