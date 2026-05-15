import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import { Home, User, LogOut } from 'lucide-react';
import { cn } from '../utils';

export default function Navbar() {
  const { isLoggedIn, login, logout } = useApp();
  const navigate = useNavigate();

  return (
    <nav className="h-14 bg-white border-b border-gray-200 sticky top-0 z-50 flex items-center justify-between px-6 shrink-0">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold text-brand tracking-tight">Alpha Stream</Link>
          <Link to="/" className="text-sm font-semibold text-gray-800 hover:text-brand transition-colors">
            홈
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          {isLoggedIn ? (
            <div className="flex items-center gap-4 text-gray-600">
              <Link to="/mypage" className="hover:text-brand transition-colors">
                마이페이지
              </Link>
              <div className="w-px h-3 bg-gray-300"></div>
              <button 
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="hover:text-red-500 transition-colors"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-gray-600 hover:text-brand px-3 py-1">로그인</Link>
              <Link to="/login" className="toss-button-primary !py-1.5 !px-4 text-xs">회원가입</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
