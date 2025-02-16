import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPoll } from '../utils/api';
import toast from 'react-hot-toast';

function CreatePoll() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim() || options.some(opt => !opt.trim())) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const pollData = {
        question,
        options: options.filter(opt => opt.trim())
      };

      const response = await createPoll(pollData);
      toast.success('Poll created successfully!');
      navigate(`/poll/${response.data._id}`);
    } catch (error) {
      toast.error('Error creating poll');
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Create a New Poll</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your question"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Options</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder={`Option ${index + 1}`}
            />
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="mt-2 text-blue-500 hover:text-blue-600"
          >
            + Add Option
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Poll
        </button>
      </form>
    </div>
  );
}

export default CreatePoll;