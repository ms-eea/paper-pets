import React, { useId } from 'react';
import { BackgroundId, TimeOfDay } from '../../types/game';

interface Props {
  backgroundId: BackgroundId;
  timeOfDay?: TimeOfDay;
  panoramic?: boolean;
  className?: string;
}

const NIGHT_STARS: [number, number, number][] = [
  [115, 76, 3.0],
  [260, 142, 2.2],
  [425, 68, 2.8],
  [540, 185, 2.0],
  [715, 76, 3.2],
  [835, 134, 2.0],
  [960, 62, 2.6],
  [1090, 118, 2.0],
  [1220, 74, 3.0],
  [1348, 136, 2.2],
  [1460, 68, 2.8],
  [1640, 112, 2.0],
  [1725, 72, 3.0],
  [1890, 130, 2.4],
  [2045, 78, 3.0],
  [2195, 152, 2.1],
  [2310, 84, 2.8],
  [770, 210, 2.1],
  [1420, 215, 2.0],
  [1020, 178, 2.4],
  [1540, 195, 2.2],
];

export const PaperBackground: React.FC<Props> = ({
  backgroundId,
  timeOfDay,
  panoramic = false,
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
      viewBox={panoramic ? '0 0 2400 760' : '600 0 1200 760'}
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
            width="2400"
            height="760"
            fill={isNight ? `url(#${id('nightSky')})` : `url(#${id('meadowSky')})`}
          />
          {isNight && renderSkyStars(0.8)}
          {/* Distant horizon hills across 2400px panorama */}
          <path
            d="M0 375 Q260 315 580 370 T1200 355 T1820 380 T2400 350 V760 H0 Z"
            fill={isNight ? '#3E555E' : '#C9DFBA'}
          />
          {/* Mid-distant rolling hills */}
          <path
            d="M-20 442 Q280 378 600 434 T1220 426 T1840 445 T2420 418 V760 H-20 Z"
            fill={isNight ? '#446359' : '#B4D39D'}
            filter={`url(#${id('paperShadow')})`}
          />
          {/* Left wing & right wing distant meadow trees */}
          <g opacity="0.92">
            <rect x="210" y="340" width="22" height="92" rx="4" fill={isNight ? '#4F3E31' : '#8C6643'} />
            <circle cx="221" cy="306" r="56" fill={isNight ? '#355444' : '#7BAA6B'} />
            <circle cx="176" cy="332" r="40" fill={isNight ? '#3C5E4C' : '#8ABB77'} />
            <circle cx="266" cy="334" r="38" fill={isNight ? '#355444' : '#74A364'} />

            <rect x="2120" y="344" width="22" height="92" rx="4" fill={isNight ? '#4F3E31' : '#8C6643'} />
            <circle cx="2131" cy="308" r="58" fill={isNight ? '#355444' : '#7BAA6B'} />
            <circle cx="2084" cy="336" r="42" fill={isNight ? '#3C5E4C' : '#8ABB77'} />
            <circle cx="2178" cy="336" r="38" fill={isNight ? '#355444' : '#74A364'} />
          </g>
          {/* Midground lawn tier */}
          <path
            d="M0 486 Q300 448 620 486 T1200 482 T1800 486 T2400 474 V760 H0 Z"
            fill={isNight ? '#4D7158' : '#9BC381'}
            filter={`url(#${id('paperShadow')})`}
          />
          {/* Cozy curved garden path accents in outer wings */}
          <ellipse cx="380" cy="618" rx="68" ry="20" fill={isNight ? '#757B72' : '#DFD4BC'} opacity="0.55" />
          <ellipse cx="475" cy="648" rx="46" ry="14" fill={isNight ? '#757B72' : '#DFD4BC'} opacity="0.55" />
          <ellipse cx="2010" cy="622" rx="66" ry="19" fill={isNight ? '#757B72' : '#DFD4BC'} opacity="0.55" />
          {/* Foreground dark-sage garden borders */}
          <path
            d="M-10 662 Q220 626 420 698 Q220 760 -10 760 Z"
            fill={isNight ? '#3B5C47' : '#82AE67'}
            filter={`url(#${id('softEdgeShadow')})`}
          />
          <path
            d="M2410 650 Q2180 620 1990 695 Q2190 760 2410 760 Z"
            fill={isNight ? '#3B5C47' : '#82AE67'}
            filter={`url(#${id('softEdgeShadow')})`}
          />
          <rect width="2400" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'living_room' && (
        <g>
          {/* Upper plaster wall spanning 2400px */}
          <rect width="2400" height="495" fill={isNight ? '#E7DAC6' : '#F4EAD9'} />
          {Array.from({ length: 48 }).map((_, i) => (
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
          <rect x="0" y="370" width="2400" height="125" fill={isNight ? '#D4C1A8' : '#E6D5BD'} />
          <rect x="0" y="362" width="2400" height="12" fill="#FFFDF8" stroke="#C5B096" strokeWidth="2" />
          {[36, 224, 412, 632, 832, 1430, 1620, 1820, 2010, 2200].map((px) => (
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

          {/* Left Wing: Built-in Picture Rail & Cozy Wall Alcove */}
          <g transform="translate(120, 96)" filter={`url(#${id('softEdgeShadow')})`}>
            <rect x="0" y="0" width="380" height="20" rx="4" fill="#B88758" stroke="#7E5632" strokeWidth="2.5" />
            <rect x="34" y="64" width="134" height="162" rx="6" fill="#E6D5BD" stroke="#B89E82" strokeWidth="2.5" />
            <rect x="46" y="76" width="110" height="138" rx="3" fill="#FFFDF8" />
            <circle cx="101" cy="145" r="30" fill="#B4D39D" opacity="0.7" />
            <rect x="210" y="84" width="134" height="124" rx="6" fill="#E6D5BD" stroke="#B89E82" strokeWidth="2.5" />
            <rect x="222" y="96" width="110" height="100" rx="3" fill="#FFFDF8" />
            <path d="M236 168 L268 128 L296 156 L320 138 L320 184 H236 Z" fill="#E09F3E" opacity="0.55" />
          </g>

          {/* Center-Left Deep Recessed Window Alcove */}
          <g transform="translate(755, 58)">
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

          {/* Center-Right Floating Wooden Display Wall Shelf */}
          <g transform="translate(1365, 225)" filter={`url(#${id('softEdgeShadow')})`}>
            <rect x="0" y="0" width="310" height="22" rx="5" fill="#B88758" stroke="#7E5632" strokeWidth="2.5" />
            <polygon points="36,22 60,22 36,52" fill="#9A6D43" stroke="#7E5632" strokeWidth="2" />
            <polygon points="274,22 250,22 274,52" fill="#9A6D43" stroke="#7E5632" strokeWidth="2" />
          </g>

          {/* Right Wing: Side Reading Nook Window & Mantel Ledge */}
          <g transform="translate(1900, 74)">
            <rect x="0" y="0" width="260" height="236" rx="130" fill="#C49A6C" stroke="#8C643C" strokeWidth="3" />
            <path
              d="M18 128 A112 112 0 0 1 242 128 V218 H18 Z"
              fill={isNight ? '#273857' : '#D7ECF2'}
            />
            <path
              d="M18 176 Q88 148 156 172 T242 166 V218 H18 Z"
              fill={isNight ? '#3C594E' : '#A5C98E'}
            />
            <line x1="130" y1="16" x2="130" y2="218" stroke="#FFFDF8" strokeWidth="6" />
            <line x1="18" y1="128" x2="242" y2="128" stroke="#FFFDF8" strokeWidth="6" />
            <rect
              x="-16"
              y="224"
              width="292"
              height="20"
              rx="4"
              fill="#E4C196"
              stroke="#8C643C"
              strokeWidth="2.5"
              filter={`url(#${id('softEdgeShadow')})`}
            />
          </g>

          {/* Baseboard molding */}
          <rect x="0" y="482" width="2400" height="20" fill="#FFFDF8" stroke="#C5B096" strokeWidth="2" />
          {/* Clean Hardwood Floor */}
          <rect x="0" y="502" width="2400" height="258" fill={`url(#${id('woodFloor')})`} />
          <rect x="0" y="502" width="2400" height="22" fill="#3D312A" opacity={isNight ? '0.22' : '0.12'} />
          {isNight && <rect width="2400" height="760" fill="#1D2642" opacity="0.16" />}
          <rect width="2400" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'sunny_porch' && (
        <g>
          <rect
            width="2400"
            height="760"
            fill={isNight ? `url(#${id('nightSky')})` : `url(#${id('meadowSky')})`}
          />
          {isNight && renderSkyStars(0.78)}
          {/* Distant rolling garden hills */}
          <path
            d="M0 385 Q300 325 640 370 T1260 355 T1880 378 T2400 352 V490 H0 Z"
            fill={isNight ? '#3D5950' : '#B8D5A3'}
          />

          {/* Pergola overhead wooden beams */}
          <rect x="0" y="0" width="2400" height="58" fill={isNight ? '#A7845E' : '#D9B78E'} stroke="#8C6640" strokeWidth="2.5" filter={`url(#${id('softEdgeShadow')})`} />
          {[140, 380, 620, 860, 1100, 1340, 1580, 1820, 2060, 2260].map((bx) => (
            <rect key={bx} x={bx} y="0" width="28" height="72" rx="4" fill={isNight ? '#96724D' : '#C79F73'} stroke="#8C6640" strokeWidth="2" />
          ))}
          {[34, 620, 1740, 2328].map((px) => (
            <rect key={px} x={px} y="54" width="38" height="445" fill={isNight ? '#B8956E' : '#E5C8A2'} stroke="#8C6640" strokeWidth="2.5" />
          ))}

          {/* Porch wooden balustrade across panorama */}
          <g filter={`url(#${id('softEdgeShadow')})`}>
            {Array.from({ length: 49 }).map((_, i) => (
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
            <rect x="44" y="352" width="2312" height="26" rx="5" fill={isNight ? '#E8DEC9' : '#FFFDF8'} stroke="#9E876D" strokeWidth="2.5" />
            <rect x="44" y="484" width="2312" height="18" fill={isNight ? '#C8B8A3' : '#E6D8C5'} stroke="#9E876D" strokeWidth="2" />
          </g>

          {/* Clean Warm Porch Deck */}
          <rect x="0" y="500" width="2400" height="260" fill={`url(#${id('woodFloor')})`} />
          <rect x="0" y="500" width="2400" height="20" fill="#4A3828" opacity="0.14" />
          <polygon
            points="750,500 1140,500 1260,760 680,760"
            fill={isNight ? '#C9D8F5' : '#FFF8E2'}
            opacity={isNight ? '0.14' : '0.22'}
          />
          <polygon
            points="1780,500 2120,500 2260,760 1720,760"
            fill={isNight ? '#C9D8F5' : '#FFF8E2'}
            opacity={isNight ? '0.12' : '0.18'}
          />
          {isNight && <rect x="0" y="500" width="2400" height="260" fill="#1F2944" opacity="0.18" />}
          <rect width="2400" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'campsite' && (
        <g>
          <rect
            width="2400"
            height="760"
            fill={isNight ? `url(#${id('nightSky')})` : `url(#${id('meadowSky')})`}
          />
          {isNight && renderSkyStars(0.8)}
          {/* Distant mist band */}
          <ellipse
            cx="1200"
            cy="405"
            rx="1280"
            ry="70"
            fill={isNight ? '#637A99' : '#FFFFFF'}
            opacity={isNight ? '0.28' : '0.38'}
          />
          {/* Layered Pine Ridges across 2400px */}
          <path
            d="M0 410 L90 295 L165 390 L260 272 L355 386 L455 292 L540 392 L640 298 L755 390 L845 275 L935 385 L1030 290 L1120 395 L1235 280 L1330 390 L1440 270 L1545 385 L1650 288 L1730 385 L1840 280 L1945 388 L2050 275 L2155 390 L2260 284 L2350 385 L2400 325 V540 H0 Z"
            fill={isNight ? '#2A404B' : '#659078'}
          />
          <path
            d="M0 455 L110 355 L210 440 L325 338 L430 442 L545 352 L650 440 L755 348 L860 438 L965 335 L1070 440 L1185 358 L1275 442 L1390 340 L1495 438 L1610 350 L1725 442 L1850 345 L1960 440 L2080 340 L2190 438 L2310 348 L2400 415 V560 H0 Z"
            fill={isNight ? '#355259' : '#7BA47E'}
            filter={`url(#${id('paperShadow')})`}
          />
          <path
            d="M0 492 Q360 458 720 488 T1440 478 T2100 490 T2400 475 V760 H0 Z"
            fill={isNight ? '#4B6854' : '#96BB7B'}
            filter={`url(#${id('paperShadow')})`}
          />
          <ellipse
            cx="1200"
            cy="635"
            rx="420"
            ry="96"
            fill={isNight ? '#627E60' : '#B7D49A'}
            opacity="0.58"
          />
          {/* Wing boulders & pines */}
          <ellipse cx="235" cy="642" rx="78" ry="34" fill={isNight ? '#455159' : '#9DA097'} opacity="0.88" />
          <ellipse cx="2155" cy="648" rx="84" ry="36" fill={isNight ? '#455159' : '#9DA097'} opacity="0.88" />
          <path d="M-10 668 Q170 638 300 760 H-10 Z" fill={isNight ? '#2F4A3D' : '#6E945B'} />
          <path d="M2410 658 Q2230 634 2090 760 H2410 Z" fill={isNight ? '#2F4A3D' : '#6E945B'} />
          <rect width="2400" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'craft_desk' && (
        <g>
          {/* Studio wallpaper spanning 2400px */}
          <rect width="2400" height="510" fill="#EFE4D2" />
          <rect x="0" y="0" width="2400" height="510" fill={`url(#${id('paperDots')})`} />

          {/* Left Wing Cork Pin Strip & Storage Wall Shelf */}
          <g transform="translate(88, 66)" filter={`url(#${id('paperShadow')})`}>
            <rect x="0" y="0" width="460" height="220" rx="10" fill="#B88757" stroke="#7E5732" strokeWidth="3" />
            <rect x="14" y="14" width="432" height="192" rx="4" fill={`url(#${id('pegboard')})`} stroke="#AD8D68" strokeWidth="2" />
            <rect x="40" y="160" width="260" height="12" rx="4" fill="#9E744A" />
          </g>
          <g transform="translate(88, 348)" filter={`url(#${id('paperShadow')})`}>
            <rect x="0" y="0" width="470" height="24" rx="5" fill="#C79B6B" stroke="#7E5732" strokeWidth="2.5" />
            <rect x="0" y="20" width="470" height="7" fill="#9E7142" />
            <polygon points="56,27 88,27 56,62" fill="#A5774B" stroke="#7E5732" strokeWidth="2" />
            <polygon points="414,27 382,27 414,62" fill="#A5774B" stroke="#7E5732" strokeWidth="2" />
          </g>

          {/* Center Clean Framed Corkboard */}
          <g transform="translate(688, 52)" filter={`url(#${id('paperShadow')})`}>
            <rect x="0" y="0" width="590" height="248" rx="10" fill="#B88757" stroke="#7E5732" strokeWidth="3" />
            <rect x="16" y="16" width="558" height="216" rx="4" fill={`url(#${id('cork')})`} stroke="#9E7142" strokeWidth="2" />
          </g>

          {/* Center-Right Pegboard Station */}
          <g transform="translate(1320, 52)" filter={`url(#${id('paperShadow')})`}>
            <rect x="0" y="0" width="392" height="248" rx="10" fill="#C49A6C" stroke="#7E5732" strokeWidth="3" />
            <rect x="14" y="14" width="364" height="220" rx="4" fill={`url(#${id('pegboard')})`} stroke="#AD8D68" strokeWidth="2" />
            <rect x="44" y="182" width="220" height="10" rx="4" fill="#9E744A" />
            <circle cx="64" cy="187" r="4" fill="#FFFDF8" />
            <circle cx="154" cy="187" r="4" fill="#FFFDF8" />
            <circle cx="244" cy="187" r="4" fill="#FFFDF8" />
          </g>

          {/* Right Wing Inspiration Corkboard & Shelf */}
          <g transform="translate(1820, 66)" filter={`url(#${id('paperShadow')})`}>
            <rect x="0" y="0" width="480" height="220" rx="10" fill="#B88757" stroke="#7E5732" strokeWidth="3" />
            <rect x="16" y="16" width="448" height="188" rx="4" fill={`url(#${id('cork')})`} stroke="#9E7142" strokeWidth="2" />
          </g>
          <g transform="translate(1820, 348)" filter={`url(#${id('paperShadow')})`}>
            <rect x="0" y="0" width="480" height="24" rx="5" fill="#C79B6B" stroke="#7E5732" strokeWidth="2.5" />
            <rect x="0" y="20" width="480" height="7" fill="#9E7142" />
            <polygon points="56,27 88,27 56,62" fill="#A5774B" stroke="#7E5732" strokeWidth="2" />
            <polygon points="424,27 392,27 424,62" fill="#A5774B" stroke="#7E5732" strokeWidth="2" />
          </g>

          {/* Center Mid-Level Floating Craft Studio Display Shelf */}
          <g transform="translate(684, 348)" filter={`url(#${id('paperShadow')})`}>
            <rect x="0" y="0" width="1032" height="24" rx="5" fill="#C79B6B" stroke="#7E5732" strokeWidth="2.5" />
            <rect x="0" y="20" width="1032" height="7" fill="#9E7142" />
            <polygon points="62,27 94,27 62,62" fill="#A5774B" stroke="#7E5732" strokeWidth="2" />
            <polygon points="516,27 546,27 516,62" fill="#A5774B" stroke="#7E5732" strokeWidth="2" />
            <polygon points="970,27 938,27 970,62" fill="#A5774B" stroke="#7E5732" strokeWidth="2" />
          </g>

          {/* Oak Desk Edge & Surface */}
          <rect x="0" y="486" width="2400" height="24" fill="#AE7E50" stroke="#7E5732" strokeWidth="2" />
          <rect x="0" y="510" width="2400" height="250" fill="#E3C49B" />
          <rect x="0" y="510" width="2400" height="18" fill="#3D312A" opacity="0.1" />

          {/* Secondary Left & Right Side Craft Mats */}
          <rect x="110" y="552" width="460" height="162" rx="12" fill="#D5B187" stroke="#A67E53" strokeWidth="2.5" opacity="0.7" />
          <rect x="1830" y="552" width="460" height="162" rx="12" fill="#D5B187" stroke="#A67E53" strokeWidth="2.5" opacity="0.7" />

          {/* Center Gridded Craft Cutting Mat */}
          <g transform="translate(820, 540)" filter={`url(#${id('paperShadow')})`}>
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
            width="2400"
            height="760"
            fill={isNight ? `url(#${id('nightSky')})` : `url(#${id('autumnSky')})`}
          />
          {isNight && renderSkyStars(0.75)}
          {/* Distant Amber Horizon Foliage */}
          <path
            d="M0 390 Q320 335 660 382 T1260 368 T1880 392 T2400 362 V760 H0 Z"
            fill={isNight ? '#5C4A42' : '#E7C28D'}
          />
          {/* Autumn canopy trees across left, center, and right wings */}
          <circle cx="215" cy="336" r="102" fill={isNight ? '#813F2B' : '#C9643B'} opacity="0.86" />
          <circle cx="315" cy="368" r="76" fill={isNight ? '#A16838' : '#E49E48'} opacity="0.9" />
          <circle cx="755" cy="340" r="95" fill={isNight ? '#8D492D' : '#D97236'} opacity="0.86" />
          <circle cx="845" cy="365" r="76" fill={isNight ? '#A16838' : '#E49E48'} opacity="0.9" />
          <circle cx="1615" cy="346" r="102" fill={isNight ? '#813F2B' : '#C9643B'} opacity="0.86" />
          <circle cx="1520" cy="378" r="72" fill={isNight ? '#A16838' : '#E49E48'} opacity="0.9" />
          <circle cx="2165" cy="338" r="98" fill={isNight ? '#8D492D' : '#D97236'} opacity="0.86" />
          <circle cx="2068" cy="370" r="74" fill={isNight ? '#A16838' : '#E49E48'} opacity="0.9" />

          {/* Stone Retaining Wall Ledge across 2400px */}
          <g filter={`url(#${id('softEdgeShadow')})`}>
            <rect x="0" y="424" width="2400" height="44" fill={isNight ? '#8E867B' : '#CFC1AC'} stroke="#7A7063" strokeWidth="2" />
            <rect x="0" y="414" width="2400" height="14" fill={isNight ? '#A99F91' : '#E4D8C6'} stroke="#7A7063" strokeWidth="2" />
            {Array.from({ length: 32 }).map((_, i) => (
              <line key={i} x1={i * 78} y1="428" x2={i * 78} y2="468" stroke="#7A7063" strokeWidth="2" />
            ))}
          </g>

          {/* Clean Ochre Lawn & Park Walkway */}
          <path
            d="M0 468 Q380 442 740 468 T1480 458 T2120 468 T2400 458 V760 H0 Z"
            fill={isNight ? '#776745' : '#C7AD6E'}
          />
          <path
            d="M960 760 Q1100 595 1200 468 L1290 468 Q1310 600 1445 760 Z"
            fill={isNight ? '#A29584' : '#E7D6BC'}
            opacity="0.72"
          />
          <rect width="2400" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'blossom_garden' && (
        <g>
          <rect
            width="2400"
            height="760"
            fill={isNight ? `url(#${id('blossomNightSky')})` : `url(#${id('blossomSky')})`}
          />
          {isNight && renderSkyStars(0.75)}
          <rect
            x="0"
            y="210"
            width="2400"
            height="270"
            fill={isNight ? '#4F496B' : '#F0E5D8'}
            opacity="0.55"
          />
          <path
            d="M0 390 Q360 330 740 385 T1480 355 T2100 382 T2400 355 V760 H0 Z"
            fill={isNight ? '#456058' : '#CBE0BE'}
          />
          {/* Stepped Garden Terrace Wall Ledge */}
          <rect
            x="0"
            y="438"
            width="2400"
            height="26"
            fill={isNight ? '#9C9089' : '#E2D6C5'}
            stroke="#8A7E75"
            strokeWidth="2"
            filter={`url(#${id('softEdgeShadow')})`}
          />
          <path
            d="M0 464 Q400 442 780 468 T1560 455 T2180 468 T2400 458 V760 H0 Z"
            fill={isNight ? '#4E7054' : '#A5C88B'}
            filter={`url(#${id('paperShadow')})`}
          />

          {/* Left Wing Peaceful Garden Pond & Stepping Pads */}
          <ellipse
            cx="320"
            cy="610"
            rx="195"
            ry="58"
            fill={isNight ? '#376779' : '#8CC5CD'}
            stroke={isNight ? '#D9D6E8' : '#FFFDF8'}
            strokeWidth="4.5"
            opacity="0.88"
          />
          <ellipse
            cx="320"
            cy="610"
            rx="145"
            ry="38"
            fill="none"
            stroke={isNight ? '#7FAEC2' : '#BCE4E9'}
            strokeWidth="2.5"
            strokeDasharray="10 8"
          />

          {/* Center-Right Garden Pond */}
          <ellipse
            cx="1565"
            cy="605"
            rx="235"
            ry="72"
            fill={isNight ? '#376779' : '#8CC5CD'}
            stroke={isNight ? '#D9D6E8' : '#FFFDF8'}
            strokeWidth="5"
            opacity="0.9"
          />
          <ellipse
            cx="1565"
            cy="605"
            rx="185"
            ry="50"
            fill="none"
            stroke={isNight ? '#7FAEC2' : '#BCE4E9'}
            strokeWidth="2.5"
            strokeDasharray="12 8"
          />

          {/* Overhanging Cherry Blossom Canopy Framing across wings and center */}
          <path d="M0 98 Q180 128 360 64" stroke={isNight ? '#4D3631' : '#7E5A46'} strokeWidth="13" strokeLinecap="round" fill="none" />
          <path d="M580 110 Q740 128 890 66" stroke={isNight ? '#4D3631' : '#7E5A46'} strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M1800 104 Q1620 122 1490 64" stroke={isNight ? '#4D3631' : '#7E5A46'} strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M2400 98 Q2220 126 2050 62" stroke={isNight ? '#4D3631' : '#7E5A46'} strokeWidth="13" strokeLinecap="round" fill="none" />
          {[
            [95, 92, 50],
            [205, 86, 56],
            [315, 70, 44],
            [680, 96, 46],
            [778, 86, 54],
            [868, 72, 42],
            [1535, 72, 42],
            [1630, 88, 54],
            [1725, 100, 48],
            [2095, 70, 44],
            [2205, 86, 56],
            [2315, 94, 50],
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
          <rect width="2400" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'cozy_library' && (
        <g>
          <rect width="2400" height="500" fill={isNight ? '#7C9685' : '#96B39F'} />
          <rect width="2400" height="500" fill={`url(#${id('paperDots')})`} />

          {/* Left Wing Tall Walnut Bookcase */}
          <g transform="translate(130, 54)" filter={`url(#${id('paperShadow')})`}>
            <rect x="0" y="0" width="340" height="428" rx="8" fill="#8B5E3B" stroke="#4D3320" strokeWidth="3" />
            <rect x="18" y="18" width="304" height="392" fill="#5A3B23" />
            {[110, 210, 310].map((sy) => (
              <rect key={sy} x="14" y={sy} width="312" height="14" fill="#A6744C" stroke="#4D3320" strokeWidth="2" />
            ))}
          </g>

          {/* Center-Left Clean Arched Library Window */}
          <g transform="translate(715, 52)" filter={`url(#${id('paperShadow')})`}>
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

          {/* Center-Right Open Recessed Walnut Bookcase */}
          <g transform="translate(1365, 54)" filter={`url(#${id('paperShadow')})`}>
            <rect x="0" y="0" width="340" height="428" rx="8" fill="#8B5E3B" stroke="#4D3320" strokeWidth="3" />
            <rect x="18" y="18" width="304" height="392" fill="#5A3B23" />
            {[110, 210, 310].map((sy) => (
              <rect key={sy} x="14" y={sy} width="312" height="14" fill="#A6744C" stroke="#4D3320" strokeWidth="2" />
            ))}
          </g>

          {/* Right Wing: Study Wall Wainscot Paneling & Reading Shelf */}
          <g transform="translate(1880, 96)">
            <rect x="0" y="190" width="380" height="22" rx="4" fill="#8B5E3B" stroke="#4D3320" strokeWidth="2.5" filter={`url(#${id('softEdgeShadow')})`} />
            <rect x="30" y="0" width="140" height="164" rx="6" fill="#6F8978" stroke="#4D6656" strokeWidth="2.5" />
            <rect x="210" y="0" width="140" height="164" rx="6" fill="#6F8978" stroke="#4D6656" strokeWidth="2.5" />
          </g>

          {/* Wainscoting & Clean Walnut Parquet Floor */}
          <rect x="0" y="484" width="2400" height="18" fill="#6F4C32" stroke="#4D3320" strokeWidth="2" />
          <rect x="0" y="502" width="2400" height="258" fill={`url(#${id('walnutFloor')})`} />
          <rect x="0" y="502" width="2400" height="20" fill="#2A1D12" opacity={isNight ? '0.24' : '0.14'} />
          {isNight && <rect width="2400" height="760" fill="#182036" opacity="0.14" />}
        </g>
      )}

      {backgroundId === 'beach_cove' && (
        <g>
          <rect
            width="2400"
            height="760"
            fill={isNight ? `url(#${id('nightSky')})` : `url(#${id('beachSky')})`}
          />
          {isNight && renderSkyStars(0.84)}
          {/* Clean Ocean Waves & Seafoam across 2400px */}
          <rect
            x="0"
            y="295"
            width="2400"
            height="185"
            fill={isNight ? `url(#${id('nightSeaWater')})` : `url(#${id('seaWater')})`}
          />
          {isNight && (
            <ellipse cx="1560" cy="360" rx="140" ry="12" fill="#FBE594" opacity="0.24" />
          )}
          <path
            d="M0 398 Q90 382 180 398 T360 398 T540 398 T720 398 T900 398 T1080 398 T1260 398 T1440 398 T1620 398 T1800 398 T1980 398 T2160 398 T2340 398 L2400 398 V480 H0 Z"
            fill={isNight ? '#4C829B' : '#9BDCE0'}
          />
          <path
            d="M0 430 Q100 416 200 430 T400 430 T600 430 T800 430 T1000 430 T1200 430 T1400 430 T1600 430 T1800 430 T2000 430 T2200 430 T2400 430 V485 H0 Z"
            fill={isNight ? '#90BCCB' : '#E6F8F9'}
          />

          {/* Clean Sandy Beach & Centered Driftwood Boardwalk Pier */}
          <path
            d="M0 455 Q360 432 720 462 T1440 448 T2040 462 T2400 448 V760 H0 Z"
            fill={isNight ? '#B8A686' : '#F3DFB6'}
            filter={`url(#${id('paperShadow')})`}
          />
          <g transform="translate(600, 560)" filter={`url(#${id('softEdgeShadow')})`}>
            <rect x="190" y="0" width="820" height="200" fill={isNight ? '#9C7E5E' : '#D4B087'} stroke="#6E4E30" strokeWidth="2.5" />
            {[36, 76, 116, 156].map((py) => (
              <line key={py} x1="190" y1={py} x2="1010" y2={py} stroke={isNight ? '#775B3F' : '#9E764D'} strokeWidth="2" />
            ))}
            <rect x="172" y="-34" width="28" height="234" rx="5" fill={isNight ? '#876747' : '#B5895D'} stroke="#5E4228" strokeWidth="2.5" />
            <rect x="1000" y="-34" width="28" height="234" rx="5" fill={isNight ? '#876747' : '#B5895D'} stroke="#5E4228" strokeWidth="2.5" />
          </g>
          {/* Tidepool & Cove Boulders on Outer Wings */}
          <ellipse cx="320" cy="610" rx="120" ry="38" fill={isNight ? '#356883' : '#89CED3'} opacity="0.6" stroke="#FFFDF8" strokeWidth="3" />
          <ellipse cx="105" cy="676" rx="115" ry="62" fill={isNight ? '#7E8182' : '#B4B5AE'} stroke="#64655E" strokeWidth="2.5" />
          <ellipse cx="640" cy="686" rx="88" ry="44" fill={isNight ? '#7E8182' : '#B4B5AE'} stroke="#64655E" strokeWidth="2.5" />
          <ellipse cx="1760" cy="690" rx="92" ry="44" fill={isNight ? '#7E8182' : '#B4B5AE'} stroke="#64655E" strokeWidth="2.5" />
          <ellipse cx="2295" cy="676" rx="118" ry="58" fill={isNight ? '#7E8182' : '#B4B5AE'} stroke="#64655E" strokeWidth="2.5" />
          <rect width="2400" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'treehouse_loft' && (
        <g>
          <rect
            width="2400"
            height="760"
            fill={isNight ? `url(#${id('nightSky')})` : `url(#${id('canopySky')})`}
          />
          {isNight && renderSkyStars(0.7)}
          {/* Extended Cedar Plank Cabin Wall */}
          <path d="M60 0 H2340 V505 H60 Z" fill={isNight ? '#CFA97E' : '#E7C599'} />
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={i} x1="60" y1={i * 46} x2="2340" y2={i * 46} stroke={isNight ? '#AD855A' : '#C79E6E'} strokeWidth="2" />
          ))}

          {/* Left Wing Treehouse Side Porthole & Shelf */}
          <g transform="translate(340, 195)" filter={`url(#${id('paperShadow')})`}>
            <circle cx="0" cy="0" r="82" fill="#A67449" stroke="#6E4A2C" strokeWidth="3" />
            <circle cx="0" cy="0" r="66" fill={isNight ? '#263858' : '#C9E9EF'} />
            <path d="M-66 18 Q-20 -8 18 14 T66 6 V66 H-66 Z" fill={isNight ? '#3E5E4F' : '#9BC381'} />
            <line x1="-66" y1="0" x2="66" y2="0" stroke="#A67449" strokeWidth="5" />
            <line x1="0" y1="-66" x2="0" y2="66" stroke="#A67449" strokeWidth="5" />
          </g>
          <rect x="200" y="328" width="280" height="20" rx="4" fill="#B58458" stroke="#6E4A2C" strokeWidth="2.5" filter={`url(#${id('softEdgeShadow')})`} />

          {/* Center Round Treehouse Porthole Window */}
          <g transform="translate(1200, 178)" filter={`url(#${id('paperShadow')})`}>
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

          {/* Right Wing Treehouse Side Porthole & Shelf */}
          <g transform="translate(2060, 195)" filter={`url(#${id('paperShadow')})`}>
            <circle cx="0" cy="0" r="82" fill="#A67449" stroke="#6E4A2C" strokeWidth="3" />
            <circle cx="0" cy="0" r="66" fill={isNight ? '#263858' : '#C9E9EF'} />
            <path d="M-66 18 Q-20 -8 18 14 T66 6 V66 H-66 Z" fill={isNight ? '#3E5E4F' : '#9BC381'} />
            <line x1="-66" y1="0" x2="66" y2="0" stroke="#A67449" strokeWidth="5" />
            <line x1="0" y1="-66" x2="0" y2="66" stroke="#A67449" strokeWidth="5" />
          </g>
          <rect x="1920" y="328" width="280" height="20" rx="4" fill="#B58458" stroke="#6E4A2C" strokeWidth="2.5" filter={`url(#${id('softEdgeShadow')})`} />

          {/* Timber Loft Beams & Open Shelf Ledges */}
          <polygon points="0,0 210,0 0,210" fill={isNight ? '#7E5734' : '#9E6E44'} stroke="#5C3C22" strokeWidth="3" />
          <polygon points="2400,0 2190,0 2400,210" fill={isNight ? '#7E5734' : '#9E6E44'} stroke="#5C3C22" strokeWidth="3" />
          <rect x="682" y="298" width="265" height="22" rx="4" fill="#B58458" stroke="#6E4A2C" strokeWidth="2.5" filter={`url(#${id('softEdgeShadow')})`} />
          <rect x="1453" y="298" width="265" height="22" rx="4" fill="#B58458" stroke="#6E4A2C" strokeWidth="2.5" filter={`url(#${id('softEdgeShadow')})`} />

          {/* Leafy Tree Canopy Framing Edges */}
          {[
            [62, 74, 68],
            [134, 46, 54],
            [2338, 74, 68],
            [2266, 46, 54],
            [45, 390, 56],
            [2355, 390, 56],
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
          <rect x="0" y="498" width="2400" height="262" fill={`url(#${id('woodFloor')})`} />
          <rect x="0" y="498" width="2400" height="18" fill="#3D312A" opacity="0.18" />
          {isNight && <rect width="2400" height="760" fill="#18213A" opacity="0.16" />}
          <rect width="2400" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}
    </svg>
  );
};
