import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import { formatCurrency, formatCompactNumber, isMarketOpen, getTimeRemaining, cn } from '../utils';
import MiniCandleChart from '../components/MiniCandleChart';
import { Clock, TrendingUp, BarChart3, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type SortType = 'registration' | 'amount' | 'volume';

export default function MainPage() {
  const { stocks } = useApp();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortType>('registration');
  const marketOpen = isMarketOpen();

  const sortedStocks = useMemo(() => {
    return [...stocks].sort((a, b) => {
      if (sortBy === 'amount') return b.transactionAmount - a.transactionAmount;
      if (sortBy === 'volume') return b.volume - a.volume;
      return new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime();
    });
  }, [stocks, sortBy]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Market Status Banner */}
      <div className={cn(
        "mb-8 p-6 rounded-2xl flex items-center justify-between shadow-sm border border-white",
        marketOpen ? "bg-white text-brand" : "bg-white text-gray-400"
      )}>
        <div className="flex items-center gap-3">
          <div className={cn("w-2 h-2 rounded-full animate-pulse", marketOpen ? "bg-up" : "bg-gray-300")} />
          <span className="font-bold text-lg text-gray-900">
            {marketOpen ? "국내 장 운영 중" : "국내 장 마감"}
          </span>
          <span className="text-sm font-medium text-gray-400 border-l border-gray-200 pl-3">
            09:00 ~ 15:30
          </span>
        </div>
        <div className="flex items-center gap-2 font-semibold text-gray-600 text-sm">
          <Clock size={16} />
          {getTimeRemaining()}
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">실시간 인기 종목</h2>
        <div className="flex bg-gray-200/50 p-1 rounded-xl">
          <button 
            onClick={() => setSortBy('registration')}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
              sortBy === 'registration' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            등록일순
          </button>
          <button 
            onClick={() => setSortBy('amount')}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
              sortBy === 'amount' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            거래대금순
          </button>
          <button 
            onClick={() => setSortBy('volume')}
            className={cn(
              "px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
              sortBy === 'volume' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            거래량순
          </button>
        </div>
      </div>

      <div className="toss-card overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 text-xs text-gray-400 font-medium uppercase tracking-wider">
              <th className="px-6 py-4">종목</th>
              <th className="px-6 py-4 text-right">현재가</th>
              <th className="px-6 py-4 text-right">등락률</th>
              <th className="px-6 py-4 text-right">당일 거래량</th>
              <th className="px-6 py-4 text-right">당일 거래대금</th>
              <th className="px-6 py-4 text-right">차트</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sortedStocks.map((stock) => (
              <tr 
                key={stock.id}
                onClick={() => navigate(`/stock/${stock.id}`)}
                className="group cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 group-hover:text-brand">{stock.name}</span>
                    <span className="text-xs text-gray-400 font-mono tracking-tight">{stock.symbol}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right font-medium">
                  {formatCurrency(stock.currentPrice)}
                </td>
                <td className={cn(
                  "px-6 py-5 text-right font-bold",
                  stock.changeRate >= 0 ? "text-up" : "text-down"
                )}>
                  {stock.changeRate >= 0 ? '+' : ''}{stock.changeRate.toFixed(2)}%
                </td>
                <td className="px-6 py-5 text-right text-gray-600 font-medium whitespace-nowrap">
                  {formatCompactNumber(stock.volume)}주
                </td>
                <td className="px-6 py-5 text-right text-gray-600 font-medium whitespace-nowrap">
                  {formatCompactNumber(stock.transactionAmount)}
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end">
                    <MiniCandleChart stock={stock} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
