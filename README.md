# EARTH//ORBIT — Earth System Trend Detective

> **A NASA-data-driven atmospheric trend exploration platform**

EARTH//ORBIT is an interactive visualization project designed to help users explore **how Earth's atmosphere is changing across different atmospheric layers and through time**.

The project approaches Earth-system analysis as a **trend-detection mission**: select an atmospheric layer, investigate relevant NASA observations, analyze long-term changes, and connect those changes to their potential Earth-system impacts.

## Current MVP

**MVP:** [EARTH//ORBIT Web Application](https://craft-kind-build.lovable.app/)

**Project Video:** [Watch on YouTube](https://www.youtube.com/watch?v=80NcQQ_SNIo)

The current MVP demonstrates:

* Five atmospheric layers

  * Troposphere
  * Stratosphere
  * Mesosphere
  * Thermosphere
  * Exosphere
* NASA observation dataset selection
* Long-term time-series exploration
* Mann–Kendall trend testing
* Theil–Sen slope estimation
* Atmospheric-layer-based storytelling
* Interactive trend investigation workflow

> **Current status:** The MVP is a functional prototype. Some displayed series are demonstration data modeled on published NASA trends. Direct NASA-data integration and expanded analysis are part of the ongoing development.

---

## Project Goal

EARTH//ORBIT aims to transform complex atmospheric observations into an understandable **"What → Where → How Much → Is It Significant → Why It Matters"** workflow.

### Core Questions

**WHAT changed?**
Identify the atmospheric variable and its long-term behavior.

**WHERE did it change?**
Explore the relevant atmospheric layer and geographic region.

**HOW MUCH did it change?**
Estimate the magnitude and rate of change.

**IS IT SIGNIFICANT?**
Apply statistical trend analysis and uncertainty-aware interpretation.

**WHY DOES IT MATTER?**
Connect detected atmospheric changes to Earth-system and environmental impacts.

---

## Atmospheric Layers

| Layer        | Approx. Altitude | Example Focus                      |
| ------------ | ---------------: | ---------------------------------- |
| Troposphere  |          0–12 km | Temperature, water vapor, aerosols |
| Stratosphere |         12–50 km | Ozone, temperature                 |
| Mesosphere   |         50–85 km | Atmospheric temperature            |
| Thermosphere |        85–600 km | Upper-atmosphere dynamics          |
| Exosphere    |    600–10,000 km | Transition to space                |

---

## NASA Data Sources

The project uses NASA Earth-science observations and datasets as the foundation for future data integration.

### NASA Earthdata

NASA's primary Earth-observation data portal:

https://www.earthdata.nasa.gov/

NASA Earthdata provides access to Earth-science datasets covering atmospheric temperature, water vapor, aerosols, ozone, radiation, and other variables.

### NASA Earthdata Search

https://search.earthdata.nasa.gov/

Useful for searching NASA's large collection of Earth-observation datasets by variable, location, and time period.

### NASA Earth Science Data

https://science.nasa.gov/earth/data/

NASA's Earth-science data gateway.

### NASA Open Data

https://data.nasa.gov/

NASA's public data catalog.

### NASA My NASA Data

https://mynasadata.larc.nasa.gov/

Useful Earth-system datasets include long-term surface temperature, aerosol optical depth, ozone, and other atmospheric variables.

### MODIS Atmosphere Products

NASA MODIS provides atmospheric products covering variables such as:

* Aerosol optical depth
* Water vapor
* Ozone
* Cloud properties
* Atmospheric stability

Example:

**MODIS/Terra Aerosol Cloud Water Vapor Ozone Daily L3 Global 1°**

https://data.nasa.gov/dataset/modis-terra-aerosol-cloud-water-vapor-ozone-daily-l3-global-1deg-cmg-9e550

The product contains global 1° × 1° atmospheric observations and includes aerosol, ozone, water-vapor and cloud-related measurements.

---

## Analysis Method

The project currently focuses on robust non-parametric trend analysis.

### Mann–Kendall Test

Used to determine whether a statistically significant monotonic trend exists in a time series.

### Theil–Sen Estimator

Used to estimate the magnitude of the trend using a robust median slope.

This combination helps reduce sensitivity to outliers and non-normal distributions.

---

## Current Progress

### Phase 1 — Concept & Interface

* [x] Project concept
* [x] Atmospheric layer model
* [x] Initial UI/UX
* [x] Interactive layer selection
* [x] NASA dataset selection concept
* [x] Trend-analysis workflow

### Phase 2 — MVP

* [x] Functional web prototype
* [x] Time-window selection
* [x] Demonstration trend series
* [x] Mann–Kendall analysis concept
* [x] Theil–Sen trend estimation
* [x] Atmospheric storytelling interface

### Phase 3 — NASA Data Integration

* [ ] Connect real NASA datasets
* [ ] Automated data retrieval
* [ ] Data preprocessing pipeline
* [ ] Geographic filtering
* [ ] Multi-variable analysis
* [ ] Missing-data handling

### Phase 4 — Trend Detective Engine

* [ ] Confidence intervals
* [ ] Trend classification
* [ ] Spatial trend maps
* [ ] Decadal change calculations
* [ ] Cross-variable comparison
* [ ] Impact interpretation

### Phase 5 — Final Platform

* [ ] Complete five-layer data coverage
* [ ] Downloadable datasets
* [ ] Reproducible analysis pipeline
* [ ] Methodology documentation
* [ ] Final interactive dashboard

---

## Project Status

**Status:** MVP / Active Development

The current repository represents the **early development and progress stage** of EARTH//ORBIT.

The main objective now is to transition from the current prototype and demonstration data toward a reproducible pipeline using **real NASA observations**.

---

## Links

* **Live MVP:** https://craft-kind-build.lovable.app/
* **Project Video:** https://www.youtube.com/watch?v=80NcQQ_SNIo
* **NASA Earthdata:** https://www.earthdata.nasa.gov/
* **NASA Earthdata Search:** https://search.earthdata.nasa.gov/
* **NASA Earth Science Data:** https://science.nasa.gov/earth/data/
* **NASA Open Data:** https://data.nasa.gov/
* **My NASA Data:** https://mynasadata.larc.nasa.gov/

---

## Built For

**NASA Space Apps Challenge 2026**

### Challenge

**Be An Earth System Trend Detective!**

EARTH//ORBIT explores Earth's atmosphere as a connected system and turns long-term observations into an interactive trend-detection experience.
