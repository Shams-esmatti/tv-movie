import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-4 space-y-2 dark:text-white">
      <ul>
        <li>
          <Link
            className="block p-2 rounded dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="block p-2 rounded dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
            to="/genres"
          >
            Genres
          </Link>
        </li>
        <li>
          <Link
            className="block p-2 rounded dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
            to="/movies"
          >
            Movies
          </Link>
        </li>
      </ul>
    </aside>
  );
}
