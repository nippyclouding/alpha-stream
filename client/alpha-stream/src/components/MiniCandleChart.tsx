import React from 'react';
import { Stock } from '../types';

export default function MiniCandleChart({ stock }: { stock: Stock }) {
  // Mocking mini candle chart points
  const points = [40, 50, 45, 60, 55, 70, 65, 80, 75, 90].map((v, i) => ({
    x: i * 10,
    y: 40 - (v * 0.4)
  }));
  
  const isUp = stock.changeRate >= 0;
  const color = isUp ? '#ef4444' : '#3b82f6';

  return (
    <div className="w-16 h-8 opacity-60">
      <svg viewBox="0 0 100 40" className="w-full h-full">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points.map(p => `${p.x},${p.y}`).join(' ')}
        />
      </svg>
    </div>
  );
}
