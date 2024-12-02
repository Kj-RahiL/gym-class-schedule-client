"use client"
import { motion } from 'framer-motion';

const DashboardHome = () => {
  return (
    <div className="relative w-full h-screen bg-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: `url('https://your-background-image-url.com')`, // Replace with your image URL
        }}
      ></div>

      {/* Overlay Content */}
      <div className="relative flex flex-col justify-center items-center h-full space-y-6 text-center px-4 md:px-8 lg:px-16">
        <motion.h1
          className="text-4xl md:text-6xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="text-blue-500">Gym Class Management</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          Manage your classes, trainers, and schedules effortlessly with our modern and user-friendly platform.
        </motion.p>
        <motion.button
          className="px-6 py-3 bg-blue-600  text-white font-semibold rounded-md shadow hover:bg-blue-600 transition duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
};

export default DashboardHome;
