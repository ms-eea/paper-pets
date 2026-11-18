import React from 'react';
import { BackgroundId } from '../../types/game';

interface Props {
  backgroundId: BackgroundId;
}

export const PaperBackground: React.FC<Props> = ({ backgroundId }) => {
  if (backgroundId === 'living_room') {
    return (
      <svg
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        aria-hidden="true"
      >
        <defs>
          <pattern id="wallStripes" width="44" height="44" patternUnits="userSpaceOnUse">
            <rect width="44" height="44" fill="#F5E9D6" />
            <rect width="22" height="44" fill="#EFE0C8" />
          </pattern>
          <pattern id="woodFloor" width="120" height="36" patternUnits="userSpaceOnUse">
            <rect width="120" height="36" fill="#C99B6D" />
            <path d="M0 18 H120 M60 0 V18 M20 18 V36" stroke="#B38354" strokeWidth="2" />
          </pattern>
          <filter id="paperShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#3D312A" floodOpacity="0.14" />
          </filter>
        </defs>

        {/* Striped Scrapbook Wallpaper */}
        <rect width="1200" height="520" fill="url(#wallStripes)" />

        {/* Subtle warm sunbeam */}
        <polygon points="240,120 460,120 680,690 120,690" fill="#FFF8E2" opacity="0.34" />

        {/* Wainscoting & Crown Molding */}
        <rect x="0" y="0" width="1200" height="24" fill="#E4D2B7" />
        <rect x="0" y="385" width="1200" height="14" fill="#DFCAA9" filter="url(#paperShadow)" />
        <rect x="0" y="399" width="1200" height="115" fill="#E9D8BE" />
        {[80, 240, 400, 560, 720, 880, 1040].map((x) => (
          <rect
            key={x}
            x={x}
            y="416"
            width="112"
            height="78"
            rx="4"
            fill="#EFE1CA"
            stroke="#D6BE9C"
            strokeWidth="2"
          />
        ))}

        {/* Paper Cutout Window */}
        <g filter="url(#paperShadow)">
          <rect x="210" y="95" width="240" height="245" rx="10" fill="#FFFDF9" stroke="#CBB08D" strokeWidth="5" />
          <rect x="226" y="111" width="208" height="213" rx="4" fill="#BCE0EA" />
          {/* Distant hill outside window */}
          <path d="M226 268 Q290 236 350 264 T434 256 V324 H226 Z" fill="#8CC08E" />
          <circle cx="385" cy="158" r="24" fill="#F8D26A" />
          {/* Window panes */}
          <rect x="326" y="111" width="8" height="213" fill="#FFFDF9" />
          <rect x="226" y="212" width="208" height="8" fill="#FFFDF9" />
          {/* Curtains */}
          <path d="M196 86 H266 C256 170 250 260 236 346 H196 Z" fill="#D95D39" opacity="0.92" />
          <path d="M464 86 H394 C404 170 410 260 424 346 H464 Z" fill="#D95D39" opacity="0.92" />
          <rect x="184" y="80" width="292" height="14" rx="7" fill="#7D5A44" />
        </g>

        {/* Framed Mini Collage Picture on Right Wall */}
        <g filter="url(#paperShadow)">
          <rect x="830" y="128" width="136" height="162" rx="6" fill="#6E4E3A" />
          <rect x="842" y="140" width="112" height="138" fill="#FBF7F0" />
          <circle cx="898" cy="196" r="28" fill="#E09F3E" opacity="0.8" />
          <path d="M862 248 Q898 212 934 248 Z" fill="#2F7D6D" />
          {/* Washi tape top */}
          <rect x="875" y="118" width="46" height="16" fill="#E5B769" opacity="0.82" transform="rotate(-3 898 126)" />
        </g>

        {/* Baseboard & Oak Plank Floor */}
        <rect x="0" y="502" width="1200" height="18" fill="#D4BA96" />
        <rect x="0" y="520" width="1200" height="240" fill="url(#woodFloor)" />
        <rect x="0" y="520" width="1200" height="10" fill="#3D312A" opacity="0.1" />
      </svg>
    );
  }

  if (backgroundId === 'campsite') {
    return (
      <svg
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        aria-hidden="true"
      >
        <defs>
          <filter id="campShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="-3" stdDeviation="5" floodColor="#182234" floodOpacity="0.24" />
          </filter>
        </defs>
        <rect width="1200" height="760" fill="#25354D" />
        <circle cx="940" cy="145" r="56" fill="#F9E5A3" />
        <circle cx="964" cy="134" r="48" fill="#25354D" />
        {[
          [140, 110],
          [270, 190],
          [420, 92],
          [610, 140],
          [750, 88],
          [1060, 220],
          [190, 280],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 4 : 2.8} fill="#FFF3C9" opacity="0.88" />
        ))}
        {/* Distant paper mountain */}
        <path d="M0 440 L190 290 L380 420 L620 260 L870 410 L1080 280 L1200 370 V760 H0 Z" fill="#324B5E" filter="url(#campShadow)" />
        {/* Pine tree silhouettes */}
        {[95, 195, 980, 1085].map((px, idx) => (
          <g key={px} transform={`translate(${px}, ${idx % 2 === 0 ? 310 : 340})`}>
            <polygon points="0,0 -48,130 48,130" fill="#214645" />
            <polygon points="0,50 -58,180 58,180" fill="#1B3B3B" />
          </g>
        ))}
        {/* Ground hills */}
        <path d="M0 500 Q340 440 690 505 T1200 475 V760 H0 Z" fill="#33685A" filter="url(#campShadow)" />
        <path d="M0 560 Q450 515 880 568 T1200 548 V760 H0 Z" fill="#467E69" filter="url(#campShadow)" />
      </svg>
    );
  }

  if (backgroundId === 'craft_desk') {
    return (
      <svg
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        aria-hidden="true"
      >
        <defs>
          <pattern id="cork" width="32" height="32" patternUnits="userSpaceOnUse">
            <rect width="32" height="32" fill="#D7B488" />
            <circle cx="8" cy="10" r="1.4" fill="#C09A6B" />
            <circle cx="24" cy="22" r="1.2" fill="#E3C49B" />
            <circle cx="18" cy="6" r="1" fill="#B68E60" />
          </pattern>
          <pattern id="cuttingMat" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#3B8376" />
            <path d="M40 0 H0 V40" fill="none" stroke="#5EA79A" strokeWidth="1.2" opacity="0.6" />
          </pattern>
        </defs>
        {/* Corkboard back */}
        <rect width="1200" height="490" fill="url(#cork)" />
        {/* Pinned notes on corkboard */}
        <g transform="translate(150 110) rotate(-4)">
          <rect width="140" height="150" rx="4" fill="#FFFDF7" stroke="#E0D3BC" strokeWidth="2" />
          <circle cx="70" cy="16" r="8" fill="#D95D39" />
          <path d="M26 52 H114 M26 78 H96 M26 104 H104" stroke="#C9B9A2" strokeWidth="5" strokeLinecap="round" />
        </g>
        <g transform="translate(910 120) rotate(5)">
          <rect width="150" height="125" rx="4" fill="#FCE9B8" stroke="#E2C783" strokeWidth="2" />
          <circle cx="75" cy="16" r="8" fill="#4C8DAE" />
          <circle cx="75" cy="70" r="26" fill="#E09F3E" opacity="0.5" />
        </g>
        {/* Desk edge & green cutting mat */}
        <rect x="0" y="485" width="1200" height="275" fill="#E7D4BA" />
        <rect x="65" y="512" width="1070" height="225" rx="12" fill="url(#cuttingMat)" stroke="#FFFDF8" strokeWidth="4" />
      </svg>
    );
  }

  if (backgroundId === 'autumn_park') {
    return (
      <svg
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        aria-hidden="true"
      >
        <defs>
          <filter id="autShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#5C3A21" floodOpacity="0.16" />
          </filter>
        </defs>
        <rect width="1200" height="760" fill="#FBE8C8" />
        <circle cx="960" cy="145" r="70" fill="#F4BC5C" />
        <path d="M0 450 Q310 380 620 445 T1200 415 V760 H0 Z" fill="#E5A24C" filter="url(#autShadow)" />
        <path d="M0 520 Q420 475 840 530 T1200 500 V760 H0 Z" fill="#C9733A" filter="url(#autShadow)" />
        {/* Cobblestone path */}
        <path d="M460 510 Q560 620 420 760 H790 Q690 615 620 510 Z" fill="#E6D5BC" />
        {/* Autumn tree canopy shapes */}
        <circle cx="150" cy="300" r="115" fill="#D95D39" filter="url(#autShadow)" />
        <circle cx="240" cy="340" r="85" fill="#E59A3C" />
        <rect x="155" y="390" width="28" height="150" rx="8" fill="#6E4B3A" />
      </svg>
    );
  }

  if (backgroundId === 'sunny_porch') {
    return (
      <svg
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        aria-hidden="true"
      >
        <defs>
          <pattern id="porchPlanks" width="100" height="38" patternUnits="userSpaceOnUse">
            <rect width="100" height="38" fill="#D4AC82" />
            <path d="M0 19 H100 M50 0 V19 M18 19 V38" stroke="#BD9264" strokeWidth="2" />
          </pattern>
          <filter id="porchShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#3D312A" floodOpacity="0.14" />
          </filter>
        </defs>
        <rect width="1200" height="760" fill="#DDEEF2" />
        <circle cx="980" cy="128" r="54" fill="#F9D976" />
        <path d="M0 395 Q320 340 640 390 T1200 365 V520 H0 Z" fill="#8CC08E" />
        {/* Porch Columns & Railing */}
        <rect x="0" y="0" width="1200" height="44" fill="#FBF7F0" filter="url(#porchShadow)" />
        <rect x="85" y="44" width="38" height="465" fill="#F3EBDD" stroke="#D6C4AC" strokeWidth="3" />
        <rect x="1077" y="44" width="38" height="465" fill="#F3EBDD" stroke="#D6C4AC" strokeWidth="3" />
        <rect x="0" y="390" width="1200" height="16" fill="#FBF7F0" stroke="#D6C4AC" strokeWidth="2" />
        {[175, 255, 335, 415, 495, 575, 655, 735, 815, 895, 975].map((rx) => (
          <rect key={rx} x={rx} y="406" width="14" height="96" fill="#EFE3CE" />
        ))}
        {/* Porch Wood Deck */}
        <rect x="0" y="502" width="1200" height="258" fill="url(#porchPlanks)" filter="url(#porchShadow)" />
      </svg>
    );
  }

  if (backgroundId === 'blossom_garden') {
    return (
      <svg
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        aria-hidden="true"
      >
        <defs>
          <filter id="blossomShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#3D312A" floodOpacity="0.14" />
          </filter>
        </defs>
        <rect width="1200" height="760" fill="#FCEFF3" />
        <circle cx="930" cy="145" r="62" fill="#FFF3C9" />
        <path d="M0 460 Q320 395 660 455 T1200 420 V760 H0 Z" fill="#9BC89B" filter="url(#blossomShadow)" />
        <path d="M0 545 Q420 500 840 555 T1200 530 V760 H0 Z" fill="#7FB584" filter="url(#blossomShadow)" />
        {/* Cut-paper pond */}
        <ellipse cx="900" cy="645" rx="185" ry="58" fill="#BCE0EA" stroke="#FFFDF8" strokeWidth="4" />
        {/* Cherry blossom tree left */}
        <rect x="145" y="340" width="32" height="210" rx="8" fill="#6E4E3A" />
        <circle cx="120" cy="280" r="88" fill="#E89EB0" filter="url(#blossomShadow)" />
        <circle cx="210" cy="300" r="78" fill="#F2B8C6" />
        <circle cx="165" cy="220" r="74" fill="#F7CBD6" />
      </svg>
    );
  }

  // Default: Outdoor Meadow (Starter #1)
  return (
    <svg
      viewBox="0 0 1200 760"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full block"
      aria-hidden="true"
    >
      <defs>
        <filter id="cutShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="-4" stdDeviation="5" floodColor="#3D312A" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Warm paper sky */}
      <rect width="1200" height="760" fill="#DDEEF2" />

      {/* Scalloped paper sun */}
      <g transform="translate(960 135)">
        <circle r="76" fill="#F7D36A" opacity="0.35" />
        <circle r="58" fill="#F4C24D" />
        <circle r="48" fill="#F9D976" />
      </g>

      {/* Cut-paper clouds */}
      <g fill="#FFFDF8" filter="url(#cutShadow)">
        <path d="M140 165 C140 138 175 128 195 144 C210 116 260 116 276 144 C302 138 328 156 324 180 C324 196 306 202 288 202 H164 C146 202 138 184 140 165 Z" />
        <path d="M560 118 C560 96 588 90 604 102 C618 78 662 78 674 102 C696 96 716 112 714 132 C714 145 700 150 684 150 H580 C564 150 558 134 560 118 Z" />
      </g>

      {/* Far mint paper hill */}
      <path
        d="M0 450 Q280 355 580 430 T1200 390 V760 H0 Z"
        fill="#A4CBA4"
        filter="url(#cutShadow)"
      />
      {/* Mid sage paper hill */}
      <path
        d="M0 505 Q360 440 730 510 T1200 470 V760 H0 Z"
        fill="#82B686"
        filter="url(#cutShadow)"
      />
      {/* Foreground meadow grass */}
      <path
        d="M0 565 Q410 520 820 572 T1200 546 V760 H0 Z"
        fill="#69A271"
        filter="url(#cutShadow)"
      />

      {/* Tiny paper wildflowers dotted in foreground */}
      {[
        [140, 620, '#FFFDF7'],
        [210, 668, '#F6CE64'],
        [350, 608, '#F3A7B8'],
        [860, 622, '#FFFDF7'],
        [990, 665, '#F6CE64'],
        [1080, 602, '#F3A7B8'],
      ].map(([fx, fy, fc], idx) => (
        <g key={idx} transform={`translate(${fx} ${fy})`}>
          <line x1="0" y1="0" x2="0" y2="18" stroke="#4D8054" strokeWidth="3" strokeLinecap="round" />
          <circle cx="0" cy="-4" r="6" fill={fc as string} />
          <circle cx="-5" cy="1" r="5" fill={fc as string} />
          <circle cx="5" cy="1" r="5" fill={fc as string} />
          <circle cx="0" cy="0" r="3.5" fill="#E09F3E" />
        </g>
      ))}
    </svg>
  );
};
