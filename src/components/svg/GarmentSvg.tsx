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
    </svg>
  );
};
