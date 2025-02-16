import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Quick Poll
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/create"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Create Poll
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;