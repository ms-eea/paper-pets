import React, { useId } from 'react';
import { BackgroundId, TimeOfDay } from '../../types/game';

interface Props {
  backgroundId: BackgroundId;
  timeOfDay?: TimeOfDay;
  className?: string;
}

const NIGHT_STARS: [number, number, number][] = [
  [115, 76, 3.2],
  [235, 134, 2.0],
  [360, 62, 2.6],
  [490, 118, 2.0],
  [620, 74, 3.0],
  [748, 136, 2.2],
  [860, 68, 2.8],
  [1040, 112, 2.0],
  [1125, 72, 3.0],
  [170, 210, 2.1],
  [820, 215, 2.0],
  [420, 178, 2.4],
  [940, 195, 2.2],
];

export const PaperBackground: React.FC<Props> = ({
  backgroundId,
  timeOfDay,
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');
  const id = (name: string) => `${name}_${uid}`;
  const resolvedTime: TimeOfDay =
    timeOfDay ?? (backgroundId === 'campsite' || backgroundId === 'cozy_library' ? 'night' : 'day');
  const isNight = resolvedTime === 'night';

  const renderSkyStars = (opacity = 0.78) =>
    NIGHT_STARS.map(([x, y, r], i) => (
      <circle key={i} cx={x} cy={y} r={r} fill="#FCEB9F" opacity={opacity} />
    ));

  return (
    <svg
      viewBox="0 0 1200 760"
      preserveAspectRatio="xMidYMid slice"
      className={`w-full h-full block select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <filter id={id('paperShadow')} x="-8%" y="-8%" width="116%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#3D312A" floodOpacity="0.14" />
        </filter>
        <filter id={id('softEdgeShadow')} x="-5%" y="-5%" width="110%" height="114%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#2A201A" floodOpacity="0.18" />
        </filter>

        {/* Subtle craft paper dot grain */}
        <pattern id={id('paperDots')} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="5" r="0.9" fill="#8C7762" fillOpacity="0.16" />
          <circle cx="17" cy="14" r="0.7" fill="#8C7762" fillOpacity="0.12" />
          <circle cx="11" cy="21" r="0.8" fill="#8C7762" fillOpacity="0.12" />
        </pattern>

        {/* Wood planks */}
        <pattern id={id('woodFloor')} width="180" height="44" patternUnits="userSpaceOnUse">
          <rect width="180" height="44" fill="#D5B187" />
          <line x1="0" y1="0" x2="180" y2="0" stroke="#B68E62" strokeWidth="2.5" />
          <line x1="0" y1="22" x2="180" y2="22" stroke="#BA9266" strokeWidth="1.8" />
          <line x1="65" y1="0" x2="65" y2="22" stroke="#B68E62" strokeWidth="1.6" />
          <line x1="138" y1="22" x2="138" y2="44" stroke="#B68E62" strokeWidth="1.6" />
          <path d="M12 10 Q40 8 54 12" stroke="#C19B6E" strokeWidth="1.2" fill="none" />
          <path d="M84 32 Q108 35 128 31" stroke="#C19B6E" strokeWidth="1.2" fill="none" />
        </pattern>

        {/* Rich walnut wood for Cozy Library */}
        <pattern id={id('walnutFloor')} width="160" height="40" patternUnits="userSpaceOnUse">
          <rect width="160" height="40" fill="#B58458" />
          <line x1="0" y1="0" x2="160" y2="0" stroke="#8C603A" strokeWidth="2.2" />
          <line x1="0" y1="20" x2="160" y2="20" stroke="#966840" strokeWidth="1.6" />
          <line x1="52" y1="0" x2="52" y2="20" stroke="#8C603A" strokeWidth="1.5" />
          <line x1="114" y1="20" x2="114" y2="40" stroke="#8C603A" strokeWidth="1.5" />
        </pattern>

        {/* Corkboard texture */}
        <pattern id={id('cork')} width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#D8AF7E" />
          <circle cx="8" cy="10" r="1.4" fill="#B48653" fillOpacity="0.45" />
          <circle cx="24" cy="7" r="1.1" fill="#E8C79D" fillOpacity="0.6" />
          <circle cx="31" cy="24" r="1.5" fill="#B48653" fillOpacity="0.4" />
          <circle cx="14" cy="31" r="1.2" fill="#9E7142" fillOpacity="0.35" />
        </pattern>

        {/* Pegboard holes for Craft Studio */}
        <pattern id={id('pegboard')} width="28" height="28" patternUnits="userSpaceOnUse">
          <rect width="28" height="28" fill="#F2E7D5" />
          <circle cx="14" cy="14" r="3" fill="#B69E82" />
          <circle cx="14" cy="13.4" r="2.2" fill="#8E755B" />
        </pattern>

        {/* Cutting mat grid */}
        <pattern id={id('cuttingGrid')} width="36" height="36" patternUnits="userSpaceOnUse">
          <rect width="36" height="36" fill="#4E9689" />
          <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#7AC2B5" strokeWidth="1.1" strokeOpacity="0.55" />
          <path d="M 18 0 L 18 36 M 0 18 L 36 18" fill="none" stroke="#7AC2B5" strokeWidth="0.6" strokeOpacity="0.35" />
        </pattern>

        {/* Meadow Sky */}
        <linearGradient id={id('meadowSky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DCEEF2" />
          <stop offset="68%" stopColor="#F5F0DF" />
          <stop offset="100%" stopColor="#F9EFE0" />
        </linearGradient>

        {/* Sunset Autumn Sky */}
        <linearGradient id={id('autumnSky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6DFC3" />
          <stop offset="68%" stopColor="#FBF0DC" />
          <stop offset="100%" stopColor="#F8E7CF" />
        </linearGradient>

        {/* Blossom Sky */}
        <linearGradient id={id('blossomSky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBE6EC" />
          <stop offset="70%" stopColor="#FDF4EE" />
          <stop offset="100%" stopColor="#F8EFE6" />
        </linearGradient>

        {/* Night Sky */}
        <linearGradient id={id('nightSky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#202B45" />
          <stop offset="62%" stopColor="#324364" />
          <stop offset="100%" stopColor="#485B7E" />
        </linearGradient>

        {/* Dusk / Blossom Night Sky */}
        <linearGradient id={id('blossomNightSky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#26284A" />
          <stop offset="64%" stopColor="#3F3E6A" />
          <stop offset="100%" stopColor="#5C5076" />
        </linearGradient>

        {/* Beach Cove Day & Night Sky & Sea */}
        <linearGradient id={id('beachSky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BFE6F2" />
          <stop offset="75%" stopColor="#EAF7F8" />
          <stop offset="100%" stopColor="#FDF2D9" />
        </linearGradient>
        <linearGradient id={id('seaWater')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4FA3B3" />
          <stop offset="100%" stopColor="#7DC7CC" />
        </linearGradient>
        <linearGradient id={id('nightSeaWater')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#234866" />
          <stop offset="100%" stopColor="#356883" />
        </linearGradient>

        {/* Treehouse Canopy Sky */}
        <linearGradient id={id('canopySky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D7ECE2" />
          <stop offset="100%" stopColor="#F6F1DC" />
        </linearGradient>
      </defs>

      {backgroundId === 'meadow' && (
        <g>
          <rect
            width="1200"
            height="760"
            fill={isNight ? `url(#${id('nightSky')})` : `url(#${id('meadowSky')})`}
          />
          {isNight && renderSkyStars(0.8)}
          {/* Distant horizon hill */}
          <path
            d="M0 400 Q260 320 580 375 T1200 355 V760 H0 Z"
            fill={isNight ? '#3E555E' : '#C9DFBA'}
          />
          {/* Mid-distant rolling hill */}
          <path
            d="M-20 462 Q300 392 640 442 T1220 426 V760 H-20 Z"
            fill={isNight ? '#446359' : '#B4D39D'}
            filter={`url(#${id('paperShadow')})`}
          />
          {/* Midground lawn tier */}
          <path
            d="M0 492 Q290 456 610 490 T1200 476 V760 H0 Z"
            fill={isNight ? '#4D7158' : '#9BC381'}
            filter={`url(#${id('paperShadow')})`}
          />
          {/* Foreground dark-sage garden border */}
          <path
            d="M-10 662 Q220 626 420 698 Q220 760 -10 760 Z"
            fill={isNight ? '#3B5C47' : '#82AE67'}
            filter={`url(#${id('softEdgeShadow')})`}
          />
          <path
            d="M1210 650 Q980 620 790 695 Q990 760 1210 760 Z"
            fill={isNight ? '#3B5C47' : '#82AE67'}
            filter={`url(#${id('softEdgeShadow')})`}
          />
          <rect width="1200" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'living_room' && (
        <g>
          {/* Upper plaster wall */}
          <rect width="1200" height="495" fill={isNight ? '#E7DAC6' : '#F4EAD9'} />
          {Array.from({ length: 24 }).map((_, i) => (
            <rect
              key={i}
              x={i * 50}
              y="0"
              width="24"
              height="495"
              fill={isNight ? '#DFCEB7' : '#EFE1CC'}
              opacity="0.55"
            />
          ))}
          {/* Lower wainscoting panels */}
          <rect x="0" y="370" width="1200" height="125" fill={isNight ? '#D4C1A8' : '#E6D5BD'} />
          <rect x="0" y="362" width="1200" height="12" fill="#FFFDF8" stroke="#C5B096" strokeWidth="2" />
          {[32, 232, 830, 1020].map((px) => (
            <rect
              key={px}
              x={px}
              y="388"
              width="144"
              height="84"
              rx="4"
              fill={isNight ? '#E2D2BA' : '#EFE3D0'}
              stroke="#CBB59B"
              strokeWidth="2"
            />
          ))}

          {/* Deep Recessed Window Alcove on Left-Center */}
          <g transform="translate(155, 58)">
            <rect x="8" y="10" width="320" height="270" rx="8" fill="#B79E82" opacity="0.35" />
            <rect x="0" y="0" width="320" height="260" rx="6" fill="#C49A6C" stroke="#8C643C" strokeWidth="3" />
            <rect
              x="18"
              y="18"
              width="284"
              height="224"
              fill={isNight ? '#273857' : '#D7ECF2'}
            />
            {isNight && (
              <>
                <circle cx="72" cy="64" r="2.4" fill="#FCEB9F" opacity="0.85" />
                <circle cx="122" cy="48" r="1.8" fill="#FCEB9F" opacity="0.8" />
                <circle cx="215" cy="72" r="2.6" fill="#FCEB9F" opacity="0.88" />
                <circle cx="262" cy="52" r="2.0" fill="#FCEB9F" opacity="0.75" />
                <circle cx="242" cy="112" r="1.7" fill="#FCEB9F" opacity="0.8" />
                <path
                  d="M236 44 A18 18 0 1 0 256 72 A14 14 0 1 1 236 44 Z"
                  fill="#FBE594"
                  opacity="0.92"
                />
              </>
            )}
            <path
              d="M18 190 Q95 152 175 182 T302 172 V242 H18 Z"
              fill={isNight ? '#3C594E' : '#A5C98E'}
            />
            <line x1="160" y1="18" x2="160" y2="242" stroke="#FFFDF8" strokeWidth="7" />
            <line x1="18" y1="126" x2="302" y2="126" stroke="#FFFDF8" strokeWidth="7" />
            <rect
              x="-14"
              y="252"
              width="348"
              height="22"
              rx="4"
              fill="#E4C196"
              stroke="#8C643C"
              strokeWidth="2.5"
              filter={`url(#${id('softEdgeShadow')})`}
            />
            <path d="M-8 0 H74 Q54 128 32 252 H-8 Z" fill="#E07A5F" opacity="0.88" stroke="#9B4A34" strokeWidth="2" />
            <path d="M328 0 H246 Q266 128 288 252 H328 Z" fill="#E07A5F" opacity="0.88" stroke="#9B4A34" strokeWidth="2" />
          </g>

          {/* Floating Wooden Display Wall Shelf on Right */}
          <g transform="translate(765, 225)" filter={`url(#${id('softEdgeShadow')})`}>
            <rect x="0" y="0" width="310" height="22" rx="5" fill="#B88758" stroke="#7E5632" strokeWidth="2.5" />
            <polygon points="36,22 60,22 36,52" fill="#9A6D43" stroke="#7E5632" strokeWidth="2" />
            <polygon points="274,22 250,22 274,52" fill="#9A6D43" stroke="#7E5632" strokeWidth="2" />
          </g>

          {/* Baseboard molding */}
          <rect x="0" y="482" width="1200" height="20" fill="#FFFDF8" stroke="#C5B096" strokeWidth="2" />
          {/* Clean Hardwood Floor */}
          <rect x="0" y="502" width="1200" height="258" fill={`url(#${id('woodFloor')})`} />
          <rect x="0" y="502" width="1200" height="22" fill="#3D312A" opacity={isNight ? '0.22' : '0.12'} />
          {isNight && <rect width="1200" height="760" fill="#1D2642" opacity="0.16" />}
          <rect width="1200" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'sunny_porch' && (
        <g>
          <rect
            width="1200"
            height="760"
            fill={isNight ? `url(#${id('nightSky')})` : `url(#${id('meadowSky')})`}
          />
          {isNight && renderSkyStars(0.78)}
          {/* Distant rolling garden hills */}
          <path
            d="M0 390 Q320 330 660 370 T1200 350 V490 H0 Z"
            fill={isNight ? '#3D5950' : '#B8D5A3'}
          />

          {/* Pergola overhead wooden beams */}
          <rect x="0" y="0" width="1200" height="58" fill={isNight ? '#A7845E' : '#D9B78E'} stroke="#8C6640" strokeWidth="2.5" filter={`url(#${id('softEdgeShadow')})`} />
          {[140, 380, 620, 860, 1080].map((bx) => (
            <rect key={bx} x={bx} y="0" width="28" height="72" rx="4" fill={isNight ? '#96724D' : '#C79F73'} stroke="#8C6640" strokeWidth="2" />
          ))}
          <rect x="34" y="54" width="38" height="445" fill={isNight ? '#B8956E' : '#E5C8A2'} stroke="#8C6640" strokeWidth="2.5" />
          <rect x="1128" y="54" width="38" height="445" fill={isNight ? '#B8956E' : '#E5C8A2'} stroke="#8C6640" strokeWidth="2.5" />

          {/* Porch wooden balustrade with wide top ledge */}
          <g filter={`url(#${id('softEdgeShadow')})`}>
            {Array.from({ length: 24 }).map((_, i) => (
              <rect
                key={i}
                x={68 + i * 46}
                y="370"
                width="16"
                height="122"
                fill={isNight ? '#CEC0AE' : '#EFE4D2'}
                stroke="#9E876D"
                strokeWidth="1.5"
              />
            ))}
            <rect x="44" y="352" width="1112" height="26" rx="5" fill={isNight ? '#E8DEC9' : '#FFFDF8'} stroke="#9E876D" strokeWidth="2.5" />
            <rect x="44" y="484" width="1112" height="18" fill={isNight ? '#C8B8A3' : '#E6D8C5'} stroke="#9E876D" strokeWidth="2" />
          </g>

          {/* Clean Warm Porch Deck */}
          <rect x="0" y="500" width="1200" height="260" fill={`url(#${id('woodFloor')})`} />
          <rect x="0" y="500" width="1200" height="20" fill="#4A3828" opacity="0.14" />
          <polygon
            points="150,500 540,500 660,760 80,760"
            fill={isNight ? '#C9D8F5' : '#FFF8E2'}
            opacity={isNight ? '0.14' : '0.22'}
          />
          {isNight && <rect x="0" y="500" width="1200" height="260" fill="#1F2944" opacity="0.18" />}
          <rect width="1200" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'campsite' && (
        <g>
          <rect
            width="1200"
            height="760"
            fill={isNight ? `url(#${id('nightSky')})` : `url(#${id('meadowSky')})`}
          />
          {isNight && renderSkyStars(0.8)}
          {/* Distant mist band */}
          <ellipse
            cx="600"
            cy="405"
            rx="680"
            ry="70"
            fill={isNight ? '#637A99' : '#FFFFFF'}
            opacity={isNight ? '0.28' : '0.38'}
          />
          {/* Layered Pine Ridges */}
          <path
            d="M0 410 L85 300 L155 390 L245 275 L335 385 L430 290 L520 395 L635 280 L730 390 L840 270 L945 385 L1050 288 L1130 385 L1200 315 V540 H0 Z"
            fill={isNight ? '#2A404B' : '#659078'}
          />
          <path
            d="M0 455 L110 355 L205 438 L315 335 L410 440 L525 358 L615 442 L740 340 L845 438 L960 350 L1075 442 L1200 352 V560 H0 Z"
            fill={isNight ? '#355259' : '#7BA47E'}
            filter={`url(#${id('paperShadow')})`}
          />
          <path
            d="M0 492 Q320 458 620 488 T1200 475 V760 H0 Z"
            fill={isNight ? '#4B6854' : '#96BB7B'}
            filter={`url(#${id('paperShadow')})`}
          />
          <ellipse
            cx="600"
            cy="635"
            rx="370"
            ry="96"
            fill={isNight ? '#627E60' : '#B7D49A'}
            opacity="0.58"
          />
          <path d="M-10 668 Q170 638 300 760 H-10 Z" fill={isNight ? '#2F4A3D' : '#6E945B'} />
          <path d="M1210 658 Q1030 634 890 760 H1210 Z" fill={isNight ? '#2F4A3D' : '#6E945B'} />
          <rect width="1200" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'craft_desk' && (
        <g>
          {/* Studio wallpaper */}
          <rect width="1200" height="510" fill="#EFE4D2" />
          <rect x="0" y="0" width="1200" height="510" fill={`url(#${id('paperDots')})`} />

          {/* Clean Framed Corkboard (upper left-center) */}
          <g transform="translate(88, 52)" filter={`url(#${id('paperShadow')})`}>
            <rect x="0" y="0" width="590" height="248" rx="10" fill="#B88757" stroke="#7E5732" strokeWidth="3" />
            <rect x="16" y="16" width="558" height="216" rx="4" fill={`url(#${id('cork')})`} stroke="#9E7142" strokeWidth="2" />
          </g>

          {/* Pegboard Station (upper right) */}
          <g transform="translate(720, 52)" filter={`url(#${id('paperShadow')})`}>
            <rect x="0" y="0" width="392" height="248" rx="10" fill="#C49A6C" stroke="#7E5732" strokeWidth="3" />
            <rect x="14" y="14" width="364" height="220" rx="4" fill={`url(#${id('pegboard')})`} stroke="#AD8D68" strokeWidth="2" />
            <rect x="44" y="182" width="220" height="10" rx="4" fill="#9E744A" />
            <circle cx="64" cy="187" r="4" fill="#FFFDF8" />
            <circle cx="154" cy="187" r="4" fill="#FFFDF8" />
            <circle cx="244" cy="187" r="4" fill="#FFFDF8" />
          </g>

          {/* Mid-Level Floating Craft Studio Display Shelf */}
          <g transform="translate(84, 348)" filter={`url(#${id('paperShadow')})`}>
            <rect x="0" y="0" width="1032" height="24" rx="5" fill="#C79B6B" stroke="#7E5732" strokeWidth="2.5" />
            <rect x="0" y="20" width="1032" height="7" fill="#9E7142" />
            <polygon points="62,27 94,27 62,62" fill="#A5774B" stroke="#7E5732" strokeWidth="2" />
            <polygon points="516,27 546,27 516,62" fill="#A5774B" stroke="#7E5732" strokeWidth="2" />
            <polygon points="970,27 938,27 970,62" fill="#A5774B" stroke="#7E5732" strokeWidth="2" />
          </g>

          {/* Oak Desk Edge & Surface */}
          <rect x="0" y="486" width="1200" height="24" fill="#AE7E50" stroke="#7E5732" strokeWidth="2" />
          <rect x="0" y="510" width="1200" height="250" fill="#E3C49B" />
          <rect x="0" y="510" width="1200" height="18" fill="#3D312A" opacity="0.1" />

          {/* Gridded Craft Cutting Mat */}
          <g transform="translate(220, 540)" filter={`url(#${id('paperShadow')})`}>
            <rect x="0" y="0" width="760" height="188" rx="14" fill={`url(#${id('cuttingGrid')})`} stroke="#38776C" strokeWidth="3.5" />
            <rect x="14" y="14" width="732" height="160" rx="6" fill="none" stroke="#BCE4DC" strokeWidth="2" />
            {Array.from({ length: 19 }).map((_, i) => (
              <line key={i} x1={40 + i * 38} y1="14" x2={40 + i * 38} y2="26" stroke="#BCE4DC" strokeWidth="1.6" />
            ))}
            <rect x="-12" y="18" width="44" height="14" rx="2" transform="rotate(-24 -12 18)" fill="#F7DF9C" opacity="0.9" />
            <rect x="726" y="8" width="44" height="14" rx="2" transform="rotate(22 726 8)" fill="#F7DF9C" opacity="0.9" />
          </g>
        </g>
      )}

      {backgroundId === 'autumn_park' && (
        <g>
          <rect
            width="1200"
            height="760"
            fill={isNight ? `url(#${id('nightSky')})` : `url(#${id('autumnSky')})`}
          />
          {isNight && renderSkyStars(0.75)}
          {/* Distant Amber Horizon Foliage */}
          <path
            d="M0 400 Q280 340 600 385 T1200 365 V760 H0 Z"
            fill={isNight ? '#5C4A42' : '#E7C28D'}
          />
          <circle cx="155" cy="340" r="95" fill={isNight ? '#8D492D' : '#D97236'} opacity="0.86" />
          <circle cx="245" cy="365" r="76" fill={isNight ? '#A16838' : '#E49E48'} opacity="0.9" />
          <circle cx="1015" cy="346" r="102" fill={isNight ? '#813F2B' : '#C9643B'} opacity="0.86" />
          <circle cx="920" cy="378" r="72" fill={isNight ? '#A16838' : '#E49E48'} opacity="0.9" />

          {/* Stone Retaining Wall Ledge */}
          <g filter={`url(#${id('softEdgeShadow')})`}>
            <rect x="0" y="424" width="1200" height="44" fill={isNight ? '#8E867B' : '#CFC1AC'} stroke="#7A7063" strokeWidth="2" />
            <rect x="0" y="414" width="1200" height="14" fill={isNight ? '#A99F91' : '#E4D8C6'} stroke="#7A7063" strokeWidth="2" />
            {Array.from({ length: 16 }).map((_, i) => (
              <line key={i} x1={i * 78} y1="428" x2={i * 78} y2="468" stroke="#7A7063" strokeWidth="2" />
            ))}
          </g>

          {/* Clean Ochre Lawn & Park Walkway */}
          <path
            d="M0 468 Q340 442 620 468 T1200 458 V760 H0 Z"
            fill={isNight ? '#776745' : '#C7AD6E'}
          />
          <path
            d="M360 760 Q500 595 600 468 L690 468 Q710 600 845 760 Z"
            fill={isNight ? '#A29584' : '#E7D6BC'}
            opacity="0.72"
          />
          <rect width="1200" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'blossom_garden' && (
        <g>
          <rect
            width="1200"
            height="760"
            fill={isNight ? `url(#${id('blossomNightSky')})` : `url(#${id('blossomSky')})`}
          />
          {isNight && renderSkyStars(0.75)}
          <rect
            x="0"
            y="210"
            width="1200"
            height="270"
            fill={isNight ? '#4F496B' : '#F0E5D8'}
            opacity="0.55"
          />
          <path
            d="M0 390 Q320 330 620 385 T1200 355 V760 H0 Z"
            fill={isNight ? '#456058' : '#CBE0BE'}
          />
          {/* Stepped Garden Terrace Wall Ledge */}
          <rect
            x="0"
            y="438"
            width="1200"
            height="26"
            fill={isNight ? '#9C9089' : '#E2D6C5'}
            stroke="#8A7E75"
            strokeWidth="2"
            filter={`url(#${id('softEdgeShadow')})`}
          />
          <path
            d="M0 464 Q360 442 620 468 T1200 455 V760 H0 Z"
            fill={isNight ? '#4E7054' : '#A5C88B'}
            filter={`url(#${id('paperShadow')})`}
          />

          {/* Clean Garden Pond on Right */}
          <ellipse
            cx="965"
            cy="605"
            rx="235"
            ry="72"
            fill={isNight ? '#376779' : '#8CC5CD'}
            stroke={isNight ? '#D9D6E8' : '#FFFDF8'}
            strokeWidth="5"
            opacity="0.9"
          />
          <ellipse
            cx="965"
            cy="605"
            rx="185"
            ry="50"
            fill="none"
            stroke={isNight ? '#7FAEC2' : '#BCE4E9'}
            strokeWidth="2.5"
            strokeDasharray="12 8"
          />

          {/* Overhanging Cherry Blossom Canopy Framing */}
          <path d="M0 110 Q180 128 310 66" stroke={isNight ? '#4D3631' : '#7E5A46'} strokeWidth="13" strokeLinecap="round" fill="none" />
          <path d="M1200 104 Q1020 122 890 64" stroke={isNight ? '#4D3631' : '#7E5A46'} strokeWidth="13" strokeLinecap="round" fill="none" />
          {[
            [90, 96, 46],
            [178, 86, 54],
            [268, 72, 42],
            [935, 72, 42],
            [1030, 88, 54],
            [1125, 100, 48],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill={isNight ? '#C87895' : '#F4A9BE'}
              opacity="0.92"
              filter={`url(#${id('softEdgeShadow')})`}
            />
          ))}
          <rect width="1200" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'cozy_library' && (
        <g>
          <rect width="1200" height="500" fill={isNight ? '#7C9685' : '#96B39F'} />
          <rect width="1200" height="500" fill={`url(#${id('paperDots')})`} />

          {/* Clean Arched Library Window */}
          <g transform="translate(115, 52)" filter={`url(#${id('paperShadow')})`}>
            <path d="M0 140 A135 135 0 0 1 270 140 V310 H0 Z" fill="#6F4C32" stroke="#4D3320" strokeWidth="3" />
            <path
              d="M16 140 A119 119 0 0 1 254 140 V294 H16 Z"
              fill={isNight ? '#2B3E5C' : '#BFE2EC'}
            />
            {isNight ? (
              <>
                <circle cx="85" cy="82" r="2.6" fill="#FCEB9F" opacity="0.9" />
                <circle cx="132" cy="60" r="2.2" fill="#FCEB9F" opacity="0.85" />
                <circle cx="192" cy="96" r="2.4" fill="#FCEB9F" opacity="0.85" />
                <circle cx="164" cy="138" r="1.8" fill="#FCEB9F" opacity="0.78" />
                <circle cx="204" cy="68" r="16" fill="#FBE594" opacity="0.9" />
              </>
            ) : (
              <>
                <circle cx="195" cy="84" r="20" fill="#F4CC6A" />
                <path d="M16 238 Q92 204 156 226 T254 218 V294 H16 Z" fill="#92BA7E" />
                <ellipse cx="86" cy="108" rx="34" ry="14" fill="#FFFDF8" opacity="0.9" />
              </>
            )}
            <line x1="135" y1="22" x2="135" y2="294" stroke="#6F4C32" strokeWidth="6" />
            <line x1="16" y1="165" x2="254" y2="165" stroke="#6F4C32" strokeWidth="6" />
            <rect x="-18" y="302" width="306" height="22" rx="4" fill="#9A6B44" stroke="#4D3320" strokeWidth="2.5" />
          </g>

          {/* Open Recessed Walnut Bookcase Shelves */}
          <g transform="translate(765, 54)" filter={`url(#${id('paperShadow')})`}>
            <rect x="0" y="0" width="340" height="428" rx="8" fill="#8B5E3B" stroke="#4D3320" strokeWidth="3" />
            <rect x="18" y="18" width="304" height="392" fill="#5A3B23" />
            {[110, 210, 310].map((sy) => (
              <rect key={sy} x="14" y={sy} width="312" height="14" fill="#A6744C" stroke="#4D3320" strokeWidth="2" />
            ))}
          </g>

          {/* Wainscoting & Clean Walnut Parquet Floor */}
          <rect x="0" y="484" width="1200" height="18" fill="#6F4C32" stroke="#4D3320" strokeWidth="2" />
          <rect x="0" y="502" width="1200" height="258" fill={`url(#${id('walnutFloor')})`} />
          <rect x="0" y="502" width="1200" height="20" fill="#2A1D12" opacity={isNight ? '0.24' : '0.14'} />
          {isNight && <rect width="1200" height="760" fill="#182036" opacity="0.14" />}
        </g>
      )}

      {backgroundId === 'beach_cove' && (
        <g>
          <rect
            width="1200"
            height="760"
            fill={isNight ? `url(#${id('nightSky')})` : `url(#${id('beachSky')})`}
          />
          {isNight && renderSkyStars(0.84)}
          {/* Clean Ocean Waves & Seafoam */}
          <rect
            x="0"
            y="295"
            width="1200"
            height="185"
            fill={isNight ? `url(#${id('nightSeaWater')})` : `url(#${id('seaWater')})`}
          />
          {isNight && (
            <ellipse cx="960" cy="360" rx="140" ry="12" fill="#FBE594" opacity="0.24" />
          )}
          <path
            d="M0 398 Q90 382 180 398 T360 398 T540 398 T720 398 T900 398 T1080 398 T1200 398 V480 H0 Z"
            fill={isNight ? '#4C829B' : '#9BDCE0'}
          />
          <path
            d="M0 430 Q100 416 200 430 T400 430 T600 430 T800 430 T1000 430 T1200 430 V485 H0 Z"
            fill={isNight ? '#90BCCB' : '#E6F8F9'}
          />

          {/* Clean Sandy Beach & Driftwood Boardwalk Pier */}
          <path
            d="M0 455 Q360 432 680 462 T1200 448 V760 H0 Z"
            fill={isNight ? '#B8A686' : '#F3DFB6'}
            filter={`url(#${id('paperShadow')})`}
          />
          <g transform="translate(0, 560)" filter={`url(#${id('softEdgeShadow')})`}>
            <rect x="190" y="0" width="820" height="200" fill={isNight ? '#9C7E5E' : '#D4B087'} stroke="#6E4E30" strokeWidth="2.5" />
            {[36, 76, 116, 156].map((py) => (
              <line key={py} x1="190" y1={py} x2="1010" y2={py} stroke={isNight ? '#775B3F' : '#9E764D'} strokeWidth="2" />
            ))}
            <rect x="172" y="-34" width="28" height="234" rx="5" fill={isNight ? '#876747' : '#B5895D'} stroke="#5E4228" strokeWidth="2.5" />
            <rect x="1000" y="-34" width="28" height="234" rx="5" fill={isNight ? '#876747' : '#B5895D'} stroke="#5E4228" strokeWidth="2.5" />
          </g>
          <ellipse cx="92" cy="680" rx="110" ry="62" fill={isNight ? '#7E8182' : '#B4B5AE'} stroke="#64655E" strokeWidth="2.5" />
          <ellipse cx="1115" cy="690" rx="118" ry="58" fill={isNight ? '#7E8182' : '#B4B5AE'} stroke="#64655E" strokeWidth="2.5" />
          <rect width="1200" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'treehouse_loft' && (
        <g>
          <rect
            width="1200"
            height="760"
            fill={isNight ? `url(#${id('nightSky')})` : `url(#${id('canopySky')})`}
          />
          {isNight && renderSkyStars(0.7)}
          {/* Cedar Plank Cabin Wall */}
          <path d="M60 0 H1140 V505 H60 Z" fill={isNight ? '#CFA97E' : '#E7C599'} />
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={i} x1="60" y1={i * 46} x2="1140" y2={i * 46} stroke={isNight ? '#AD855A' : '#C79E6E'} strokeWidth="2" />
          ))}

          {/* Round Treehouse Porthole Window */}
          <g transform="translate(600, 178)" filter={`url(#${id('paperShadow')})`}>
            <circle cx="0" cy="0" r="118" fill="#A67449" stroke="#6E4A2C" strokeWidth="3.5" />
            <circle cx="0" cy="0" r="98" fill={isNight ? '#263858' : '#C9E9EF'} />
            {isNight && (
              <>
                <circle cx="-42" cy="-38" r="2.5" fill="#FCEB9F" />
                <circle cx="28" cy="-54" r="2.2" fill="#FCEB9F" />
                <circle cx="52" cy="-22" r="2.0" fill="#FCEB9F" />
                <circle cx="-18" cy="-16" r="1.8" fill="#FCEB9F" />
                <path d="M36 -54 A15 15 0 1 0 54 -32 A11 11 0 1 1 36 -54 Z" fill="#FBE594" />
              </>
            )}
            <path
              d="M-98 28 Q-32 -8 24 22 T98 10 V98 H-98 Z"
              fill={isNight ? '#3E5E4F' : '#9BC381'}
            />
            <line x1="-98" y1="0" x2="98" y2="0" stroke="#A67449" strokeWidth="6" />
            <line x1="0" y1="-98" x2="0" y2="98" stroke="#A67449" strokeWidth="6" />
          </g>

          {/* Timber Loft Beams & Open Shelf Ledges */}
          <polygon points="0,0 190,0 0,210" fill={isNight ? '#7E5734' : '#9E6E44'} stroke="#5C3C22" strokeWidth="3" />
          <polygon points="1200,0 1010,0 1200,210" fill={isNight ? '#7E5734' : '#9E6E44'} stroke="#5C3C22" strokeWidth="3" />
          <rect x="82" y="298" width="265" height="22" rx="4" fill="#B58458" stroke="#6E4A2C" strokeWidth="2.5" filter={`url(#${id('softEdgeShadow')})`} />
          <rect x="853" y="298" width="265" height="22" rx="4" fill="#B58458" stroke="#6E4A2C" strokeWidth="2.5" filter={`url(#${id('softEdgeShadow')})`} />

          {/* Leafy Tree Canopy Framing Edges */}
          {[
            [62, 74, 68],
            [134, 46, 54],
            [1138, 74, 68],
            [1066, 46, 54],
            [45, 390, 56],
            [1155, 390, 56],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill={isNight ? '#446A4B' : '#76A468'}
              filter={`url(#${id('softEdgeShadow')})`}
            />
          ))}

          {/* Clean Timber Floor */}
          <rect x="0" y="498" width="1200" height="262" fill={`url(#${id('woodFloor')})`} />
          <rect x="0" y="498" width="1200" height="18" fill="#3D312A" opacity="0.18" />
          {isNight && <rect width="1200" height="760" fill="#18213A" opacity="0.16" />}
          <rect width="1200" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}
    </svg>
  );
};
