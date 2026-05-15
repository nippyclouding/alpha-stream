import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../AppContext';
import { formatCurrency, formatNumber, formatCompactNumber, cn } from '../utils';
import CandleChart from '../components/CandleChart';
import ExecutionHistory from '../components/ExecutionHistory';
import OrderBook from '../components/OrderBook';
import TradingPanel from '../components/TradingPanel';
import { ChevronLeft, Info, TrendingUp, BarChart, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DetailPage() {
  const { stockId } = useParams();
  const { stocks } = useApp();
  const stock = stocks.find(s => s.id === stockId);
  const [timeframe, setTimeframe] = useState('일');

  if (!stock) return <div className="text-center py-20 font-bold text-gray-500">종목을 찾을 수 없습니다.</div>;

  return (
    <div className="h-[calc(100vh-56px-48px)] flex flex-col overflow-hidden bg-bg-sleek">
      {/* 상단 종목 정보 바 - 고정 높이 */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900 leading-none">{stock.name}</h1>
            <div className="flex items-baseline gap-2">
              <span className={cn(
                "text-2xl font-black tracking-tight",
                stock.changeRate >= 0 ? "text-up" : "text-down"
              )}>{formatNumber(stock.currentPrice)}</span>
              <span className={cn(
                "text-sm font-bold",
                stock.changeRate >= 0 ? "text-up" : "text-down"
              )}>
                {stock.changeRate >= 0 ? '▲' : '▼'}{Math.abs(stock.changeValue).toLocaleString()} ({stock.changeRate.toFixed(2)}%)
              </span>
            </div>
          </div>
          <div className="h-4 w-px bg-gray-200"></div>
          <div className="flex gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold uppercase leading-none mb-1">거래대금</span>
              <span className="text-sm font-bold text-gray-700 leading-none">{formatCompactNumber(stock.transactionAmount)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold uppercase leading-none mb-1">거래량</span>
              <span className="text-sm font-bold text-gray-700 leading-none">{formatNumber(stock.volume)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
          {['차트·호가', '종목정보', '배당금', '공시'].map((tab, i) => (
            <button key={tab} className={cn(
              "px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
              i === 0 ? "bg-white text-brand shadow-sm" : "text-gray-400 hover:text-gray-600"
            )}>{tab}</button>
          ))}
        </div>
      </div>

      {/* 메인 콘텐츠 영역 - 가로 3단 그리드 (좌/중/우) */}
      <div className="flex-1 min-h-0 p-4">
        <div className="flex flex-row gap-4 h-full">
          
          {/* 1열 (좌측): 차트(상단) + 실시간 체결 내역(하단) */}
          <div className="flex-[1.5] flex flex-col gap-4 min-w-0 h-full">
            <div className="toss-card flex-[0.6] min-h-0 flex flex-col">
              <div className="flex justify-between items-center px-4 py-2.5 border-b border-gray-50 bg-white shrink-0">
                <div className="flex gap-1">
                  {['분', '시간', '일', '주', '월', '년'].map(tf => (
                    <button 
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={cn(
                        "px-2.5 py-1 text-[11px] font-bold rounded-md transition-all",
                        timeframe === tf ? "bg-gray-100 text-gray-900" : "text-gray-400"
                      )}
                    >{tf}</button>
                  ))}
                </div>
                <span className="text-[10px] text-gray-300 font-bold">실시간 차트</span>
              </div>
              <div className="flex-1 min-h-0 p-3">
                <CandleChart timeframe={timeframe} />
              </div>
            </div>
            <div className="toss-card flex-[0.4] min-h-0 p-4 flex flex-col overflow-hidden">
              <ExecutionHistory />
            </div>
          </div>

          {/* 2열 (중앙): 호가창 */}
          <div className="flex-1 toss-card flex flex-col min-w-0 h-full overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between shrink-0 bg-white">
              <h3 className="text-sm font-bold text-gray-900">호가</h3>
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <OrderBook stock={stock} />
            </div>
          </div>

          {/* 3열 (우측): 주문 패널 */}
          <div className="flex-[0.9] flex flex-col gap-4 min-w-0 h-full">
            <div className="flex-1 toss-card overflow-hidden">
              <TradingPanel stock={stock} />
            </div>
            <div className="p-3 bg-white/60 rounded-2xl border border-white flex items-start gap-2 shadow-sm shrink-0">
              <Info className="text-brand shrink-0 mt-0.5" size={14} />
              <p className="text-[10px] text-gray-500 leading-tight font-medium">
                지정가 주문은 체결 전까지 대기 상태로 유지됩니다.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


function InfoStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mb-0.5">{label}</span>
      <span className="text-sm font-bold text-gray-700">{value}</span>
    </div>
  )
}

