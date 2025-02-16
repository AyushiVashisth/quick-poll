import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPolls } from '../utils/api';
import { PlusCircle, Vote, TrendingUp, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const EmptyState = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
    <div className="mb-8">
      <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Vote className="w-12 h-12 text-purple-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">No Polls Yet</h2>
      <p className="text-gray-600 max-w-md mx-auto mb-8">
        Be the first to create a poll and start gathering opinions from your community!
      </p>
    </div>

    <Link
      to="/create"
      className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
    >
      <PlusCircle className="w-5 h-5 mr-2" />
      Create Your First Poll
    </Link>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl w-full">
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
          <TrendingUp className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">Real-time Results</h3>
        <p className="text-gray-600 text-sm">Watch votes come in instantly as participants make their choices</p>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
          <Users className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">Easy Sharing</h3>
        <p className="text-gray-600 text-sm">Share your polls easily with anyone and gather responses quickly</p>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
          <Vote className="w-6 h-6 text-orange-600" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">Multiple Options</h3>
        <p className="text-gray-600 text-sm">Create polls with multiple options to get detailed feedback</p>
      </div>
    </div>
  </div>
);

function PollList() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPolls();
  }, []);

  const loadPolls = async () => {
    try {
      setLoading(true);
      const response = await fetchPolls();
      setPolls(response.data);
    } catch (error) {
      toast.error('Error fetching polls');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (polls.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-6">
      {polls.map((poll) => (
        <Link
          key={poll._id}
          to={`/poll/${poll._id}`}
          className="block bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-4">{poll.question}</h3>
          <div className="text-gray-600">
            {poll.options.length} options · 
            {poll.options.reduce((sum, option) => sum + option.votes, 0)} votes
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PollList;