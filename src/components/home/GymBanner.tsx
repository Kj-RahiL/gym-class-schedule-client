"use client"
import { motion } from "framer-motion";
import bgLogin from "../../../public/assets/cover.jpg";

const GymBanner = () => {
  return (
    <div
      className="relative bg-cover bg-center text-white h-screen flex items-center justify-center overflow-hidden rounded-lg shadow-lg w-full"
      style={{ backgroundImage: `url(${bgLogin.src})` }}
    >
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-90" />

      {/* Animated Circles */}
      <motion.div
        className="absolute w-96 h-96 bg-white opacity-10 rounded-full -top-20 -left-20 blur-3xl"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -50, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-white opacity-10 rounded-full -bottom-20 -right-20 blur-3xl"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 40, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />

      {/* Banner Content */}
      <motion.div
        className="relative text-center px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
          Gym Class Scheduling Made Simple
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 drop-shadow-md">
          Efficiently manage trainers, trainees, and classes all in one place.
        </p>
        <motion.button
          className="mt-8 px-8 py-3 bg-[#13ffaa] rounded-full shadow-md text-black font-medium hover:bg-[#10e69a]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default GymBanner;
