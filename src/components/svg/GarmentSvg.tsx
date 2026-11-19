import React, { useId } from 'react';
import { PatternId } from '../../types/game';

interface Props {
  itemId: string;
  colorHex: string;
  patternId: PatternId;
  className?: string;
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
}) => {
  const uid = useId().replace(/:/g, '');
  const patKey = `pat_${uid}`;
  const fillRef = patternId === 'solid' ? colorHex : `url(#${patKey})`;

  return (
    <svg viewBox="0 0 160 120" className={className} style={{ overflow: 'visible' }}>
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
      </defs>

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
    </svg>
  );
};
