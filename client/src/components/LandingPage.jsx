import React from "react";
import { FaBook, FaChartLine, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20">
        <div className="md:w-1/2">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Track Your Japanese Learning <br /> Like a Pro
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Manage your JLPT study sessions, track progress, and achieve your
            goals efficiently.
          </p>
          <div className="flex gap-4">
            <Link
              to="/register"
              className="bg-white text-purple-600 font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border border-white font-bold py-3 px-6 rounded-xl hover:bg-white hover:text-purple-600 transition"
            >
              Login
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center items-center">
          <span className="text-6xl md:text-8xl font-bold animate-bounce text-white">
            改善
          </span>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 md:px-20 bg-gray-50 text-gray-800">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-3xl shadow-xl text-center hover:scale-105 transition-transform">
            <FaBook className="text-purple-600 mx-auto text-5xl mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Organize Study Logs</h3>
            <p>
              Record daily study sessions and notes to keep track of your
              learning.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl text-center hover:scale-105 transition-transform">
            <FaClock className="text-purple-600 mx-auto text-5xl mb-6" />
            <h3 className="text-2xl font-semibold mb-4">
              Track Time Efficiently
            </h3>
            <p>
              Monitor how much time you spend on each JLPT category to optimize
              learning.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl text-center hover:scale-105 transition-transform">
            <FaChartLine className="text-purple-600 mx-auto text-5xl mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Visualize Progress</h3>
            <p>
              Charts and stats help you see your improvement and stay motivated.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-purple-600 text-white py-20 px-8 md:px-20 text-center rounded-t-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Start Your JLPT Journey Today!
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Sign up and take control of your Japanese learning.
        </p>
        <Link
          to="/register"
          className="bg-white text-purple-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        &copy; 2025 JLPT Study Tracker. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
