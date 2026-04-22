---
title: Embedded Software Engineer
tags: [nasa, esp32, c++]
projectName: MiniPulse Realtime Satellite Data Visualizer
client: "NASA Jet Propulsion Laboratory"
endMonthYear: Oct 2022
startMonthYear: Jan 2022
subClient: Stratin Engineering
clientLogo:
  src: /src/images/projects/jpl-minipulse/logo_NASA.png
  alt: NASA Logo
clientWebsite: "https://www.jpl.nasa.gov/"
tech: [C++, ESP32, XML APIs, WS2812B LEDs, FastLED, Wifi AP]
order: 1
---

<p>Worked with <a target="_blank" href="https://www.stratinengineering.com/">Stratin Engineering</a> and JPL's <a target="_blank" href="https://www.directedplay.com/pulse">Dan Goods</a> to build an LED visual installation that displays <a target="_blank" href="https://eyes.nasa.gov/apps/dsn-now/">Deep Space Network</a> spacecraft data in real time.</p>
<p>
  <span class="font-medium">On display at:</span> <a href="https://www.jpl.nasa.gov/thestudio/" target="_blank">The Studio at JPL</a>, <a href="https://www.emporiagazette.com/education/article_3c20493c-2cb1-43db-8ebb-2b56417eab15.html"  target="_blank">Emporia State University's Peterson Planetarium</a>, <a href="https://www.gdscc.nasa.gov/"  target="_blank">Goldstone Deep Space Communications Complex</a>
</p>
<div class="md:flex-row mt-8 flex-col flex mb-12 relative">
  <div class="md:w-2/3 md:pr-4 pb-8 flex items-start">
    <ul>
      <li>XML parsing for spacecraft names and data rates</li>
      <li>NASA mission data scraping to map callsigns</li>
      <li>20000+ LEDs at 30 FPS</li>
      <li>Hand-crafted alphabet character maps</li>
      <li>30 animations based on data rate</li>
      <li>WiFi portal for configuration and OTA updates</li>
    </ul>
  </div>
  <figure class="md:w-1/3 relative">
      <img class="object-cover h-full" src="/images/projects/jpl-minipulse/goldstone-minipulse-cropped.jpg" alt="MiniPulse on display at Goldstone Communications Complex" />
  </figure>
</div>
<div class="grid gap-1 mb-6">
  <div class="block row-start-2 col-start-1 col-span-5 overflow-hidden">
    <img class="w-full h-full object-cover" src="/images/projects/jpl-minipulse/ESU_minipulse_2.jpg" alt="MiniPulse installation at Peterson Planetarium" />
  </div>
  <div class="row-start-2 col-start-6 col-span-5 overflow-hidden">
    <img class="w-full h-full object-cover object-[15%_50%]" src="/images/projects/jpl-minipulse/emporia-gazzette-minipulse-2.jpg" alt="MiniPulse installation at Peterson Planetarium" />
  </div>
  <blockquote class="row-start-1 col-start-1 relative col-span-10 mb-0 flex items-center sm:flex-row flex-col">
    <div class="relative h-full w-full">
      <img class="w-full h-full object-cover min-w-52" src="/images/projects/jpl-minipulse/ESU_minipulse_1.jpg" alt="MiniPulse installation at Peterson Planetarium" />
    </div>
    <div class="px-8 pt-4 pb-8 text-justify">
      “With our new PULSE display radiating just outside these doors, we send a message to every student, every visitor, and every dreamer — science lives here, and its heartbeat is at Emporia State University,”
      <cite>Mark Brown, Director of <a href="https://www.emporiagazette.com/education/article_3c20493c-2cb1-43db-8ebb-2b56417eab15.html">Peterson Planetarium</a>
      </cite>
      <div class="absolute w-24 h-24 hidden md:w-32 md:h-32 bottom-0 left-0 sm:-translate-x-2/3 sm:translate-y-1/3 md:-translate-x-1/2 md:translate-y-1/4 lg:translate-x-0">
        <img class="object-contain" src="/images/projects/jpl-minipulse/logo_ESU.webp" alt="MiniPulse installation at Peterson Planetarium" />
      </div>
    </div>
  </blockquote>
</div>
