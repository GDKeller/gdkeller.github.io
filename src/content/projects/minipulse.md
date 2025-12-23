---
title: Embedded Software Engineer
tags: [nasa, esp32, c++]
projectName: MiniPulse - Realtime Satellite Data Visualizer
client: "NASA Jet Propulsion Laboratory"
endMonthYear: Oct 2022
startMonthYear: Jan 2022
subClient: Stratin Engineering
clientLogo:
  src: /src/images/projects/jpl-minipulse/logo_NASA.png
  alt: NASA Logo
clientWebsite: "https://www.jpl.nasa.gov/"
tech:
  [C++, ESP32, PlatformIO, APIs, XML, Hardware Integration, NeoPixel WS2812B LEDs, FastLED, Wifi]
---

<p>Collaborated with <a target="_blank" href="https://www.stratinengineering.com/">Stratin Engineering</a> and The Studio at JPL's <a target="_blank" href="https://www.directedplay.com/pulse">Dan Goods</a> building an LED-based visual installation that displays spacecraft transmissions from the <a target="_blank" href="https://eyes.nasa.gov/apps/dsn-now/">Deep Space Network</a> in real time.</p>
<p>
  <span class="font-bold">On display at:</span> <a href="https://www.jpl.nasa.gov/thestudio/" target="_blank">The Studio at JPL</a>, <a href="https://www.emporiagazette.com/education/article_3c20493c-2cb1-43db-8ebb-2b56417eab15.html"  target="_blank">Emporia State University's Peterson Planetarium</a>, <a href="https://www.gdscc.nasa.gov/"  target="_blank">Goldstone Deep Space Communications Complex</a>
</p>
<div class="md:flex-row mt-12 flex-col flex mb-12 relative">
  <div class="md:w-2/3 pt-8 md:pr-12 pb-8 flex">
    <ul class="mt-auto mb-auto">
      <li>Written in C++ on ESP32 SoC</li>
      <li>Data fetching via NASA's Deep Space Network API</li>
      <li>XML data parsing for spacecraft names, info and data rates</li>
      <li>NASA mission data scraping to map callsigns</li>
      <li>Driving over 10000 WS2812B LEDs via FastLED</li>
      <li>Hand-crafted character maps for LEDs</li>
      <li>5 custom animation patterns</li>
      <li>6 levels of animation intensity (based on data rate)</li>
      <li>Custom WiFi portal for user configuration and OTA updates</li>
    </ul>
  </div>
  <figure class="md:w-1/3 mt-0 mb-0 relative">
      <img class="object-cover h-full rounded-lg" src="/images/projects/jpl-minipulse/goldstone-minipulse-cropped.jpg" alt="MiniPulse on display at Goldstone Communications Complex" />
  </figure>
</div>
<div class="grid gap-1 mb-6">
  <div class="block row-start-2 col-start-1 col-span-5 overflow-hidden md:rounded-bl-xl">
    <img class="w-full h-full object-cover" src="/images/projects/jpl-minipulse/ESU_minipulse_2.jpg" alt="MiniPulse installation at Peterson Planetarium" />
  </div>
  <div class="row-start-2 col-start-6 col-span-5 overflow-hidden md:rounded-br-xl">
    <img class="w-full h-full object-cover object-[15%_50%]" src="/images/projects/jpl-minipulse/emporia-gazzette-minipulse-2.jpg" alt="MiniPulse installation at Peterson Planetarium" />
  </div>
  <blockquote class="row-start-1 col-start-1 relative col-span-10 mb-0 rounded-t-xl flex items-center sm:flex-row flex-col">
    <div class="relative sm:mr-8 md:mr-10 lg:mr-12 h-full w-full">
      <img class="w-full rounded-md h-full object-cover min-w-52" src="/images/projects/jpl-minipulse/ESU_minipulse_1.jpg" alt="MiniPulse installation at Peterson Planetarium" />
    </div>
    <div class="relative flex flex-col pb-12 w-auto pt-6 sm:px-0 px-4 sm:pt-2 md:pt-0">
      “With our new PULSE display radiating just outside these doors, we send a message to every student, every visitor, and every dreamer — science lives here, and its heartbeat is at Emporia State University,”
      <cite class="relative ml-auto lg:pl-8">Mark Brown, Director of <a href="https://www.emporiagazette.com/education/article_3c20493c-2cb1-43db-8ebb-2b56417eab15.html">Peterson Planetarium</a>
      </cite>
      <div class="absolute w-24 h-24 hidden lg:block md:w-32 md:h-32 bottom-0 left-0 sm:-translate-x-2/3 sm:translate-y-1/3 md:-translate-x-1/2 md:translate-y-1/4 lg:translate-x-0">
        <img class="object-contain" src="/images/projects/jpl-minipulse/logo_ESU.webp" alt="MiniPulse installation at Peterson Planetarium" />
      </div>
    </div>
  </blockquote>
</div>
