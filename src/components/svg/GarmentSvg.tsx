import React, { useId } from 'react';
import { PatternId } from '../../types/game';

interface Props {
  itemId: string;
  colorHex: string;
  patternId: PatternId;
  className?: string;
  interactive?: boolean;
  onSelect?: () => void;
}

/**
 * Renders layered SVG clothing garments filled with dynamic custom paper patterns
 * (solid, polka dots, stripes, gingham, stars, chevron) and a clean die-cut paper outline.
 */
export const GarmentSvg: React.FC<Props> = ({
  itemId,
  colorHex,
  patternId,
  className = 'w-full h-full',
  interactive = false,
  onSelect,
}) => {
  const uid = useId().replace(/:/g, '');
  const patKey = `pat_${uid}`;
  const fillRef = patternId === 'solid' ? colorHex : `url(#${patKey})`;

  return (
    <svg
      viewBox="0 0 160 120"
      className={className}
      style={{
        overflow: 'visible',
        ...(interactive ? { pointerEvents: 'none' } : {}),
      }}
    >
      <defs>
        {patternId === 'polka' && (
          <pattern id={patKey} width="18" height="18" patternUnits="userSpaceOnUse">
            <rect width="18" height="18" fill={colorHex} />
            <circle cx="5" cy="5" r="3" fill="#FFFDF8" opacity="0.72" />
            <circle cx="14" cy="14" r="3" fill="#FFFDF8" opacity="0.72" />
          </pattern>
        )}
        {patternId === 'stripes' && (
          <pattern
            id={patKey}
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(28)"
          >
            <rect width="14" height="14" fill={colorHex} />
            <rect width="6" height="14" fill="#FFFDF8" opacity="0.48" />
          </pattern>
        )}
        {patternId === 'gingham' && (
          <pattern id={patKey} width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill="#FFFDF8" />
            <rect width="8" height="16" fill={colorHex} opacity="0.45" />
            <rect width="16" height="8" fill={colorHex} opacity="0.45" />
            <rect width="8" height="8" fill={colorHex} opacity="0.55" />
          </pattern>
        )}
        {patternId === 'stars' && (
          <pattern id={patKey} width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="24" height="24" fill={colorHex} />
            <polygon
              points="12,3 14,9 20,9 15,13 17,19 12,15 7,19 9,13 4,9 10,9"
              fill="#FBE28B"
              opacity="0.9"
            />
          </pattern>
        )}
        {patternId === 'chevron' && (
          <pattern id={patKey} width="20" height="14" patternUnits="userSpaceOnUse">
            <rect width="20" height="14" fill={colorHex} />
            <path
              d="M0 10 L10 3 L20 10"
              fill="none"
              stroke="#FFFDF8"
              strokeWidth="3"
              opacity="0.6"
            />
          </pattern>
        )}
        {patternId === 'plaid' && (
          <pattern id={patKey} width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="24" height="24" fill={colorHex} />
            <rect x="0" y="6" width="24" height="4" fill="#FFFDF8" opacity="0.45" />
            <rect x="6" y="0" width="4" height="24" fill="#FFFDF8" opacity="0.45" />
            <rect x="0" y="16" width="24" height="2" fill="#3D312A" opacity="0.28" />
            <rect x="16" y="0" width="2" height="24" fill="#3D312A" opacity="0.28" />
          </pattern>
        )}
        {patternId === 'hearts' && (
          <pattern id={patKey} width="22" height="22" patternUnits="userSpaceOnUse">
            <rect width="22" height="22" fill={colorHex} />
            <path
              d="M11 16 C6 12 6 7 9 7 C10.4 7 11 8.4 11 8.8 C11 8.4 11.6 7 13 7 C16 7 16 12 11 16 Z"
              fill="#FFFDF8"
              opacity="0.72"
            />
          </pattern>
        )}
        {patternId === 'floral' && (
          <pattern id={patKey} width="26" height="26" patternUnits="userSpaceOnUse">
            <rect width="26" height="26" fill={colorHex} />
            <g transform="translate(13 13)" opacity="0.78">
              <circle cx="0" cy="-4.5" r="2.8" fill="#FFFDF8" />
              <circle cx="4.3" cy="-1.4" r="2.8" fill="#FFFDF8" />
              <circle cx="2.7" cy="3.6" r="2.8" fill="#FFFDF8" />
              <circle cx="-2.7" cy="3.6" r="2.8" fill="#FFFDF8" />
              <circle cx="-4.3" cy="-1.4" r="2.8" fill="#FFFDF8" />
              <circle cx="0" cy="0" r="2.2" fill="#F2CC66" />
            </g>
          </pattern>
        )}
        {patternId === 'terrazzo' && (
          <pattern id={patKey} width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="24" height="24" fill={colorHex} />
            <polygon points="4,4 10,3 8,9" fill="#FFFDF8" opacity="0.75" />
            <polygon points="15,6 21,9 17,13" fill="#F2CC66" opacity="0.82" />
            <polygon points="5,15 11,17 7,21" fill="#3D312A" opacity="0.32" />
            <polygon points="15,18 20,17 19,22" fill="#FFFDF8" opacity="0.65" />
          </pattern>
        )}
        {patternId === 'checker' && (
          <pattern id={patKey} width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill="#FFFDF8" />
            <rect x="0" y="0" width="8" height="8" fill={colorHex} />
            <rect x="8" y="8" width="8" height="8" fill={colorHex} />
          </pattern>
        )}
        {patternId === 'confetti' && (
          <pattern id={patKey} width="26" height="26" patternUnits="userSpaceOnUse">
            <rect width="26" height="26" fill={colorHex} />
            <circle cx="6" cy="7" r="2.2" fill="#FFFDF8" opacity="0.85" />
            <rect x="16" y="4" width="5" height="2.6" rx="1" transform="rotate(24 18 5)" fill="#F2CC66" opacity="0.9" />
            <circle cx="19" cy="18" r="2" fill="#E89EB0" opacity="0.9" />
            <rect x="5" y="18" width="5" height="2.6" rx="1" transform="rotate(-25 7 19)" fill="#7BC4B2" opacity="0.85" />
          </pattern>
        )}
        {patternId === 'rainbow' && (
          <pattern id={patKey} width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(-15)">
            <rect width="24" height="6" y="0" fill={colorHex} />
            <rect width="24" height="6" y="6" fill="#F2CC66" opacity="0.85" />
            <rect width="24" height="6" y="12" fill="#7BC4B2" opacity="0.85" />
            <rect width="24" height="6" y="18" fill="#E89EB0" opacity="0.85" />
          </pattern>
        )}
        {patternId === 'argyle' && (
          <pattern id={patKey} width="20" height="24" patternUnits="userSpaceOnUse">
            <rect width="20" height="24" fill={colorHex} />
            <polygon points="10,0 20,12 10,24 0,12" fill="#FFFDF8" opacity="0.28" />
            <path d="M0 0 L20 24 M20 0 L0 24" stroke="#FFFDF8" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.65" />
          </pattern>
        )}
      </defs>

      <g
        onPointerDown={
          interactive
            ? (e) => {
                e.stopPropagation();
              }
            : undefined
        }
        onClick={
          interactive && onSelect
            ? (e) => {
                e.stopPropagation();
                onSelect();
              }
            : undefined
        }
        style={
          interactive
            ? { pointerEvents: 'visiblePainted', cursor: 'pointer' }
            : undefined
        }
      >
      {/* HATS (unified y=70 bottom brim baseline) */}
      {itemId === 'hat_beret' && (
        <g>
          <path
            d="M28 62 C20 30 62 14 96 18 C130 22 144 46 132 64 C114 73 46 73 28 62 Z"
            fill={fillRef}
            stroke="#3D312A"
            strokeWidth="3.5"
          />
          <path d="M78 18 C78 8 85 6 88 8" fill="none" stroke="#3D312A" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'hat_party' && (
        <g>
          <polygon points="80,5 40,68 120,68" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <circle cx="80" cy="8" r="8" fill="#FFFDF8" stroke="#3D312A" strokeWidth="3" />
          <path d="M38 68 Q80 74 122 68" fill="none" stroke="#FFFDF8" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'hat_beanie' && (
        <g>
          <circle cx="80" cy="9" r="9" fill="#FFFDF8" stroke="#3D312A" strokeWidth="3" />
          <path
            d="M38 56 C38 19 122 19 122 56 Z"
            fill={fillRef}
            stroke="#3D312A"
            strokeWidth="3.5"
          />
          <rect x="32" y="49" width="96" height="21" rx="9" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <path d="M49 50 V69 M69 50 V69 M91 50 V69 M111 50 V69" stroke="#3D312A" strokeWidth="2" opacity="0.4" />
        </g>
      )}
      {itemId === 'hat_flower' && (
        <g>
          <path d="M26 68 Q80 53 134 68" fill="none" stroke="#4D8054" strokeWidth="6.5" strokeLinecap="round" />
          {[37, 65, 95, 123].map((cx, i) => (
            <g key={cx} transform={`translate(${cx} ${i === 1 || i === 2 ? 58 : 64})`}>
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <circle
                  key={deg}
                  cx={Math.cos((deg * Math.PI) / 180) * 7.5}
                  cy={Math.sin((deg * Math.PI) / 180) * 7.5}
                  r="5"
                  fill={i % 2 === 0 ? '#FFFDF8' : fillRef}
                  stroke="#3D312A"
                  strokeWidth="1.8"
                />
              ))}
              <circle r="4.5" fill="#E09F3E" stroke="#3D312A" strokeWidth="1.5" />
            </g>
          ))}
        </g>
      )}
      {itemId === 'hat_wizard' && (
        <g>
          <ellipse cx="80" cy="59" rx="58" ry="11" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <path
            d="M44 56 L76 2 C84 0 94 8 90 16 L116 56 Z"
            fill={fillRef}
            stroke="#3D312A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M48 49 Q80 55 112 49" fill="none" stroke="#F2CC66" strokeWidth="6.5" />
        </g>
      )}
      {itemId === 'hat_crown' && (
        <g>
          <polygon
            points="36,70 42,28 62,50 80,20 98,50 118,28 124,70"
            fill={fillRef}
            stroke="#3D312A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle cx="80" cy="54" r="5" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2" />
          <circle cx="54" cy="58" r="3.5" fill="#FFFDF8" stroke="#3D312A" strokeWidth="1.8" />
          <circle cx="106" cy="58" r="3.5" fill="#FFFDF8" stroke="#3D312A" strokeWidth="1.8" />
        </g>
      )}
      {itemId === 'hat_sun' && (
        <g>
          <ellipse cx="80" cy="57" rx="64" ry="13" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <path
            d="M44 53 C44 21 116 21 116 53 Z"
            fill={fillRef}
            stroke="#3D312A"
            strokeWidth="3.5"
          />
          <path d="M45 48 Q80 55 115 48" fill="none" stroke="#FFFDF8" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'hat_cap' && (
        <g>
          <path d="M36 61 C36 22 120 22 120 61 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <circle cx="78" cy="21" r="4.5" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2.5" />
          <path d="M36 61 Q92 50 144 65 Q110 73 36 67 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <rect x="64" y="34" width="28" height="16" rx="6" fill="#FFFDF8" fillOpacity="0.65" stroke="#3D312A" strokeWidth="2" />
        </g>
      )}
      {itemId === 'hat_chef' && (
        <g>
          <path
            d="M36 45 C22 38 24 14 48 16 C56 2 104 2 112 16 C136 14 138 38 124 45 Z"
            fill="#FFFDF8"
            stroke="#3D312A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <rect x="40" y="44" width="80" height="26" rx="4" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <line x1="60" y1="22" x2="62" y2="42" stroke="#D6C4AC" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="80" y1="18" x2="80" y2="42" stroke="#D6C4AC" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="100" y1="22" x2="98" y2="42" stroke="#D6C4AC" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'hat_explorer' && (
        <g>
          <path d="M18 59 Q80 49 142 59 Q80 74 18 59 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M44 55 L52 22 Q80 28 108 22 L116 55 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M46 49 Q80 55 114 49" fill="none" stroke="#6E4A2C" strokeWidth="6" />
        </g>
      )}
      {itemId === 'hat_bow' && (
        <g>
          <path d="M74 58 L30 34 C20 46 22 66 36 70 L74 64 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M86 58 L130 34 C140 46 138 66 124 70 L86 64 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <rect x="68" y="48" width="24" height="22" rx="8" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <line x1="42" y1="53" x2="64" y2="58" stroke="#FFFDF8" strokeWidth="2.5" opacity="0.65" strokeLinecap="round" />
          <line x1="118" y1="53" x2="96" y2="58" stroke="#FFFDF8" strokeWidth="2.5" opacity="0.65" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'hat_valentine_hearts' && (
        <g>
          <path d="M36 68 Q80 50 124 68" fill="none" stroke="#C85C7D" strokeWidth="6" strokeLinecap="round" />
          <path d="M58 55 L52 34" stroke="#3D312A" strokeWidth="3" strokeLinecap="round" />
          <path d="M102 55 L108 34" stroke="#3D312A" strokeWidth="3" strokeLinecap="round" />
          {[50, 110].map((cx) => (
            <path
              key={cx}
              d={`M${cx} 40 C${cx - 15} 30 ${cx - 15} 14 ${cx - 6} 14 C${cx - 2} 14 ${cx} 18 ${cx} 20 C${cx} 18 ${cx + 2} 14 ${cx + 6} 14 C${cx + 15} 14 ${cx + 15} 30 ${cx} 40 Z`}
              fill={fillRef}
              stroke="#3D312A"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          ))}
        </g>
      )}
      {itemId === 'hat_july4_tophat' && (
        <g>
          <ellipse cx="80" cy="61" rx="54" ry="9.5" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <rect x="48" y="14" width="64" height="47" rx="6" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <rect x="48" y="45" width="64" height="10" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2" />
          <polygon points="80,22 83,30 91,30 85,35 87,43 80,38 73,43 75,35 69,30 77,30" fill="#F2CC66" stroke="#3D312A" strokeWidth="2" />
        </g>
      )}
      {itemId === 'hat_halloween_witch' && (
        <g>
          <ellipse cx="80" cy="60" rx="60" ry="10" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <path d="M44 58 L74 6 C80 2 92 10 88 22 L116 58 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M48 51 Q80 57 112 51" fill="none" stroke="#E09F3E" strokeWidth="7" />
          <rect x="73" y="47" width="14" height="11" rx="2" fill="none" stroke="#F2CC66" strokeWidth="3" />
        </g>
      )}
      {itemId === 'hat_thanksgiving_pilgrim' && (
        <g>
          <ellipse cx="80" cy="60" rx="58" ry="10" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <path d="M44 58 L50 18 Q80 22 110 18 L116 58 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M45 48 Q80 54 115 48" fill="none" stroke="#FFFDF8" strokeWidth="6.5" />
          <rect x="70" y="42" width="20" height="14" rx="2.5" fill="none" stroke="#F2CC66" strokeWidth="3.5" />
        </g>
      )}
      {itemId === 'hat_christmas_santa' && (
        <g>
          <path d="M38 56 C42 18 96 6 128 38 C114 40 108 50 112 58 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <rect x="34" y="51" width="84" height="19" rx="9.5" fill="#FFFDF8" stroke="#3D312A" strokeWidth="3.5" />
          <circle cx="131" cy="41" r="9.5" fill="#FFFDF8" stroke="#3D312A" strokeWidth="3" />
        </g>
      )}
      {itemId === 'hat_christmas_antlers' && (
        <g>
          <path d="M36 69 Q80 54 124 69" fill="none" stroke="#C94A38" strokeWidth="7" strokeLinecap="round" />
          <path d="M54 58 C46 40 34 28 32 14 M46 40 L30 34 M50 32 L58 20" fill="none" stroke="#7E5732" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M106 58 C114 40 126 28 128 14 M114 40 L130 34 M110 32 L102 20" fill="none" stroke="#7E5732" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="80" cy="56" r="6" fill={fillRef} stroke="#3D312A" strokeWidth="2.5" />
          <circle cx="71" cy="59" r="4" fill="#3B8A77" stroke="#3D312A" strokeWidth="2" />
          <circle cx="89" cy="59" r="4" fill="#3B8A77" stroke="#3D312A" strokeWidth="2" />
        </g>
      )}
      {itemId === 'hat_newyear_tiara' && (
        <g>
          <path d="M34 68 L44 38 L62 54 L80 24 L98 54 L116 38 L126 68 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <polygon points="80,10 83,18 91,18 85,23 87,31 80,26 73,31 75,23 69,18 77,18" fill="#F2CC66" stroke="#3D312A" strokeWidth="2" />
          <circle cx="44" cy="36" r="5" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2" />
          <circle cx="116" cy="36" r="5" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2" />
        </g>
      )}
      {itemId === 'hat_bunny_ears' && (
        <g>
          <path d="M36 68 Q80 52 124 68" fill="none" stroke="#E89EB0" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="56" cy="32" rx="13" ry="29" transform="rotate(-12 56 32)" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <ellipse cx="56" cy="33" rx="6.5" ry="20" transform="rotate(-12 56 33)" fill="#E89EB0" />
          <path d="M98 58 C94 26 110 4 124 14 C135 22 126 42 110 58 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M104 52 C102 32 112 16 120 22 C125 26 118 40 109 52 Z" fill="#E89EB0" />
        </g>
      )}
      {itemId === 'hat_cat_ears' && (
        <g>
          <path d="M34 68 Q80 51 126 68" fill="none" stroke="#3D312A" strokeWidth="6.5" strokeLinecap="round" />
          <polygon points="38,59 44,24 70,52" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <polygon points="44,54 48,33 63,51" fill="#E89EB0" />
          <polygon points="122,59 116,24 90,52" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <polygon points="116,54 112,33 97,51" fill="#E89EB0" />
        </g>
      )}
      {itemId === 'hat_frog_beanie' && (
        <g>
          <circle cx="54" cy="24" r="13" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <circle cx="106" cy="24" r="13" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <path d="M34 66 C34 26 126 26 126 66 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <circle cx="54" cy="23" r="6.5" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2" />
          <circle cx="106" cy="23" r="6.5" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2" />
          <circle cx="54" cy="23" r="3" fill="#3D312A" />
          <circle cx="106" cy="23" r="3" fill="#3D312A" />
          <path d="M70 50 Q80 57 90 50" fill="none" stroke="#3D312A" strokeWidth="3" strokeLinecap="round" />
          <circle cx="46" cy="52" r="4" fill="#E89EB0" opacity="0.8" />
          <circle cx="114" cy="52" r="4" fill="#E89EB0" opacity="0.8" />
        </g>
      )}
      {itemId === 'hat_sailor' && (
        <g>
          <path d="M40 58 C40 30 120 30 120 58 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <path d="M26 56 Q80 42 134 56 L124 70 Q80 62 36 70 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M40 54 Q80 49 120 54" fill="none" stroke="#2E3B59" strokeWidth="5.5" />
        </g>
      )}
      {itemId === 'hat_pirate' && (
        <g>
          <path d="M20 56 Q44 16 80 34 Q116 16 140 56 Q114 72 80 68 Q46 72 20 56 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M26 55 Q46 25 80 38 Q114 25 134 55" fill="none" stroke="#F2CC66" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="80" cy="48" r="6" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2.2" />
          <line x1="74" y1="56" x2="86" y2="56" stroke="#FFFDF8" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'hat_astronaut' && (
        <g>
          <path d="M28 66 C26 16 134 16 132 66 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <ellipse cx="80" cy="48" rx="34" ry="18" fill="#89C4E1" fillOpacity="0.55" stroke="#3D312A" strokeWidth="3" />
          <path d="M56 39 Q68 33 78 36" fill="none" stroke="#FFFDF8" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="24" y="61" width="112" height="10" rx="5" fill="#D95D39" stroke="#3D312A" strokeWidth="2.8" />
        </g>
      )}
      {itemId === 'hat_cowboy' && (
        <g>
          <path d="M16 54 Q40 66 80 60 Q120 66 144 54 Q116 74 80 68 Q44 74 16 54 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M44 58 L54 22 Q68 28 80 22 Q92 28 106 22 L116 58 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M46 51 Q80 57 114 51" fill="none" stroke="#6E4A2C" strokeWidth="6" />
          <polygon points="80,45 82,50 87,50 83,53 84,58 80,55 76,58 77,53 73,50 78,50" fill="#F2CC66" />
        </g>
      )}
      {itemId === 'hat_graduation' && (
        <g>
          <rect x="44" y="42" width="72" height="26" rx="4" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <polygon points="80,18 142,36 80,52 18,36" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <circle cx="80" cy="35" r="4" fill="#F2CC66" stroke="#3D312A" strokeWidth="2" />
          <path d="M80 35 L126 42 L126 66" fill="none" stroke="#F2CC66" strokeWidth="3.5" strokeLinecap="round" />
          <polygon points="122,66 130,66 132,76 120,76" fill="#F2CC66" stroke="#3D312A" strokeWidth="2" strokeLinejoin="round" />
        </g>
      )}
      {itemId === 'hat_mushroom' && (
        <g>
          <path d="M22 60 C24 14 136 14 138 60 Q80 72 22 60 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <circle cx="52" cy="38" r="8" fill="#FFFDF8" />
          <circle cx="84" cy="27" r="9" fill="#FFFDF8" />
          <circle cx="112" cy="44" r="7" fill="#FFFDF8" />
          <circle cx="68" cy="54" r="5" fill="#FFFDF8" />
        </g>
      )}
      {itemId === 'hat_headphones' && (
        <g>
          <path d="M32 68 C32 16 128 16 128 68" fill="none" stroke={fillRef} strokeWidth="10" strokeLinecap="round" />
          <path d="M32 68 C32 16 128 16 128 68" fill="none" stroke="#3D312A" strokeWidth="3" strokeLinecap="round" />
          <rect x="20" y="54" width="18" height="32" rx="8" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <rect x="122" y="54" width="18" height="32" rx="8" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <rect x="25" y="61" width="7" height="18" rx="3" fill="#FFFDF8" opacity="0.6" />
          <rect x="128" y="61" width="7" height="18" rx="3" fill="#FFFDF8" opacity="0.6" />
        </g>
      )}

      {/* EYEWEAR */}
      {itemId === 'eye_round' && (
        <g>
          <circle cx="52" cy="60" r="22" fill="#FFFDF8" fillOpacity="0.22" stroke={colorHex} strokeWidth="6" />
          <circle cx="108" cy="60" r="22" fill="#FFFDF8" fillOpacity="0.22" stroke={colorHex} strokeWidth="6" />
          <path d="M74 58 Q80 53 86 58" fill="none" stroke={colorHex} strokeWidth="5" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'eye_heart' && (
        <g>
          {[50, 110].map((cx) => (
            <path
              key={cx}
              d={`M${cx} 76 C${cx - 24} 62 ${cx - 24} 40 ${cx - 10} 40 C${cx - 3} 40 ${cx} 46 ${cx} 48 C${cx} 46 ${cx + 3} 40 ${cx + 10} 40 C${cx + 24} 40 ${cx + 24} 62 ${cx} 76 Z`}
              fill={fillRef}
              fillOpacity="0.72"
              stroke="#FFFDF8"
              strokeWidth="3.5"
            />
          ))}
          <path d="M70 50 H90" stroke="#FFFDF8" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'eye_star' && (
        <g>
          {[48, 112].map((cx) => (
            <polygon
              key={cx}
              points={`${cx},32 ${cx + 8},48 ${cx + 26},50 ${cx + 12},62 ${cx + 16},80 ${cx},70 ${cx - 16},80 ${cx - 12},62 ${cx - 26},50 ${cx - 8},48`}
              fill={fillRef}
              fillOpacity="0.76"
              stroke="#3D312A"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          ))}
          <path d="M70 54 H90" stroke="#3D312A" strokeWidth="4" />
        </g>
      )}
      {itemId === 'eye_monocle' && (
        <g>
          <circle cx="108" cy="58" r="22" fill="#FFFDF8" fillOpacity="0.22" stroke={colorHex} strokeWidth="5.5" />
          <path d="M128 66 Q142 86 132 110" fill="none" stroke={colorHex} strokeWidth="3" strokeDasharray="3 3" />
        </g>
      )}
      {itemId === 'eye_square' && (
        <g>
          <rect x="28" y="40" width="44" height="36" rx="8" fill="#FFFDF8" fillOpacity="0.24" stroke={colorHex} strokeWidth="5.5" />
          <rect x="88" y="40" width="44" height="36" rx="8" fill="#FFFDF8" fillOpacity="0.24" stroke={colorHex} strokeWidth="5.5" />
          <path d="M72 56 H88" stroke={colorHex} strokeWidth="5" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'eye_aviator' && (
        <g>
          <path d="M26 44 H74 C76 68 62 78 46 76 C30 74 24 62 26 44 Z" fill={fillRef} fillOpacity="0.72" stroke="#3D312A" strokeWidth="4" strokeLinejoin="round" />
          <path d="M86 44 H134 C136 62 130 74 114 76 C98 78 84 68 86 44 Z" fill={fillRef} fillOpacity="0.72" stroke="#3D312A" strokeWidth="4" strokeLinejoin="round" />
          <line x1="68" y1="44" x2="92" y2="44" stroke="#3D312A" strokeWidth="4" />
          <line x1="72" y1="52" x2="88" y2="52" stroke="#3D312A" strokeWidth="3" />
          <line x1="36" y1="52" x2="48" y2="62" stroke="#FFFDF8" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <line x1="96" y1="52" x2="108" y2="62" stroke="#FFFDF8" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        </g>
      )}
      {itemId === 'eye_cateye' && (
        <g>
          <path d="M22 40 L72 48 C72 68 58 76 44 74 C28 72 24 56 22 40 Z" fill="#FFFDF8" fillOpacity="0.3" stroke={colorHex} strokeWidth="5.5" strokeLinejoin="round" />
          <path d="M138 40 L88 48 C88 68 102 76 116 74 C132 72 136 56 138 40 Z" fill="#FFFDF8" fillOpacity="0.3" stroke={colorHex} strokeWidth="5.5" strokeLinejoin="round" />
          <path d="M72 52 Q80 47 88 52" fill="none" stroke={colorHex} strokeWidth="4.5" />
          <circle cx="26" cy="43" r="3" fill="#FFFDF8" />
          <circle cx="134" cy="43" r="3" fill="#FFFDF8" />
        </g>
      )}
      {itemId === 'eye_goggles' && (
        <g>
          <line x1="20" y1="58" x2="32" y2="58" stroke="#6E4A2C" strokeWidth="9" strokeLinecap="round" />
          <line x1="128" y1="58" x2="140" y2="58" stroke="#6E4A2C" strokeWidth="9" strokeLinecap="round" />
          <circle cx="52" cy="58" r="22" fill="#A6DCE2" fillOpacity="0.62" stroke={colorHex} strokeWidth="7" />
          <circle cx="108" cy="58" r="22" fill="#A6DCE2" fillOpacity="0.62" stroke={colorHex} strokeWidth="7" />
          <circle cx="52" cy="58" r="22" fill="none" stroke="#3D312A" strokeWidth="2.5" />
          <circle cx="108" cy="58" r="22" fill="none" stroke="#3D312A" strokeWidth="2.5" />
          <line x1="74" y1="58" x2="86" y2="58" stroke="#6E4A2C" strokeWidth="6" />
        </g>
      )}
      {itemId === 'eye_valentine_rose' && (
        <g>
          <path d="M20 44 L28 34 L34 46" fill="none" stroke="#FFFDF8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M140 44 L132 34 L126 46" fill="none" stroke="#FFFDF8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          {[50, 110].map((cx) => (
            <path
              key={cx}
              d={`M${cx} 75 C${cx - 22} 62 ${cx - 22} 41 ${cx - 9} 41 C${cx - 3} 41 ${cx} 47 ${cx} 49 C${cx} 47 ${cx + 3} 41 ${cx + 9} 41 C${cx + 22} 41 ${cx + 22} 62 ${cx} 75 Z`}
              fill={fillRef}
              fillOpacity="0.82"
              stroke="#FFFDF8"
              strokeWidth="3.5"
            />
          ))}
          <path d="M70 50 H90" stroke="#FFFDF8" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'eye_newyear_stars' && (
        <g>
          {[49, 111].map((cx) => (
            <polygon
              key={cx}
              points={`${cx},31 ${cx + 7},47 ${cx + 25},49 ${cx + 12},60 ${cx + 15},78 ${cx},68 ${cx - 15},78 ${cx - 12},60 ${cx - 25},49 ${cx - 7},47`}
              fill={fillRef}
              fillOpacity="0.78"
              stroke="#F2CC66"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
          ))}
          <path d="M70 54 H90" stroke="#F2CC66" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="32" cy="40" r="3" fill="#FFFDF8" />
          <circle cx="128" cy="40" r="3" fill="#FFFDF8" />
        </g>
      )}
      {itemId === 'eye_halfmoon' && (
        <g>
          <path d="M30 58 H72 C72 74 60 80 51 80 C42 80 30 74 30 58 Z" fill="#FFFDF8" fillOpacity="0.26" stroke={colorHex} strokeWidth="4.5" strokeLinejoin="round" />
          <path d="M88 58 H130 C130 74 118 80 109 80 C100 80 88 74 88 58 Z" fill="#FFFDF8" fillOpacity="0.26" stroke={colorHex} strokeWidth="4.5" strokeLinejoin="round" />
          <path d="M72 60 Q80 55 88 60" fill="none" stroke={colorHex} strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'eye_blush' && (
        <g>
          <ellipse cx="38" cy="70" rx="14" ry="8" fill={fillRef} opacity="0.75" />
          <ellipse cx="122" cy="70" rx="14" ry="8" fill={fillRef} opacity="0.75" />
          <line x1="33" y1="67" x2="36" y2="73" stroke="#FFFDF8" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="41" y1="67" x2="44" y2="73" stroke="#FFFDF8" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="117" y1="67" x2="120" y2="73" stroke="#FFFDF8" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="125" y1="67" x2="128" y2="73" stroke="#FFFDF8" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'eye_oversized' && (
        <g>
          <circle cx="49" cy="58" r="24" fill="#FFFDF8" fillOpacity="0.2" stroke={colorHex} strokeWidth="7" />
          <circle cx="111" cy="58" r="24" fill="#FFFDF8" fillOpacity="0.2" stroke={colorHex} strokeWidth="7" />
          <path d="M73 54 H87" stroke={colorHex} strokeWidth="6" strokeLinecap="round" />
          <line x1="34" y1="48" x2="44" y2="42" stroke="#FFFDF8" strokeWidth="2.8" strokeLinecap="round" opacity="0.75" />
          <line x1="96" y1="48" x2="106" y2="42" stroke="#FFFDF8" strokeWidth="2.8" strokeLinecap="round" opacity="0.75" />
        </g>
      )}
      {itemId === 'eye_flower' && (
        <g>
          {[49, 111].map((cx) => (
            <g key={cx} transform={`translate(${cx} 58)`}>
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <circle
                  key={deg}
                  cx={Math.cos((deg * Math.PI) / 180) * 16}
                  cy={Math.sin((deg * Math.PI) / 180) * 16}
                  r="9"
                  fill={fillRef}
                  stroke="#3D312A"
                  strokeWidth="2.4"
                />
              ))}
              <circle r="11" fill="#3D312A" opacity="0.82" stroke="#FFFDF8" strokeWidth="2.5" />
            </g>
          ))}
          <path d="M68 56 H92" stroke="#3D312A" strokeWidth="4" />
        </g>
      )}
      {itemId === 'eye_pixel' && (
        <g>
          <polygon points="24,44 74,44 74,64 66,64 66,72 32,72 32,64 24,64" fill={fillRef} stroke="#3D312A" strokeWidth="2.5" />
          <polygon points="86,44 136,44 136,64 128,64 128,72 94,72 94,64 86,64" fill={fillRef} stroke="#3D312A" strokeWidth="2.5" />
          <rect x="74" y="48" width="12" height="7" fill={colorHex} />
          <rect x="33" y="49" width="8" height="4" fill="#FFFDF8" />
          <rect x="43" y="55" width="6" height="4" fill="#FFFDF8" />
          <rect x="95" y="49" width="8" height="4" fill="#FFFDF8" />
          <rect x="105" y="55" width="6" height="4" fill="#FFFDF8" />
        </g>
      )}
      {itemId === 'eye_sleep' && (
        <g>
          <path d="M24 54 C24 38 72 38 80 48 C88 38 136 38 136 54 C136 74 108 82 80 70 C52 82 24 74 24 54 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M40 58 Q50 65 60 58" fill="none" stroke="#FFFDF8" strokeWidth="3" strokeLinecap="round" />
          <path d="M100 58 Q110 65 120 58" fill="none" stroke="#FFFDF8" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'eye_mask' && (
        <g>
          <path d="M22 44 Q52 34 80 48 Q108 34 138 44 L132 70 Q106 78 80 64 Q54 78 28 70 Z" fill={fillRef} stroke="#F2CC66" strokeWidth="3.5" strokeLinejoin="round" />
          <ellipse cx="52" cy="56" rx="14" ry="9" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2.5" />
          <ellipse cx="108" cy="56" rx="14" ry="9" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2.5" />
        </g>
      )}

      {/* NECKWEAR */}
      {itemId === 'neck_bowtie' && (
        <g>
          <polygon points="80,60 40,40 40,80" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <polygon points="80,60 120,40 120,80" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <rect x="70" y="48" width="20" height="24" rx="6" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" />
        </g>
      )}
      {itemId === 'neck_scarf' && (
        <g>
          <path d="M84 62 L106 106 L82 110 L66 68 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <rect x="34" y="46" width="92" height="26" rx="12" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" />
        </g>
      )}
      {itemId === 'neck_bandana' && (
        <g>
          <polygon points="32,48 128,48 80,96" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M36 48 Q80 56 124 48" fill="none" stroke="#FFFDF8" strokeWidth="3" />
        </g>
      )}
      {itemId === 'neck_bell' && (
        <g>
          <path d="M34 48 Q80 64 126 48" fill="none" stroke={fillRef} strokeWidth="13" strokeLinecap="round" />
          <path d="M34 48 Q80 64 126 48" fill="none" stroke="#3D312A" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="80" cy="68" r="11" fill="#F2CC66" stroke="#3D312A" strokeWidth="3" />
          <circle cx="80" cy="71" r="2.5" fill="#3D312A" />
        </g>
      )}
      {itemId === 'neck_tie' && (
        <g>
          <path d="M34 46 Q80 58 126 46" fill="none" stroke="#FFFDF8" strokeWidth="9" strokeLinecap="round" />
          <path d="M34 46 Q80 58 126 46" fill="none" stroke="#3D312A" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="71,52 89,52 94,96 80,112 66,96" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <polygon points="69,46 91,46 86,62 74,62" fill={fillRef} stroke="#3D312A" strokeWidth="3" strokeLinejoin="round" />
        </g>
      )}
      {itemId === 'neck_lei' && (
        <g>
          {[38, 56, 80, 104, 122].map((fx, idx) => (
            <g key={fx} transform={`translate(${fx} ${idx === 2 ? 64 : idx === 1 || idx === 3 ? 60 : 52})`}>
              {[0, 72, 144, 216, 288].map((deg) => (
                <circle
                  key={deg}
                  cx={Math.cos((deg * Math.PI) / 180) * 7}
                  cy={Math.sin((deg * Math.PI) / 180) * 7}
                  r="5.5"
                  fill={idx % 2 === 0 ? fillRef : '#FFFDF8'}
                  stroke="#3D312A"
                  strokeWidth="1.6"
                />
              ))}
              <circle r="3.5" fill="#F2CC66" />
            </g>
          ))}
        </g>
      )}
      {itemId === 'neck_pearl' && (
        <g>
          {[36, 48, 62, 80, 98, 112, 124].map((cx, i) => (
            <circle
              key={cx}
              cx={cx}
              cy={50 + Math.sin((i / 6) * Math.PI) * 14}
              r="6.5"
              fill="#FFFDF8"
              stroke="#3D312A"
              strokeWidth="2.2"
            />
          ))}
          <circle cx="80" cy="76" r="7.5" fill={fillRef} stroke="#3D312A" strokeWidth="2.5" />
        </g>
      )}
      {itemId === 'neck_harvest_collar' && (
        <g>
          <path d="M30 48 Q80 66 130 48" fill="none" stroke={fillRef} strokeWidth="14" strokeLinecap="round" />
          <path d="M30 48 Q80 66 130 48" fill="none" stroke="#3D312A" strokeWidth="2.5" strokeLinecap="round" />
          {[46, 68, 92, 114].map((lx, idx) => (
            <polygon
              key={lx}
              points={`${lx},58 ${lx - 8},72 ${lx},80 ${lx + 8},72`}
              fill={idx % 2 === 0 ? '#E09F3E' : '#D95D39'}
              stroke="#3D312A"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
          ))}
        </g>
      )}
      {itemId === 'neck_holiday_ribbon' && (
        <g>
          <path d="M84 62 L108 106 L82 110 L66 68 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <rect x="34" y="46" width="92" height="24" rx="11" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" />
          <line x1="84" y1="106" x2="106" y2="102" stroke="#FFFDF8" strokeWidth="4" strokeLinecap="round" />
          <circle cx="62" cy="58" r="4.5" fill="#2F7D6D" stroke="#3D312A" strokeWidth="1.8" />
          <circle cx="69" cy="55" r="3" fill="#C94A38" />
        </g>
      )}
      {itemId === 'neck_newyear_bowtie' && (
        <g>
          <polygon points="80,60 36,36 36,84" fill={fillRef} stroke="#F2CC66" strokeWidth="3.5" strokeLinejoin="round" />
          <polygon points="80,60 124,36 124,84" fill={fillRef} stroke="#F2CC66" strokeWidth="3.5" strokeLinejoin="round" />
          <rect x="69" y="47" width="22" height="26" rx="6" fill="#F2CC66" stroke="#3D312A" strokeWidth="3" />
          <circle cx="54" cy="60" r="3" fill="#FFFDF8" />
          <circle cx="106" cy="60" r="3" fill="#FFFDF8" />
        </g>
      )}
      {itemId === 'neck_peterpan' && (
        <g>
          <path d="M32 48 Q46 78 80 62 Q114 78 128 48 Q80 56 32 48 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <circle cx="80" cy="62" r="5" fill="#D95D39" stroke="#3D312A" strokeWidth="2" />
          <path d="M76 66 L66 80 M84 66 L94 80" stroke="#D95D39" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'neck_heart_locket' && (
        <g>
          <path d="M36 46 Q80 74 124 46" fill="none" stroke="#D99B26" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 3" />
          <path d="M80 86 C64 76 64 58 73 58 C78 58 80 62 80 64 C80 62 82 58 87 58 C96 58 96 76 80 86 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3" strokeLinejoin="round" />
        </g>
      )}
      {itemId === 'neck_ascot' && (
        <g>
          <path d="M36 46 Q80 58 124 46 L112 64 L80 96 L48 64 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M68 56 L80 72 L92 56" fill="none" stroke="#FFFDF8" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'neck_ruffle' && (
        <g>
          <path d="M26 52 Q36 74 48 60 Q60 80 72 64 Q80 82 88 64 Q100 80 112 60 Q124 74 134 52 Q80 42 26 52 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M48 60 L54 48 M72 64 L74 47 M88 64 L86 47 M112 60 L106 48" stroke="#3D312A" strokeWidth="2" opacity="0.45" />
        </g>
      )}
      {itemId === 'neck_medal' && (
        <g>
          <polygon points="40,42 54,42 80,76 66,76" fill={fillRef} stroke="#3D312A" strokeWidth="2.8" strokeLinejoin="round" />
          <polygon points="120,42 106,42 80,76 94,76" fill={fillRef} stroke="#3D312A" strokeWidth="2.8" strokeLinejoin="round" />
          <circle cx="80" cy="84" r="14" fill="#F2CC66" stroke="#3D312A" strokeWidth="3" />
          <polygon points="80,74 83,81 90,81 84,85 86,92 80,88 74,92 76,85 70,81 77,81" fill="#FFFDF8" stroke="#3D312A" strokeWidth="1.5" />
        </g>
      )}
      {itemId === 'neck_choker_moon' && (
        <g>
          <path d="M36 48 Q80 62 124 48" fill="none" stroke={fillRef} strokeWidth="9" strokeLinecap="round" />
          <path d="M36 48 Q80 62 124 48" fill="none" stroke="#3D312A" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M84 62 A12 12 0 1 0 84 84 A9 9 0 1 1 84 62 Z" fill="#F2CC66" stroke="#3D312A" strokeWidth="2.5" strokeLinejoin="round" />
        </g>
      )}
      {itemId === 'neck_camera' && (
        <g>
          <path d="M38 42 L68 74 M122 42 L92 74" stroke="#6E4A2C" strokeWidth="4.5" strokeLinecap="round" />
          <rect x="56" y="64" width="48" height="34" rx="6" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" />
          <rect x="66" y="58" width="16" height="6" rx="2" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2" />
          <circle cx="80" cy="81" r="10" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2.8" />
          <circle cx="80" cy="81" r="5" fill="#2E3B59" />
          <circle cx="96" cy="72" r="2.8" fill="#F2CC66" />
        </g>
      )}

      {/* TOPS */}
      {itemId === 'top_sweater' && (
        <g>
          <path
            d="M44 24 L18 48 L32 64 L44 52 V102 H116 V52 L128 64 L142 48 L116 24 Q80 36 44 24 Z"
            fill={fillRef}
            stroke="#3D312A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <rect x="44" y="92" width="72" height="10" rx="3" fill="#FFFDF8" fillOpacity="0.45" stroke="#3D312A" strokeWidth="2.5" />
        </g>
      )}
      {itemId === 'top_overalls' && (
        <g>
          <rect x="46" y="24" width="12" height="32" fill={fillRef} stroke="#3D312A" strokeWidth="3" />
          <rect x="102" y="24" width="12" height="32" fill={fillRef} stroke="#3D312A" strokeWidth="3" />
          <path
            d="M40 46 H120 L126 102 H34 Z"
            fill={fillRef}
            stroke="#3D312A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <rect x="62" y="64" width="36" height="24" rx="4" fill="#FFFDF8" fillOpacity="0.65" stroke="#3D312A" strokeWidth="2.5" />
          <circle cx="52" cy="52" r="4" fill="#F2CC66" stroke="#3D312A" strokeWidth="2" />
          <circle cx="108" cy="52" r="4" fill="#F2CC66" stroke="#3D312A" strokeWidth="2" />
        </g>
      )}
      {itemId === 'top_vest' && (
        <g>
          <path
            d="M44 24 L28 40 V98 H74 V44 L44 24 Z"
            fill={fillRef}
            stroke="#3D312A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M116 24 L132 40 V98 H86 V44 L116 24 Z"
            fill={fillRef}
            stroke="#3D312A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle cx="70" cy="60" r="3.5" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2" />
          <circle cx="70" cy="78" r="3.5" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2" />
        </g>
      )}
      {itemId === 'top_cape' && (
        <g>
          <path
            d="M44 26 Q80 38 116 26 L144 98 Q112 108 80 98 Q48 108 16 98 Z"
            fill={fillRef}
            stroke="#3D312A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle cx="80" cy="30" r="7" fill="#F2CC66" stroke="#3D312A" strokeWidth="2.5" />
        </g>
      )}
      {itemId === 'top_tee' && (
        <g>
          <path
            d="M46 24 L20 44 L34 62 L46 52 V100 H114 V52 L126 62 L140 44 L114 24 Q80 38 46 24 Z"
            fill={fillRef}
            stroke="#3D312A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M48 25 L68 42 L80 34 L92 42 L112 25" fill="#FFFDF8" stroke="#3D312A" strokeWidth="3" strokeLinejoin="round" />
        </g>
      )}
      {itemId === 'top_hoodie' && (
        <g>
          <path
            d="M44 24 L18 48 L32 64 L44 52 V102 H116 V52 L128 64 L142 48 L116 24 Q80 38 44 24 Z"
            fill={fillRef}
            stroke="#3D312A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M52 25 Q80 42 108 25" fill="none" stroke="#3D312A" strokeWidth="3" />
          <line x1="70" y1="33" x2="70" y2="54" stroke="#FFFDF8" strokeWidth="3" strokeLinecap="round" />
          <line x1="90" y1="33" x2="90" y2="54" stroke="#FFFDF8" strokeWidth="3" strokeLinecap="round" />
          <path d="M56 72 H104 L108 94 H52 Z" fill="#FFFDF8" fillOpacity="0.35" stroke="#3D312A" strokeWidth="2.5" strokeLinejoin="round" />
        </g>
      )}
      {itemId === 'top_smock' && (
        <g>
          <path
            d="M42 22 L18 44 L32 62 L44 50 V102 H116 V50 L128 62 L142 44 L118 22 Q80 34 42 22 Z"
            fill="#FFFDF8"
            stroke="#3D312A"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path d="M46 28 H114 L120 102 H40 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <rect x="54" y="64" width="22" height="22" rx="4" fill="#FFFDF8" fillOpacity="0.7" stroke="#3D312A" strokeWidth="2.2" />
          <rect x="84" y="64" width="22" height="22" rx="4" fill="#FFFDF8" fillOpacity="0.7" stroke="#3D312A" strokeWidth="2.2" />
          <line x1="62" y1="54" x2="66" y2="68" stroke="#D95D39" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="92" y1="52" x2="96" y2="68" stroke="#2F7D6D" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'top_kimono' && (
        <g>
          <path
            d="M44 24 L14 48 L24 72 L44 62 V102 H116 V62 L136 72 L146 48 L116 24 Q80 36 44 24 Z"
            fill={fillRef}
            stroke="#3D312A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M52 24 L94 64 M108 24 L66 64" stroke="#FFFDF8" strokeWidth="6" strokeLinecap="round" />
          <rect x="44" y="64" width="72" height="16" fill="#E07A5F" stroke="#3D312A" strokeWidth="2.5" />
          <rect x="72" y="61" width="16" height="22" rx="3" fill="#F2CC66" stroke="#3D312A" strokeWidth="2" />
        </g>
      )}
      {itemId === 'top_holiday_sweater' && (
        <g>
          <path
            d="M44 24 L18 48 L32 64 L44 52 V102 H116 V52 L128 64 L142 48 L116 24 Q80 36 44 24 Z"
            fill={fillRef}
            stroke="#3D312A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M46 25 Q80 39 114 25" fill="none" stroke="#FFFDF8" strokeWidth="5.5" strokeLinecap="round" />
          <rect x="44" y="92" width="72" height="10" rx="3" fill="#FFFDF8" fillOpacity="0.8" stroke="#3D312A" strokeWidth="2.5" />
          <polygon points="80,46 64,76 96,76" fill="#2F7D6D" stroke="#FFFDF8" strokeWidth="2.2" strokeLinejoin="round" />
          <circle cx="80" cy="44" r="3.5" fill="#F2CC66" />
        </g>
      )}
      {itemId === 'top_spooky_vest' && (
        <g>
          <path
            d="M44 24 L28 40 V98 H74 V44 L44 24 Z"
            fill={fillRef}
            stroke="#3D312A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M116 24 L132 40 V98 H86 V44 L116 24 Z"
            fill={fillRef}
            stroke="#3D312A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle cx="69" cy="60" r="4" fill="#E67E22" stroke="#3D312A" strokeWidth="2" />
          <circle cx="69" cy="78" r="4" fill="#E67E22" stroke="#3D312A" strokeWidth="2" />
          <path d="M98 72 Q103 66 106 72 Q109 66 114 72 Q109 76 106 74 Q103 76 98 72 Z" fill="#F2CC66" stroke="#3D312A" strokeWidth="1.5" />
        </g>
      )}
      {itemId === 'top_cardigan' && (
        <g>
          <path d="M44 24 L18 48 L32 64 L44 52 V102 H76 V42 L44 24 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M116 24 L142 48 L128 64 L116 52 V102 H84 V42 L116 24 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <rect x="49" y="72" width="20" height="20" rx="4" fill="#FFFDF8" fillOpacity="0.45" stroke="#3D312A" strokeWidth="2" />
          <rect x="91" y="72" width="20" height="20" rx="4" fill="#FFFDF8" fillOpacity="0.45" stroke="#3D312A" strokeWidth="2" />
          <circle cx="72" cy="56" r="3" fill="#FFFDF8" stroke="#3D312A" strokeWidth="1.8" />
        </g>
      )}
      {itemId === 'top_pajama' && (
        <g>
          <path d="M44 24 L18 48 L32 64 L44 52 V102 H116 V52 L128 64 L142 48 L116 24 Q80 36 44 24 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <line x1="80" y1="34" x2="80" y2="102" stroke="#FFFDF8" strokeWidth="3" />
          <path d="M48 25 L70 42 L80 34 L90 42 L112 25" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2.8" strokeLinejoin="round" />
          <circle cx="80" cy="54" r="3" fill="#FFFDF8" stroke="#3D312A" strokeWidth="1.6" />
          <circle cx="80" cy="72" r="3" fill="#FFFDF8" stroke="#3D312A" strokeWidth="1.6" />
          <circle cx="80" cy="90" r="3" fill="#FFFDF8" stroke="#3D312A" strokeWidth="1.6" />
        </g>
      )}
      {itemId === 'top_raincoat' && (
        <g>
          <path d="M42 22 L14 48 L28 66 L44 54 L36 104 H124 L116 54 L132 66 L146 48 L118 22 Q80 36 42 22 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <line x1="80" y1="34" x2="80" y2="104" stroke="#3D312A" strokeWidth="3" />
          <circle cx="73" cy="52" r="3.5" fill="#3D312A" />
          <circle cx="73" cy="70" r="3.5" fill="#3D312A" />
          <circle cx="73" cy="88" r="3.5" fill="#3D312A" />
        </g>
      )}
      {itemId === 'top_tutu' && (
        <g>
          <rect x="46" y="24" width="12" height="24" fill={fillRef} stroke="#3D312A" strokeWidth="3" />
          <rect x="102" y="24" width="12" height="24" fill={fillRef} stroke="#3D312A" strokeWidth="3" />
          <rect x="44" y="42" width="72" height="28" rx="6" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" />
          <path d="M42 70 H118 L136 98 Q122 108 108 98 Q94 108 80 98 Q66 108 52 98 Q38 108 24 98 Z" fill="#FFFDF8" fillOpacity="0.9" stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <rect x="42" y="66" width="76" height="8" rx="4" fill={fillRef} stroke="#3D312A" strokeWidth="2.5" />
        </g>
      )}
      {itemId === 'top_denim_jacket' && (
        <g>
          <path d="M44 24 L18 48 L32 64 L44 52 V102 H116 V52 L128 64 L142 48 L116 24 Q80 36 44 24 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M48 25 L66 44 L80 36 L94 44 L112 25" fill="#FFFDF8" fillOpacity="0.5" stroke="#3D312A" strokeWidth="2.8" strokeLinejoin="round" />
          <line x1="80" y1="36" x2="80" y2="102" stroke="#3D312A" strokeWidth="2.8" />
          <polygon points="62,62 64,67 70,67 65,70 67,75 62,72 57,75 59,70 54,67 60,67" fill="#F2CC66" stroke="#3D312A" strokeWidth="1.5" />
          <rect x="90" y="62" width="16" height="14" rx="3" fill="#D95D39" stroke="#3D312A" strokeWidth="2" />
        </g>
      )}
      {itemId === 'top_sailor_uniform' && (
        <g>
          <path d="M44 24 L18 46 L32 62 L44 52 V100 H116 V52 L128 62 L142 46 L116 24 Q80 36 44 24 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <polygon points="44,24 116,24 110,56 80,68 50,56" fill="#2E3B59" stroke="#3D312A" strokeWidth="3" strokeLinejoin="round" />
          <polygon points="72,56 88,56 92,82 80,74 68,82" fill="#D95D39" stroke="#3D312A" strokeWidth="2.4" strokeLinejoin="round" />
        </g>
      )}
      {itemId === 'top_varsity' && (
        <g>
          <path d="M44 24 L16 48 L30 66 L44 54 V102 H116 V54 L130 66 L144 48 L116 24 Q80 36 44 24 Z" fill="#FFFDF8" stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <rect x="44" y="28" width="72" height="74" rx="4" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" />
          <line x1="80" y1="32" x2="80" y2="102" stroke="#FFFDF8" strokeWidth="3.5" />
          <polygon points="62,56 64,61 70,61 65,64 67,69 62,66 57,69 59,64 54,61 60,61" fill="#F2CC66" stroke="#FFFDF8" strokeWidth="1.5" />
        </g>
      )}
      {itemId === 'top_royal_robe' && (
        <g>
          <path d="M42 26 Q80 38 118 26 L146 102 H14 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M40 24 Q80 42 120 24 L124 40 Q80 56 36 40 Z" fill="#FFFDF8" stroke="#3D312A" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="58" cy="37" r="2.2" fill="#3D312A" />
          <circle cx="80" cy="42" r="2.2" fill="#3D312A" />
          <circle cx="102" cy="37" r="2.2" fill="#3D312A" />
          <circle cx="80" cy="31" r="6" fill="#F2CC66" stroke="#3D312A" strokeWidth="2" />
        </g>
      )}

      {/* WINGS & BACK (centered wide wingspan behind pet) */}
      {itemId === 'wing_butterfly' && (
        <g>
          <path d="M74 58 C46 10 8 12 12 46 C16 64 46 66 74 62 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M74 64 C44 68 18 84 26 102 C36 116 64 98 74 72 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M86 58 C114 10 152 12 148 46 C144 64 114 66 86 62 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M86 64 C116 68 142 84 134 102 C124 116 96 98 86 72 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <circle cx="30" cy="34" r="6" fill="#FFFDF8" opacity="0.85" />
          <circle cx="130" cy="34" r="6" fill="#FFFDF8" opacity="0.85" />
          <circle cx="38" cy="90" r="4.5" fill="#F2CC66" />
          <circle cx="122" cy="90" r="4.5" fill="#F2CC66" />
        </g>
      )}
      {itemId === 'wing_angel' && (
        <g>
          <path d="M70 58 C44 18 10 22 10 46 C10 62 24 66 20 74 C22 86 44 84 44 92 C54 96 68 84 72 68 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M90 58 C116 18 150 22 150 46 C150 62 136 66 140 74 C138 86 116 84 116 92 C106 96 92 84 88 68 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M26 48 Q46 52 60 62 M30 68 Q48 68 62 72" fill="none" stroke="#D6C4AC" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M134 48 Q114 52 100 62 M130 68 Q112 68 98 72" fill="none" stroke="#D6C4AC" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'wing_bee' && (
        <g>
          <ellipse cx="38" cy="46" rx="30" ry="18" transform="rotate(-22 38 46)" fill={fillRef} fillOpacity="0.82" stroke="#3D312A" strokeWidth="3" />
          <ellipse cx="44" cy="74" rx="22" ry="13" transform="rotate(14 44 74)" fill={fillRef} fillOpacity="0.82" stroke="#3D312A" strokeWidth="3" />
          <ellipse cx="122" cy="46" rx="30" ry="18" transform="rotate(22 122 46)" fill={fillRef} fillOpacity="0.82" stroke="#3D312A" strokeWidth="3" />
          <ellipse cx="116" cy="74" rx="22" ry="13" transform="rotate(-14 116 74)" fill={fillRef} fillOpacity="0.82" stroke="#3D312A" strokeWidth="3" />
        </g>
      )}
      {itemId === 'wing_bat' && (
        <g>
          <path d="M72 56 L16 20 C12 42 8 54 14 70 Q28 62 38 78 Q52 66 64 82 L74 68 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M88 56 L144 20 C148 42 152 54 146 70 Q132 62 122 78 Q108 66 96 82 L86 68 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
        </g>
      )}
      {itemId === 'wing_cape_hero' && (
        <g>
          <path d="M46 34 Q80 42 114 34 L148 98 Q112 112 80 102 Q48 112 12 98 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
        </g>
      )}
      {itemId === 'wing_fairy' && (
        <g>
          <path d="M74 56 C44 10 8 14 14 44 C18 62 46 64 74 60 Z" fill={fillRef} fillOpacity="0.84" stroke="#FFFDF8" strokeWidth="3.5" />
          <path d="M74 64 C44 68 20 82 28 100 C36 112 64 96 74 72 Z" fill={fillRef} fillOpacity="0.84" stroke="#FFFDF8" strokeWidth="3.5" />
          <path d="M86 56 C116 10 152 14 146 44 C142 62 114 64 86 60 Z" fill={fillRef} fillOpacity="0.84" stroke="#FFFDF8" strokeWidth="3.5" />
          <path d="M86 64 C116 68 140 82 132 100 C124 112 96 96 86 72 Z" fill={fillRef} fillOpacity="0.84" stroke="#FFFDF8" strokeWidth="3.5" />
          <circle cx="34" cy="40" r="4" fill="#F2CC66" />
          <circle cx="126" cy="40" r="4" fill="#F2CC66" />
        </g>
      )}
      {itemId === 'wing_dragon' && (
        <g>
          <path d="M72 56 L22 14 L12 52 Q30 50 38 72 Q54 64 68 80 L76 66 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M88 56 L138 14 L148 52 Q130 50 122 72 Q106 64 92 80 L84 66 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M22 14 L40 60 M138 14 L120 60" stroke="#F2CC66" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'wing_backpack' && (
        <g>
          <rect x="26" y="26" width="108" height="78" rx="22" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <rect x="36" y="34" width="88" height="24" rx="10" fill="#FFFDF8" fillOpacity="0.32" stroke="#3D312A" strokeWidth="2.5" />
          <rect x="18" y="54" width="14" height="32" rx="6" fill={fillRef} stroke="#3D312A" strokeWidth="3" />
          <rect x="128" y="54" width="14" height="32" rx="6" fill={fillRef} stroke="#3D312A" strokeWidth="3" />
          <rect x="48" y="54" width="8" height="12" rx="2" fill="#F2CC66" stroke="#3D312A" strokeWidth="2" />
          <rect x="104" y="54" width="8" height="12" rx="2" fill="#F2CC66" stroke="#3D312A" strokeWidth="2" />
        </g>
      )}

      {/* HANDHELD PROPS (centered for paw placement + clean drawer thumbnails) */}
      {itemId === 'hand_wand' && (
        <g>
          <line x1="80" y1="42" x2="80" y2="112" stroke="#8C6239" strokeWidth="7" strokeLinecap="round" />
          <path d="M78 48 Q56 64 64 84" fill="none" stroke="#E89EB0" strokeWidth="4" strokeLinecap="round" />
          <path d="M82 48 Q104 64 96 84" fill="none" stroke="#7BC4B2" strokeWidth="4" strokeLinecap="round" />
          <polygon points="80,8 88,28 110,30 93,43 99,64 80,52 61,64 67,43 50,30 72,28" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <circle cx="80" cy="36" r="5" fill="#FFFDF8" />
        </g>
      )}
      {itemId === 'hand_balloon' && (
        <g>
          <path d="M80 74 Q72 90 84 100 Q74 108 80 116" fill="none" stroke="#3D312A" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M80 72 C46 54 46 16 66 16 C75 16 80 24 80 27 C80 24 85 16 94 16 C114 16 114 54 80 72 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <ellipse cx="64" cy="30" rx="5" ry="9" transform="rotate(-24 64 30)" fill="#FFFDF8" opacity="0.65" />
        </g>
      )}
      {itemId === 'hand_mug' && (
        <g>
          <path d="M108 54 C124 54 124 84 108 84" fill="none" stroke="#3D312A" strokeWidth="7" strokeLinecap="round" />
          <path d="M108 54 C122 54 122 84 108 84" fill="none" stroke={fillRef} strokeWidth="3.5" strokeLinecap="round" />
          <rect x="46" y="42" width="64" height="58" rx="12" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <ellipse cx="78" cy="45" rx="28" ry="8" fill="#6E4A2C" stroke="#3D312A" strokeWidth="2.5" />
          <circle cx="70" cy="44" r="4.5" fill="#FFFDF8" />
          <circle cx="84" cy="45" r="4.5" fill="#FFFDF8" />
          <path d="M64 28 Q60 18 66 12 M84 26 Q88 18 84 10" fill="none" stroke="#FFFDF8" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'hand_boba' && (
        <g>
          <line x1="80" y1="8" x2="88" y2="42" stroke="#D95D39" strokeWidth="6" strokeLinecap="round" />
          <polygon points="52,38 108,38 100,104 60,104" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <ellipse cx="80" cy="38" rx="30" ry="8" fill="#FFFDF8" stroke="#3D312A" strokeWidth="3" />
          <circle cx="70" cy="94" r="4" fill="#3D312A" />
          <circle cx="80" cy="96" r="4" fill="#3D312A" />
          <circle cx="90" cy="93" r="4" fill="#3D312A" />
          <circle cx="74" cy="84" r="4" fill="#3D312A" />
          <circle cx="86" cy="83" r="4" fill="#3D312A" />
        </g>
      )}
      {itemId === 'hand_brush' && (
        <g>
          <g transform="rotate(24 80 60)">
            <rect x="74" y="44" width="12" height="68" rx="5" fill="#C99B6D" stroke="#3D312A" strokeWidth="3" />
            <rect x="73" y="34" width="14" height="14" rx="2" fill="#E8DCC8" stroke="#3D312A" strokeWidth="2.8" />
            <path d="M72 34 C68 18 76 6 82 6 C88 6 92 22 88 34 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3" strokeLinejoin="round" />
          </g>
        </g>
      )}
      {itemId === 'hand_bouquet' && (
        <g>
          <polygon points="50,54 110,54 88,108 72,108" fill="#DFC7A7" stroke="#3D312A" strokeWidth="3.2" strokeLinejoin="round" />
          <circle cx="62" cy="40" r="14" fill={fillRef} stroke="#3D312A" strokeWidth="2.8" />
          <circle cx="96" cy="42" r="13" fill="#F2CC66" stroke="#3D312A" strokeWidth="2.8" />
          <circle cx="80" cy="28" r="15" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2.8" />
          <circle cx="62" cy="40" r="5" fill="#F2CC66" />
          <circle cx="96" cy="42" r="5" fill="#D95D39" />
          <circle cx="80" cy="28" r="5" fill="#E89EB0" />
        </g>
      )}
      {itemId === 'hand_lantern' && (
        <g>
          <path d="M62 24 H98" stroke="#3D312A" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="80" y1="10" x2="80" y2="24" stroke="#3D312A" strokeWidth="3" />
          <ellipse cx="80" cy="58" rx="28" ry="32" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" />
          <ellipse cx="80" cy="58" rx="14" ry="32" fill="#FFFDF8" opacity="0.28" stroke="#3D312A" strokeWidth="2" />
          <rect x="64" y="24" width="32" height="8" rx="3" fill="#463830" stroke="#3D312A" strokeWidth="2.5" />
          <rect x="64" y="86" width="32" height="8" rx="3" fill="#463830" stroke="#3D312A" strokeWidth="2.5" />
          <line x1="80" y1="94" x2="80" y2="110" stroke="#D95D39" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'hand_umbrella' && (
        <g>
          <path d="M80 46 V98 C80 108 94 108 94 98" fill="none" stroke="#8C6239" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M26 52 C26 16 134 16 134 52 Q116 44 98 52 Q80 44 62 52 Q44 44 26 52 Z" fill={fillRef} stroke="#3D312A" strokeWidth="3.5" strokeLinejoin="round" />
          <line x1="80" y1="16" x2="80" y2="24" stroke="#3D312A" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
      {itemId === 'hand_plush' && (
        <g>
          <circle cx="58" cy="30" r="10" fill={fillRef} stroke="#3D312A" strokeWidth="3" />
          <circle cx="102" cy="30" r="10" fill={fillRef} stroke="#3D312A" strokeWidth="3" />
          <ellipse cx="80" cy="82" rx="24" ry="26" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" />
          <circle cx="80" cy="46" r="24" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" />
          <ellipse cx="80" cy="51" rx="10" ry="8" fill="#EFE3CE" />
          <circle cx="71" cy="43" r="3" fill="#3D312A" />
          <circle cx="89" cy="43" r="3" fill="#3D312A" />
          <circle cx="80" cy="49" r="3" fill="#3D312A" />
          <circle cx="80" cy="84" r="12" fill="#EFE3CE" />
        </g>
      )}
      {itemId === 'hand_ukulele' && (
        <g>
          <g transform="rotate(-24 80 62)">
            <rect x="74" y="10" width="12" height="44" rx="4" fill="#8C6239" stroke="#3D312A" strokeWidth="3" />
            <ellipse cx="80" cy="84" rx="22" ry="24" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" />
            <ellipse cx="80" cy="64" rx="16" ry="15" fill={fillRef} stroke="#3D312A" strokeWidth="3.2" />
            <circle cx="80" cy="68" r="7" fill="#3D312A" />
            <rect x="70" y="88" width="20" height="5" rx="2" fill="#3D312A" />
            <line x1="77" y1="18" x2="77" y2="88" stroke="#FFFDF8" strokeWidth="1.2" opacity="0.8" />
            <line x1="83" y1="18" x2="83" y2="88" stroke="#FFFDF8" strokeWidth="1.2" opacity="0.8" />
          </g>
        </g>
      )}
      </g>
    </svg>
  );
};
