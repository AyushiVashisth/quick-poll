import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPolls, vote } from "../utils/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import toast from "react-hot-toast";
import { useSocket } from "../context/SocketContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function PollDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [votedOption, setVotedOption] = useState(null);
  const socket = useSocket();

  useEffect(() => {
    loadPoll();

    if (socket) {
      socket.on("pollsUpdated", () => {
        loadPoll();
      });
    }

    return () => {
      if (socket) {
        socket.off("pollsUpdated");
      }
    };
  }, [socket, id]);

  const loadPoll = async () => {
    try {
      const response = await fetchPolls();
      const currentPoll = response.data.find((p) => p._id === id);

      if (!currentPoll) {
        toast.error("Poll not found");
        navigate("/");
        return;
      }

      setPoll(currentPoll);
    } catch (error) {
      toast.error("Error fetching poll");
      console.error("Error:", error);
    }
  };

  const handleVote = async (optionIndex) => {
    if (votedOption !== null) {
      toast.error("You have already voted");
      return;
    }

    try {
      await vote(id, optionIndex);
      setVotedOption(optionIndex);
      toast.success("Vote recorded successfully!");
      loadPoll();
    } catch (error) {
      toast.error("Error recording vote");
      console.error("Error:", error);
    }
  };

  if (!poll)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  const chartData = {
    labels: poll.options.map((option) => option.text),
    datasets: [
      {
        label: "Votes",
        data: poll.options.map((option) => option.votes),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">{poll.question}</h2>

      <div className="mb-8">
        {poll.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleVote(index)}
            disabled={votedOption !== null}
            className={`w-full p-4 mb-2 text-left rounded ${
              votedOption === index
                ? "bg-blue-100 border-blue-500"
                : "bg-gray-50 hover:bg-gray-100"
            } border transition-colors`}
          >
            <span className="font-medium">{option.text}</span>
            <span className="float-right">{option.votes} votes</span>
          </button>
        ))}
      </div>

      <div className="h-64">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default PollDetails;
