import React from 'react';
import { Stock } from '../types';
import { formatCurrency, formatNumber, formatCompactNumber, cn } from '../utils';

interface OrderBookProps {
  stock: Stock;
}

export default function OrderBook({ stock }: OrderBookProps) {
  // Generate mock order book data around current price
  const basePrice = Math.floor(stock.currentPrice / 100) * 100;
  const steps = 8;
  const sellOrders = Array.from({ length: steps }).map((_, i) => ({
    price: basePrice + (steps - i) * 100,
    qty: Math.floor(Math.random() * 50000)
  }));
  const buyOrders = Array.from({ length: steps }).map((_, i) => ({
    price: basePrice - (i + 1) * 100,
    qty: Math.floor(Math.random() * 50000)
  }));

  const upperLimit = stock.prevClose * 1.3;
  const lowerLimit = stock.prevClose * 0.7;

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
        {/* Sell Orders */}
        <div className="flex flex-col-reverse divide-y divide-white divide-y-reverse">
          {sellOrders.map((order, i) => (
            <div key={`sell-${i}`} className="h-9 flex items-center group relative cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex-1 h-full flex items-center justify-end px-3 bg-[#F5F9FF]">
                <div 
                  className="absolute right-[50%] h-[70%] bg-[#D0E3FF] transition-all origin-right rounded-l-sm" 
                  style={{ width: `${Math.min((order.qty / 50000) * 45, 45)}%` }}
                />
                <span className="text-[11px] font-bold text-blue-600 relative z-10">{formatNumber(order.qty)}</span>
              </div>
              <div className="w-[120px] h-full flex flex-col items-center justify-center border-x border-gray-100 bg-[#F5F9FF] group-hover:bg-blue-50 transition-colors">
                <span className="text-xs font-extrabold text-blue-600">{formatNumber(order.price)}</span>
                <span className="text-[9px] font-bold text-blue-400">+{((order.price / stock.prevClose - 1) * 100).toFixed(2)}%</span>
              </div>
              <div className="flex-1 h-full bg-white" />
            </div>
          ))}
        </div>

        {/* Current Price Bar */}
        <div className="h-11 sticky top-0 bottom-0 z-20 flex items-center border-y border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <div className="flex-1 h-full flex items-center justify-end px-3 bg-gray-50/50">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">현재 체결가</span>
          </div>
          <div className="w-[120px] h-full flex flex-col items-center justify-center border-x border-gray-100 bg-white">
            <span className={cn(
              "text-sm font-black",
              stock.changeRate >= 0 ? "text-up" : "text-down"
            )}>{formatNumber(stock.currentPrice)}</span>
          </div>
          <div className="flex-1 h-full flex items-center px-3 bg-gray-50/50">
            <span className={cn(
              "text-[10px] font-bold",
              stock.changeRate >= 0 ? "text-up" : "text-down"
            )}>
              {stock.changeRate >= 0 ? '▲' : '▼'}{Math.abs(stock.changeValue).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Buy Orders */}
        <div className="flex flex-col divide-y divide-white">
          {buyOrders.map((order, i) => (
            <div key={`buy-${i}`} className="h-9 flex items-center group relative cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex-1 h-full bg-white" />
              <div className="w-[120px] h-full flex flex-col items-center justify-center border-x border-gray-100 bg-[#FFF5F5] group-hover:bg-red-50 transition-colors">
                <span className="text-xs font-extrabold text-red-600">{formatNumber(order.price)}</span>
                <span className="text-[9px] font-bold text-red-400">{((order.price / stock.prevClose - 1) * 100).toFixed(2)}%</span>
              </div>
              <div className="flex-1 h-full flex items-center justify-start px-3 bg-[#FFF5F5]">
                <div 
                  className="absolute left-[50%] h-[70%] bg-[#FFD5D5] transition-all origin-left rounded-r-sm" 
                  style={{ width: `${Math.min((order.qty / 50000) * 45, 45)}%` }}
                />
                <span className="text-[11px] font-bold text-red-600 relative z-10">{formatNumber(order.qty)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Info Footer */}
      <div className="p-4 grid grid-cols-2 gap-x-6 gap-y-2 bg-gray-50 border-t border-gray-100 shrink-0">
        <div className="flex justify-between items-center text-[10px] font-bold">
          <span className="text-gray-400">시가</span>
          <span className="text-gray-700">{formatNumber(stock.open)}</span>
        </div>
        <div className="flex justify-between items-center text-[10px] font-bold">
          <span className="text-gray-400">고가</span>
          <span className="text-up">{formatNumber(stock.high)}</span>
        </div>
        <div className="flex justify-between items-center text-[10px] font-bold">
          <span className="text-gray-400">전일종가</span>
          <span className="text-gray-700">{formatNumber(stock.prevClose)}</span>
        </div>
        <div className="flex justify-between items-center text-[10px] font-bold">
          <span className="text-gray-400">저가</span>
          <span className="text-down">{formatNumber(stock.low)}</span>
        </div>
      </div>
    </div>
  );
}
