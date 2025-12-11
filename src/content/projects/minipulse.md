---
title: Embedded Software Engineer
tags: [nasa, esp32, c++]
projectName: Realtime Satellite Data Visualizer
client: "NASA's Jet Propulsion Laboratory"
endMonthYear: Oct 2022
startMonthYear: Jan 2022
subClient: Stratin Engineering
image: /src/images/projects/jpl-minipulse/minipulse.jpg
imageAlt: NASA JPL MiniPulse LED Sculpture.
imageAlign: right
imageMaxHeight: 16rem
tech:
  [C++, ESP32, PlatformIO, APIs, XML, Hardware Integration, NeoPixel WS2812B LEDs, FastLED, Wifi]
---

Collaborated with Stratin Engineering to develop the software for a replica of the 'Pulse' installation in JPL's lobby.

Wrote C++ on a single ESP32 SoC to fetch XML data from NASA's Deep Space Network API, providing information on real time data transmission with active spacecraft. Parsed spacecraft names and transmission rates, which was then visualized on the LEDs via hand-crafted character maps and 5 different animation patterns with 6 levels of intensity based on transmission rate.

Engineered a custom WiFi portal to allow configuration and updating of the device from a phone or other device via ESP32 onboard WiFi. Delivered production-ready software package for a limited hardware run of units.
