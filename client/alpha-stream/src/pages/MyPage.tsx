import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { formatCurrency, formatNumber, cn } from '../utils';
import { User, Wallet, PieChart, Banknote, History, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Link } from 'react-router-dom';

type Tab = 'info' | 'investment' | 'dividend' | 'profit';
type HistoryTab = 'buy' | 'sell' | 'pending';

export default function MyPage() {
  const { isLoggedIn, currentUser, orders, cancelOrder } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('info');
  const [historyTab, setHistoryTab] = useState<HistoryTab>('pending');

  if (!isLoggedIn || !currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-gray-500 font-medium text-lg">로그인이 필요한 페이지입니다.</p>
        <Link to="/login" className="toss-button-primary">로그인 하러가기</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-6 mb-12">
        <div className="w-20 h-20 bg-brand rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-brand/20">
          {currentUser.name[0]}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{currentUser.name}님</h1>
          <p className="text-gray-500 flex items-center gap-1.5 font-medium">
            <Wallet size={16} className="text-gray-400" />
            투자 가능 금액 <span className="text-gray-900 font-bold">{formatCurrency(currentUser.balance)}</span>
          </p>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar scroll-smooth">
        <TabButton active={activeTab === 'info'} onClick={() => setActiveTab('info')} label="내 정보" />
        <TabButton active={activeTab === 'investment'} onClick={() => setActiveTab('investment')} label="투자 내역" />
        <TabButton active={activeTab === 'dividend'} onClick={() => setActiveTab('dividend')} label="배당 관리" />
        <TabButton active={activeTab === 'profit'} onClick={() => setActiveTab('profit')} label="수익 분석" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'info' && (
            <div className="toss-card p-8 flex flex-col gap-6">
              <InfoItem label="이메일" value={currentUser.email} />
              <InfoItem label="계좌번호" value="KB증권 123-456-789012" />
              <InfoItem label="보안 등급" value="최상 (OTP 사용 중)" />
            </div>
          )}

          {activeTab === 'investment' && (
            <div>
              <div className="flex h-9 bg-gray-100 rounded-lg p-1 w-fit mb-6">
                <button 
                  onClick={() => setHistoryTab('buy')}
                  className={cn("px-4 py-1 rounded-md text-xs font-bold transition-all", historyTab === 'buy' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500")}
                >매수</button>
                <button 
                  onClick={() => setHistoryTab('sell')}
                  className={cn("px-4 py-1 rounded-md text-xs font-bold transition-all", historyTab === 'sell' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500")}
                >매도</button>
                <button 
                  onClick={() => setHistoryTab('pending')}
                  className={cn("px-4 py-1 rounded-md text-xs font-bold transition-all", historyTab === 'pending' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500")}
                >대기</button>
              </div>

              <div className="toss-card overflow-hidden">
                {historyTab === 'pending' ? (
                  orders.length > 0 ? (
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 text-gray-400 font-bold uppercase border-b border-gray-100">
                        <tr>
                          <th className="px-6 py-3">구분</th>
                          <th className="px-6 py-3">종목</th>
                          <th className="px-6 py-3 text-right">가격</th>
                          <th className="px-6 py-3 text-right">수량</th>
                          <th className="px-6 py-3 text-right">관리</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {orders.map(order => (
                          <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 font-bold">
                              <span className={order.type === 'buy' ? "text-up" : "text-down"}>
                                {order.type === 'buy' ? '매수' : '매도'}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-bold text-gray-900 uppercase">{order.stockId}</td>
                            <td className="px-6 py-4 text-right font-bold">{formatNumber(order.price)}</td>
                            <td className="px-6 py-4 text-right font-bold text-gray-600">{order.quantity}주</td>
                            <td className="px-6 py-4 text-right">
                              <button onClick={() => cancelOrder(order.id)} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-500 transition-all">
                                <X size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="py-20 text-center text-gray-400 font-medium text-xs">대기 중인 주문이 없습니다.</div>
                  )
                ) : (
                  <div className="py-20 text-center text-gray-400 font-medium text-xs">투자 내역이 없습니다.</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'dividend' && (
            <div className="toss-card p-12 text-center text-gray-400 font-medium italic text-xs">
              예정된 배당 정보가 아직 없습니다.
            </div>
          )}

          {activeTab === 'profit' && (
            <div className="toss-card p-8">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h3 className="text-gray-400 text-xs font-bold mb-1 truncate uppercase">총 수익률</h3>
                  <p className="text-3xl font-black text-up">+12.4%</p>
                </div>
                <div className="text-right">
                  <h3 className="text-gray-400 text-xs font-bold mb-1 truncate uppercase">평가 손익</h3>
                  <p className="text-xl font-bold text-up">+{formatCurrency(1240000)}</p>
                </div>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden flex">
                <div className="h-full bg-up w-[70%] rounded-r-full" />
                <div className="h-full bg-gray-200 w-[30%]" />
              </div>
              <div className="mt-4 flex justify-between text-[10px] text-gray-400 font-bold uppercase">
                <span>실현 손익: +980,000원</span>
                <span>미실현 손익: +260,000원</span>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function TabButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-4 border-b-2 transition-all whitespace-nowrap font-bold text-sm",
        active ? "border-brand text-brand" : "border-transparent text-gray-400 hover:text-gray-600"
      )}
    >
      {label}
    </button>
  );
}

function InfoItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between group">
      <span className="text-gray-400 font-medium">{label}</span>
      <span className="text-gray-900 font-bold group-hover:text-brand transition-colors underline underline-offset-4 decoration-gray-100">{value}</span>
    </div>
  );
}
