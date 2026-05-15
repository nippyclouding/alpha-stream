import React, { useState } from 'react';
import { Stock, Order } from '../types';
import { useApp } from '../AppContext';
import { formatCurrency, formatNumber, cn } from '../utils';
import { Trash2, Edit3, AlertCircle } from 'lucide-react';

interface TradingPanelProps {
  stock: Stock;
}

type Mode = 'buy' | 'sell' | 'pending';

export default function TradingPanel({ stock }: TradingPanelProps) {
  const { placeOrder, orders, cancelOrder, currentUser } = useApp();
  const [mode, setMode] = useState<Mode>('buy');
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit');
  const [price, setPrice] = useState(stock.currentPrice.toString());
  const [quantity, setQuantity] = useState('0');

  const totalPrice = Number(price) * Number(quantity);
  const upperLimit = stock.prevClose * 1.3;
  const lowerLimit = stock.prevClose * 0.7;

  const handleOrder = () => {
    if (Number(quantity) <= 0) return;
    placeOrder({
      stockId: stock.id,
      type: mode as 'buy' | 'sell',
      orderType,
      price: Number(price),
      quantity: Number(quantity),
    });
    setQuantity('0');
  };

  const setPercentage = (pct: number) => {
    if (!currentUser) return;
    if (mode === 'buy') {
      const maxQty = Math.floor((currentUser.balance * pct) / Number(price));
      setQuantity(maxQty.toString());
    } else {
      setQuantity('100'); // Mock sell max
    }
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden shadow-sm">
      <div className="flex h-10 mb-4 bg-gray-100 rounded-xl p-1 mx-5 mt-5">
        <button 
          onClick={() => setMode('buy')}
          className={cn(
            "flex-1 rounded-lg text-sm font-bold transition-all",
            mode === 'buy' ? "bg-white text-up" : "text-gray-500 hover:text-gray-700"
          )}
        >매수</button>
        <button 
          onClick={() => setMode('sell')}
          className={cn(
            "flex-1 rounded-lg text-sm font-bold transition-all",
            mode === 'sell' ? "bg-white text-down" : "text-gray-500 hover:text-gray-700"
          )}
        >매도</button>
        <button 
          onClick={() => setMode('pending')}
          className={cn(
            "flex-1 rounded-lg text-sm font-bold transition-all",
            mode === 'pending' ? "bg-white text-gray-900" : "text-gray-500 hover:text-gray-700"
          )}
        >대기</button>
      </div>

      <div className="p-5 flex-1 flex flex-col overflow-y-auto no-scrollbar">
        {mode === 'pending' ? (
          <div className="flex flex-col gap-4">
            {orders.length > 0 ? (
              orders.map(order => (
                <div key={order.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/30 flex items-center justify-between group">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn(
                        "text-[10px] font-black px-1.5 py-0.5 rounded uppercase",
                        order.type === 'buy' ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                      )}>
                        {order.type === 'buy' ? '매수' : '매도'}
                      </span>
                      <span className="text-xs font-bold text-gray-900">{formatNumber(order.price)}원</span>
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium">{order.quantity}주 · {order.orderType === 'limit' ? '지정가' : '시장가'}</span>
                  </div>
                  <div className="flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => cancelOrder(order.id)}
                      className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center flex flex-col items-center gap-2">
                <p className="text-gray-400 font-medium italic text-xs">대기 중인 주문이 없습니다.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex space-x-2 mb-2">
              <button 
                onClick={() => setOrderType('limit')}
                className={cn(
                  "flex-1 py-2 text-xs font-bold rounded-lg transition-all border",
                  orderType === 'limit' ? "border-brand text-brand bg-brand/5" : "bg-gray-50 text-gray-400 border-transparent"
                )}
              >지정가</button>
              <button 
                onClick={() => setOrderType('market')}
                className={cn(
                  "flex-1 py-2 text-xs font-bold rounded-lg transition-all border",
                  orderType === 'market' ? "border-brand text-brand bg-brand/5" : "bg-gray-50 text-gray-400 border-transparent"
                )}
              >시장가</button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-500 font-medium ml-1">{mode === 'buy' ? '매수' : '매도'}가격 (원)</label>
                <div className={cn(
                  "flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 transition-all focus-within:border-brand",
                  orderType === 'market' && "opacity-50"
                )}>
                  <input 
                    type="number" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-transparent w-full font-bold text-lg outline-none text-gray-900"
                    readOnly={orderType === 'market'}
                  />
                  <span className="text-xs text-gray-400 font-bold ml-2">원</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-500 font-medium ml-1">주문수량 (주)</label>
                <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 transition-all focus-within:border-brand">
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)}
                    className="bg-transparent w-full font-bold text-lg outline-none text-gray-900"
                    placeholder="0"
                  />
                  <span className="text-xs text-gray-400 font-bold ml-2">주</span>
                </div>
                <div className="grid grid-cols-4 gap-1 mt-2">
                  {[10, 25, 50, 100].map(p => (
                    <button 
                      key={p} 
                      onClick={() => setPercentage(p/100)}
                      className="py-1.5 bg-gray-100 hover:bg-gray-200 text-[10px] font-bold text-gray-500 rounded transition-colors"
                    >
                      {p === 100 ? '최대' : `${p}%`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-dashed border-gray-200 mt-4">
              <div className="flex justify-between text-sm mb-2 text-gray-500 font-medium">
                <span>{mode === 'buy' ? '매수 가능' : '매도 가능'}</span>
                <span className="font-bold text-gray-900">
                  {mode === 'buy' ? formatCurrency(currentUser?.balance || 0) : '1,000주'}
                </span>
              </div>
              <div className="flex justify-between text-sm mb-6">
                <span className="text-gray-500 font-medium">총 주문금액</span>
                <span className={cn("font-bold text-xl", mode === 'buy' ? "text-up" : "text-down")}>
                  {formatCurrency(totalPrice)}
                </span>
              </div>
              <button 
                onClick={handleOrder}
                disabled={Number(quantity) <= 0}
                className={cn(
                  "w-full py-4 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 disabled:grayscale disabled:opacity-50",
                  mode === 'buy' ? "bg-up shadow-red-100" : "bg-down shadow-blue-100"
                )}
              >
                {mode === 'buy' ? '매수하기' : '매도하기'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ModeTab({ active, onClick, label, color }: { active: boolean, onClick: () => void, label: string, color: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex-1 py-4 text-sm font-black transition-all border-b-2",
        active ? color : "text-gray-400 border-transparent hover:text-gray-600"
      )}
    >
      {label}
    </button>
  );
}

function InputGroup({ label, value, onChange, suffix, readOnly }: { label: string, value: string, onChange: (v: string) => void, suffix: string, readOnly?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs text-gray-400 font-bold ml-1">{label}</span>
      <div className={cn("relative flex items-center bg-gray-50 rounded-xl overflow-hidden px-4 py-3 border-2 transition-all group-focus-within:border-brand", readOnly ? "bg-gray-100 opacity-60" : "bg-gray-50")}>
        <input 
          type="number" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent outline-none flex-1 text-base font-black text-gray-900 group"
          placeholder="0"
          readOnly={readOnly}
        />
        <span className="text-sm font-bold text-gray-400">{suffix}</span>
      </div>
    </div>
  );
}
