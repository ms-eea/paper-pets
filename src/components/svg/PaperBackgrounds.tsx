import React, { useId } from 'react';
import { BackgroundId } from '../../types/game';

interface Props {
  backgroundId: BackgroundId;
  className?: string;
}

export const PaperBackground: React.FC<Props> = ({ backgroundId, className = '' }) => {
  const uid = useId().replace(/:/g, '');
  const id = (name: string) => `${name}_${uid}`;

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
          <stop offset="0%" stopColor="#26334D" />
          <stop offset="65%" stopColor="#3B4D6B" />
          <stop offset="100%" stopColor="#4F607D" />
        </linearGradient>

        {/* Beach Cove Sky & Sea */}
        <linearGradient id={id('beachSky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BFE6F2" />
          <stop offset="75%" stopColor="#EAF7F8" />
          <stop offset="100%" stopColor="#FDF2D9" />
        </linearGradient>
        <linearGradient id={id('seaWater')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4FA3B3" />
          <stop offset="100%" stopColor="#7DC7CC" />
        </linearGradient>

        {/* Treehouse Canopy Sky */}
        <linearGradient id={id('canopySky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D7ECE2" />
          <stop offset="100%" stopColor="#F6F1DC" />
        </linearGradient>
      </defs>

      {backgroundId === 'meadow' && (
        <g>
          <rect width="1200" height="760" fill={`url(#${id('meadowSky')})`} />
          {/* Warm stitched paper sun */}
          <g transform="translate(975, 118)" filter={`url(#${id('softEdgeShadow')})`}>
            <circle cx="0" cy="0" r="64" fill="#F8DE9C" opacity="0.45" />
            <circle cx="0" cy="0" r="48" fill="#F3CA68" stroke="#E5B24C" strokeWidth="3" strokeDasharray="7 5" />
          </g>
          {/* Layered paper clouds */}
          <g fill="#FFFDF8" filter={`url(#${id('paperShadow')})`}>
            <path d="M135 138 Q158 98 202 108 Q228 80 268 98 Q304 94 316 128 Q340 132 336 154 H126 Q116 142 135 138 Z" />
            <path d="M625 110 Q644 82 678 90 Q704 68 738 86 Q766 86 772 110 Q792 114 786 130 H618 Z" />
          </g>
          {/* Distant horizon hill */}
          <path d="M0 400 Q260 320 580 375 T1200 355 V760 H0 Z" fill="#C9DFBA" />
          {/* Mid-distant rolling hill with ridge rim */}
          <path d="M-20 462 Q300 392 640 442 T1220 426 V760 H-20 Z" fill="#B4D39D" filter={`url(#${id('paperShadow')})`} />
          {/* Split-rail wooden fence plane for depth */}
          <g fill="#C69D72" stroke="#8C6742" strokeWidth="2.2">
            <rect x="-10" y="426" width="1220" height="8" rx="3" />
            <rect x="-10" y="454" width="1220" height="8" rx="3" />
            {[90, 250, 410, 790, 950, 1110].map((fx) => (
              <rect key={fx} x={fx} y="408" width="16" height="68" rx="4" fill="#B5895D" />
            ))}
          </g>
          {/* Midground lawn tier */}
          <path d="M0 492 Q290 456 610 490 T1200 476 V760 H0 Z" fill="#9BC381" filter={`url(#${id('paperShadow')})`} />
          {/* Winding stone garden path */}
          <path d="M475 760 Q515 620 565 535 Q615 495 660 482 L715 488 Q670 545 695 760 Z" fill="#EAE0CE" opacity="0.72" />
          {[
            [595, 512, 34, 14],
            [585, 558, 44, 17],
            [575, 618, 56, 20],
            [565, 690, 68, 24],
          ].map(([sx, sy, rx, ry], idx) => (
            <ellipse key={idx} cx={sx} cy={sy} rx={rx} ry={ry} fill="#DFD1BA" stroke="#BCA88C" strokeWidth="2" />
          ))}
          {/* Foreground dark-sage garden border */}
          <path d="M-10 662 Q220 626 420 698 Q220 760 -10 760 Z" fill="#82AE67" filter={`url(#${id('softEdgeShadow')})`} />
          <path d="M1210 650 Q980 620 790 695 Q990 760 1210 760 Z" fill="#82AE67" filter={`url(#${id('softEdgeShadow')})`} />
          {/* Paper wildflower tufts */}
          {[
            [115, 690, '#F4A261'],
            [195, 712, '#FFFDF8'],
            [285, 702, '#E9C46A'],
            [925, 708, '#FFFDF8'],
            [1020, 690, '#E76F51'],
            [1105, 715, '#E9C46A'],
          ].map(([cx, cy, col], i) => (
            <g key={i} transform={`translate(${cx}, ${cy})`}>
              <path d="M-10 10 Q0 -4 10 10" fill="none" stroke="#5D8446" strokeWidth="3" strokeLinecap="round" />
              <circle cx="0" cy="-2" r="8" fill={col as string} stroke="#3D312A" strokeWidth="1.5" />
              <circle cx="0" cy="-2" r="2.8" fill="#D99B26" />
            </g>
          ))}
          <rect width="1200" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'living_room' && (
        <g>
          {/* Upper plaster wall */}
          <rect width="1200" height="495" fill="#F4EAD9" />
          {/* Subtle vertical wallpaper stripes */}
          {Array.from({ length: 24 }).map((_, i) => (
            <rect key={i} x={i * 50} y="0" width="24" height="495" fill="#EFE1CC" opacity="0.55" />
          ))}
          {/* Lower wainscoting panels */}
          <rect x="0" y="370" width="1200" height="125" fill="#E6D5BD" />
          <rect x="0" y="362" width="1200" height="12" fill="#FFFDF8" stroke="#C5B096" strokeWidth="2" />
          {[32, 232, 830, 1020].map((px) => (
            <rect key={px} x={px} y="388" width="144" height="84" rx="4" fill="#EFE3D0" stroke="#CBB59B" strokeWidth="2" />
          ))}

          {/* Deep Recessed Window Alcove on Left-Center */}
          <g transform="translate(155, 58)">
            {/* Cast wall shadow behind frame */}
            <rect x="8" y="10" width="320" height="270" rx="8" fill="#B79E82" opacity="0.35" />
            {/* Outer wooden casing */}
            <rect x="0" y="0" width="320" height="260" rx="6" fill="#C49A6C" stroke="#8C643C" strokeWidth="3" />
            {/* Inner recessed sky view */}
            <rect x="18" y="18" width="284" height="224" fill="#D7ECF2" />
            {/* Tiny sunlit hills outside window */}
            <path d="M18 190 Q95 152 175 182 T302 172 V242 H18 Z" fill="#A5C98E" />
            <circle cx="255" cy="64" r="24" fill="#F4CE6A" />
            <path d="M52 72 Q70 50 96 58 Q116 44 134 64 Z" fill="#FFFDF8" opacity="0.85" />
            {/* Panes */}
            <line x1="160" y1="18" x2="160" y2="242" stroke="#FFFDF8" strokeWidth="7" />
            <line x1="18" y1="126" x2="302" y2="126" stroke="#FFFDF8" strokeWidth="7" />
            {/* Deep Window Sill Ledge (great for placing props!) */}
            <rect x="-14" y="252" width="348" height="22" rx="4" fill="#E4C196" stroke="#8C643C" strokeWidth="2.5" filter={`url(#${id('softEdgeShadow')})`} />
            {/* Paper curtains */}
            <path d="M-8 0 H74 Q54 128 32 252 H-8 Z" fill="#E07A5F" opacity="0.88" stroke="#9B4A34" strokeWidth="2" />
            <path d="M328 0 H246 Q266 128 288 252 H328 Z" fill="#E07A5F" opacity="0.88" stroke="#9B4A34" strokeWidth="2" />
          </g>

          {/* Floating Wooden Display Wall Shelf on Right (surface plane for decorating!) */}
          <g transform="translate(765, 195)" filter={`url(#${id('softEdgeShadow')})`}>
            <rect x="0" y="0" width="310" height="22" rx="5" fill="#B88758" stroke="#7E5632" strokeWidth="2.5" />
            <polygon points="36,22 60,22 36,52" fill="#9A6D43" stroke="#7E5632" strokeWidth="2" />
            <polygon points="274,22 250,22 274,52" fill="#9A6D43" stroke="#7E5632" strokeWidth="2" />
          </g>
          {/* Small framed botanical print above shelf */}
          <g transform="translate(865, 62)" filter={`url(#${id('softEdgeShadow')})`}>
            <rect x="0" y="0" width="110" height="106" rx="6" fill="#C49A6C" stroke="#7E5632" strokeWidth="2.5" />
            <rect x="12" y="12" width="86" height="82" fill="#FFFDF8" />
            <path d="M55 78 Q55 44 55 28" stroke="#2F7D6D" strokeWidth="3.5" fill="none" />
            <ellipse cx="42" cy="54" rx="12" ry="6" transform="rotate(-25 42 54)" fill="#7EB08B" />
            <ellipse cx="68" cy="46" rx="12" ry="6" transform="rotate(25 68 46)" fill="#7EB08B" />
            <circle cx="55" cy="28" r="9" fill="#E07A5F" />
          </g>

          {/* Baseboard molding */}
          <rect x="0" y="482" width="1200" height="20" fill="#FFFDF8" stroke="#C5B096" strokeWidth="2" />
          {/* Hardwood Floor */}
          <rect x="0" y="502" width="1200" height="258" fill={`url(#${id('woodFloor')})`} />
          <rect x="0" y="502" width="1200" height="22" fill="#3D312A" opacity="0.12" />

          {/* Cozy layered cut-paper area rug */}
          <g transform="translate(600, 622)" filter={`url(#${id('paperShadow')})`}>
            <ellipse cx="0" cy="0" rx="350" ry="96" fill="#E39B7D" stroke="#FFFDF8" strokeWidth="5" />
            <ellipse cx="0" cy="0" rx="302" ry="76" fill="none" stroke="#F4D5B8" strokeWidth="3" strokeDasharray="10 8" />
            <ellipse cx="0" cy="0" rx="220" ry="50" fill="#D58567" opacity="0.45" />
          </g>
          <rect width="1200" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'sunny_porch' && (
        <g>
          <rect width="1200" height="760" fill={`url(#${id('meadowSky')})`} />
          {/* Distant sunlit trees & garden hills */}
          <path d="M0 390 Q320 330 660 370 T1200 350 V490 H0 Z" fill="#B8D5A3" />
          <circle cx="145" cy="340" r="88" fill="#90B979" />
          <circle cx="235" cy="355" r="70" fill="#A1C789" />
          <circle cx="1030" cy="338" r="96" fill="#90B979" />

          {/* Pergola overhead wooden beams with hanging hook silhouette */}
          <rect x="0" y="0" width="1200" height="58" fill="#D9B78E" stroke="#9C764D" strokeWidth="2.5" filter={`url(#${id('softEdgeShadow')})`} />
          {[140, 380, 620, 860, 1080].map((bx) => (
            <rect key={bx} x={bx} y="0" width="28" height="72" rx="4" fill="#C79F73" stroke="#9C764D" strokeWidth="2" />
          ))}
          {/* Porch side support posts */}
          <rect x="34" y="54" width="38" height="445" fill="#E5C8A2" stroke="#9C764D" strokeWidth="2.5" />
          <rect x="1128" y="54" width="38" height="445" fill="#E5C8A2" stroke="#9C764D" strokeWidth="2.5" />

          {/* Porch wooden balustrade with wide top ledge for potted props */}
          <g filter={`url(#${id('softEdgeShadow')})`}>
            {Array.from({ length: 24 }).map((_, i) => (
              <rect key={i} x={68 + i * 46} y="370" width="16" height="122" fill="#EFE4D2" stroke="#B69E82" strokeWidth="1.5" />
            ))}
            <rect x="44" y="352" width="1112" height="26" rx="5" fill="#FFFDF8" stroke="#B69E82" strokeWidth="2.5" />
            <rect x="44" y="484" width="1112" height="18" fill="#E6D8C5" stroke="#B69E82" strokeWidth="2" />
          </g>

          {/* Warm sunlit porch deck floorboards */}
          <rect x="0" y="500" width="1200" height="260" fill={`url(#${id('woodFloor')})`} />
          <rect x="0" y="500" width="1200" height="20" fill="#4A3828" opacity="0.1" />
          {/* Woven doormat & dappled sunbeam */}
          <polygon points="150,500 540,500 660,760 80,760" fill="#FFF8E2" opacity="0.22" />
          <rect x="415" y="592" width="370" height="92" rx="18" fill="#E6BE8A" stroke="#BA8D58" strokeWidth="3" filter={`url(#${id('paperShadow')})`} />
          <rect x="433" y="606" width="334" height="64" rx="12" fill="none" stroke="#FFFDF8" strokeWidth="2" strokeDasharray="8 6" />
          <rect width="1200" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'campsite' && (
        <g>
          <rect width="1200" height="760" fill={`url(#${id('nightSky')})`} />
          {/* Twinkling cut-paper stars */}
          {[
            [115, 76], [235, 134], [360, 62], [490, 118], [620, 74], [748, 136],
            [860, 68], [1040, 112], [1125, 72], [170, 210], [820, 215], [420, 178],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3.8 : 2.3} fill="#FCEB9F" opacity={0.88} />
          ))}
          {/* Crescent Moon */}
          <g transform="translate(970, 122)">
            <circle cx="0" cy="0" r="46" fill="#FBE594" opacity="0.22" />
            <path d="M-8 -36 A36 36 0 1 0 32 18 A28 28 0 1 1 -8 -36 Z" fill="#FBE594" />
          </g>
          {/* Distant mist band */}
          <ellipse cx="600" cy="405" rx="680" ry="70" fill="#637A99" opacity="0.28" />
          {/* Three Layered Pine Ridges for true depth */}
          <path d="M0 410 L85 300 L155 390 L245 275 L335 385 L430 290 L520 395 L635 280 L730 390 L840 270 L945 385 L1050 288 L1130 385 L1200 315 V540 H0 Z" fill="#2A404B" />
          <path d="M0 455 L110 355 L205 438 L315 335 L410 440 L525 358 L615 442 L740 340 L845 438 L960 350 L1075 442 L1200 352 V560 H0 Z" fill="#355259" filter={`url(#${id('paperShadow')})`} />
          {/* Stone clearing ledge */}
          <path d="M0 492 Q320 458 620 488 T1200 475 V760 H0 Z" fill="#4B6854" filter={`url(#${id('paperShadow')})`} />
          <ellipse cx="600" cy="635" rx="370" ry="96" fill="#627E60" opacity="0.58" />
          {/* Foreground fern & log silhouette corners */}
          <path d="M-10 668 Q170 638 300 760 H-10 Z" fill="#2F4A3D" />
          <path d="M1210 658 Q1030 634 890 760 H1210 Z" fill="#2F4A3D" />
          <rect width="1200" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'craft_desk' && (
        <g>
          {/* Studio wallpaper */}
          <rect width="1200" height="510" fill="#EFE4D2" />
          <rect x="0" y="0" width="1200" height="510" fill={`url(#${id('paperDots')})`} />

          {/* Framed Corkboard (upper left-center) */}
          <g transform="translate(88, 52)" filter={`url(#${id('paperShadow')})`}>
            <rect x="0" y="0" width="590" height="248" rx="10" fill="#B88757" stroke="#7E5732" strokeWidth="3" />
            <rect x="16" y="16" width="558" height="216" rx="4" fill={`url(#${id('cork')})`} stroke="#9E7142" strokeWidth="2" />
            {/* Starter pinned index note */}
            <g transform="translate(46, 36) rotate(-3)">
              <rect x="0" y="0" width="108" height="86" rx="2" fill="#FFFDF8" stroke="#D6C4AC" strokeWidth="1.5" />
              <line x1="16" y1="24" x2="90" y2="24" stroke="#E2D3BE" strokeWidth="3" />
              <line x1="16" y1="42" x2="78" y2="42" stroke="#E2D3BE" strokeWidth="3" />
              <line x1="16" y1="60" x2="66" y2="60" stroke="#E2D3BE" strokeWidth="3" />
              <circle cx="54" cy="4" r="7" fill="#D95D39" stroke="#3D312A" strokeWidth="2" />
            </g>
          </g>

          {/* Pegboard Station (upper right) */}
          <g transform="translate(720, 52)" filter={`url(#${id('paperShadow')})`}>
            <rect x="0" y="0" width="392" height="248" rx="10" fill="#C49A6C" stroke="#7E5732" strokeWidth="3" />
            <rect x="14" y="14" width="364" height="220" rx="4" fill={`url(#${id('pegboard')})`} stroke="#AD8D68" strokeWidth="2" />
            {/* Small pegboard hooks rail */}
            <rect x="44" y="182" width="220" height="10" rx="4" fill="#9E744A" />
            <circle cx="64" cy="187" r="4" fill="#FFFDF8" />
            <circle cx="154" cy="187" r="4" fill="#FFFDF8" />
            <circle cx="244" cy="187" r="4" fill="#FFFDF8" />
          </g>

          {/* Mid-Level Floating Craft Studio Display Shelf (extra vertical plane!) */}
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
            {/* Ruler tick marks */}
            {Array.from({ length: 19 }).map((_, i) => (
              <line key={i} x1={40 + i * 38} y1="14" x2={40 + i * 38} y2="26" stroke="#BCE4DC" strokeWidth="1.6" />
            ))}
            {/* Masking tape strips holding mat corners */}
            <rect x="-12" y="18" width="44" height="14" rx="2" transform="rotate(-24 -12 18)" fill="#F7DF9C" opacity="0.9" />
            <rect x="726" y="8" width="44" height="14" rx="2" transform="rotate(22 726 8)" fill="#F7DF9C" opacity="0.9" />
          </g>
        </g>
      )}

      {backgroundId === 'autumn_park' && (
        <g>
          <rect width="1200" height="760" fill={`url(#${id('autumnSky')})`} />
          <circle cx="960" cy="138" r="50" fill="#F2B866" opacity="0.82" />
          {/* Distant Amber Trees & Ridge */}
          <path d="M0 400 Q280 340 600 385 T1200 365 V760 H0 Z" fill="#E7C28D" />
          <circle cx="155" cy="340" r="95" fill="#D97236" opacity="0.88" />
          <circle cx="245" cy="365" r="76" fill="#E49E48" opacity="0.92" />
          <circle cx="1015" cy="346" r="102" fill="#C9643B" opacity="0.88" />
          <circle cx="920" cy="378" r="72" fill="#E49E48" opacity="0.92" />

          {/* Stone Retaining Wall & Wrought Fence Ledge for props */}
          <g filter={`url(#${id('softEdgeShadow')})`}>
            <rect x="0" y="424" width="1200" height="44" fill="#CFC1AC" stroke="#9B8D79" strokeWidth="2" />
            <rect x="0" y="414" width="1200" height="14" fill="#E4D8C6" stroke="#9B8D79" strokeWidth="2" />
            {Array.from({ length: 16 }).map((_, i) => (
              <line key={i} x1={i * 78} y1="428" x2={i * 78} y2="468" stroke="#A79985" strokeWidth="2" />
            ))}
          </g>

          {/* Midground Ochre Lawn + Cobble Path */}
          <path d="M0 468 Q340 442 620 468 T1200 458 V760 H0 Z" fill="#C7AD6E" />
          <path d="M360 760 Q500 595 600 468 L690 468 Q710 600 845 760 Z" fill="#E7D6BC" opacity="0.72" />
          {/* Fallen autumn leaf piles */}
          {[
            [170, 685, '#D95D39'], [230, 710, '#E49E48'], [275, 675, '#C44B2B'],
            [920, 695, '#E49E48'], [990, 680, '#D95D39'], [1045, 712, '#B64628'],
          ].map(([cx, cy, col], idx) => (
            <ellipse key={idx} cx={cx} cy={cy} rx="22" ry="11" transform={`rotate(${idx * 18} ${cx} ${cy})`} fill={col as string} opacity="0.88" />
          ))}
          <rect width="1200" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {backgroundId === 'blossom_garden' && (
        <g>
          <rect width="1200" height="760" fill={`url(#${id('blossomSky')})`} />
          {/* Moon-gate stone wall */}
          <rect x="0" y="210" width="1200" height="270" fill="#F0E5D8" opacity="0.65" />
          {/* Distant sakura hills */}
          <path d="M0 390 Q320 330 620 385 T1200 355 V760 H0 Z" fill="#CBE0BE" />
          {/* Stepped Garden Terrace Wall Ledge */}
          <rect x="0" y="438" width="1200" height="26" fill="#E2D6C5" stroke="#B6A58F" strokeWidth="2" filter={`url(#${id('softEdgeShadow')})`} />
          <path d="M0 464 Q360 442 620 468 T1200 455 V760 H0 Z" fill="#A5C88B" filter={`url(#${id('paperShadow')})`} />

          {/* Tranquil Garden Pond on Right */}
          <ellipse cx="965" cy="605" rx="235" ry="72" fill="#8CC5CD" stroke="#FFFDF8" strokeWidth="5" opacity="0.88" />
          <ellipse cx="965" cy="605" rx="185" ry="50" fill="none" stroke="#BCE4E9" strokeWidth="2.5" strokeDasharray="12 8" />

          {/* Stepping stones path */}
          {[
            [470, 520], [545, 565], [610, 615], [565, 675], [640, 725],
          ].map(([sx, sy], i) => (
            <ellipse key={i} cx={sx} cy={sy} rx="42" ry="16" fill="#E7DDD0" stroke="#B6A58F" strokeWidth="2" />
          ))}

          {/* Overhanging Cherry Blossom Branches */}
          <path d="M0 110 Q180 128 310 66" stroke="#7E5A46" strokeWidth="13" strokeLinecap="round" fill="none" />
          <path d="M1200 104 Q1020 122 890 64" stroke="#7E5A46" strokeWidth="13" strokeLinecap="round" fill="none" />
          {[
            [90, 96, 46], [178, 86, 54], [268, 72, 42],
            [935, 72, 42], [1030, 88, 54], [1125, 100, 48],
          ].map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="#F4A9BE" opacity="0.92" filter={`url(#${id('softEdgeShadow')})`} />
          ))}
          <rect width="1200" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {/* NEW ROOM 1: COZY LIBRARY */}
      {backgroundId === 'cozy_library' && (
        <g>
          {/* Rich sage library wall */}
          <rect width="1200" height="500" fill="#7C9685" />
          <rect width="1200" height="500" fill={`url(#${id('paperDots')})`} />

          {/* Arched Library Window in Center-Left */}
          <g transform="translate(115, 52)" filter={`url(#${id('paperShadow')})`}>
            <path d="M0 140 A135 135 0 0 1 270 140 V310 H0 Z" fill="#6F4C32" stroke="#4D3320" strokeWidth="3" />
            <path d="M16 140 A119 119 0 0 1 254 140 V294 H16 Z" fill="#324663" />
            <circle cx="195" cy="96" r="22" fill="#FBE594" />
            <circle cx="85" cy="82" r="2.8" fill="#FFFDF8" />
            <circle cx="132" cy="60" r="2.5" fill="#FFFDF8" />
            <line x1="135" y1="22" x2="135" y2="294" stroke="#6F4C32" strokeWidth="6" />
            <line x1="16" y1="165" x2="254" y2="165" stroke="#6F4C32" strokeWidth="6" />
            {/* Deep window reading bench ledge */}
            <rect x="-18" y="302" width="306" height="22" rx="4" fill="#9A6B44" stroke="#4D3320" strokeWidth="2.5" />
          </g>

          {/* Built-in Recessed Walnut Bookcase on Right */}
          <g transform="translate(765, 54)" filter={`url(#${id('paperShadow')})`}>
            <rect x="0" y="0" width="340" height="428" rx="8" fill="#8B5E3B" stroke="#4D3320" strokeWidth="3" />
            <rect x="18" y="18" width="304" height="392" fill="#5A3B23" />
            {/* Shelves */}
            {[110, 210, 310].map((sy) => (
              <rect key={sy} x="14" y={sy} width="312" height="14" fill="#A6744C" stroke="#4D3320" strokeWidth="2" />
            ))}
            {/* Cut-paper book rows leaving space for user props! */}
            <g>
              <rect x="32" y="42" width="20" height="68" rx="2" fill="#D95D39" stroke="#3D312A" strokeWidth="2" />
              <rect x="54" y="48" width="18" height="62" rx="2" fill="#E9C46A" stroke="#3D312A" strokeWidth="2" />
              <rect x="74" y="38" width="22" height="72" rx="2" fill="#2F7D6D" stroke="#3D312A" strokeWidth="2" />
              <rect x="235" y="146" width="22" height="64" rx="2" fill="#6D597A" stroke="#3D312A" strokeWidth="2" />
              <rect x="259" y="152" width="20" height="58" rx="2" fill="#E07A5F" stroke="#3D312A" strokeWidth="2" />
              <rect x="36" y="246" width="24" height="64" rx="2" fill="#457B9D" stroke="#3D312A" strokeWidth="2" />
              <rect x="62" y="254" width="18" height="56" rx="2" fill="#D99B26" stroke="#3D312A" strokeWidth="2" />
            </g>
          </g>

          {/* Wainscoting & Hardwood Parquet */}
          <rect x="0" y="484" width="1200" height="18" fill="#6F4C32" stroke="#4D3320" strokeWidth="2" />
          <rect x="0" y="502" width="1200" height="258" fill={`url(#${id('walnutFloor')})`} />
          <rect x="0" y="502" width="1200" height="20" fill="#2A1D12" opacity="0.18" />

          {/* Warm Cream & Burgundy Cut-Paper Library Rug */}
          <g transform="translate(560, 628)" filter={`url(#${id('paperShadow')})`}>
            <rect x="-320" y="-76" width="640" height="152" rx="16" fill="#A84A3A" stroke="#F4E5C8" strokeWidth="5" />
            <rect x="-290" y="-56" width="580" height="112" rx="10" fill="none" stroke="#E9C46A" strokeWidth="3" strokeDasharray="12 6" />
          </g>
        </g>
      )}

      {/* NEW ROOM 2: BEACH COVE */}
      {backgroundId === 'beach_cove' && (
        <g>
          <rect width="1200" height="760" fill={`url(#${id('beachSky')})`} />
          {/* Paper clouds & sun */}
          <circle cx="220" cy="118" r="48" fill="#F7D06B" stroke="#E6B349" strokeWidth="3" />
          <path d="M770 112 Q794 80 832 88 Q860 66 896 86 Q924 88 928 112 H766 Z" fill="#FFFDF8" filter={`url(#${id('softEdgeShadow')})`} />

          {/* Turquoise Ocean with layered scalloped paper wave ridges */}
          <rect x="0" y="295" width="1200" height="185" fill={`url(#${id('seaWater')})`} />
          {/* Tiny distant sailboat */}
          <g transform="translate(880, 272)">
            <polygon points="-24,22 24,22 14,34 -14,34" fill="#B57B4C" stroke="#3D312A" strokeWidth="2" />
            <polygon points="0,-16 0,20 22,16" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2" />
            <polygon points="-2,-10 -2,20 -18,16" fill="#F4D8B8" stroke="#3D312A" strokeWidth="2" />
          </g>
          {/* Scalloped sea-foam wave */}
          <path d="M0 398 Q90 382 180 398 T360 398 T540 398 T720 398 T900 398 T1080 398 T1200 398 V480 H0 Z" fill="#9BDCE0" />
          <path d="M0 430 Q100 416 200 430 T400 430 T600 430 T800 430 T1000 430 T1200 430 V485 H0 Z" fill="#E6F8F9" />

          {/* Warm Sandy Beach Cove */}
          <path d="M0 455 Q360 432 680 462 T1200 448 V760 H0 Z" fill="#F3DFB6" filter={`url(#${id('paperShadow')})`} />
          {/* Driftwood Boardwalk Pier Plane in Mid-Foreground */}
          <g transform="translate(0, 560)" filter={`url(#${id('softEdgeShadow')})`}>
            <rect x="190" y="0" width="820" height="200" fill="#D4B087" stroke="#8C6742" strokeWidth="2.5" />
            {[36, 76, 116, 156].map((py) => (
              <line key={py} x1="190" y1={py} x2="1010" y2={py} stroke="#9E764D" strokeWidth="2" />
            ))}
            {/* Pier pilings */}
            <rect x="172" y="-34" width="28" height="234" rx="5" fill="#B5895D" stroke="#7A5634" strokeWidth="2.5" />
            <rect x="1000" y="-34" width="28" height="234" rx="5" fill="#B5895D" stroke="#7A5634" strokeWidth="2.5" />
          </g>
          {/* Cove smooth rocks framing corners */}
          <ellipse cx="92" cy="680" rx="110" ry="62" fill="#B4B5AE" stroke="#86877F" strokeWidth="2.5" />
          <ellipse cx="1115" cy="690" rx="118" ry="58" fill="#B4B5AE" stroke="#86877F" strokeWidth="2.5" />
          <rect width="1200" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}

      {/* NEW ROOM 3: TREEHOUSE LOFT */}
      {backgroundId === 'treehouse_loft' && (
        <g>
          <rect width="1200" height="760" fill={`url(#${id('canopySky')})`} />
          {/* Cedar Plank Cabin Wall */}
          <path d="M60 0 H1140 V505 H60 Z" fill="#E7C599" />
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={i} x1="60" y1={i * 46} x2="1140" y2={i * 46} stroke="#C79E6E" strokeWidth="2" />
          ))}

          {/* Round Treehouse Porthole Window */}
          <g transform="translate(600, 178)" filter={`url(#${id('paperShadow')})`}>
            <circle cx="0" cy="0" r="118" fill="#A67449" stroke="#6E4A2C" strokeWidth="3.5" />
            <circle cx="0" cy="0" r="98" fill="#C9E9EF" />
            <path d="M-98 28 Q-32 -8 24 22 T98 10 V98 H-98 Z" fill="#9BC381" />
            <line x1="-98" y1="0" x2="98" y2="0" stroke="#A67449" strokeWidth="6" />
            <line x1="0" y1="-98" x2="0" y2="98" stroke="#A67449" strokeWidth="6" />
          </g>

          {/* Diagonal Timber Loft Beams & Shelf Ledges */}
          <polygon points="0,0 190,0 0,210" fill="#9E6E44" stroke="#6E4A2C" strokeWidth="3" />
          <polygon points="1200,0 1010,0 1200,210" fill="#9E6E44" stroke="#6E4A2C" strokeWidth="3" />
          <rect x="82" y="298" width="265" height="22" rx="4" fill="#B58458" stroke="#6E4A2C" strokeWidth="2.5" filter={`url(#${id('softEdgeShadow')})`} />
          <rect x="853" y="298" width="265" height="22" rx="4" fill="#B58458" stroke="#6E4A2C" strokeWidth="2.5" filter={`url(#${id('softEdgeShadow')})`} />

          {/* Leafy Tree Canopy Framing Edges */}
          {[
            [62, 74, 68], [134, 46, 54], [1138, 74, 68], [1066, 46, 54],
            [45, 390, 56], [1155, 390, 56],
          ].map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="#76A468" filter={`url(#${id('softEdgeShadow')})`} />
          ))}

          {/* Timber Floor & Braided Oval Loft Rug */}
          <rect x="0" y="498" width="1200" height="262" fill={`url(#${id('woodFloor')})`} />
          <rect x="0" y="498" width="1200" height="18" fill="#3D312A" opacity="0.14" />
          <g transform="translate(600, 626)" filter={`url(#${id('paperShadow')})`}>
            <ellipse cx="0" cy="0" rx="310" ry="86" fill="#E9C46A" stroke="#FFFDF8" strokeWidth="5" />
            <ellipse cx="0" cy="0" rx="255" ry="66" fill="#7FA67A" stroke="#F4A261" strokeWidth="4" />
            <ellipse cx="0" cy="0" rx="190" ry="44" fill="#F2E7D5" />
          </g>
          <rect width="1200" height="760" fill={`url(#${id('paperDots')})`} />
        </g>
      )}
    </svg>
  );
};
