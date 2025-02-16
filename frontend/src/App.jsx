import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import CreatePoll from './components/CreatePoll';
import PollList from './components/PollList';
import PollDetails from './components/PollDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<PollList />} />
            <Route path="/create" element={<CreatePoll />} />
            <Route path="/poll/:id" element={<PollDetails />} />
          </Routes>
        </main>
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;