---
title: Embedded Software Engineer
tags: [nasa, esp32, c++]
projectName: MiniPulse - Realtime Satellite Data Visualizer
client: "NASA Jet Propulsion Laboratory"
endMonthYear: Oct 2022
startMonthYear: Jan 2022
subClient: Stratin Engineering
# image: /src/images/projects/jpl-minipulse/minipulse.jpg
imageAlt: NASA JPL MiniPulse LED Sculpture.
imageAlign: right
imageMaxHeight: 16rem
clientWebsite: "https://www.jpl.nasa.gov/"
tech:
  [C++, ESP32, PlatformIO, APIs, XML, Hardware Integration, NeoPixel WS2812B LEDs, FastLED, Wifi]
---

<p>Collaborated with <a target="_blank" href="https://www.stratinengineering.com/">Stratin Engineering</a> and The Studio at JPL's <a target="_blank" href="https://www.directedplay.com/pulse">Dan Goods</a> building an LED-based visual installation that displays spacecraft transmissions from the <a target="_blank" href="https://eyes.nasa.gov/apps/dsn-now/">Deep Space Network</a> in real time.</p>
<p>
  <span class="font-bold">On display at:</span> <a href="https://www.jpl.nasa.gov/thestudio/">The Studio at JPL</a>, <a href="https://www.emporiagazette.com/education/article_3c20493c-2cb1-43db-8ebb-2b56417eab15.html">Emporia State University's Peterson Planetarium</a>, <a href="https://www.gdscc.nasa.gov/">Goldstone Deep Space Communications Complex</a>
</p>
<div class="md:flex-row flex-col flex mb-4 relative">
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
  <div class="md:w-1/3 mt-0 mb-0 relative block">
      <img class="object-cover h-full" src="/images/projects/jpl-minipulse/goldstone-minipulse-cropped.jpg" alt="MiniPulse on display at Goldstone Communications Complex" />
  </div>
</div>
<div class="grid gap-1 mb-6">
  <div class="block row-start-2 col-start-1">
    <img class="w-full" src="/images/projects/jpl-minipulse/emporia-gazzette-minipulse-1.jpg" alt="MiniPulse installation at Peterson Planetarium" />
  </div>
  <div class="row-start-2 col-start-2">
    <img class="w-full" src="/images/projects/jpl-minipulse/emporia-gazzette-minipulse-2.jpg" alt="MiniPulse installation at Peterson Planetarium" />
  </div>
  <blockquote class="row-start-1 col-start-1 col-span-2 mb-0 rounded-t">
    “With our new PULSE display radiating just outside these doors, we send a message to every student, every visitor, and every dreamer - science lives here, and its heartbeat is at Emporia State University,”
    <cite>-- Mark Brown, Director of Peterson Planetarium</cite>
  </blockquote>
</div>
