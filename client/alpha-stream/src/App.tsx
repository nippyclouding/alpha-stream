/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans selection:bg-brand/10 selection:text-brand">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/stock/:stockId" element={<DetailPage />} />
              <Route path="/mypage" element={<MyPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}
