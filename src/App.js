import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import VideoPlayerPage from './components/VideoPlayerPage';
import { AudioProvider } from './context/AudioContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import Home from './pages/Home';
import Stories from './pages/Stories';
import ASSETS_PATHS from "./storiesAssets";

function App() {
  useEffect(() => {
    const warmCache = () => {
      try {
        const img = new Image();
        img.src = ASSETS_PATHS.background;
      } catch {
        // ignore
      }
    };
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(warmCache, { timeout: 2000 });
    } else {
      setTimeout(warmCache, 800);
    }
  }, []);

  return (
    <ToastProvider>
      <AudioProvider>
        <LanguageProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/success-stories" element={<Stories />} />
                <Route path="/video-player" element={<VideoPlayerPage />} />
              </Routes>
            </Layout>
          </Router>
        </LanguageProvider>
      </AudioProvider>
    </ToastProvider>
  );
}
export default App;