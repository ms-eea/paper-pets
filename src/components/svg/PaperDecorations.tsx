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

    default:
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="36" fill="#E09F3E" stroke="#FFFDF8" strokeWidth="4" />
        </svg>
      );
  }
};
