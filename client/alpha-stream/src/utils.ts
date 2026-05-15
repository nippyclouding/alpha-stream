import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('ko-KR').format(value);
}

export function formatCompactNumber(value: number) {
  if (value >= 100000000) {
    return `${(value / 100000000).toFixed(1)}억`;
  }
  if (value >= 10000) {
    return `${(value / 10000).toFixed(1)}만`;
  }
  return formatNumber(value);
}

export function isMarketOpen() {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  // Monday to Friday (1-5)
  // 09:00 (540 mins) to 15:30 (930 mins)
  const startTime = 9 * 60;
  const endTime = 15 * 60 + 30;

  return day >= 1 && day <= 5 && totalMinutes >= startTime && totalMinutes <= endTime;
}

export function getTimeRemaining() {
  const now = new Date();
  const endTime = new Date();
  endTime.setHours(15, 30, 0, 0);
  
  const diff = endTime.getTime() - now.getTime();
  if (diff <= 0) return '장 마감';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `장 마감까지 ${hours}시간 ${minutes}분`;
}
