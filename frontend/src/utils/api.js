import axios from 'axios';

const API_BASE_URL = 'https://quick-poll-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPolls = () => api.get('/polls');
export const fetchPoll = (id) => api.get(`/polls/${id}`);
export const createPoll = (pollData) => api.post('/polls', pollData);
export const vote = (pollId, optionIndex) => api.post(`/polls/${pollId}/vote`, { optionIndex });