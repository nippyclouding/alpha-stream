import React from 'react';

export default function Footer() {
  return (
    <footer className="h-12 bg-white border-t border-gray-100 flex items-center justify-between px-6 shrink-0 mt-auto">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4">
        <div className="flex space-x-4 text-[10px] text-gray-400 font-medium tracking-tight">
          <span className="hover:text-gray-600 cursor-pointer">이용약관</span>
          <span className="hover:text-gray-600 cursor-pointer">개인정보처리방침</span>
          <span className="hover:text-gray-600 cursor-pointer">투자유의사항</span>
        </div>
        <div className="text-[10px] text-gray-400 font-medium">
          장 운영 시간: 09:00 ~ 15:30 (Alpha Stream)
        </div>
      </div>
    </footer>
  );
}
