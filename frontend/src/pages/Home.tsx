import React from "react";

export default function Home() {
  return (
    <div className="min-h-11/12 flex flex-col items-center justify-center  via-gray-900 to-black px-4">
      <h1 className="text-4xl md:text-5xl text-gray-500 font-extrabold text-center">
        Welcome to{" "}
        <span className="text-indigo-500 drop-shadow-md">Shams TV</span> 🎬
      </h1>

      <p className="mt-4 text-lg md:text-xl text-gray-400 text-center max-w-2xl">
        Dive into a world of powerful stories, entertainment, and creativity.
        Your journey starts here.
      </p>
    </div>
  );
}
