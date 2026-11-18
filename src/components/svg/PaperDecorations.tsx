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
    default:
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="36" fill="#E09F3E" stroke="#FFFDF8" strokeWidth="4" />
        </svg>
      );
  }
};
