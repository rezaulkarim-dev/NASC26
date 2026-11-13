# EARTH//ORBIT — The Earth Detective Agency

**Five Layers. One Planet. A System of Secrets.**

**Event:** NASA International Space Apps Challenge 2026 (Theme: *The Next Frontier*)  
**Challenge:** *Be An Earth System Trend Detective!*  
**Team:** Team Duurbin (Bangladesh)

[![Live Game](https://img.shields.io/badge/LIVE_GAME-earthorbit--nasa.netlify.app-f59e0b?style=for-the-badge)](https://earthorbit-nasa.netlify.app/)
[![NASA Space Apps 2026](https://img.shields.io/badge/NASA_Space_Apps_2026-Trend_Detective-0284c7?style=for-the-badge)](https://www.spaceappschallenge.org/)
[![License MIT](https://img.shields.io/badge/License-MIT_Open_Source-10b981?style=for-the-badge)](#license-and-open-source-compliance)

---

## High-Level Summary

**EARTH//ORBIT (The Earth Detective Agency)** is an interactive 2D scientific role-playing game (RPG) that transforms over 40 years of NASA satellite and reanalysis observations into a hands-on mystery across all five layers of Earth's atmosphere (0 km to 10,000 km). Built for high school students, university learners, educators, and citizen scientists, it solves the problem of overwhelming, disconnected climate datasets by empowering players to investigate how a single physical process drives opposite trends in different atmospheric regions. Guided by scientific mentors (Dr. Nova, Commander Atlas, and ORBIT AI), players operate interactive satellite consoles, run live non-parametric Mann-Kendall significance tests and Theil-Sen slope estimators in the browser, and connect multi-layer evidence on an interactive Evidence Wall to certify their final Earth System Dossier.

* **Live Playable Demo (No Login Required):** [https://earthorbit-nasa.netlify.app/](https://earthorbit-nasa.netlify.app/)

---

## Project Details

### 1. The Challenge We Answered: "Be An Earth System Trend Detective!"

In Earth system science, a single physical process can cause measured variables to trend in **one direction in one region and the opposite direction in another**. Nowhere is this paradox clearer than in Earth's vertical atmospheric column:

* **Lower Atmosphere Warming:** In the **Troposphere (0-12 km)**, rising greenhouse gas concentrations trap outgoing infrared radiation, warming the lower atmosphere (+1.18 deg C) and increasing water vapor capacity (~7% per deg C).
* **Upper Atmosphere Cooling and Contraction:** Simultaneously, in the **Stratosphere (12-50 km)**, **Mesosphere (50-85 km)**, and **Thermosphere (85-600 km)**, those same greenhouse gases (CO2) and nitric oxide (NO) radiate heat outward into space—causing the middle and upper atmosphere to cool and physically contract, shifting the **Exosphere (600-10,000 km)** boundary downward.

For students and the general public, raw satellite tables and isolated academic papers fail to communicate how these opposite trends are physically and statistically linked. **EARTH//ORBIT** turns the user into **Steve**, a Junior Detective at the Earth Detective Agency, who ascends through all five atmospheric layers to uncover the truth.

---

### 2. How It Works: Five Layers, Ten Instruments, and Live Statistical Testing

Players navigate a multi-room pixel-art orbital complex using `WASD` / `Arrow Keys`, mouse click-to-walk, or an on-screen mobile D-pad, boarding the **Atmospheric Elevator** to investigate five distinct stations:

| Station & Layer | Altitude | Interactive Consoles | Core Scientific & Statistical Task |
| :--- | :--- | :--- | :--- |
| **0. EDA Ground Base** | 0.0 km | Home Satellite Terminal & Main Bridge | Detect the encrypted multi-layer anomaly signal and receive mission clearance from Commander Atlas. |
| **1. Troposphere Sky-Station** | 0-12 km | 1A: Weather Signal Scanner & 1B: AIRS Profile Lab | Compare regional warming and moisture trends (Tropical Pacific, Arctic Basin, Bay of Bengal) and vertical lapse rates (-6.0 deg C/km) to unlock Card 01. |
| **2. Stratosphere Ozone Lab** | 12-50 km | 2A: Ozone Console & 2B: Mann-Kendall Trend Lab | Slice 1979-2025 ozone and temperature time series (CFC depletion vs. Montreal Protocol recovery) and run live Mann-Kendall and Theil-Sen tests to unlock Card 02. |
| **3. Mesosphere Observatory** | 50-85 km | 3A: SABER Receiver & 3B: Missing Data Console | Detect steep mesopause cooling (-1.8 deg C/decade) while transparently documenting the 32% satellite limb-sampling gap to unlock Card 03. |
| **4. Thermosphere Orbital Deck** | 85-600 km | 4A: TIMED/GOLD Tracker & 4B: Aurora Comparator | Separate 11-year solar EUV/auroral oscillations from long-term neutral density contraction (-3.8%/decade) across the overlapping Ionosphere to unlock Card 04. |
| **5. Exosphere Complex** | 600-10,000 km | 5A: Geocorona Scanner, 5B: Exobase Analyzer & Vault | Scan the ultraviolet hydrogen Geocorona, measure exobase contraction (-12.5 km/decade) for Card 05, link all 5 layers on the Evidence Wall, and submit the Final Report. |

---

### 3. Built-In Statistical Engine (Mann-Kendall and Theil-Sen)

Rather than showing static pre-rendered charts, Instrument 2B executes live non-parametric statistical trend tests directly in JavaScript as players adjust time windows (1979-1997, 2000-2025, or 1979-2025):

* **Mann-Kendall Statistic (S):** Evaluates monotonic trend direction across all pairwise time-series observations by comparing every earlier data point against every later data point.
* **Standardized Test Statistic (Z) and Significance (p-value):** Computes sample variance and two-tailed p-values to test whether an observed trend is statistically significant (p < 0.001) or within random natural variability.
* **Theil-Sen Robust Slope Estimator:** Computes the median of all pairwise slopes (`change in value / change in time`) to determine the rate of change per decade while guarding against short-term outliers such as temporary volcanic aerosol spikes (1982 El Chichon and 1991 Mt. Pinatubo).

---

### 4. Highlighted Features

* **Judge Fast-Track Sandbox (`JUDGE / SETTINGS`):** All 5 atmospheric floors are unlocked in the Atmospheric Elevator from the very start. Judges can also click **"Unlock All 5 Evidence Cards & Open Evidence Wall"** in the settings menu to test the end-game synthesis immediately.
* **Dynamic Character Expression Engine:** Custom 6-emotion sprite system (`Neutral`, `Explaining`, `Thinking`, `Concerned`, `Surprised`, `Happy`) for Dr. Nova and ORBIT AI, paired with custom portraits for Commander Atlas and Junior Detective Steve.
* **Procedural Web Audio Synthesizer:** Zero external audio files required—ambient space chords, typewriter blips, radar sweeps, and airlock doors are synthesized live via the browser's `AudioContext`.
* **One-Click Dossier Export:** Players can edit their scientific synthesis notes and copy a formatted text dossier of their multi-layer findings directly to their clipboard.

---

### 5. What We Would Build Next (Future Roadmap)

1. **Live NASA Earthdata and Giovanni API Streaming:** Connect the in-game consoles to live NASA CMR and OPeNDAP endpoints so advanced students can pull custom latitude and longitude bounding boxes in real time.
2. **Expanded Earth Spheres (Hydrosphere, Cryosphere, and Biosphere Cases):** Add new detective cases investigating GLDAS soil moisture and streamflow trends, GRACE-FO ice-sheet mass balance, and MODIS vegetation indices.
3. **Multilingual Classroom Mode (Bengali and Global Languages):** Add a one-click language toggle (starting with Bengali for secondary schools across Bangladesh) and a teacher dashboard with printable lab worksheets.
4. **AI Co-Investigator Mode:** Allow students to ask open-ended statistical questions about any time series and receive guided hints on autocorrelation, seasonality removal, and p-value interpretation.

---

## Data Used (NASA Data Sources)

Every NASA dataset below is integrated into the gameplay consoles, cited inside the in-game **`NASA SOURCES`** modal, and demonstrated on camera in our submission videos:

| Dataset Name | Link | How We Used It |
| :--- | :--- | :--- |
| **NASA GPM (Global Precipitation Measurement — IMERG)** | [https://gpm.nasa.gov/data](https://gpm.nasa.gov/data) | Used in Instrument 1A (Troposphere Scanner) to visualize regional precipitation intensity and +7.1% to +7.8%/decade moisture convergence trends across the Tropical Pacific and Bay of Bengal. |
| **NASA MODIS (Terra & Aqua)** | [https://modis.gsfc.nasa.gov/data/](https://modis.gsfc.nasa.gov/data/) | Used in Instrument 1A (Troposphere Scanner) to pair cloud-top properties and surface temperature anomalies with lower-atmospheric water vapor feedback. |
| **NASA AIRS (Atmospheric Infrared Sounder — Aqua)** | [https://airs.jpl.nasa.gov/data/get-data/](https://airs.jpl.nasa.gov/data/get-data/) | Used in Instrument 1B (AIRS Vertical Profile Lab) to model vertical tropospheric temperature lapse rates (-6.0 deg C/km), pressure decay (hPa), and water vapor concentration (ppmv) from 0-12 km. |
| **NASA TOMS / OMI (Aura) / OMPS Merged Ozone Record** | [https://ozonewatch.gsfc.nasa.gov/](https://ozonewatch.gsfc.nasa.gov/) | Used in Instruments 2A and 2B (Stratosphere Lab) to plot the 1979-2025 global total column ozone time series (in Dobson Units) and test CFC-era depletion (1979-1997) vs. Montreal Protocol recovery (2000-2025). |
| **NASA GMAO MERRA-2 Reanalysis** | [https://gmao.gsfc.nasa.gov/reanalysis/merra-2/](https://gmao.gsfc.nasa.gov/reanalysis/merra-2/) | Used in Instruments 1A, 2A, and 2B to analyze Polar Amplification in the Arctic Basin (+3.12 deg C) and run Mann-Kendall and Theil-Sen tests on middle-stratospheric radiative cooling (-0.58 deg C/decade). |
| **NASA TIMED / SABER Infrared Limb Sounder** | [https://saber.gats-inc.com/](https://saber.gats-inc.com/) | Used in Instruments 3A and 3B (Mesosphere Observatory) to demonstrate -1.8 deg C/decade mesopause cooling at 76 km while teaching students how to account for a 32% limb-sampling coverage gap. |
| **NASA AIM (Aeronomy of Ice in the Mesosphere)** | [https://lasp.colorado.edu/aim/](https://lasp.colorado.edu/aim/) | Used in Layer 3 (Mesosphere Observatory) to contextualize noctilucent (polar mesospheric) ice cloud shifts near the -88.4 deg C mesopause boundary. |
| **NASA GOLD & TIMED Upper-Atmosphere Missions** | [https://gold.cs.ucf.edu/](https://gold.cs.ucf.edu/) | Used in Instruments 4A and 4B (Thermosphere Deck) to track orbital drag and separate 11-year solar EUV/auroral cycles from multi-decade thermospheric neutral density contraction (-3.8%/decade). |
| **NASA TWINS & Carruthers Geocorona Observatory** | [https://twins.swri.edu/](https://twins.swri.edu/) | Used in Instruments 5A and 5B (Exosphere Deck) to simulate far-ultraviolet Lyman-alpha hydrogen Geocorona density (atoms/cm3), Jeans ballistic escape flux, and exobase downward shift (-12.5 km/decade). |

---

## Tools and Technologies

* **Frontend & Game Engine:** Custom HTML5 `<canvas>` 2D tilemap, collision, and Y-sorted humanoid sprite rendering engine written in 100% Vanilla JavaScript (ES6+) with zero external framework bloat.
* **UI & Styling:** Custom CSS3 RPG Maker MZ-inspired window skin, CSS sprite-sheet slicer (`600% x 200%` 6-column emotion grid), and responsive Flexbox/Grid layouts.
* **Statistical Computing:** Custom client-side JavaScript implementation of the non-parametric Mann-Kendall Trend Test, normal error-function (Z-to-p) approximation, and Theil-Sen Median Slope Estimator.
* **Audio Engine:** Native browser Web Audio API (`AudioContext`) procedural retro synth and ambient chord generator.
* **Typography:** Google Fonts (`Orbitron`, `Chakra Petch`, `JetBrains Mono`, and `Inter` — Open Font License).
* **Deployment & Hosting:** Continuous deployment via Netlify ([https://earthorbit-nasa.netlify.app/](https://earthorbit-nasa.netlify.app/)).

---

## Quick Start (Run Locally in 5 Seconds)

Because **EARTH//ORBIT** is engineered as a zero-dependency web application, anyone can run it offline or locally without installing Node.js or build tools:

1. **Clone the repository:**
   ```bash
   git clone <YOUR_GITHUB_REPOSITORY_URL>
   cd earth-orbit
   ```
2. **Launch the game:**
   * Double-click `index.html` to open it directly in any modern browser (Chrome, Edge, Firefox, Safari), or
   * Serve via a local static server:
     ```bash
     python -m http.server 8080
     ```

---

## Team Duurbin

| Team Member | Role | Key Contributions |
| :--- | :--- | :--- |
| **Utpal Barua** | Team Lead & Researcher | Atmospheric science synthesis across all 5 layers, NASA satellite dataset curation, statistical methodology (Mann-Kendall & Theil-Sen), and mission design. |
| **MD. Sajjed Hossain Simon** | Backend & Database Engineer | Statistical computation engine, multi-layer telemetry data structures, state persistence (`localStorage`), and evidence verification logic. |
| **MD Rezaul Karim** | Project Manager & Developer | 2D RPG canvas engine, interactive instrument consoles, character portrait and expression integration, UI/UX polish, video production, and Netlify deployment. |

---

## Use of AI and Asset Disclosure

In full compliance with the **NASA Space Apps Challenge 2026 Participant Guide** (Section 10 & Section 15):

* **AI Tools Used:**
  * **Google Gemini:** Used as a coding and documentation assistant to help structure the single-file HTML5/JS canvas architecture, debug CSS sprite-sheet positioning for character portraits, and format project documentation.
  * **Character Portrait Artwork:** Custom character portraits (`Dr. Nova and Orbit Expression Sheet.png`, `Commander Atlas.png`, and `user.png` for Junior Detective Steve) were created using AI image generation prompts specifying *"2D sci-fi RPG bust portraits, female atmospheric scientist with blue goggles in white lab coat, autonomous white/cyan AI robot probe, space agency director, and junior field detective across 6 expressions"*, paired with hand-coded SVG vector fallbacks built directly into the game engine.
* **Data Integrity:** AI did not fabricate scientific findings; all trend directions, altitude boundaries, and statistical mechanics are grounded in published NASA mission records (GPM, MODIS, AIRS, TOMS/OMI/OMPS, MERRA-2, TIMED/SABER, AIM, GOLD, and TWINS).
* **Under-18 Compliance:** No recognizable names, voices, or likenesses of anyone under the age of 18 appear in this repository, application, or accompanying videos.

---

## References and Citations

1. NASA Earthdata: *Remote Sensors & Earth Observation Data* — [https://www.earthdata.nasa.gov/](https://www.earthdata.nasa.gov/)
2. NASA Ames Earth Science Division: *Atmospheric Structure & Composition* — [https://www.nasa.gov/ames/earth-science/](https://www.nasa.gov/ames/earth-science/)
3. NASA Ozone Watch (GSFC): *Merged TOMS/OMI/OMPS Total Ozone Record* — [https://ozonewatch.gsfc.nasa.gov/](https://ozonewatch.gsfc.nasa.gov/)
4. NASA GMAO: *MERRA-2 Reanalysis* — Gelaro, R., et al. (2017), *The Modern-Era Retrospective Analysis for Research and Applications, Version 2 (MERRA-2)*, Journal of Climate.
5. NASA TIMED/SABER & GOLD Missions: *Upper-Atmospheric Radiative Cooling and Neutral Density Contraction Studies* — [https://saber.gats-inc.com/](https://saber.gats-inc.com/) & [https://gold.cs.ucf.edu/](https://gold.cs.ucf.edu/)
6. Mann, H. B. (1945), *Nonparametric tests against trend*, Econometrica; Sen, P. K. (1968), *Estimates of the regression coefficient based on Kendall's tau*, Journal of the American Statistical Association.

---

## License and Open-Source Compliance

This project is released under the **MIT License** in accordance with NASA Space Apps Challenge open-source rules. All code and documentation are openly accessible for judges, educators, and students worldwide.
