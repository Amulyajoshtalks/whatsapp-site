import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import VideoPlayerPage from './components/VideoPlayerPage';
import { AudioProvider } from './context/AudioContext';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import Stories from './pages/Stories';

function App() {
  return (
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
  );
}
export default App;