import React from 'react';
import { PetId } from '../../types/game';

interface Props {
  petId: PetId;
}

export const PetTrickVfx: React.FC<Props> = ({ petId }) => {
  if (petId === 'rawr') {
    return (
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Comic paper "RAWR!" speech sticker */}
        <div
          className="absolute -top-4 right-0 animate-vfx-pop sticker-shadow"
          style={{ width: '42%' }}
        >
          <svg viewBox="0 0 140 90" className="w-full h-auto">
            <path
              d="M22 18 L52 8 L76 16 L108 6 L124 28 L134 52 L112 68 L74 64 L44 74 L24 62 L10 78 L18 52 L8 32 Z"
              fill="#FFFDF8"
              stroke="#3D312A"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <text
              x="72"
              y="47"
              textAnchor="middle"
              className="font-display"
              fontSize="24"
              fontWeight="700"
              fill="#D95D39"
            >
              RAWR!
            </text>
          </svg>
        </div>
        {/* Sound wave arcs */}
        <svg
          viewBox="0 0 60 60"
          className="absolute top-[28%] right-[8%] w-10 h-10 animate-vfx-puff"
        >
          <path
            d="M12 18 Q24 30 12 42"
            fill="none"
            stroke="#D95D39"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M26 10 Q42 30 26 50"
            fill="none"
            stroke="#E09F3E"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (petId === 'scorch') {
    return (
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Paper flame & rising curled smoke puffs from snout */}
        <div className="absolute top-[18%] right-[4%] w-[44%] animate-vfx-puff sticker-shadow">
          <svg viewBox="0 0 140 110" className="w-full h-auto">
            {/* Smoke clouds */}
            <g fill="#E8E4DE" stroke="#3D312A" strokeWidth="2.5">
              <circle cx="88" cy="36" r="14" />
              <circle cx="104" cy="30" r="17" />
              <circle cx="118" cy="40" r="12" />
              <circle cx="102" cy="46" r="13" />
              <circle cx="116" cy="18" r="9" />
            </g>
            {/* Layered paper flame */}
            <path
              d="M16 74 C32 52 58 46 78 62 C64 76 44 86 16 74 Z"
              fill="#D95D39"
              stroke="#FFFDF8"
              strokeWidth="3"
            />
            <path
              d="M22 72 C36 58 52 56 64 66 C52 74 38 78 22 72 Z"
              fill="#F2CC66"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (petId === 'trot') {
    return (
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Fanning paper feathers & autumn leaf accents */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[92%] animate-vfx-fan sticker-shadow">
          <svg viewBox="0 0 220 95" className="w-full h-auto">
            {[
              { x: 38, y: 52, rot: -42, color: '#D95D39' },
              { x: 74, y: 28, rot: -18, color: '#E09F3E' },
              { x: 110, y: 20, rot: 0, color: '#9C6644' },
              { x: 146, y: 28, rot: 18, color: '#E09F3E' },
              { x: 182, y: 52, rot: 42, color: '#D95D39' },
            ].map((f, i) => (
              <g key={i} transform={`translate(${f.x} ${f.y}) rotate(${f.rot})`}>
                <ellipse
                  cx="0"
                  cy="0"
                  rx="11"
                  ry="24"
                  fill={f.color}
                  stroke="#FFFDF8"
                  strokeWidth="3"
                />
                <line x1="0" y1="-16" x2="0" y2="18" stroke="#FFFDF8" strokeWidth="2" />
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  }

  if (petId === 'buddybear') {
    return (
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Cozy expanding hug rings & warm hearts */}
        <svg viewBox="0 0 200 200" className="w-full h-full animate-vfx-pop">
          <circle
            cx="100"
            cy="108"
            r="74"
            fill="none"
            stroke="#D95D39"
            strokeWidth="3.5"
            strokeDasharray="10 8"
            opacity="0.7"
          />
          <circle
            cx="100"
            cy="108"
            r="88"
            fill="none"
            stroke="#E09F3E"
            strokeWidth="3"
            strokeDasharray="8 10"
            opacity="0.55"
          />
          {/* Floating warm paper hearts */}
          <path
            d="M34 62 C24 54 22 42 29 38 C34 35 38 39 39 43 C42 39 46 37 50 41 C55 46 50 57 34 62 Z"
            fill="#D95D39"
            stroke="#FFFDF8"
            strokeWidth="2.5"
          />
          <path
            d="M166 56 C156 48 154 36 161 32 C166 29 170 33 171 37 C174 33 178 31 182 35 C187 40 182 51 166 56 Z"
            fill="#E09F3E"
            stroke="#FFFDF8"
            strokeWidth="2.5"
          />
        </svg>
      </div>
    );
  }

  if (petId === 'douggie') {
    return (
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Comic paper "WOOF!" speech sticker */}
        <div
          className="absolute -top-4 right-0 animate-vfx-pop sticker-shadow"
          style={{ width: '42%' }}
        >
          <svg viewBox="0 0 140 84" className="w-full h-auto">
            <path
              d="M18 16 Q72 4 124 16 Q136 42 122 60 Q72 68 42 64 L18 76 L26 56 Q8 38 18 16 Z"
              fill="#FFFDF8"
              stroke="#3D312A"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <text
              x="72"
              y="45"
              textAnchor="middle"
              className="font-display"
              fontSize="23"
              fontWeight="700"
              fill="#C97A36"
            >
              WOOF!
            </text>
          </svg>
        </div>
        {/* Bouncing cut-paper dog bone & joyful sparks */}
        <svg
          viewBox="0 0 90 90"
          className="absolute top-[10%] left-[4%] w-14 h-14 animate-vfx-puff sticker-shadow"
        >
          <g transform="translate(44 46) rotate(-22)">
            <circle cx="-18" cy="-6" r="7" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2.8" />
            <circle cx="-18" cy="6" r="7" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2.8" />
            <circle cx="18" cy="-6" r="7" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2.8" />
            <circle cx="18" cy="6" r="7" fill="#FFFDF8" stroke="#3D312A" strokeWidth="2.8" />
            <rect x="-18" y="-6" width="36" height="12" fill="#FFFDF8" />
            <line x1="-13" y1="-6" x2="13" y2="-6" stroke="#3D312A" strokeWidth="2.8" />
            <line x1="-13" y1="6" x2="13" y2="6" stroke="#3D312A" strokeWidth="2.8" />
          </g>
        </svg>
      </div>
    );
  }

  // Catty: Purr bubble + floating musical notes
  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      <div className="absolute -top-3 left-[4%] w-[44%] animate-vfx-pop sticker-shadow">
        <svg viewBox="0 0 130 72" className="w-full h-auto">
          <rect
            x="8"
            y="8"
            width="114"
            height="46"
            rx="16"
            fill="#FFFDF8"
            stroke="#3D312A"
            strokeWidth="3.5"
          />
          <text
            x="65"
            y="38"
            textAnchor="middle"
            className="font-display"
            fontSize="22"
            fontWeight="700"
            fill="#C85C7D"
          >
            Purr~
          </text>
        </svg>
      </div>
      <svg
        viewBox="0 0 90 90"
        className="absolute -top-2 right-[6%] w-16 h-16 animate-vfx-puff sticker-shadow"
      >
        <g fill="#C85C7D" stroke="#FFFDF8" strokeWidth="2">
          <circle cx="24" cy="58" r="8" />
          <path d="M30 58 V24 L56 18 V50" fill="none" stroke="#C85C7D" strokeWidth="5" strokeLinecap="round" />
          <circle cx="50" cy="50" r="8" />
        </g>
        <g fill="#4C8DAE" transform="translate(48 22) scale(0.65)">
          <circle cx="20" cy="48" r="8" />
          <path d="M26 48 V16 L40 22" fill="none" stroke="#4C8DAE" strokeWidth="5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};
