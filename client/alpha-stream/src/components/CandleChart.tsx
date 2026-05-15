import React from 'react';
import { 
  ComposedChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  Line
} from 'recharts';

// Mock candle data
const data = Array.from({ length: 40 }).map((_, i) => {
  const open = 70000 + Math.random() * 5000;
  const close = open + (Math.random() - 0.5) * 2000;
  return {
    time: `${i}:00`,
    open,
    close,
    high: Math.max(open, close) + Math.random() * 500,
    low: Math.min(open, close) - Math.random() * 500,
    volume: Math.floor(Math.random() * 1000000),
  };
});

export default function CandleChart({ timeframe }: { timeframe: string }) {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <XAxis 
            dataKey="time" 
            hide 
          />
          <YAxis 
            domain={['auto', 'auto']} 
            orientation="right" 
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Bar dataKey="close" barSize={8}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.close > entry.open ? '#ef4444' : '#3b82f6'} />
            ))}
          </Bar>
          <Line 
            type="monotone" 
            dataKey="high" 
            stroke="#9ca3af" 
            strokeWidth={1} 
            dot={false}
            activeDot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
