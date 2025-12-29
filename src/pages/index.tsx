import React, { useEffect, useState } from 'react'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import Layout from '../components/Layout';
import { graphql, useStaticQuery } from 'gatsby';
import SEO from '../components/SEO';

const CHRISTMAS_2025_METADATA = [
  { id: 'coldSolitudeChristmas', filename: 'cold-solitude-christmas.png', caption: 'Cold Solitude - Christmas', description: 'A special Christmas edition of the Cold Solitude print, featuring hundreds of retro christmas lights lining the cabin and fence outside - as well as a surprise Christmas tree in the mountain behind.', objectPosition: 'bottom' },
  { id: 'californiaChristmas', filename: 'california-christmas.png', caption: 'California Christmas', description: 'A single light burns in a house somewhere the suburbs of California. No snow, but decorated with bright Christmas lights and a warm glow from within.', objectPosition: 'bottom', aspectRatio: '16/10' }
];

const SWISSARTEXPO_METADATA = [
  { id: 'saentisSupergreenAurora', aspectRatio: '4/3', filename: 'saentis-supergreen-aurora.png', caption: 'Säntis Supergreen - Aurora', description: 'Second print from the Säntis Super series with bright and feathered aurora.' },
  { id: 'mannheimerFirstColor', filename: 'mannheimer-first-color.png', caption: 'Late Nights at Mannheimer Hütte', description: 'The first, and night-focused colorway print in the Mannheimer series.' },
  { id: 'singleStone', filename: 'single-stone.png', caption: 'Single Stone', description: 'A highly detailed vector print with lots of stippling - and only 4 colors.' },
  { id: 'coldForest', aspectRatio: '2/1', filename: 'COLD FOREST.jpg', caption: 'COLD FOREST', description: 'Another large panorama taken about a half hour before the fated COLD MOON shot. Up in Lech I knew there was snow, but not that it was so fresh and still clinging to everything. I stumbled upon this quiet field and couldnt help but admire the multi colored sky trying to figure itself out if it was blue hour or golden hour. Another monster shot, this one is 10310 x 5091, or 52 megapixels. Still have one or two more shots in the bag from this outing!' },
  { id: 'woodsBoy', filename: 'woods-boy.png', caption: 'Woods Boy', description: 'A wintery scene from upstate New York featuring the Neowise comet and international space station in the sky.', objectPosition: 'bottom' },
];

const PRINTS_METADATA = [
  { id: 'coldSolitude', filename: 'cold-solitude.png', caption: 'Cold Solitude', description: 'A lone hut stands in the cold, nestled under a pine forest.', objectPosition: 'bottom' },
  { id: 'primaryExplorers', filename: 'primary-explorers.png', caption: 'Primary Explorers', description: '3 explorers made up of the primary colors prepare for the final push to a high alpine summit.', objectPosition: 'bottom' },
  { id: 'mannheimerFirstColor', filename: 'mannheimer-first-color.png', caption: 'Late Nights at Mannheimer Hütte', description: 'The first, and night-focused colorway print in the Mannheimer series.' },
  { id: 'mannheimerSecondColor', filename: 'mannheimer-second-color.png', caption: 'Mannheimer Hütte - Second Colorway', description: 'The second astral focused colorway print in the Mannheimer series.' },
  { id: 'mannheimerThirdColor', filename: 'mannheimer-third-color.png', caption: 'Mannheimer Hütte - Third Colorway', description: 'The third daytime colorway print in the Mannheimer series.' },
  { id: 'woodsBoy', filename: 'woods-boy.png', caption: 'Woods Boy', description: 'A wintery scene from upstate New York featuring the Neowise comet and international space station in the sky.', objectPosition: 'bottom' },
  { id: 'refugionVajolet', filename: 'refugio-vajolet.png', caption: 'Refugio Vajolet', description: 'An early morning neon print of Refugio Vajolet.' },
  { id: 'binarySystem', filename: 'binary-system.png', caption: 'Binary System', description: 'Säntis mountain station converted to a telecommunications tower in a binary star system sci-fi setting.' },
  { id: 'agetePlatteInGold', filename: 'ageteplatte-in-gold.png', caption: 'Ageteplatte In Gold', description: 'Rocks over Ageteplatte in Alpstein juxtaposed with a pine from the western United States.', objectPosition: 'bottom' },
  { id: 'alpineGlowsPurple', filename: 'alpine-glows-purple.png', caption: 'Alpine Glows Purple', description: 'Moon and sun trade light over snowy mountains and trees.', objectPosition: 'bottom' },
  { id: 'saentisSupergreen', filename: 'saentis-supergreen.png', caption: 'Säntis Supergreen', description: 'Original print with very subtle aurora.' },
  { id: 'saentisSupergreenAurora', filename: 'saentis-supergreen-aurora.png', caption: 'Säntis Supergreen - Aurora', description: 'Second print from the Säntis Super series with bright and feathered aurora.' },
  { id: 'saentisSupergray', filename: 'saentis-supergray.png', caption: 'Säntis Supergray', description: 'Third print in the Säntis Super series with rocky gray texture.' },
  // { id: 'icebergsAndGalaxies', filename: 'icebergs-and-galaxies.png', caption: 'Icebergs and Galaxies', description: 'Original print of the Icebergs and Galaxies prints.' },
  // { id: 'icebergsAndGalaxiesMoonRise', filename: 'icebergs-and-galaxies-moon-rise.png', caption: 'Icebergs and Galaxies - Galactic', description: 'A neon color re-think of the original "Icebergs and Galaxies" print.' },
  // { id: 'icebergsAndGalaxiesMinimal', filename: 'icebergs-and-galaxies-minimal.png', caption: 'Icebergs and Galaxies - Minimal', description: 'Third and final print in the "Iceberg and Galaxies" series with reduced colors.' },
  { id: 'seekRefugeOnStundnerBerg', filename: 'when-they-arrive-seek-refuge-on-stundner-berg.png', thumbnail: 'when-they-arrive-seek-refuge-on-stundner-berg.png', caption: 'When They Arrive, Seek Refuge on Gampernei', description: 'View from Studner Berg - with a sci-fi twist.' },
  // { id: 'wintersColdArrival', filename: 'winters-cold-the-arrival.png', thumbnail: 'winters-cold-the-arrival.png', caption: 'Winter\'s Cold - The Arrival', description: 'First print of the Winter\'s Cold Series.' },
  // { id: 'wintersColdInvasion', filename: 'winters-cold-the-invasion.png', thumbnail: 'winters-cold-the-invasion.png', caption: 'Winter\'s Cold - The Invasion', description: 'Second print of the Winter\'s Cold Series.' },
  { id: 'codingInCastelmezzano', filename: 'coding-in-castelmezzano.png', thumbnail: 'coding-in-castelmezzano.png', caption: 'Coding in Castelmezzano', description: 'An Italian Village is lit up on a snowy night - but what is going on with the windows?' },
  // { id: 'snowyValley', filename: 'snowy-valley.png', caption: 'Snowy Valley', description: 'A deep purple norther lights show above a rocky valley - but is that snow or stars?' },
  { id: 'coldApproachPokeoMoonshine', filename: 'cold-approach-to-poke-o-moonshine.png', caption: 'Cold Approach To Poke-O-Moonshine', description: 'An old fire tower from New York State is backdropped by a large neon aurora.' },
  { id: 'buffaloLight', filename: 'buffalo-light.png', caption: 'Buffalo Light', description: 'A lesser known view of Buffalo that trades blue and green hues.' },
  { id: 'greatObservation', filename: 'the-great-observation.png', caption: 'The Great Observation', description: 'A highly detailed print with galaxy formations represented with ASCII code characters.' },
  { id: 'austrianNightsSaulakopf', filename: 'austrian-nights-saulakopf.png', caption: 'Austrian Nights - Saulakopf', description: 'An aurora borealis and starry night fly over a hiker in a mountanious region based of Saulakopf and the Rätikon massif.' },
];

const SINGLE_STONES_METADATA = [
  { id: 'singleStone', filename: 'single-stone.png', caption: 'Single Stone', description: 'A highly detailed vector print with lots of stippling - and only 4 colors.' },
  { id: 'singleStoneII', filename: 'single-stone-ii.png', caption: 'Single Stone II', description: 'A three color galactic single stone print.' },
  { id: 'singleStoneIIIDay', filename: 'single-stone-iii-day.png', caption: 'Single Stone IV - Day Colorway', description: 'The day colorway of the Single Stone IV print.' },
  { id: 'singleStoneIIINight', filename: 'single-stone-iii-night.png', caption: 'Single Stone IV - Night Colorway', description: 'The night colorway of the Single Stone IV print.' },
  { id: 'singleStoneIV', filename: 'single-stone-iv.png', caption: 'Single Stone IV', description: 'A bright pastel vector print of stone and pine trees.' },
  { id: 'singleStoneV', filename: 'single-stone-v.png', caption: 'Single Stone V', description: 'A highly detailed vector print of a stone with pine boughs in pastel hues.' },
];

const PHOTOGRAPHY_METADATA = [
  { id: 'alberschwendeStacked', filename: 'Alberschwende - Stacked.jpg', caption: 'Alberschwende - Stacked', description: 'In late November, I took a trip up to Alberschwende in Bregenzerwald to scout out some nice blue hour photos. The snow was coming down more heavily than I expected, making many opportunities challenging, as visibility, then, only minutes before catching the bus down to the valley, I encountered this amazing street just begging for shot. At this particular moment the snow was lighter than it had been and I was able to shoot not only the street, but the cozy farmhouses on the hills in the distance.' },
  { id: 'buergenstockI', filename: 'Buergenstock I.jpg', caption: 'Bürgenstock I', description: 'In November of 2019, I was gifted a one night stay at the Bürgenstock Resort with my girlfriend from a good friend and colleague.' },
  { id: 'christmasEveInPitztal', filename: 'Christmas Eve in Pitztal, at Dusk.jpg', caption: 'Christmas Eve in Pitztal, at Dusk', description: 'Weather was less than optimal this Christmas Eve. It was rather warm which was creating a foggy haze among the fields - even up to 4000ft and higher. I set a long delay and captured this emotional picture with a few last minute travelers heading home for the holiday.' },
  { id: 'feldkirchBlizzard2021', filename: 'Feldkirch and the Blizzard of 2021.jpg', caption: 'Feldkirch and the Blizzard of 2021', description: 'After nearly a week of continual snowing, the Rhine valley saw some of the most snow at the valley level it had seen in years. I got up around 6AM and walked up to a street with a good view in Feldkirch, capturing this show in the blue hour of dawn.' },
  { id: 'lastOfDuskRhineValley', filename: 'Last of Dusk at the End of the Rhine Valley.jpg', caption: 'Last of Dusk at the End of the Rhine Valley', description: 'One of my earlier shots with my Nikon D3500. This sunset was quite a surprise, and led to this incomparable sunset and colors.' },
  { id: 'spaetUnterwegs', filename: 'Spaet Unterwegs in Bartholomaeberg.jpg', caption: 'Spät Unterwegs in Bartholomäberg', description: 'Taken in Bartholomäberg just after a fresh snowfall.' },
  { id: 'unionDome', filename: 'Union - Dome.jpg', caption: 'Union - Dome', description: 'In mid December 2020, I was in upstate New York for the holidays. A storm and COLD weather brought these fantastic pictures. I couldn\'t have been on campus for more than 45 minutes - operating the camera, which I had to do without gloves, led to very cold hands.' },
  { id: 'unionHousesAtDusk', filename: 'Union - Houses at Dusk.jpg', caption: 'Union - Houses at Dusk', description: 'Another shot from the Union visit, capturing a bit of the sunset glow in the high, cold, and frozen cirrus clouds.' },
  { id: 'theEstate', filename: 'THE ESTATE.jpg', caption: 'THE ESTATE', description: 'The day after Thanksgiving - and another shot from the United States. A massive estate all lit up for blue hour at Smith Mountain Lake.' },
  { id: 'tisisAtBlueHour', filename: 'Tisis at Blue Hour.jpg', caption: 'Tisis at Blue Hour', description: 'A wide panorama from above Tisis at blue hour.' },
  { id: 'aStreakInTheNight', filename: 'A Streak in the Night.jpg', caption: 'A Streak in the Night', description: 'I remember this June night particularly - a cold snap had covered Austria. While it was unfortunate that it was so cold in june, the crisp air left the sky clear and clean.' },
  { id: 'frastanzDreiSchwestern', filename: 'Frastanz Unter Den Drei Schwestern - Daemmerung.jpg', caption: 'Frastanz Unter Den Drei Schwestern - Dämmerung', description: 'Across from the river Ill, there is a nice field with great views of Frastanz. I thought it would be aesthetic to align the church right in the center of the picture, with the Drei Schwestern looming in the distance.', aspectRatio: '3/4' },
  { id: 'speedingHomeToFeldkirch', filename: 'Speeding Home to Feldkirch.jpg', caption: 'Speeding Home to Feldkirch', description: 'A biker leaves his trail of red light - heading home to Feldkirch.' },
  { id: 'rhineblickAtBlueHour', filename: 'Rhineblick at Blue Hour.jpg', caption: 'Rhineblick at Blue Hour', description: 'A shot from the Rhineblick at blue hour.' },
  { id: 'fogRollingOut', filename: 'Fog Rolling Out.jpg', caption: 'Fog Rolling Out', description: 'The day after Thanksgiving - and another shot from the United States. A massive estate all lit up for blue hour at Smith Mountain Lake.' },
  { id: 'snowWars', filename: 'Snow Wars.jpg', caption: 'Snow Wars', description: 'This shot is titled "Snow Wars" due to the endless diligence of the snow makers and stewards of the Montafon Valley who get immediately to work as soon as the days finish at 16:30. Their snow cats and machines light up the mountains as they work.' },
  { id: 'feldkirchCityOfLights', filename: 'Feldkirch - City of Lights.jpg', caption: 'Feldkirch - City of Lights', description: 'A large panorama of Feldkirch in a golden light.' },
  { id: 'dieWerkstatt', filename: 'Die Werkstatt.jpg', caption: 'Die Werkstatt', description: 'Another Christmas Eve shot - someone left the light on in the garage, leaving to an emotional arrangement at blue hour.' },
  { id: 'nordketteOverInnsbruck', filename: 'Nordkette over Innsbruck.jpg', caption: 'Nordkette Over Innsbruck', description: 'A sweeping shot of Innsbruck from the Chapel to the Nordkette.' },
  { id: 'theCapitalAtBlueHour', filename: 'The Capital at Blue Hour.jpg', caption: 'The Capital at Blue Hour', description: 'The United States Capital at Blue Hour.' },
  { id: 'hittisauEveningsRest', filename: 'Hittisau - Evenings Rest.jpg', caption: 'Hittisau - Evening\'s Rest', description: 'As the sun settled far beyond the mountains, the temperature sank. But bright lights, good friends, and a glowing hearth are more than enough to keep warm during these months where the northern hemisphere tilts away from the sun.' },
  { id: 'feldkirchTheFoundry', filename: 'Feldkirch - The Foundry.jpg', caption: 'Feldkirch - The Foundry', description: 'Shot from up on a hill in Feldkirch. The pinkish clouds reminded me of the glow of a steel foundry. Out at these dusk hours you are likely to begin day dreaming of strange fantastical worlds!' },
  { id: 'ghostBus', filename: 'GHOST BUS.jpg', caption: 'GHOST BUS', description: 'Taken just after PURPLE HAZE, I caught a bus running on the road and my camera picked it up as a strange eery glowing green.' },
  { id: 'purpleHaze', filename: 'PURPLE HAZE.jpg', caption: 'PURPLE HAZE', description: 'My camera couldn\'t balance the red of the sunset and the deep blue hues of the mountains, so apparently it settled on purple!' },
  { id: 'witheringHeights', filename: 'WITHERING HEIGHTS.jpg', caption: 'WITHERING HEIGHTS', description: 'Another view of Feldkirch, this one with a far depth of field - you can see all the way to industrial areas in Liechtenstein.' },
  { id: 'heavenAboveNightBelow', filename: 'Heaven Above, Night Below.jpg', caption: 'Heaven Above, Night Below', description: 'The first of a pair of amazing shots, unedited as they were shot from the camera. A cold day in November, with the last tendrils of light still brushing high altitude clouds.' },
  { id: 'heavenAboveNightBelowII', filename: 'Heaven Above, Night Below II.jpg', caption: 'Heaven Above, Night Below II', description: 'The second of a pair of amazing shots, unedited as they were shot from the camera. A cold day in November, with the last tendrils of light still brushing high altitude clouds.' },
  { id: 'coldForest', filename: 'COLD FOREST.jpg', caption: 'COLD FOREST', description: 'Another large panorama taken about a half hour before the fated COLD MOON shot. Up in Lech I knew there was snow, but not that it was so fresh and still clinging to everything. I stumbled upon this quiet field and couldnt help but admire the multi colored sky trying to figure itself out if it was blue hour or golden hour. Another monster shot, this one is 10310 x 5091, or 52 megapixels. Still have one or two more shots in the bag from this outing!' },
  { id: 'coldMoon', filename: 'COLD MOON.jpg', caption: 'COLD MOON', description: 'Little story on what might end up as my Opus Magnum shot. I went up to Lech because I knew they had snow, and actually didn\'t really have a plan on what to shoot. After wandering around in the woods for a bit during golden hour, I decided to see if I could actually get to a decent vantage point of the town for dusk, my favorite time to shoot. While crossing a random field to get Lech behind me, I looked back to see how the framing would look. I then noticed a strange light just on the top ridge of a distant mountain, and was rather confused. I thought it was a lift or a mountain chalet, but based on what I knew of the area, there was no life that I knew in that direction. I then realized, as this bright bridge began to increase in size, shouting to myself, "HOLY S(*&#$@, THAT\'S THE MOON!". I had totally forgot it was the December full moon, nick named "Cold Moon", named so as in ancient times it used to signal the true start of winter. I threw down my pack to rip out my gear as fast as I could, realizing I had a precious few minutes before it would move rightwards and behind the next mountain. For about 15 (very cold) minutes, I captured as many images as I could of this fantastic arrangement, and then, before it could even hide behind the next mountain, the moon was smothered by a heavy cloud that had moved in. Clocking in at 13954 by 5904 pixels, this shot is a monster 82 megapixel shot. No idea when, if ever, this shot will be able to be reproduced - would need some astro folks to comment. A few more goodies to come from this outing, the shooting was quite literally incredible on this day. Swipe through for detailed clips of the full image.' },
  { id: 'alpineCanopy', filename: 'ALPINE CANOPY.jpg', caption: 'ALPINE CANOPY', description: 'Sparse cozy homes dot the mountainside above Frastanz.' },
  { id: 'frastanzInWinter', filename: 'Frastanz In Winter.jpg', caption: 'Frastanz in Winter', description: 'It\'s not often we get snow so far down to the valleys, but as soon as we do I like to get out and shoot. This is a shot of Frastanz in Vorarlberg, Austria.' },
  { id: 'aStreakInTheNightII', filename: 'A Streak in the Night II.jpg', caption: 'A Streak in the Night II', description: 'Best shot in my opinion of this January 22nd outing. Nothing like a classic light painting shot.' },
  { id: 'moodyWinterWalgau', filename: 'Moody Winter Walgau.jpg', caption: 'Moody Winter Walgau', description: 'A dark panorama of Walgau in winter in Vorarlberg - from Frastanz to Maria Grün. I usually don\'t keep the vignette on my images, but I think it works well here.' },
  { id: 'wennsNewYear2022I', filename: 'Wenns New Year 2022 I.jpg', caption: 'Wenns New Year 2022 I', description: 'The earliest shot of 2023. A firework shot from the village of Wenns in Tirol, Austria.' },
  { id: 'wennsNewYear2022II', filename: 'Wenns New Year 2022 II.jpg', caption: 'Wenns New Year 2022 II', description: 'The *second* earliest shot of 2023. A firework shot from the village of Wenns in Tirol, Austria.' },
  { id: 'laternsAtBlueHour', filename: 'Laterns at Blue Hour.jpg', caption: 'Laterns at Blue Hour', description: 'Light trails from adventurers making their way home after a long day of skiing in Laterns, Austria.' },
  { id: 'aStreakInTheNightIII', filename: 'A Streak in the Night III.png', caption: 'A Streak in the Night III', description: 'A botched moonrise outing that still produced some great blue hour shots like this one.' },
  { id: 'wennsEndOf2024Blue', filename: 'Wenns at the End of 2024 - Blue.jpg', caption: 'Wenns at the End of 2024 - Blue', description: 'Ringing in the new year in Tirol - blue version.' },
  { id: 'wennsEndOf2024Red', filename: 'Wenns at the End of 2024 - Red.jpg', caption: 'Wenns at the End of 2024 - Red', description: 'Ringing in the new year in Tirol - red version.' },
  { id: 'cloudNine', filename: 'CLOUD NINE.jpg', caption: 'CLOUD NINE', description: 'Mist rises, cold light begins to fade - golden views of Hoher Fraßen in Vorarlberg.' },
]


const SONNWENDFEIER_SERIES_METADATA = [
  { id: 'sonnwendfeierI', filename: 'Sonnwendfeier I.jpg', caption: 'Sonnwendfeier I', description: 'On June 20th in Austria the summer solstice is celebrated. This is when mountain guides and even locals - head up to the summits of peaks at dusk to lay torches to symbolize the sun staying out all night. On this longest day, there is only about 6 hours of true darkness.' },
  { id: 'sonnwendfeierII', filename: 'Sonnwendfeier II.jpg', caption: 'Sonnwendfeier II', description: 'Second shot from the Sonnwendfeier series.' },
  { id: 'sonnwendfeierIII', filename: 'Sonnwendfeier III.jpg', caption: 'Sonnwendfeier III', description: 'Third shot from the Sonnwendfeier series.' },
  { id: 'sonnwendfeierIV', filename: 'Sonnwendfeier IV.jpg', caption: 'Sonnwendfeier IV', description: 'Fourth shot from the Sonnwendfeier series.' },
  { id: 'sonnwendfeierV', filename: 'Sonnwendfeier V.jpg', caption: 'Sonnwendfeier V', description: 'Fifth shot from the Sonnwendfeier series.' },
];

const BEZAU_SERIES_METADATA = [
  { id: 'bezauAtDuskI', filename: 'Bezau at Dusk I.jpg', caption: 'Bezau at Dusk I', description: 'Bezau at Dusk I.' },
  { id: 'bezauAtDuskII', filename: 'Bezau at Dusk II.jpg', caption: 'Bezau at Dusk II', description: 'Bezau at Dusk II.' },
  { id: 'bezauAtNightI', filename: 'Bezau at Night I.jpg', caption: 'Bezau at Night I', description: 'Bezau at Night I.' },
  { id: 'bezauAtNightII', filename: 'Bezau at Night II.jpg', caption: 'Bezau at Night II', description: 'Bezau at Night II.' },
  { id: 'bezauAtNightIII', filename: 'Bezau at Night III.jpg', caption: 'Bezau at Night III', description: 'Bezau at Night III.' },
]

const NIGHT_RIDER_SERIES_METADATA = [
  { id: 'nightRiderI', filename: 'NIGHT RIDER I.jpg', caption: 'NIGHT RIDER I', description: 'The first of what promises to be a series of night shots including my trekking bike.' },
  { id: 'nightRiderII', filename: 'NIGHT RIDER II.jpg', caption: 'NIGHT RIDER II', description: 'The second in the NIGHT RIDER series. Practicing panorama shots.' },
  { id: 'nightRiderIII', filename: 'NIGHT RIDER III.jpg', caption: 'NIGHT RIDER II', description: 'The third in the NIGHT RIDER series.' },
  { id: 'nightRiderIV', filename: 'NIGHT RIDER IV.jpg', caption: 'NIGHT RIDER IV', description: 'Late night travels in Feldkirch.' },
]

const GARGELLEN_SERIES_METADATA = [
  { id: 'gargellenI', filename: 'Gargellen I.jpg', caption: 'Gargellen I', description: 'In March of 2021, there was some fresh snowfall in the Montafon valley. After work I headed in, hoping to get a few shots of what might have been the last for winter. Even on this day following the snowfall, it was already quite warm and the snow was very wet.' },
  { id: 'gargellenII', filename: 'Gargellen II.jpg', caption: 'Gargellen II', description: 'The second in the Gargellen series.' },
  { id: 'gargellenIII', filename: 'Gargellen III.jpg', caption: 'Gargellen III', description: 'The third and final picture in the Gargellen series, this one is my favorite. A quite and cozy farmhouse still shaking off the feeling of winter, hoping for spring..' },
];

const STONE_X_SNOW_PANORAMAS_METADATA = [
  { id: 'dreiSchwesternGold', filename: 'drei-schwestern-gold.jpg', caption: '1. Drei Schwestern - Gold', description: 'A 2:1 panorama of the Drei Schwestern at golden hour.' },
  { id: 'werdenbergOrange', filename: 'werdenberg-orange.jpg', caption: '2. Werdenberg - Orange', description: 'A massive 6:1 panorama of the Werdenberg group over Buchs, St. Gallen as late afternoon golden light streams down.' },
  { id: 'grossesSeehornTungsten', filename: 'grosses-seehorn-und-co-tungsten.jpg', caption: '3. Großes Seehorn und Co - Tungsten', description: 'A 3:1 panorama of the mountains at the end of Vermunstausee, dominated by Großlitzner and Großes Seehorn on the right.' },
  { id: 'schrottenkopfLime', filename: 'schrottenkopf-und-co-lime.jpg', caption: '4. Schrottenkopf und Co - Lime', description: 'A 2:1 panorama of Schrottenkopf in the Verwall group as viewed from the west, near Heilbronner Hütte.' },
  { id: 'schaftaelispitzMagenta', filename: 'schrottenkopf-und-co-magenta.jpg', caption: '5. Schaftälispitz und Co - Magenta', description: 'A 2:1 panorama of Schaftälispitz in the Verwall group as viewed from the north.' },
];

const ImageFrame = ({ children, aspectRatio = "3/4" }: any) => {
  return (
    <div
      className={`aspect-[${aspectRatio}] overflow-hidden p-4`}
      style={{
        backgroundColor: '#ffffff', // Very light off-white
        boxShadow: `
          inset 0 0 20px rgba(0,0,0,0.1),
          0 4px 6px -1px rgba(0,0,0,0.1),
          0 2px 4px -1px rgba(0,0,0,0.1)
        `,
        border: '1px solid rgba(0,0,0,0.08)', // Very light border
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
};

const ImageModal = ({ isOpen, onClose, image, gatsbyImage }: any) => {

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) {
    return <></>
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white text-3xl focus:outline-none z-10 hover:text-gray-300 transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      
      {/* Mobile layout - stacked vertically */}
      <div 
        className="flex flex-col items-center justify-center w-full h-full md:hidden"
      >
        <div className="flex-1 flex items-center justify-center w-full min-h-0">
          <div
            className="relative flex items-center justify-center"
            onClick={e => e.stopPropagation()}
            style={{
              padding: '8px',
              height: '100vh',
            }}
          >
            <GatsbyImage
              image={gatsbyImage}
              alt={image?.caption}
              className="max-h-full max-w-full block"
              imgStyle={{
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        </div>
        <div className="text-center text-white px-4 pb-8 flex-shrink-0">
          <h3 className="text-lg font-medium">{image?.caption}</h3>
          <p className="mt-2 text-gray-300 text-sm max-w-prose">{image?.description}</p>
        </div>
      </div>

      {/* Desktop layout - centered image with side panel */}
      <div 
        className="hidden md:flex items-center justify-center w-full h-full relative"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative flex items-center justify-center"
            onClick={e => e.stopPropagation()}
            style={{
              padding: '8px',
              height: '100vh',
            }}
          >
            <GatsbyImage
              image={gatsbyImage}
              alt={image?.caption}
              className="max-h-full max-w-full block"
              imgStyle={{
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-80 text-white p-6 flex-shrink-0">
          <h3 className="text-xl font-medium mb-2 drop-shadow-lg">{image?.caption}</h3>
          <p className="text-gray-200 leading-relaxed text-sm drop-shadow-lg">{image?.description}</p>
        </div>
      </div>
    </div>
  );
};


export default function HomeIndex() {
  const [selectedImage, setSelectedImage] = useState<{ item: any, gatsbyImage: IGatsbyImageData }>();

  // GraphQL query to get all images
  const data = useStaticQuery(graphql`
    query {
      posterProofs: allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
        }
      ) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(
              width: 1200
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
      panoProofs: allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
        }
      ) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(
              width: 1200
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  `);

  // Helper function to find image data
  const findImageData = (filename: any, collection: any) => {
    const imageData = collection === 'pano'
      ? data.panoProofs.nodes.find((node: any) => node.relativePath.endsWith(filename))
      : data.posterProofs.nodes.find((node: any) => node.relativePath.endsWith(filename));

    return imageData ? getImage(imageData.childImageSharp) : null;
  };

  const renderImage = (item: any, aspectRatio: any, collection = 'poster') => {
    const gatsbyImage = findImageData(item.filename, collection);
    if (!gatsbyImage) return null;

    // Use item's aspectRatio if defined, otherwise use the passed aspectRatio
    const finalAspectRatio = item.aspectRatio || aspectRatio;

    return (
      <div
        key={item.id}
        className="group flex flex-col w-full sm:w-1/2 lg:w-1/3 max-w-md mx-auto cursor-pointer"
        onClick={() => setSelectedImage({ item, gatsbyImage })}
        onContextMenu={(e) => e.preventDefault()}
      >
        <ImageFrame aspectRatio={finalAspectRatio}>
          <GatsbyImage
            image={gatsbyImage}
            alt={item.caption}
            className="h-full w-full object-cover select-none"
            imgStyle={{
              width: '100%',
              height: '100%',
              objectPosition: item.objectPosition ? item.objectPosition : undefined
            }}
            style={{
              pointerEvents: 'none',
            }}
          />
        </ImageFrame>
        <div className="mt-2">
          <h3 className="text-lg text-center font-medium text-gray-900">
            {item.caption}
          </h3>
          <p className="mt-1 text-sm text-center text-gray-500">
            {item.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section id="christmas-2025" className="mb-20">
            <h2 className="text-center mb-4 text-2xl font-semibold text-gray-900">
              Christmas 2025 Prints
            </h2>
            <p className="font-display text-center mb-8 text-gray-600">
              Inspired by winter scenes from Austria and beyond, these prints capture the magic of the holiday season.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {CHRISTMAS_2025_METADATA.map(print => renderImage(print, "3/4"))}
            </div>
          </section>
          <section id="swiss-art-expo" className="mb-20">
            <h2 className="text-center mb-4 text-2xl font-semibold text-gray-900">
              SWISSARTEXPO Featured Works
            </h2>
            <p className="font-display text-center mb-8 text-gray-600">
              The following five works, each a single signed 1/1 edition, will be on display from August 20th to 24th in Zürich Main Station at the SWISSARTEXPO.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {SWISSARTEXPO_METADATA.map(print => renderImage(print, "3/4"))}
            </div>
          </section>

          <section id="prints" className="mb-20">
            <h2 className="text-center mb-4 text-2xl font-semibold text-gray-900">
              Prints
            </h2>
            <p className="font-display text-center mb-8 text-gray-600">
              Inspired by the Alps, Adirondacks, science fiction, and everything in between.
            <br/>
              Many of these are vector graphics and can be printed to staggering sizes without any loss of quality.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {PRINTS_METADATA.map(print => renderImage(print, "3/4"))}
            </div>
          </section>

          <section id="single-stone-series" className="mb-20">
            <h2 className="text-center mb-4 text-2xl font-semibold text-gray-900">
              Single Stone Series
            </h2>
            <p className="font-display text-center mb-8 text-gray-600">
              A collection of prints focusing on the elemental forms of stone, pine, grass, and snow in the Alps.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {SINGLE_STONES_METADATA.map(photo => renderImage(photo, "2/1"))}
            </div>
          </section>

          <section id="blue-hour-photography" className="mb-20">
            <h2 className="text-center mb-4 text-2xl font-semibold text-gray-900">
              Blue Hour Photography
            </h2>
            <p className="font-display text-center mb-8 text-gray-600">
              My blue hour photography from the Alps, U.S., and beyond.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {PHOTOGRAPHY_METADATA.map(photo => renderImage(photo, "4/3"))}
            </div>
          </section>

          <section id="sonnwendfeier-series" className="mb-20">
            <h2 className="text-center mb-4 text-2xl font-semibold text-gray-900">
              Sonnwendfeier Series
            </h2>
            <p className="font-display text-center mb-8 text-gray-600">
              A series of photos capturing the summer solstice celebration in Austria.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {SONNWENDFEIER_SERIES_METADATA.map(photo => renderImage(photo, "4/3"))}
            </div>
          </section>

          <section id="bezau-series" className="mb-20">
            <h2 className="text-center mb-4 text-2xl font-semibold text-gray-900">
              Bezau Series
            </h2>
            <p className="font-display text-center mb-8 text-gray-600">
              A collection of photos from Bezau, capturing the village as it transitions from dusk to night.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {BEZAU_SERIES_METADATA.map(photo => renderImage(photo, "4/3"))}
            </div>
          </section>

          <section id="night-rider-series" className="mb-20">
            <h2 className="text-center mb-4 text-2xl font-semibold text-gray-900">
              Night Rider Series
            </h2>
            <p className="font-display text-center mb-8 text-gray-600">
              A series of night shots featuring my trekking bike, exploring lesser known corners of the Alps.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {NIGHT_RIDER_SERIES_METADATA.map(photo => renderImage(photo, "4/3"))}
            </div>
          </section>

          <section id="gargellen-series" className="mb-20">
            <h2 className="text-center mb-4 text-2xl font-semibold text-gray-900">
              Gargellen Series
            </h2>
            <p className="font-display text-center mb-8 text-gray-600">
              A series of photos from Gargellen, capturing the serene beauty of the Montafon valley.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {GARGELLEN_SERIES_METADATA.map(photo => renderImage(photo, "4/3"))}
            </div>
          </section>

          <section id="stone-x-snow-series" className="mb-20">
            <h2 className="text-center mb-4 text-2xl font-semibold text-gray-900">
              <span className="font-mono mb-4 text-xl font-medium italic text-gray-900 text-center">
                „s t o n e  x  s n o w"
              </span> Photography Series
            </h2>
            <p className="font-display text-center mb-8 text-gray-600">
              A collection of high resolution colorized panoramas from the Alps
              focusing on color, form, and texture of stone and snow.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {STONE_X_SNOW_PANORAMAS_METADATA.map(photo => renderImage(photo, "2/1", 'pano'))}
            </div>
          </section>
        </div>

        {selectedImage && (
          <ImageModal
            isOpen={!!selectedImage}
            onClose={() => setSelectedImage(undefined)}
            image={selectedImage.item}
            gatsbyImage={selectedImage.gatsbyImage}
          />
        )}
      </div>
    </Layout>
  );
}

export const Head = ({
  title,
  description,
  image,
  pathname
}: any) => (
  <SEO
    title={title}
    description={description}
    image={image}
    pathname={pathname}
  />
);