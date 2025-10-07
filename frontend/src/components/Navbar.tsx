import { Moon, Sun } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ toggleDark }) {
  return (
    <nav className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 shadow">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
        Shams TV
      </h1>
      <button onClick={toggleDark} className="p-2">
        <ThemeToggle />
      </button>
    </nav>
  );
}
