import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import { cn } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ShieldCheck, ArrowRight } from 'lucide-react';

type AuthMode = 'login' | 'signup';

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const { login } = useApp();
  const navigate = useNavigate();

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup Form States
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [confirmAccountPassword, setConfirmAccountPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      login({ name: loginEmail.split('@')[0], email: loginEmail });
      navigate('/');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountPassword !== confirmAccountPassword) {
      alert('계좌 비밀번호가 일치하지 않습니다.');
      return;
    }
    if (accountPassword.length !== 4 || isNaN(Number(accountPassword))) {
      alert('계좌 비밀번호는 숫자 4자리여야 합니다.');
      return;
    }
    
    // Simulate signup success and auto-login
    login({ name: signupName, email: signupEmail });
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="p-8 pb-4">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Alpha Stream</h2>
          <p className="text-gray-400 font-bold text-xs mt-1 uppercase tracking-tighter">Next-Gen Trading Infrastructure</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex px-8 border-b border-gray-100">
          <button 
            onClick={() => setMode('login')}
            className={cn(
              "flex-1 py-4 text-sm font-bold transition-all relative",
              mode === 'login' ? "text-brand" : "text-gray-400 hover:text-gray-600"
            )}
          >
            로그인
            {mode === 'login' && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />}
          </button>
          <button 
            onClick={() => setMode('signup')}
            className={cn(
              "flex-1 py-4 text-sm font-bold transition-all relative",
              mode === 'signup' ? "text-brand" : "text-gray-400 hover:text-gray-600"
            )}
          >
            회원가입
            {mode === 'signup' && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />}
          </button>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <motion.form 
                key="login"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <InputField 
                  icon={<Mail size={18} />}
                  label="이메일"
                  type="email"
                  placeholder="name@company.com"
                  value={loginEmail}
                  onChange={setLoginEmail}
                />
                <InputField 
                  icon={<Lock size={18} />}
                  label="비밀번호"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={setLoginPassword}
                />
                <button type="submit" className="toss-button-primary w-full h-12 flex items-center justify-center gap-2 mt-6">
                  로그인 <ArrowRight size={16} />
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="signup"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onSubmit={handleSignup}
                className="space-y-4"
              >
                <InputField 
                  icon={<User size={18} />}
                  label="이름"
                  type="text"
                  placeholder="실명을 입력해주세요"
                  value={signupName}
                  onChange={setSignupName}
                />
                <InputField 
                  icon={<Mail size={18} />}
                  label="이메일"
                  type="email"
                  placeholder="member_email@example.com"
                  value={signupEmail}
                  onChange={setSignupEmail}
                />
                <InputField 
                  icon={<Lock size={18} />}
                  label="비밀번호"
                  type="password"
                  placeholder="member_password"
                  value={signupPassword}
                  onChange={setSignupPassword}
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField 
                    icon={<ShieldCheck size={18} />}
                    label="계좌 비밀번호"
                    type="password"
                    maxLength={4}
                    placeholder="4자리 숫자"
                    value={accountPassword}
                    onChange={setAccountPassword}
                  />
                  <InputField 
                    icon={<ShieldCheck size={18} />}
                    label="비밀번호 확인"
                    type="password"
                    maxLength={4}
                    placeholder="다시 한번"
                    value={confirmAccountPassword}
                    onChange={setConfirmAccountPassword}
                  />
                </div>
                <button type="submit" className="toss-button-primary w-full h-12 flex items-center justify-center gap-2 mt-6">
                  회원가입 완료 <ArrowRight size={16} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-center text-[11px] text-gray-400 mt-8 font-medium">
            계속 진행함으로써 Alpha Stream의 이용약관 및 개인정보 처리방침에 동의하게 됩니다.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function InputField({ 
  icon, 
  label, 
  type, 
  placeholder, 
  value, 
  onChange, 
  maxLength 
}: { 
  icon: React.ReactNode, 
  label: string, 
  type: string, 
  placeholder: string,
  value: string,
  onChange: (val: string) => void,
  maxLength?: number
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-black text-gray-400 uppercase tracking-tighter pl-1">{label}</label>
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-300">
          {icon}
        </div>
        <input 
          type={type}
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-brand/30 focus:ring-4 focus:ring-brand/5 transition-all"
          required
        />
      </div>
    </div>
  );
}
