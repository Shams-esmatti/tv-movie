import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";

export default function GenresList() {
  const data = useContext(DataContext);
  const { genres, deleteGenre } = data!;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Genres
      </h2>
      <Link
        to="/genres/new"
        className="inline-block mb-2 bg-green-500 text-white px-3 py-1 rounded"
      >
        + New Genre
      </Link>
      <ul>
        {genres.map((g) => (
          <li
            key={g.id}
            className="flex justify-between p-2 bg-white dark:bg-gray-700 mb-2 rounded"
          >
            <span className="text-gray-900 dark:text-gray-100">{g.name}</span>
            <span>
              <Link to={`/genres/${g.id}/edit`} className="text-blue-600 mr-2">
                Edit
              </Link>
              <button
                onClick={() => deleteGenre(g.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
