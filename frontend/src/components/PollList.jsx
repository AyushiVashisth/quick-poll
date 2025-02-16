import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPolls } from '../utils/api';
import toast from 'react-hot-toast';

function PollList() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    loadPolls();
  }, []);

  const loadPolls = async () => {
    try {
      const response = await fetchPolls();
      setPolls(response.data);
    } catch (error) {
      toast.error('Error fetching polls');
      console.error('Error:', error);
    }
  };

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