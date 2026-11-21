import React from 'react';

interface Props {
  itemId: string;
  className?: string;
}

export const PaperDecorationSvg: React.FC<Props> = ({ itemId, className = 'w-full h-full' }) => {
  switch (itemId) {
    case 'deco_plant':
      return (
        <svg viewBox="0 0 120 130" className={className}>
          <path d="M60 74 C44 45 20 35 16 18 C36 20 55 36 60 66 Z" fill="#3B8A77" stroke="#FFFDF8" strokeWidth="3" />
          <path d="M60 72 C76 42 100 30 105 15 C84 18 65 34 60 64 Z" fill="#2F7D6D" stroke="#FFFDF8" strokeWidth="3" />
          <path d="M60 70 C54 34 60 12 62 6 C72 18 70 42 62 70 Z" fill="#5CA88E" stroke="#FFFDF8" strokeWidth="3" />
          <polygon points="34,74 86,74 78,120 42,120" fill="#D95D39" stroke="#FFFDF8" strokeWidth="3" />
          <rect x="29" y="66" width="62" height="12" rx="4" fill="#E37352" stroke="#FFFDF8" strokeWidth="2.5" />
        </svg>
      );
    case 'deco_rug':
      return (
        <svg viewBox="0 0 180 90" className={className}>
          <ellipse cx="90" cy="45" rx="84" ry="38" fill="#E09F3E" stroke="#FFFDF8" strokeWidth="4" />
          <ellipse cx="90" cy="45" rx="64" ry="27" fill="#F3E5CE" stroke="#D95D39" strokeWidth="3" strokeDasharray="7 5" />
          <ellipse cx="90" cy="45" rx="38" ry="15" fill="#2F7D6D" />
        </svg>
      );
    case 'deco_sunflower':
      return (
        <svg viewBox="0 0 110 125" className={className}>
          <path d="M44 55 V116 M72 68 V116" stroke="#4F8A59" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="32" cy="92" rx="12" ry="6" transform="rotate(-25 32 92)" fill="#62A36D" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <ellipse
              key={deg}
              cx="44"
              cy="20"
              rx="6"
              ry="14"
              fill="#F2C047"
              transform={`rotate(${deg} 44 42)`}
            />
          ))}
          <circle cx="44" cy="42" r="14" fill="#6D4832" stroke="#FFFDF8" strokeWidth="2" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <ellipse
              key={deg}
              cx="74"
              cy="46"
              rx="4.5"
              ry="10"
              fill="#F7D36A"
              transform={`rotate(${deg} 74 62)`}
            />
          ))}
          <circle cx="74" cy="62" r="9.5" fill="#7D543B" />
        </svg>
      );
    case 'deco_bunting':
      return (
        <svg viewBox="0 0 180 80" className={className}>
          <path d="M6 12 Q90 36 174 12" fill="none" stroke="#6E5D52" strokeWidth="3" strokeLinecap="round" />
          <polygon points="18,16 44,22 26,48" fill="#D95D39" stroke="#FFFDF8" strokeWidth="2.5" />
          <polygon points="50,22 76,26 60,54" fill="#E09F3E" stroke="#FFFDF8" strokeWidth="2.5" />
          <polygon points="82,26 108,26 95,54" fill="#3B8A77" stroke="#FFFDF8" strokeWidth="2.5" />
          <polygon points="114,24 140,20 130,50" fill="#C85C7D" stroke="#FFFDF8" strokeWidth="2.5" />
          <polygon points="144,18 168,14 162,44" fill="#4C8DAE" stroke="#FFFDF8" strokeWidth="2.5" />
        </svg>
      );
    case 'deco_lamp':
      return (
        <svg viewBox="0 0 100 150" className={className}>
          <ellipse cx="50" cy="138" rx="24" ry="7" fill="#6E503E" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="46" y="54" width="8" height="84" fill="#8D6952" stroke="#FFFDF8" strokeWidth="2" />
          <polygon points="26,56 74,56 64,16 36,16" fill="#F6D58E" stroke="#FFFDF8" strokeWidth="3" />
          <path d="M36 16 L32 56 M50 16 V56 M64 16 L68 56" stroke="#DFB15B" strokeWidth="2" />
        </svg>
      );
    case 'deco_armchair':
      return (
        <svg viewBox="0 0 140 130" className={className}>
          <rect x="30" y="100" width="12" height="22" rx="3" fill="#6D4B37" />
          <rect x="98" y="100" width="12" height="22" rx="3" fill="#6D4B37" />
          <rect x="24" y="18" width="92" height="72" rx="22" fill="#D95D39" stroke="#FFFDF8" strokeWidth="3.5" />
          <rect x="14" y="54" width="24" height="52" rx="11" fill="#C74E2C" stroke="#FFFDF8" strokeWidth="3" />
          <rect x="102" y="54" width="24" height="52" rx="11" fill="#C74E2C" stroke="#FFFDF8" strokeWidth="3" />
          <rect x="30" y="66" width="80" height="38" rx="10" fill="#E88A6B" stroke="#FFFDF8" strokeWidth="2.5" />
        </svg>
      );
    case 'deco_bookshelf':
      return (
        <svg viewBox="0 0 130 140" className={className}>
          <rect x="14" y="12" width="102" height="120" rx="6" fill="#9E7351" stroke="#FFFDF8" strokeWidth="3.5" />
          <rect x="24" y="22" width="82" height="44" fill="#7D583C" />
          <rect x="24" y="76" width="82" height="44" fill="#7D583C" />
          {/* Books */}
          <rect x="28" y="30" width="13" height="36" rx="2" fill="#D95D39" />
          <rect x="43" y="26" width="14" height="40" rx="2" fill="#3B8A77" />
          <rect x="59" y="34" width="12" height="32" rx="2" fill="#E09F3E" />
          <rect x="74" y="29" width="15" height="37" rx="2" fill="#4C8DAE" />
          <rect x="30" y="84" width="16" height="36" rx="2" fill="#C85C7D" />
          <rect x="49" y="88" width="14" height="32" rx="2" fill="#EFE3CE" />
          <circle cx="88" cy="106" r="11" fill="#3B8A77" />
        </svg>
      );
    case 'deco_tree':
      return (
        <svg viewBox="0 0 150 175" className={className}>
          <rect x="62" y="86" width="26" height="80" rx="6" fill="#7B563E" stroke="#FFFDF8" strokeWidth="3" />
          <circle cx="48" cy="72" r="36" fill="#4E8B63" stroke="#FFFDF8" strokeWidth="3" />
          <circle cx="102" cy="72" r="36" fill="#4E8B63" stroke="#FFFDF8" strokeWidth="3" />
          <circle cx="75" cy="44" r="42" fill="#65A578" stroke="#FFFDF8" strokeWidth="3" />
          <circle cx="58" cy="40" r="6" fill="#D95D39" />
          <circle cx="92" cy="58" r="6" fill="#D95D39" />
        </svg>
      );
    case 'deco_mushroom':
      return (
        <svg viewBox="0 0 110 100" className={className}>
          <rect x="30" y="48" width="20" height="42" rx="8" fill="#F6EAD4" stroke="#FFFDF8" strokeWidth="3" />
          <path d="M12 52 C12 22 68 22 68 52 Z" fill="#D95D39" stroke="#FFFDF8" strokeWidth="3" />
          <circle cx="30" cy="37" r="5" fill="#FFFDF8" />
          <circle cx="48" cy="34" r="4" fill="#FFFDF8" />
          <rect x="70" y="62" width="14" height="28" rx="6" fill="#F6EAD4" stroke="#FFFDF8" strokeWidth="2.5" />
          <path d="M58 64 C58 44 96 44 96 64 Z" fill="#E09F3E" stroke="#FFFDF8" strokeWidth="2.5" />
          <circle cx="77" cy="54" r="3.5" fill="#FFFDF8" />
        </svg>
      );
    case 'deco_picnic':
      return (
        <svg viewBox="0 0 120 105" className={className}>
          <path d="M32 48 C32 16 88 16 88 48" fill="none" stroke="#8E6444" strokeWidth="7" strokeLinecap="round" />
          <rect x="20" y="44" width="80" height="48" rx="8" fill="#C9945E" stroke="#FFFDF8" strokeWidth="3" />
          <rect x="20" y="44" width="80" height="14" rx="4" fill="#D95D39" stroke="#FFFDF8" strokeWidth="2" />
          <path d="M24 68 H96 M24 80 H96" stroke="#A67442" strokeWidth="3" />
        </svg>
      );
    case 'deco_tea':
      return (
        <svg viewBox="0 0 100 90" className={className}>
          <ellipse cx="44" cy="76" rx="34" ry="8" fill="#EFE3CE" stroke="#FFFDF8" strokeWidth="2.5" />
          <circle cx="42" cy="52" r="22" fill="#4C8DAE" stroke="#FFFDF8" strokeWidth="3" />
          <path d="M62 46 C76 46 76 62 60 62" fill="none" stroke="#4C8DAE" strokeWidth="5" />
          <path d="M22 48 L12 36" stroke="#4C8DAE" strokeWidth="6" strokeLinecap="round" />
          <circle cx="42" cy="28" r="6" fill="#E09F3E" stroke="#FFFDF8" strokeWidth="2" />
        </svg>
      );
    case 'deco_cloud':
      return (
        <svg viewBox="0 0 130 85" className={className}>
          <line x1="65" y1="2" x2="65" y2="24" stroke="#A68B73" strokeWidth="2.5" strokeDasharray="3 3" />
          <path
            d="M20 64 C14 52 24 38 38 40 C44 22 72 20 82 36 C96 30 114 42 110 58 C110 68 98 72 86 72 H32 C24 72 20 68 20 64 Z"
            fill="#FFFDF8"
            stroke="#D6C4AC"
            strokeWidth="3"
          />
          <circle cx="52" cy="53" r="2.5" fill="#3D312A" />
          <circle cx="72" cy="53" r="2.5" fill="#3D312A" />
          <path d="M59 57 Q62 61 65 57" fill="none" stroke="#3D312A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'deco_lantern':
      return (
        <svg viewBox="0 0 100 120" className={className}>
          <line x1="50" y1="4" x2="50" y2="24" stroke="#6E5D52" strokeWidth="3" />
          <ellipse cx="50" cy="56" rx="28" ry="32" fill="#E09F3E" stroke="#FFFDF8" strokeWidth="3" />
          <ellipse cx="50" cy="56" rx="14" ry="32" fill="#F2CC66" opacity="0.65" />
          <rect x="38" y="20" width="24" height="8" rx="3" fill="#463830" />
          <rect x="38" y="84" width="24" height="8" rx="3" fill="#463830" />
          <line x1="50" y1="92" x2="50" y2="112" stroke="#D95D39" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'deco_yarn':
      return (
        <svg viewBox="0 0 110 95" className={className}>
          <circle cx="40" cy="36" r="18" fill="#C85C7D" stroke="#FFFDF8" strokeWidth="2.5" />
          <circle cx="68" cy="38" r="17" fill="#3B8A77" stroke="#FFFDF8" strokeWidth="2.5" />
          <path d="M18 46 H92 L82 84 H28 Z" fill="#C99B6D" stroke="#FFFDF8" strokeWidth="3" />
          <path d="M24 60 H86 M26 72 H84" stroke="#A6784B" strokeWidth="2.5" />
        </svg>
      );
    case 'deco_butterfly':
      return (
        <svg viewBox="0 0 110 95" className={className}>
          <ellipse cx="26" cy="34" rx="18" ry="14" fill="#F2CC66" stroke="#FFFDF8" strokeWidth="2.5" />
          <ellipse cx="50" cy="34" rx="18" ry="14" fill="#F2CC66" stroke="#FFFDF8" strokeWidth="2.5" />
          <ellipse cx="38" cy="36" rx="4" ry="14" fill="#463830" />
          <ellipse cx="66" cy="64" rx="14" ry="11" fill="#C85C7D" stroke="#FFFDF8" strokeWidth="2.5" />
          <ellipse cx="86" cy="64" rx="14" ry="11" fill="#C85C7D" stroke="#FFFDF8" strokeWidth="2.5" />
          <ellipse cx="76" cy="66" rx="3.5" ry="12" fill="#463830" />
        </svg>
      );
    case 'deco_easel':
      return (
        <svg viewBox="0 0 110 130" className={className}>
          <line x1="55" y1="14" x2="26" y2="122" stroke="#8E6444" strokeWidth="6" strokeLinecap="round" />
          <line x1="55" y1="14" x2="84" y2="122" stroke="#8E6444" strokeWidth="6" strokeLinecap="round" />
          <rect x="24" y="26" width="62" height="54" rx="4" fill="#FFFDF8" stroke="#6E4E3A" strokeWidth="4" />
          <circle cx="55" cy="52" r="14" fill="#D95D39" opacity="0.85" />
          <rect x="18" y="80" width="74" height="8" rx="3" fill="#7D583C" />
        </svg>
      );
    case 'deco_cushion':
      return (
        <svg viewBox="0 0 130 90" className={className}>
          <path
            d="M20 46 C20 26 42 22 65 22 C88 22 110 26 110 46 C110 66 90 74 65 74 C40 74 20 66 20 46 Z"
            fill="#E09F3E"
            stroke="#FFFDF8"
            strokeWidth="3.5"
          />
          <ellipse cx="65" cy="48" rx="34" ry="15" fill="#F2CC66" opacity="0.55" />
          <circle cx="65" cy="48" r="7" fill="#D95D39" stroke="#FFFDF8" strokeWidth="2" />
        </svg>
      );
    case 'deco_clock':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="38" fill="#6E503E" stroke="#FFFDF8" strokeWidth="3.5" />
          <circle cx="50" cy="50" r="29" fill="#FBF7F0" />
          <line x1="50" y1="50" x2="50" y2="31" stroke="#3D312A" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="50" y1="50" x2="64" y2="54" stroke="#D95D39" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="50" r="3.5" fill="#3D312A" />
        </svg>
      );
    case 'deco_fence':
      return (
        <svg viewBox="0 0 160 100" className={className}>
          <rect x="12" y="42" width="136" height="12" rx="3" fill="#E3CEAE" stroke="#FFFDF8" strokeWidth="2" />
          <rect x="12" y="68" width="136" height="12" rx="3" fill="#E3CEAE" stroke="#FFFDF8" strokeWidth="2" />
          {[22, 54, 86, 118].map((x) => (
            <path
              key={x}
              d={`M${x} 90 V28 L${x + 10} 14 L${x + 20} 28 V90 Z`}
              fill="#FBF7F0"
              stroke="#C9B396"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          ))}
        </svg>
      );
    case 'deco_campfire':
      return (
        <svg viewBox="0 0 110 105" className={className}>
          <rect x="18" y="72" width="74" height="14" rx="6" transform="rotate(-14 55 79)" fill="#7D583C" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="18" y="72" width="74" height="14" rx="6" transform="rotate(14 55 79)" fill="#9E7351" stroke="#FFFDF8" strokeWidth="2.5" />
          <path d="M55 14 C72 34 80 54 70 72 C62 78 48 78 40 72 C30 54 38 34 55 14 Z" fill="#D95D39" stroke="#FFFDF8" strokeWidth="3" />
          <path d="M55 32 C64 46 66 58 60 69 C56 72 54 72 50 69 C44 58 46 46 55 32 Z" fill="#F2CC66" />
        </svg>
      );
    case 'deco_fountain':
      return (
        <svg viewBox="0 0 120 130" className={className}>
          <rect x="48" y="68" width="24" height="44" rx="6" fill="#D6C4AC" stroke="#FFFDF8" strokeWidth="3" />
          <ellipse cx="60" cy="114" rx="34" ry="10" fill="#C9B396" stroke="#FFFDF8" strokeWidth="3" />
          <path d="M22 58 Q60 80 98 58 Z" fill="#E8DCC8" stroke="#FFFDF8" strokeWidth="3" />
          <ellipse cx="60" cy="56" rx="38" ry="11" fill="#BCE0EA" stroke="#FFFDF8" strokeWidth="3" />
          <path d="M60 54 Q46 28 36 42 M60 54 Q74 28 84 42" fill="none" stroke="#7EBCD0" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    /* NEW CRAFT STUDIO DECORATIONS */
    case 'deco_pencils':
      return (
        <svg viewBox="0 0 100 115" className={className}>
          <rect x="28" y="16" width="12" height="54" rx="2" transform="rotate(-12 34 43)" fill="#E09F3E" stroke="#FFFDF8" strokeWidth="2.5" />
          <polygon points="27,18 33,6 39,18" transform="rotate(-12 34 43)" fill="#F3E2C7" />
          <rect x="48" y="12" width="10" height="58" rx="2" transform="rotate(6 53 41)" fill="#3B8A77" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="64" y="18" width="11" height="52" rx="2" transform="rotate(14 69 44)" fill="#D95D39" stroke="#FFFDF8" strokeWidth="2.5" />
          <path d="M26 50 H74 L68 104 H32 Z" fill="#4C8DAE" stroke="#FFFDF8" strokeWidth="3" />
          <rect x="30" y="64" width="40" height="12" fill="#FFFDF8" opacity="0.55" />
        </svg>
      );
    case 'deco_scissors':
      return (
        <svg viewBox="0 0 110 110" className={className}>
          <g transform="rotate(-28 55 55)">
            <rect x="46" y="12" width="10" height="48" rx="4" fill="#D5DADF" stroke="#FFFDF8" strokeWidth="2.5" />
            <rect x="54" y="12" width="10" height="48" rx="4" fill="#B9C2CA" stroke="#FFFDF8" strokeWidth="2.5" />
            <circle cx="42" cy="78" r="14" fill="none" stroke="#E09F3E" strokeWidth="8" />
            <circle cx="68" cy="78" r="14" fill="none" stroke="#E09F3E" strokeWidth="8" />
            <circle cx="55" cy="54" r="4" fill="#3D312A" />
          </g>
        </svg>
      );
    case 'deco_washi_tower':
      return (
        <svg viewBox="0 0 100 115" className={className}>
          <rect x="18" y="80" width="64" height="22" rx="6" fill="#3B8A77" stroke="#FFFDF8" strokeWidth="2.5" />
          <circle cx="30" cy="91" r="3" fill="#FFFDF8" />
          <circle cx="50" cy="91" r="3" fill="#FFFDF8" />
          <circle cx="70" cy="91" r="3" fill="#FFFDF8" />
          <rect x="22" y="58" width="56" height="22" rx="6" fill="#E09F3E" stroke="#FFFDF8" strokeWidth="2.5" />
          <path d="M26 69 H74" stroke="#FFFDF8" strokeWidth="3" strokeDasharray="6 5" />
          <rect x="20" y="36" width="60" height="22" rx="6" fill="#D95D39" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="28" y="16" width="44" height="20" rx="6" fill="#C85C7D" stroke="#FFFDF8" strokeWidth="2.5" />
        </svg>
      );
    case 'deco_paint_jars':
      return (
        <svg viewBox="0 0 120 110" className={className}>
          <rect x="30" y="14" width="7" height="50" rx="2" transform="rotate(-14 34 39)" fill="#8E6444" stroke="#FFFDF8" strokeWidth="2" />
          <rect x="78" y="14" width="7" height="50" rx="2" transform="rotate(10 81 39)" fill="#8E6444" stroke="#FFFDF8" strokeWidth="2" />
          <rect x="18" y="50" width="38" height="48" rx="8" fill="#E7F2F4" stroke="#FFFDF8" strokeWidth="3" />
          <rect x="22" y="64" width="30" height="30" rx="5" fill="#D95D39" />
          <rect x="64" y="54" width="38" height="44" rx="8" fill="#E7F2F4" stroke="#FFFDF8" strokeWidth="3" />
          <rect x="68" y="68" width="30" height="26" rx="5" fill="#2F7D6D" />
        </svg>
      );
    case 'deco_sketchbook':
      return (
        <svg viewBox="0 0 130 95" className={className}>
          <rect x="14" y="18" width="102" height="64" rx="6" fill="#D95D39" stroke="#FFFDF8" strokeWidth="3" />
          <rect x="20" y="22" width="43" height="54" rx="3" fill="#FFFDF8" />
          <rect x="67" y="22" width="43" height="54" rx="3" fill="#FBF4E6" />
          {[28, 40, 52, 64].map((y) => (
            <rect key={y} x="60" y={y} width="10" height="4" rx="2" fill="#463830" />
          ))}
          <circle cx="88" cy="48" r="10" fill="#E09F3E" opacity="0.7" />
          <line x1="28" y1="36" x2="54" y2="36" stroke="#C9B396" strokeWidth="3" />
          <line x1="28" y1="48" x2="50" y2="48" stroke="#C9B396" strokeWidth="3" />
        </svg>
      );
    case 'deco_stamp_set':
      return (
        <svg viewBox="0 0 120 100" className={className}>
          <rect x="54" y="54" width="52" height="30" rx="5" fill="#463830" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="60" y="50" width="40" height="12" rx="3" fill="#C85C7D" />
          <rect x="16" y="60" width="34" height="24" rx="3" fill="#B88758" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="14" y="76" width="38" height="8" rx="2" fill="#C85C7D" />
          <circle cx="33" cy="42" r="13" fill="#9A6D43" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="27" y="50" width="12" height="14" fill="#9A6D43" />
        </svg>
      );
    case 'deco_paper_cranes':
      return (
        <svg viewBox="0 0 120 100" className={className}>
          <polygon points="18,52 46,38 72,56 42,68" fill="#4C8DAE" stroke="#FFFDF8" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="36,46 56,16 62,48" fill="#7FB5CE" stroke="#FFFDF8" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="72,56 84,32 80,58" fill="#4C8DAE" stroke="#FFFDF8" strokeWidth="2" />
          <polygon points="56,74 82,62 104,76 76,88" fill="#F2CC66" stroke="#FFFDF8" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="72,68 90,44 94,70" fill="#F7DE98" stroke="#FFFDF8" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );
    case 'deco_star_garland':
      return (
        <svg viewBox="0 0 180 85" className={className}>
          <path d="M8 16 Q90 42 172 16" fill="none" stroke="#8C6E58" strokeWidth="2.5" />
          {[
            [32, 26, '#F2CC66'],
            [64, 34, '#D95D39'],
            [92, 37, '#3B8A77'],
            [120, 34, '#E09F3E'],
            [148, 26, '#C85C7D'],
          ].map(([cx, cy, col], i) => (
            <g key={i} transform={`translate(${cx} ${cy})`}>
              <line x1="0" y1="-8" x2="0" y2="8" stroke="#8C6E58" strokeWidth="2" />
              <polygon
                points="0,4 5,14 16,15 8,23 10,34 0,28 -10,34 -8,23 -16,15 -5,14"
                fill={col as string}
                stroke="#FFFDF8"
                strokeWidth="2"
              />
            </g>
          ))}
        </svg>
      );
    case 'deco_pin_collage':
      return (
        <svg viewBox="0 0 120 110" className={className}>
          <g transform="translate(14, 18) rotate(-6)">
            <rect x="0" y="0" width="52" height="62" rx="3" fill="#FFFDF8" stroke="#D6C4AC" strokeWidth="2" />
            <rect x="6" y="6" width="40" height="38" fill="#BCE0EA" />
            <circle cx="26" cy="24" r="10" fill="#E09F3E" />
            <circle cx="26" cy="4" r="5" fill="#D95D39" stroke="#FFFDF8" strokeWidth="1.5" />
          </g>
          <g transform="translate(58, 34) rotate(8)">
            <rect x="0" y="0" width="48" height="48" rx="3" fill="#F9E39D" stroke="#D6C4AC" strokeWidth="2" />
            <line x1="8" y1="18" x2="40" y2="18" stroke="#B69E82" strokeWidth="3" />
            <line x1="8" y1="30" x2="34" y2="30" stroke="#B69E82" strokeWidth="3" />
            <circle cx="24" cy="4" r="5" fill="#2F7D6D" stroke="#FFFDF8" strokeWidth="1.5" />
          </g>
        </svg>
      );
    case 'deco_sewing_machine':
      return (
        <svg viewBox="0 0 130 105" className={className}>
          <rect x="34" y="14" width="12" height="16" rx="2" fill="#D95D39" stroke="#FFFDF8" strokeWidth="2" />
          <path d="M20 76 H110 V88 H20 Z" fill="#5CA88E" stroke="#FFFDF8" strokeWidth="3" />
          <path d="M76 28 H106 V76 H78 V46 H42 V60 H30 V32 C30 28 38 28 76 28 Z" fill="#77BEAA" stroke="#FFFDF8" strokeWidth="3" strokeLinejoin="round" />
          <line x1="36" y1="60" x2="36" y2="74" stroke="#463830" strokeWidth="3" />
          <circle cx="104" cy="48" r="11" fill="#F2CC66" stroke="#FFFDF8" strokeWidth="2.5" />
        </svg>
      );

    /* NEW INDOOR DECORATIONS */
    case 'deco_loveseat':
      return (
        <svg viewBox="0 0 170 115" className={className}>
          <rect x="26" y="88" width="12" height="18" rx="3" fill="#6D4B37" />
          <rect x="132" y="88" width="12" height="18" rx="3" fill="#6D4B37" />
          <rect x="20" y="20" width="130" height="58" rx="18" fill="#3B8A77" stroke="#FFFDF8" strokeWidth="3.5" />
          <rect x="12" y="48" width="22" height="44" rx="9" fill="#2F7D6D" stroke="#FFFDF8" strokeWidth="3" />
          <rect x="136" y="48" width="22" height="44" rx="9" fill="#2F7D6D" stroke="#FFFDF8" strokeWidth="3" />
          <rect x="28" y="58" width="56" height="32" rx="8" fill="#5CA88E" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="86" y="58" width="56" height="32" rx="8" fill="#5CA88E" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="34" y="36" width="22" height="22" rx="5" transform="rotate(-10 45 47)" fill="#E09F3E" stroke="#FFFDF8" strokeWidth="2" />
        </svg>
      );
    case 'deco_sidetable':
      return (
        <svg viewBox="0 0 110 110" className={className}>
          <line x1="36" y1="42" x2="26" y2="98" stroke="#8E6444" strokeWidth="8" strokeLinecap="round" />
          <line x1="74" y1="42" x2="84" y2="98" stroke="#8E6444" strokeWidth="8" strokeLinecap="round" />
          <line x1="55" y1="42" x2="55" y2="100" stroke="#7A5337" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="55" cy="36" rx="44" ry="14" fill="#C99B6D" stroke="#FFFDF8" strokeWidth="3" />
          <ellipse cx="55" cy="35" rx="28" ry="8" fill="#FFFDF8" opacity="0.6" />
        </svg>
      );
    case 'deco_pet_bed':
      return (
        <svg viewBox="0 0 140 85" className={className}>
          <ellipse cx="70" cy="48" rx="60" ry="26" fill="#C85C7D" stroke="#FFFDF8" strokeWidth="3.5" />
          <ellipse cx="70" cy="52" rx="44" ry="18" fill="#F4D5DF" stroke="#FFFDF8" strokeWidth="2.5" />
          <circle cx="70" cy="69" r="7" fill="#F2CC66" stroke="#3D312A" strokeWidth="2" />
        </svg>
      );
    case 'deco_fairy_lights':
      return (
        <svg viewBox="0 0 180 70" className={className}>
          <path d="M8 14 Q90 42 172 14" fill="none" stroke="#463830" strokeWidth="2.5" />
          {[28, 58, 90, 122, 152].map((cx, i) => (
            <g key={cx} transform={`translate(${cx} ${i === 2 ? 29 : i === 1 || i === 3 ? 26 : 20})`}>
              <circle cx="0" cy="10" r="10" fill="#FBE28B" opacity="0.4" />
              <circle cx="0" cy="10" r="5.5" fill="#F7CE5B" stroke="#FFFDF8" strokeWidth="2" />
            </g>
          ))}
        </svg>
      );
    case 'deco_wall_mirror':
      return (
        <svg viewBox="0 0 100 130" className={className}>
          <path d="M20 50 A30 30 0 0 1 80 50 V114 H20 Z" fill="#D99B26" stroke="#FFFDF8" strokeWidth="3.5" />
          <path d="M27 52 A23 23 0 0 1 73 52 V106 H27 Z" fill="#DDF0F5" />
          <line x1="36" y1="42" x2="54" y2="24" stroke="#FFFDF8" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
          <line x1="36" y1="58" x2="62" y2="32" stroke="#FFFDF8" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
        </svg>
      );
    case 'deco_record_player':
      return (
        <svg viewBox="0 0 120 100" className={className}>
          <rect x="14" y="30" width="92" height="54" rx="8" fill="#C9945E" stroke="#FFFDF8" strokeWidth="3" />
          <ellipse cx="52" cy="54" rx="26" ry="18" fill="#3D312A" stroke="#FFFDF8" strokeWidth="2" />
          <ellipse cx="52" cy="54" rx="9" ry="6" fill="#D95D39" />
          <line x1="90" y1="38" x2="72" y2="56" stroke="#EFE3CE" strokeWidth="4" strokeLinecap="round" />
          <circle cx="92" cy="70" r="5" fill="#E09F3E" />
        </svg>
      );
    case 'deco_terrarium':
      return (
        <svg viewBox="0 0 100 115" className={className}>
          <path d="M24 54 L38 16 H62 L76 54 L68 98 H32 Z" fill="#DCEFF2" fillOpacity="0.82" stroke="#3D312A" strokeWidth="3" strokeLinejoin="round" />
          <path d="M32 82 Q50 74 68 82 L66 96 H34 Z" fill="#8C6742" />
          <circle cx="44" cy="74" r="9" fill="#5CA88E" />
          <circle cx="58" cy="72" r="8" fill="#3B8A77" />
          <path d="M50 72 Q42 50 36 44 M50 72 Q58 48 64 44" stroke="#2F7D6D" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'deco_globe':
      return (
        <svg viewBox="0 0 100 120" className={className}>
          <ellipse cx="50" cy="106" rx="24" ry="7" fill="#8E6444" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="46" y="88" width="8" height="18" fill="#D99B26" />
          <path d="M26 26 A30 30 0 0 1 74 78" fill="none" stroke="#D99B26" strokeWidth="5" strokeLinecap="round" />
          <circle cx="48" cy="52" r="26" fill="#6BB6C7" stroke="#FFFDF8" strokeWidth="3" />
          <path d="M34 42 Q46 34 56 44 Q52 56 42 58 Z" fill="#88BA7D" />
          <path d="M54 56 Q66 54 68 64 Q58 70 52 64 Z" fill="#88BA7D" />
        </svg>
      );

    /* NEW OUTDOOR DECORATIONS */
    case 'deco_tent':
      return (
        <svg viewBox="0 0 160 125" className={className}>
          <polygon points="80,14 14,110 146,110" fill="#E09F3E" stroke="#FFFDF8" strokeWidth="3.5" strokeLinejoin="round" />
          <polygon points="80,14 54,110 106,110" fill="#F2CC66" stroke="#FFFDF8" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="80,44 64,110 96,110" fill="#3D312A" />
          <polygon points="80,14 96,4 80,2" fill="#D95D39" />
        </svg>
      );
    case 'deco_bedroll':
      return (
        <svg viewBox="0 0 120 80" className={className}>
          <rect x="16" y="24" width="88" height="36" rx="16" fill="#3B8A77" stroke="#FFFDF8" strokeWidth="3" />
          <ellipse cx="94" cy="42" rx="10" ry="18" fill="#E8DCC8" stroke="#FFFDF8" strokeWidth="2.5" />
          <ellipse cx="94" cy="42" rx="4" ry="8" fill="#2F7D6D" />
          <rect x="34" y="24" width="8" height="36" fill="#8E6444" />
          <rect x="64" y="24" width="8" height="36" fill="#8E6444" />
        </svg>
      );
    case 'deco_bench':
      return (
        <svg viewBox="0 0 160 110" className={className}>
          <rect x="26" y="68" width="10" height="32" rx="3" fill="#5D4231" />
          <rect x="124" y="68" width="10" height="32" rx="3" fill="#5D4231" />
          <rect x="18" y="24" width="124" height="14" rx="4" fill="#C49A6C" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="18" y="42" width="124" height="14" rx="4" fill="#B5895D" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="12" y="62" width="136" height="14" rx="5" fill="#D4B087" stroke="#FFFDF8" strokeWidth="3" />
        </svg>
      );
    case 'deco_lamp_post':
      return (
        <svg viewBox="0 0 90 165" className={className}>
          <ellipse cx="45" cy="152" rx="20" ry="7" fill="#3D312A" stroke="#FFFDF8" strokeWidth="2" />
          <rect x="41" y="50" width="8" height="102" fill="#463830" stroke="#FFFDF8" strokeWidth="2" />
          <polygon points="26,24 64,24 58,52 32,52" fill="#FBE28B" stroke="#3D312A" strokeWidth="3" />
          <polygon points="20,24 45,8 70,24" fill="#3D312A" stroke="#FFFDF8" strokeWidth="2" />
        </svg>
      );
    case 'deco_mailbox':
      return (
        <svg viewBox="0 0 100 135" className={className}>
          <rect x="44" y="62" width="12" height="64" rx="3" fill="#8E6444" stroke="#FFFDF8" strokeWidth="2.5" />
          <path d="M24 38 A22 22 0 0 1 68 38 V64 H24 Z" fill="#4C8DAE" stroke="#FFFDF8" strokeWidth="3" />
          <rect x="54" y="34" width="24" height="30" rx="4" fill="#366E8B" stroke="#FFFDF8" strokeWidth="2" />
          <path d="M36 42 V16 H48 V24 H36" fill="#D95D39" stroke="#FFFDF8" strokeWidth="1.5" />
        </svg>
      );
    case 'deco_log_stump':
      return (
        <svg viewBox="0 0 120 95" className={className}>
          <path d="M24 44 H96 L104 82 H16 Z" fill="#8E6444" stroke="#FFFDF8" strokeWidth="3" strokeLinejoin="round" />
          <ellipse cx="60" cy="44" rx="36" ry="12" fill="#E8CFA8" stroke="#FFFDF8" strokeWidth="3" />
          <ellipse cx="60" cy="44" rx="22" ry="7" fill="none" stroke="#BA9266" strokeWidth="2" />
          <circle cx="30" cy="70" r="8" fill="#5CA88E" />
          <circle cx="88" cy="74" r="7" fill="#5CA88E" />
        </svg>
      );
    case 'deco_blossom_shrub':
      return (
        <svg viewBox="0 0 130 105" className={className}>
          <circle cx="42" cy="64" r="28" fill="#5CA88E" stroke="#FFFDF8" strokeWidth="3" />
          <circle cx="88" cy="64" r="28" fill="#5CA88E" stroke="#FFFDF8" strokeWidth="3" />
          <circle cx="65" cy="44" r="32" fill="#77BEAA" stroke="#FFFDF8" strokeWidth="3" />
          {[
            [42, 48], [76, 36], [92, 62], [56, 68], [32, 68],
          ].map(([fx, fy], i) => (
            <circle key={i} cx={fx} cy={fy} r="8" fill="#F4A9BE" stroke="#FFFDF8" strokeWidth="2" />
          ))}
        </svg>
      );
    case 'deco_lilypads':
      return (
        <svg viewBox="0 0 140 85" className={className}>
          <path d="M46 48 L72 40 A28 16 0 1 1 68 34 Z" fill="#4F8A59" stroke="#FFFDF8" strokeWidth="2.5" />
          <path d="M98 56 L118 50 A24 13 0 1 1 114 44 Z" fill="#62A36D" stroke="#FFFDF8" strokeWidth="2.5" />
          <ellipse cx="46" cy="36" rx="10" ry="12" fill="#F4A9BE" stroke="#FFFDF8" strokeWidth="2" />
          <ellipse cx="38" cy="39" rx="8" ry="10" fill="#F9C5D5" stroke="#FFFDF8" strokeWidth="2" />
          <ellipse cx="54" cy="39" rx="8" ry="10" fill="#F9C5D5" stroke="#FFFDF8" strokeWidth="2" />
          <circle cx="46" cy="40" r="4" fill="#F2CC66" />
        </svg>
      );
    case 'deco_seashell_cluster':
      return (
        <svg viewBox="0 0 120 90" className={className}>
          <path d="M22 68 C14 40 36 22 50 22 C64 22 86 40 78 68 Q50 76 22 68 Z" fill="#F7DFC4" stroke="#FFFDF8" strokeWidth="3" />
          <line x1="50" y1="24" x2="50" y2="70" stroke="#D9A882" strokeWidth="2.2" />
          <line x1="50" y1="26" x2="34" y2="68" stroke="#D9A882" strokeWidth="2.2" />
          <line x1="50" y1="26" x2="66" y2="68" stroke="#D9A882" strokeWidth="2.2" />
          <polygon
            points="88,42 94,56 108,56 97,64 101,78 88,70 75,78 79,64 68,56 82,56"
            fill="#E07A5F"
            stroke="#FFFDF8"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      );

    /* NEW MODULAR SKY, YARD, WALL & ROOM PROPS (EXTRACTED FROM BACKGROUNDS) */
    case 'deco_sun':
      return (
        <svg viewBox="0 0 130 130" className={className}>
          <circle cx="65" cy="65" r="52" fill="#F8DE9C" opacity="0.45" />
          <circle cx="65" cy="65" r="40" fill="#F3CA68" stroke="#FFFDF8" strokeWidth="3" />
          <circle cx="65" cy="65" r="34" fill="none" stroke="#D99B26" strokeWidth="2.5" strokeDasharray="6 5" />
        </svg>
      );
    case 'deco_sky_cloud':
      return (
        <svg viewBox="0 0 180 100" className={className}>
          <path
            d="M22 72 Q42 36 82 44 Q106 16 140 34 Q166 32 170 60 Q180 68 172 78 H16 Q8 76 22 72 Z"
            fill="#FFFDF8"
            stroke="#DFD0BA"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'deco_crescent_moon':
      return (
        <svg viewBox="0 0 120 120" className={className}>
          <circle cx="60" cy="60" r="46" fill="#FBE594" opacity="0.22" />
          <path
            d="M54 22 A36 36 0 1 0 94 76 A28 28 0 1 1 54 22 Z"
            fill="#FBE594"
            stroke="#FFFDF8"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'deco_split_fence':
      return (
        <svg viewBox="0 0 180 95" className={className}>
          <rect x="8" y="34" width="164" height="10" rx="3" fill="#C69D72" stroke="#FFFDF8" strokeWidth="2" />
          <rect x="8" y="58" width="164" height="10" rx="3" fill="#C69D72" stroke="#FFFDF8" strokeWidth="2" />
          {[22, 82, 142].map((fx) => (
            <rect key={fx} x={fx} y="18" width="16" height="66" rx="4" fill="#A67A4F" stroke="#FFFDF8" strokeWidth="2.5" />
          ))}
        </svg>
      );
    case 'deco_stepping_stones':
      return (
        <svg viewBox="0 0 150 95" className={className}>
          <ellipse cx="42" cy="70" rx="30" ry="13" fill="#DFD1BA" stroke="#FFFDF8" strokeWidth="2.5" />
          <ellipse cx="92" cy="48" rx="26" ry="11" fill="#E7DDD0" stroke="#FFFDF8" strokeWidth="2.5" />
          <ellipse cx="56" cy="24" rx="22" ry="10" fill="#DFD1BA" stroke="#FFFDF8" strokeWidth="2.5" />
        </svg>
      );
    case 'deco_wildflowers':
      return (
        <svg viewBox="0 0 140 95" className={className}>
          {[
            [32, 62, '#F4A261'],
            [70, 50, '#FFFDF8'],
            [108, 64, '#E9C46A'],
          ].map(([cx, cy, col], i) => (
            <g key={i} transform={`translate(${cx}, ${cy})`}>
              <path d="M-8 22 Q0 2 8 22" fill="none" stroke="#4F8A59" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="0" y1="20" x2="0" y2="-2" stroke="#4F8A59" strokeWidth="3" />
              <circle cx="0" cy="-6" r="11" fill={col as string} stroke="#3D312A" strokeWidth="2" />
              <circle cx="0" cy="-6" r="3.5" fill="#D99B26" />
            </g>
          ))}
        </svg>
      );
    case 'deco_leaf_pile':
      return (
        <svg viewBox="0 0 130 80" className={className}>
          <ellipse cx="44" cy="52" rx="26" ry="13" transform="rotate(-14 44 52)" fill="#D95D39" stroke="#FFFDF8" strokeWidth="2" />
          <ellipse cx="86" cy="54" rx="24" ry="12" transform="rotate(18 86 54)" fill="#E49E48" stroke="#FFFDF8" strokeWidth="2" />
          <ellipse cx="64" cy="42" rx="22" ry="11" transform="rotate(-4 64 42)" fill="#C44B2B" stroke="#FFFDF8" strokeWidth="2" />
          <ellipse cx="70" cy="60" rx="18" ry="9" fill="#F2B866" stroke="#FFFDF8" strokeWidth="2" />
        </svg>
      );
    case 'deco_sailboat':
      return (
        <svg viewBox="0 0 120 120" className={className}>
          <polygon points="22,82 98,82 82,102 38,102" fill="#B57B4C" stroke="#FFFDF8" strokeWidth="3" strokeLinejoin="round" />
          <line x1="58" y1="18" x2="58" y2="82" stroke="#6E4A2C" strokeWidth="4" strokeLinecap="round" />
          <polygon points="62,22 62,76 98,70" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="54,32 54,76 26,70" fill="#F4A261" stroke="#3D312A" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );
    case 'deco_botanical_print':
      return (
        <svg viewBox="0 0 110 110" className={className}>
          <rect x="14" y="12" width="82" height="86" rx="6" fill="#C49A6C" stroke="#FFFDF8" strokeWidth="3" />
          <rect x="24" y="22" width="62" height="66" fill="#FFFDF8" />
          <path d="M55 76 Q55 48 55 32" stroke="#2F7D6D" strokeWidth="3.5" fill="none" />
          <ellipse cx="43" cy="54" rx="11" ry="5.5" transform="rotate(-25 43 54)" fill="#7EB08B" />
          <ellipse cx="67" cy="48" rx="11" ry="5.5" transform="rotate(25 67 48)" fill="#7EB08B" />
          <circle cx="55" cy="32" r="8" fill="#E07A5F" />
        </svg>
      );
    case 'deco_pinned_note':
      return (
        <svg viewBox="0 0 110 105" className={className}>
          <g transform="rotate(-4 55 55)">
            <rect x="18" y="18" width="74" height="72" rx="4" fill="#FFFDF8" stroke="#D6C4AC" strokeWidth="2.5" />
            <line x1="28" y1="38" x2="80" y2="38" stroke="#E2D3BE" strokeWidth="4" strokeLinecap="round" />
            <line x1="28" y1="54" x2="72" y2="54" stroke="#E2D3BE" strokeWidth="4" strokeLinecap="round" />
            <line x1="28" y1="70" x2="64" y2="70" stroke="#E2D3BE" strokeWidth="4" strokeLinecap="round" />
            <circle cx="55" cy="18" r="7" fill="#D95D39" stroke="#3D312A" strokeWidth="2" />
          </g>
        </svg>
      );
    case 'deco_library_rug':
      return (
        <svg viewBox="0 0 180 95" className={className}>
          <rect x="10" y="14" width="160" height="68" rx="12" fill="#A84A3A" stroke="#FFFDF8" strokeWidth="4" />
          <rect x="24" y="24" width="132" height="48" rx="6" fill="none" stroke="#E9C46A" strokeWidth="3" strokeDasharray="10 6" />
          <rect x="46" y="34" width="88" height="28" rx="4" fill="#8C392B" />
        </svg>
      );

    /* DAYTIME SKY PROPS */
    case 'deco_smiling_sun':
      return (
        <svg viewBox="0 0 140 140" className={className}>
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <polygon
              key={deg}
              points="70,8 78,26 62,26"
              fill="#F3CA68"
              stroke="#FFFDF8"
              strokeWidth="2"
              transform={`rotate(${deg} 70 70)`}
            />
          ))}
          <circle cx="70" cy="70" r="36" fill="#F6C851" stroke="#FFFDF8" strokeWidth="3.5" />
          <circle cx="70" cy="70" r="29" fill="none" stroke="#D99B26" strokeWidth="2" strokeDasharray="5 4" />
        </svg>
      );
    case 'deco_fluffy_cloud_duo':
      return (
        <svg viewBox="0 0 185 115" className={className}>
          <path
            d="M18 82 Q32 54 62 60 Q78 40 104 54 Q122 52 124 72 Q132 78 124 86 H14 Q6 86 18 82 Z"
            fill="#F4EDE2"
            stroke="#DFD0BA"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M64 68 Q80 34 114 42 Q134 18 162 36 Q180 36 178 58 Q184 66 174 74 H60 Q52 72 64 68 Z"
            fill="#FFFDF8"
            stroke="#D6C4AC"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'deco_songbirds':
      return (
        <svg viewBox="0 0 160 110" className={className}>
          {/* Sky blue bird */}
          <g transform="translate(14, 14)">
            <path d="M18 42 Q40 14 70 30 Q54 48 26 48 Z" fill="#4C8DAE" stroke="#FFFDF8" strokeWidth="2.5" />
            <ellipse cx="44" cy="42" rx="20" ry="12" fill="#6AA8C7" stroke="#FFFDF8" strokeWidth="2.5" />
            <polygon points="62,38 74,42 62,46" fill="#E09F3E" stroke="#3D312A" strokeWidth="1.5" />
            <circle cx="54" cy="39" r="2.2" fill="#3D312A" />
            <polygon points="24,42 10,34 16,46" fill="#4C8DAE" stroke="#FFFDF8" strokeWidth="2" />
          </g>
          {/* Terracotta bird */}
          <g transform="translate(72, 46)">
            <path d="M16 38 Q36 12 64 26 Q48 42 24 44 Z" fill="#D95D39" stroke="#FFFDF8" strokeWidth="2.5" />
            <ellipse cx="40" cy="38" rx="18" ry="11" fill="#E68163" stroke="#FFFDF8" strokeWidth="2.5" />
            <polygon points="56,34 67,38 56,42" fill="#F2CC66" stroke="#3D312A" strokeWidth="1.5" />
            <circle cx="49" cy="35" r="2" fill="#3D312A" />
            <polygon points="22,38 9,31 15,42" fill="#D95D39" stroke="#FFFDF8" strokeWidth="2" />
          </g>
        </svg>
      );
    case 'deco_rainbow':
      return (
        <svg viewBox="0 0 180 115" className={className}>
          <path d="M22 92 A68 68 0 0 1 158 92" fill="none" stroke="#E07A5F" strokeWidth="12" strokeLinecap="round" />
          <path d="M32 92 A58 58 0 0 1 148 92" fill="none" stroke="#F2C063" strokeWidth="12" strokeLinecap="round" />
          <path d="M42 92 A48 48 0 0 1 138 92" fill="none" stroke="#80B996" strokeWidth="12" strokeLinecap="round" />
          <path d="M52 92 A38 38 0 0 1 128 92" fill="none" stroke="#7EB4CE" strokeWidth="12" strokeLinecap="round" />
          <path d="M10 94 Q20 76 38 82 Q52 72 60 88 Q68 94 58 100 H12 Q4 98 10 94 Z" fill="#FFFDF8" stroke="#D6C4AC" strokeWidth="2.5" />
          <path d="M118 94 Q128 76 146 82 Q160 72 168 88 Q176 94 166 100 H120 Q112 98 118 94 Z" fill="#FFFDF8" stroke="#D6C4AC" strokeWidth="2.5" />
        </svg>
      );
    case 'deco_kite':
      return (
        <svg viewBox="0 0 120 140" className={className}>
          <path d="M62 84 Q78 104 54 118 Q42 128 58 136" fill="none" stroke="#6E5D52" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="60,12 96,46 62,88 26,46" fill="#D95D39" stroke="#FFFDF8" strokeWidth="3.5" strokeLinejoin="round" />
          <polygon points="60,12 96,46 62,46" fill="#F2CC66" />
          <polygon points="62,46 62,88 26,46" fill="#4C8DAE" />
          <line x1="60" y1="14" x2="62" y2="86" stroke="#FFFDF8" strokeWidth="2.5" />
          <line x1="28" y1="46" x2="94" y2="46" stroke="#FFFDF8" strokeWidth="2.5" />
          <polygon points="56,102 68,108 56,114" fill="#C85C7D" stroke="#FFFDF8" strokeWidth="1.5" />
          <polygon points="48,120 60,126 48,132" fill="#3B8A77" stroke="#FFFDF8" strokeWidth="1.5" />
        </svg>
      );
    case 'deco_hot_air_balloon':
      return (
        <svg viewBox="0 0 120 150" className={className}>
          <path d="M24 54 C24 22 96 22 96 54 C96 76 74 96 70 104 H50 C46 96 24 76 24 54 Z" fill="#D95D39" stroke="#FFFDF8" strokeWidth="3" />
          <path d="M40 28 C38 56 44 84 54 104 H66 C76 84 82 56 80 28 Z" fill="#F2CC66" />
          <path d="M52 24 C51 54 53 84 57 104 H63 C67 84 69 54 68 24 Z" fill="#4C8DAE" />
          <line x1="50" y1="104" x2="48" y2="122" stroke="#7E5732" strokeWidth="2" />
          <line x1="70" y1="104" x2="72" y2="122" stroke="#7E5732" strokeWidth="2" />
          <rect x="44" y="120" width="32" height="20" rx="4" fill="#B88757" stroke="#FFFDF8" strokeWidth="2.5" />
        </svg>
      );

    /* NIGHT SKY PROPS */
    case 'deco_full_moon':
      return (
        <svg viewBox="0 0 130 130" className={className}>
          <circle cx="65" cy="65" r="52" fill="#FBE594" opacity="0.24" />
          <circle cx="65" cy="65" r="40" fill="#FBF0C0" stroke="#FFFDF8" strokeWidth="3" />
          <circle cx="50" cy="52" r="9" fill="#E8D896" opacity="0.7" />
          <circle cx="80" cy="68" r="11" fill="#E8D896" opacity="0.65" />
          <circle cx="58" cy="84" r="6" fill="#E8D896" opacity="0.6" />
          <circle cx="76" cy="44" r="5" fill="#E8D896" opacity="0.55" />
        </svg>
      );
    case 'deco_star_cluster':
      return (
        <svg viewBox="0 0 140 120" className={className}>
          <polygon
            points="44,18 51,38 72,38 55,50 61,70 44,58 27,70 33,50 16,38 37,38"
            fill="#F6D56A"
            stroke="#FFFDF8"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <polygon
            points="102,22 106,35 120,35 109,43 113,56 102,48 91,56 95,43 84,35 98,35"
            fill="#FCE89F"
            stroke="#FFFDF8"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <polygon
            points="84,68 89,80 101,85 89,90 84,102 79,90 67,85 79,80"
            fill="#F6D56A"
            stroke="#FFFDF8"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'deco_ringed_planet':
      return (
        <svg viewBox="0 0 150 120" className={className}>
          <ellipse
            cx="75"
            cy="60"
            rx="62"
            ry="18"
            transform="rotate(-18 75 60)"
            fill="none"
            stroke="#F2CC66"
            strokeWidth="8"
          />
          <circle cx="75" cy="60" r="32" fill="#C87E9C" stroke="#FFFDF8" strokeWidth="3" />
          <path d="M46 50 Q75 60 104 48" fill="none" stroke="#E89EB0" strokeWidth="6" strokeLinecap="round" />
          <path d="M46 66 Q75 76 104 64" fill="none" stroke="#A65E7C" strokeWidth="5" strokeLinecap="round" />
          <path
            d="M17 72 A62 18 -18 0 0 133 48"
            fill="none"
            stroke="#FFFDF8"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M17 72 A62 18 -18 0 0 133 48"
            fill="none"
            stroke="#F2CC66"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'deco_shooting_star':
      return (
        <svg viewBox="0 0 160 110" className={className}>
          <path d="M18 82 Q64 70 106 38" fill="none" stroke="#FCE89F" strokeWidth="5" strokeDasharray="10 6" strokeLinecap="round" />
          <path d="M30 92 Q74 78 112 48" fill="none" stroke="#F6C851" strokeWidth="3" strokeDasharray="6 6" strokeLinecap="round" />
          <polygon
            points="116,14 123,31 142,31 127,42 132,60 116,49 100,60 105,42 90,31 109,31"
            fill="#F6D56A"
            stroke="#FFFDF8"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'deco_constellation':
      return (
        <svg viewBox="0 0 160 120" className={className}>
          <polyline
            points="22,82 54,68 78,42 118,34 138,60 106,76 78,42"
            fill="none"
            stroke="#FCE89F"
            strokeWidth="2.5"
            strokeDasharray="6 5"
          />
          {[
            [22, 82, 6],
            [54, 68, 5],
            [78, 42, 7],
            [118, 34, 6],
            [138, 60, 5],
            [106, 76, 6],
          ].map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="#FFFDF8" stroke="#F2CC66" strokeWidth="2.5" />
          ))}
        </svg>
      );
    case 'deco_fireflies':
      return (
        <svg viewBox="0 0 130 110" className={className}>
          {[
            [32, 34, 9],
            [68, 26, 7],
            [98, 46, 10],
            [48, 72, 8],
            [88, 82, 7],
          ].map(([cx, cy, r], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r={r * 1.9} fill="#F4E27A" opacity="0.28" />
              <circle cx={cx} cy={cy} r={r * 0.65} fill="#FFF7A8" stroke="#FFFDF8" strokeWidth="1.5" />
            </g>
          ))}
        </svg>
      );

    /* EXPANDED THEME PROPS */
    case 'deco_book_stack':
      return (
        <svg viewBox="0 0 120 110" className={className}>
          <rect x="16" y="72" width="88" height="22" rx="4" fill="#3B8A77" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="22" y="50" width="76" height="22" rx="4" fill="#D95D39" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="28" y="30" width="64" height="20" rx="4" fill="#E09F3E" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="48" y="10" width="22" height="20" rx="4" fill="#FFFDF8" stroke="#6E5D52" strokeWidth="2" />
          <path d="M70 15 Q78 15 78 21 Q78 27 70 27" fill="none" stroke="#6E5D52" strokeWidth="2.5" />
        </svg>
      );
    case 'deco_hanging_ivy':
      return (
        <svg viewBox="0 0 110 135" className={className}>
          <line x1="55" y1="6" x2="34" y2="38" stroke="#8C6B4B" strokeWidth="2.5" />
          <line x1="55" y1="6" x2="76" y2="38" stroke="#8C6B4B" strokeWidth="2.5" />
          <polygon points="30,38 80,38 72,70 38,70" fill="#D95D39" stroke="#FFFDF8" strokeWidth="2.5" />
          <path d="M36 44 Q20 72 28 106" fill="none" stroke="#3B8A77" strokeWidth="3.5" />
          <path d="M74 44 Q90 76 80 112" fill="none" stroke="#2F7D6D" strokeWidth="3.5" />
          <ellipse cx="26" cy="70" rx="9" ry="6" transform="rotate(-25 26 70)" fill="#5CA88E" />
          <ellipse cx="30" cy="96" rx="8" ry="5" transform="rotate(20 30 96)" fill="#3B8A77" />
          <ellipse cx="84" cy="74" rx="9" ry="6" transform="rotate(25 84 74)" fill="#5CA88E" />
          <ellipse cx="78" cy="102" rx="8" ry="5" transform="rotate(-20 78 102)" fill="#2F7D6D" />
        </svg>
      );
    case 'deco_window_bench':
      return (
        <svg viewBox="0 0 160 105" className={className}>
          <rect x="20" y="76" width="12" height="20" rx="3" fill="#7E5732" />
          <rect x="128" y="76" width="12" height="20" rx="3" fill="#7E5732" />
          <rect x="12" y="54" width="136" height="24" rx="6" fill="#B88757" stroke="#FFFDF8" strokeWidth="3" />
          <rect x="18" y="38" width="124" height="18" rx="8" fill="#E07A5F" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="26" y="22" width="34" height="22" rx="6" fill="#F2CC66" stroke="#FFFDF8" strokeWidth="2" />
          <rect x="102" y="24" width="32" height="20" rx="6" fill="#4C8DAE" stroke="#FFFDF8" strokeWidth="2" />
        </svg>
      );
    case 'deco_fireplace':
      return (
        <svg viewBox="0 0 150 140" className={className}>
          <rect x="14" y="24" width="122" height="106" rx="6" fill="#C9644A" stroke="#FFFDF8" strokeWidth="3.5" />
          <rect x="8" y="16" width="134" height="16" rx="4" fill="#9E6E44" stroke="#FFFDF8" strokeWidth="2.5" />
          <path d="M44 130 V74 A31 28 0 0 1 106 74 V130 Z" fill="#3D312A" />
          <path d="M58 122 Q75 84 92 122 Z" fill="#F2A649" />
          <path d="M66 122 Q75 96 84 122 Z" fill="#F7DC6F" />
        </svg>
      );
    case 'deco_watering_can':
      return (
        <svg viewBox="0 0 120 105" className={className}>
          <path d="M50 38 C50 18 88 18 88 52" fill="none" stroke="#C97A42" strokeWidth="6" strokeLinecap="round" />
          <rect x="38" y="38" width="46" height="48" rx="8" fill="#D98245" stroke="#FFFDF8" strokeWidth="3" />
          <line x1="38" y1="62" x2="16" y2="38" stroke="#C97A42" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="14" cy="36" rx="6" ry="9" transform="rotate(-35 14 36)" fill="#F2CC66" stroke="#FFFDF8" strokeWidth="2" />
        </svg>
      );
    case 'deco_garden_arch':
      return (
        <svg viewBox="0 0 160 170" className={className}>
          <path d="M26 160 V72 A54 54 0 0 1 134 72 V160" fill="none" stroke="#8C6640" strokeWidth="10" strokeLinecap="round" />
          <path d="M36 160 V74 A44 44 0 0 1 124 74 V160" fill="none" stroke="#A67B52" strokeWidth="5" />
          <circle cx="34" cy="52" r="14" fill="#5CA88E" />
          <circle cx="126" cy="52" r="14" fill="#5CA88E" />
          <circle cx="52" cy="28" r="12" fill="#F4A9BE" stroke="#FFFDF8" strokeWidth="2" />
          <circle cx="80" cy="20" r="13" fill="#F4A9BE" stroke="#FFFDF8" strokeWidth="2" />
          <circle cx="108" cy="28" r="12" fill="#F4A9BE" stroke="#FFFDF8" strokeWidth="2" />
        </svg>
      );
    case 'deco_pumpkin_trio':
      return (
        <svg viewBox="0 0 140 95" className={className}>
          <ellipse cx="42" cy="60" rx="22" ry="18" fill="#E07A3F" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="39" y="34" width="6" height="10" rx="2" fill="#4F6D45" />
          <ellipse cx="98" cy="62" rx="18" ry="15" fill="#F2B866" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="95" y="40" width="6" height="9" rx="2" fill="#4F6D45" />
          <ellipse cx="70" cy="66" rx="24" ry="20" fill="#D95D39" stroke="#FFFDF8" strokeWidth="3" />
          <rect x="67" y="38" width="6" height="10" rx="2" fill="#4F6D45" />
        </svg>
      );
    case 'deco_stone_lantern':
      return (
        <svg viewBox="0 0 100 135" className={className}>
          <rect x="34" y="108" width="32" height="14" rx="4" fill="#B8B2A6" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="42" y="68" width="16" height="40" fill="#C8C2B6" stroke="#FFFDF8" strokeWidth="2" />
          <rect x="32" y="42" width="36" height="28" rx="4" fill="#D8D2C6" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="42" y="49" width="16" height="14" rx="2" fill="#FBE594" />
          <polygon points="18,44 82,44 50,18" fill="#A6A094" stroke="#FFFDF8" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      );
    case 'deco_beach_umbrella':
      return (
        <svg viewBox="0 0 150 160" className={className}>
          <line x1="75" y1="36" x2="75" y2="148" stroke="#9E7142" strokeWidth="6" strokeLinecap="round" />
          <path d="M16 74 C22 28 128 28 134 74 Z" fill="#D95D39" stroke="#FFFDF8" strokeWidth="3.5" />
          <path d="M44 74 C48 34 70 30 75 30 C80 30 102 34 106 74 Z" fill="#FFFDF8" />
          <path d="M62 74 C64 36 74 30 75 30 C76 30 86 36 88 74 Z" fill="#4C8DAE" />
        </svg>
      );
    case 'deco_sandcastle':
      return (
        <svg viewBox="0 0 130 110" className={className}>
          <rect x="22" y="54" width="24" height="42" fill="#E6C994" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="84" y="54" width="24" height="42" fill="#E6C994" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="44" y="40" width="42" height="56" fill="#DFBE84" stroke="#FFFDF8" strokeWidth="2.5" />
          <polygon points="20,54 48,54 34,34" fill="#D95D39" stroke="#FFFDF8" strokeWidth="2" />
          <polygon points="82,54 110,54 96,34" fill="#D95D39" stroke="#FFFDF8" strokeWidth="2" />
          <polygon points="40,40 90,40 65,16" fill="#4C8DAE" stroke="#FFFDF8" strokeWidth="2" />
          <path d="M56 96 V76 A9 9 0 0 1 74 76 V96 Z" fill="#8C6742" />
        </svg>
      );
    case 'deco_sleeping_owl':
      return (
        <svg viewBox="0 0 110 110" className={className}>
          <line x1="12" y1="84" x2="98" y2="78" stroke="#7E5732" strokeWidth="8" strokeLinecap="round" />
          <ellipse cx="55" cy="54" rx="26" ry="30" fill="#9E7148" stroke="#FFFDF8" strokeWidth="3" />
          <ellipse cx="55" cy="64" rx="16" ry="18" fill="#EFE3CE" />
          <circle cx="45" cy="44" r="8" fill="#FFFDF8" />
          <circle cx="65" cy="44" r="8" fill="#FFFDF8" />
          <circle cx="46" cy="44" r="3.5" fill="#3D312A" />
          <circle cx="64" cy="44" r="3.5" fill="#3D312A" />
          <polygon points="52,48 58,48 55,54" fill="#E09F3E" />
        </svg>
      );
    case 'deco_palette':
      return (
        <svg viewBox="0 0 120 95" className={className}>
          <path
            d="M22 46 C18 22 64 14 92 28 C110 38 106 74 78 78 C64 80 62 66 50 66 C34 66 24 62 22 46 Z"
            fill="#EFE3CE"
            stroke="#FFFDF8"
            strokeWidth="3"
          />
          <circle cx="42" cy="36" r="7" fill="#D95D39" />
          <circle cx="64" cy="30" r="7" fill="#E09F3E" />
          <circle cx="84" cy="40" r="7" fill="#3B8A77" />
          <circle cx="78" cy="60" r="7" fill="#4C8DAE" />
          <circle cx="38" cy="52" r="5" fill="#C85C7D" />
        </svg>
      );
    case 'deco_paper_stack':
      return (
        <svg viewBox="0 0 125 95" className={className}>
          <rect x="20" y="54" width="84" height="22" rx="4" transform="rotate(-4 62 65)" fill="#4C8DAE" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="22" y="38" width="82" height="22" rx="4" transform="rotate(3 63 49)" fill="#F2CC66" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="20" y="22" width="84" height="22" rx="4" transform="rotate(-2 62 33)" fill="#E07A5F" stroke="#FFFDF8" strokeWidth="2.5" />
        </svg>
      );
    case 'deco_button_jar':
      return (
        <svg viewBox="0 0 100 115" className={className}>
          <rect x="26" y="28" width="48" height="72" rx="10" fill="#DCEEF2" stroke="#FFFDF8" strokeWidth="3" />
          <rect x="30" y="16" width="40" height="14" rx="4" fill="#C49A6C" stroke="#FFFDF8" strokeWidth="2.5" />
          <circle cx="42" cy="78" r="9" fill="#D95D39" stroke="#FFFDF8" strokeWidth="1.5" />
          <circle cx="58" cy="80" r="8" fill="#E09F3E" stroke="#FFFDF8" strokeWidth="1.5" />
          <circle cx="50" cy="62" r="9" fill="#3B8A77" stroke="#FFFDF8" strokeWidth="1.5" />
          <circle cx="40" cy="52" r="7" fill="#C85C7D" stroke="#FFFDF8" strokeWidth="1.5" />
        </svg>
      );
    case 'deco_cutting_ruler':
      return (
        <svg viewBox="0 0 130 95" className={className}>
          <rect x="14" y="44" width="102" height="24" rx="4" transform="rotate(-12 65 56)" fill="#E9C46A" stroke="#FFFDF8" strokeWidth="2.5" />
          {[28, 44, 60, 76, 92].map((lx) => (
            <line key={lx} x1={lx} y1="42" x2={lx + 2} y2="50" stroke="#7E5732" strokeWidth="2" transform="rotate(-12 65 56)" />
          ))}
          <circle cx="88" cy="34" r="16" fill="#C85C7D" stroke="#FFFDF8" strokeWidth="2.5" />
          <circle cx="88" cy="34" r="7" fill="#EFE3CE" />
        </svg>
      );

    case 'deco_heart_garland':
      return (
        <svg viewBox="0 0 160 80" className={className}>
          <path d="M8 18 Q80 42 152 18" fill="none" stroke="#8C6742" strokeWidth="3" strokeLinecap="round" />
          {[
            { cx: 26, cy: 31, fill: '#D95D39' },
            { cx: 53, cy: 38, fill: '#E89EB0' },
            { cx: 80, cy: 41, fill: '#C85C7D' },
            { cx: 107, cy: 38, fill: '#E89EB0' },
            { cx: 134, cy: 31, fill: '#D95D39' },
          ].map((h) => (
            <path
              key={h.cx}
              d={`M${h.cx} ${h.cy + 14} C${h.cx - 14} ${h.cy + 4} ${h.cx - 14} ${h.cy - 9} ${h.cx - 6} ${h.cy - 9} C${h.cx - 2} ${h.cy - 9} ${h.cx} ${h.cy - 5} ${h.cx} ${h.cy - 3} C${h.cx} ${h.cy - 5} ${h.cx + 2} ${h.cy - 9} ${h.cx + 6} ${h.cy - 9} C${h.cx + 14} ${h.cy - 9} ${h.cx + 14} ${h.cy + 4} ${h.cx} ${h.cy + 14} Z`}
              fill={h.fill}
              stroke="#FFFDF8"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          ))}
        </svg>
      );
    case 'deco_valentine_letters':
      return (
        <svg viewBox="0 0 125 100" className={className}>
          <g transform="rotate(-6 62 66)">
            <rect x="20" y="50" width="84" height="36" rx="5" fill="#F4C7D2" stroke="#FFFDF8" strokeWidth="2.5" />
            <path d="M22 52 L62 72 L102 52" fill="none" stroke="#C85C7D" strokeWidth="2.5" />
          </g>
          <g transform="rotate(4 62 46)">
            <rect x="22" y="28" width="82" height="44" rx="5" fill="#FFFDF8" stroke="#D6C4AC" strokeWidth="2.5" />
            <path d="M24 30 L63 54 L102 30" fill="#FBE8ED" stroke="#C85C7D" strokeWidth="2.2" strokeLinejoin="round" />
            <path
              d="M63 60 C55 54 55 46 59 46 C61.5 46 63 48.5 63 49.5 C63 48.5 64.5 46 67 46 C71 46 71 54 63 60 Z"
              fill="#D95D39"
              stroke="#FFFDF8"
              strokeWidth="1.5"
            />
            <rect x="82" y="34" width="12" height="10" rx="2" fill="#E09F3E" opacity="0.85" />
          </g>
        </svg>
      );
    case 'deco_christmas_tree':
      return (
        <svg viewBox="0 0 140 165" className={className}>
          <rect x="60" y="126" width="20" height="24" rx="3" fill="#7E5732" stroke="#FFFDF8" strokeWidth="2.5" />
          <polygon points="22,128 118,128 70,74" fill="#2F7D6D" stroke="#FFFDF8" strokeWidth="3" strokeLinejoin="round" />
          <polygon points="30,96 110,96 70,48" fill="#3B8A77" stroke="#FFFDF8" strokeWidth="3" strokeLinejoin="round" />
          <polygon points="40,66 100,66 70,24" fill="#4A9D86" stroke="#FFFDF8" strokeWidth="3" strokeLinejoin="round" />
          <polygon
            points="70,8 74,18 85,18 76,24 79,34 70,28 61,34 64,24 55,18 66,18"
            fill="#F2CC66"
            stroke="#FFFDF8"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="56" cy="56" r="4.5" fill="#D95D39" stroke="#FFFDF8" strokeWidth="1.5" />
          <circle cx="84" cy="60" r="4.5" fill="#F2CC66" stroke="#FFFDF8" strokeWidth="1.5" />
          <circle cx="48" cy="88" r="5" fill="#E89EB0" stroke="#FFFDF8" strokeWidth="1.5" />
          <circle cx="74" cy="82" r="5" fill="#F2CC66" stroke="#FFFDF8" strokeWidth="1.5" />
          <circle cx="92" cy="90" r="4.5" fill="#D95D39" stroke="#FFFDF8" strokeWidth="1.5" />
          <circle cx="42" cy="116" r="5" fill="#F2CC66" stroke="#FFFDF8" strokeWidth="1.5" />
          <circle cx="68" cy="112" r="5" fill="#D95D39" stroke="#FFFDF8" strokeWidth="1.5" />
          <circle cx="96" cy="116" r="5" fill="#4C8DAE" stroke="#FFFDF8" strokeWidth="1.5" />
          <rect x="26" y="132" width="24" height="20" rx="3" fill="#D95D39" stroke="#FFFDF8" strokeWidth="2" />
          <line x1="38" y1="132" x2="38" y2="152" stroke="#F2CC66" strokeWidth="3.5" />
        </svg>
      );
    case 'deco_holiday_stockings':
      return (
        <svg viewBox="0 0 155 125" className={className}>
          <rect x="14" y="18" width="127" height="12" rx="5" fill="#9E6E44" stroke="#FFFDF8" strokeWidth="2.5" />
          {/* Left stocking */}
          <path
            d="M34 30 H58 V66 C58 76 42 84 32 76 C24 70 28 58 34 54 Z"
            fill="#C94A38"
            stroke="#FFFDF8"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <rect x="31" y="28" width="30" height="11" rx="4" fill="#FFFDF8" stroke="#D6C4AC" strokeWidth="2" />
          {/* Right stocking */}
          <path
            d="M96 30 H120 V66 C120 76 104 84 94 76 C86 70 90 58 96 54 Z"
            fill="#2F7D6D"
            stroke="#FFFDF8"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <rect x="93" y="28" width="30" height="11" rx="4" fill="#FFFDF8" stroke="#D6C4AC" strokeWidth="2" />
          {/* Gift boxes */}
          <rect x="44" y="84" width="34" height="28" rx="4" fill="#E09F3E" stroke="#FFFDF8" strokeWidth="2.5" />
          <line x1="61" y1="84" x2="61" y2="112" stroke="#C94A38" strokeWidth="4" />
          <rect x="82" y="90" width="28" height="22" rx="4" fill="#4C8DAE" stroke="#FFFDF8" strokeWidth="2.5" />
          <line x1="96" y1="90" x2="96" y2="112" stroke="#F2CC66" strokeWidth="3.5" />
        </svg>
      );
    case 'deco_new_year_clock':
      return (
        <svg viewBox="0 0 155 110" className={className}>
          <path d="M12 22 Q77 44 143 22" fill="none" stroke="#E09F3E" strokeWidth="3" strokeLinecap="round" />
          <polygon points="18,24 38,30 24,48" fill="#355C8A" stroke="#FFFDF8" strokeWidth="2" />
          <polygon points="42,30 62,33 50,52" fill="#F2CC66" stroke="#FFFDF8" strokeWidth="2" />
          <polygon points="93,33 113,30 105,52" fill="#F2CC66" stroke="#FFFDF8" strokeWidth="2" />
          <polygon points="117,30 137,24 131,48" fill="#355C8A" stroke="#FFFDF8" strokeWidth="2" />
          <circle cx="77.5" cy="54" r="28" fill="#324364" stroke="#F2CC66" strokeWidth="4" />
          <circle cx="77.5" cy="54" r="21" fill="#FFFDF8" />
          <line x1="77.5" y1="54" x2="77.5" y2="39" stroke="#3D312A" strokeWidth="3" strokeLinecap="round" />
          <line x1="77.5" y1="54" x2="83" y2="41" stroke="#D95D39" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="77.5" cy="54" r="3" fill="#D95D39" />
          <polygon points="28,72 31,79 38,80 32,85 34,92 28,88 22,92 24,85 18,80 25,79" fill="#F2CC66" stroke="#FFFDF8" strokeWidth="1.5" />
          <polygon points="127,72 130,79 137,80 131,85 133,92 127,88 121,92 123,85 117,80 124,79" fill="#E89EB0" stroke="#FFFDF8" strokeWidth="1.5" />
        </svg>
      );
    case 'deco_thanksgiving_cornucopia':
      return (
        <svg viewBox="0 0 145 105" className={className}>
          <path
            d="M36 74 C24 52 52 24 94 34 L122 24 C112 52 96 84 62 84 C48 84 40 80 36 74 Z"
            fill="#B88652"
            stroke="#FFFDF8"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M52 72 Q68 50 86 38 M66 78 Q82 58 98 42" fill="none" stroke="#8C6136" strokeWidth="2.5" />
          <ellipse cx="40" cy="70" rx="16" ry="14" fill="#D95D39" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="38" y="52" width="4" height="7" rx="1.5" fill="#4F6D45" />
          <circle cx="24" cy="78" r="9" fill="#C94A38" stroke="#FFFDF8" strokeWidth="2" />
          <ellipse cx="56" cy="56" rx="10" ry="15" transform="rotate(-30 56 56)" fill="#F2CC66" stroke="#FFFDF8" strokeWidth="2" />
          <polygon points="18,62 28,54 34,64 24,70" fill="#E07A3F" stroke="#FFFDF8" strokeWidth="1.5" />
        </svg>
      );
    case 'deco_july4_bunting':
      return (
        <svg viewBox="0 0 160 95" className={className}>
          <path d="M18 20 A62 62 0 0 0 142 20 Z" fill="#C94A38" stroke="#FFFDF8" strokeWidth="3" />
          <path d="M36 20 A44 44 0 0 0 124 20 Z" fill="#FFFDF8" />
          <path d="M54 20 A26 26 0 0 0 106 20 Z" fill="#355C8A" />
          <polygon points="80,24 83,31 90,31 84,35 86,42 80,38 74,42 76,35 70,31 77,31" fill="#FFFDF8" />
          <circle cx="52" cy="48" r="3" fill="#355C8A" />
          <circle cx="108" cy="48" r="3" fill="#355C8A" />
          <circle cx="80" cy="56" r="3" fill="#355C8A" />
        </svg>
      );
    case 'deco_july4_fireworks':
      return (
        <svg viewBox="0 0 150 135" className={className}>
          {/* Big Coral-Red Burst */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={`r_${deg}`}
              x1="56"
              y1="52"
              x2={56 + Math.cos((deg * Math.PI) / 180) * 34}
              y2={52 + Math.sin((deg * Math.PI) / 180) * 34}
              stroke={deg % 60 === 0 ? '#D95D39' : '#FFFDF8'}
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeDasharray={deg % 60 === 0 ? undefined : '4 5'}
            />
          ))}
          <circle cx="56" cy="52" r="7" fill="#F2CC66" stroke="#FFFDF8" strokeWidth="2" />
          {/* Right Blue & Gold Burst */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={`b_${deg}`}
              x1="108"
              y1="72"
              x2={108 + Math.cos((deg * Math.PI) / 180) * 26}
              y2={72 + Math.sin((deg * Math.PI) / 180) * 26}
              stroke={deg % 90 === 0 ? '#4C8DAE' : '#F2CC66'}
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
          <circle cx="108" cy="72" r="5.5" fill="#FFFDF8" />
          <polygon points="84,18 87,25 94,25 88,29 90,36 84,32 78,36 80,29 74,25 81,25" fill="#F2CC66" stroke="#FFFDF8" strokeWidth="1.5" />
        </svg>
      );
    case 'deco_halloween_jackolantern':
      return (
        <svg viewBox="0 0 130 115" className={className}>
          <path d="M62 24 C62 14 70 12 73 16" fill="none" stroke="#4F6D45" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="64" cy="66" rx="40" ry="33" fill="#E67E22" stroke="#FFFDF8" strokeWidth="3.5" />
          <ellipse cx="64" cy="66" rx="22" ry="32" fill="#EE8D33" />
          <polygon points="46,52 56,58 44,62" fill="#FBE594" />
          <polygon points="82,52 72,58 84,62" fill="#FBE594" />
          <polygon points="61,67 67,67 64,61" fill="#FBE594" />
          <path d="M44 76 Q64 90 84 76 L79 84 L73 79 L64 86 L55 79 L49 84 Z" fill="#FBE594" />
          <ellipse cx="104" cy="84" rx="15" ry="12" fill="#D95D39" stroke="#FFFDF8" strokeWidth="2.5" />
          <rect x="102" y="68" width="4" height="6" rx="1.5" fill="#4F6D45" />
        </svg>
      );
    case 'deco_halloween_ghost':
      return (
        <svg viewBox="0 0 130 120" className={className}>
          {/* Tiny Bats */}
          <path d="M22 30 Q30 22 34 30 Q38 22 46 30 Q38 35 34 33 Q30 35 22 30 Z" fill="#463830" stroke="#FFFDF8" strokeWidth="1.5" />
          <path d="M88 26 Q95 19 99 26 Q103 19 110 26 Q103 31 99 29 Q95 31 88 26 Z" fill="#463830" stroke="#FFFDF8" strokeWidth="1.5" />
          {/* Friendly Sheet Ghost */}
          <path
            d="M42 96 V56 C42 30 88 30 88 56 V96 L78 88 L68 96 L58 88 L48 96 Z"
            fill="#FFFDF8"
            stroke="#D6C4AC"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="56" cy="54" r="4" fill="#3D312A" />
          <circle cx="74" cy="54" r="4" fill="#3D312A" />
          <circle cx="50" cy="61" r="4" fill="#F4A9BE" opacity="0.85" />
          <circle cx="80" cy="61" r="4" fill="#F4A9BE" opacity="0.85" />
          <ellipse cx="65" cy="63" rx="3.5" ry="4.5" fill="#3D312A" />
        </svg>
      );
    case 'deco_harvest_wreath':
      return (
        <svg viewBox="0 0 120 120" className={className}>
          <circle cx="60" cy="58" r="36" fill="none" stroke="#8C6136" strokeWidth="14" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => (
            <circle
              key={deg}
              cx={60 + Math.cos((deg * Math.PI) / 180) * 36}
              cy={58 + Math.sin((deg * Math.PI) / 180) * 36}
              r="11"
              fill={idx % 3 === 0 ? '#D95D39' : idx % 3 === 1 ? '#E09F3E' : '#C94A38'}
              stroke="#FFFDF8"
              strokeWidth="2"
            />
          ))}
          <path d="M60 92 L44 108 L54 96 L60 92 L66 96 L76 108 Z" fill="#C94A38" stroke="#FFFDF8" strokeWidth="2" />
          <circle cx="60" cy="92" r="6" fill="#E09F3E" stroke="#FFFDF8" strokeWidth="2" />
        </svg>
      );
    case 'deco_holiday_snowman':
      return (
        <svg viewBox="0 0 120 140" className={className}>
          <line x1="34" y1="74" x2="14" y2="58" stroke="#7E5732" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="86" y1="74" x2="106" y2="58" stroke="#7E5732" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="60" cy="100" r="28" fill="#FFFDF8" stroke="#D6C4AC" strokeWidth="3" />
          <circle cx="60" cy="64" r="21" fill="#FFFDF8" stroke="#D6C4AC" strokeWidth="3" />
          <circle cx="60" cy="36" r="16" fill="#FFFDF8" stroke="#D6C4AC" strokeWidth="3" />
          {/* Scarf */}
          <rect x="42" y="48" width="36" height="9" rx="4" fill="#C94A38" stroke="#FFFDF8" strokeWidth="1.5" />
          <rect x="66" y="54" width="9" height="18" rx="3" fill="#C94A38" stroke="#FFFDF8" strokeWidth="1.5" />
          {/* Face & Buttons */}
          <circle cx="54" cy="34" r="2.2" fill="#3D312A" />
          <circle cx="66" cy="34" r="2.2" fill="#3D312A" />
          <polygon points="60,36 74,39 60,42" fill="#E67E22" />
          <circle cx="60" cy="64" r="2.5" fill="#3D312A" />
          <circle cx="60" cy="74" r="2.5" fill="#3D312A" />
          {/* Top Hat */}
          <rect x="40" y="21" width="40" height="5" rx="2" fill="#3D312A" />
          <rect x="46" y="7" width="28" height="15" rx="3" fill="#3D312A" />
          <rect x="46" y="17" width="28" height="4" fill="#2F7D6D" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="36" fill="#E09F3E" stroke="#FFFDF8" strokeWidth="4" />
        </svg>
      );
  }
};
