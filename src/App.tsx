import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NeighborhoodList from './pages/NeighborhoodList';
import NeighborhoodDetail from './pages/NeighborhoodDetail';
import Quiz from './pages/Quiz';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<NeighborhoodList />} />
        <Route path="/neighborhood/:id" element={<NeighborhoodDetail />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  );
}
