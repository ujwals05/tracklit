import { motion } from "framer-motion";
import { Github } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0f19] text-gray-200 p-6">
      {/* HEADER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        {/* Logo */}
        <img
          src="/tracklit-logo.png"
          alt="TrackLit Logo"
          className="mx-auto sm:w-72 sm:h-40 mb-4 object-contain"
        />

        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          <strong className="text-blue-400">TrackLit</strong> helps you take
          complete control of your finances with smart expense tracking,
          budgeting tools, insights, and an elegant modern UI — built using the{" "}
          <span className="text-blue-500 font-medium">MERN stack</span>.
        </p>
      </motion.div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-[#111827] border border-gray-700 shadow-2xl rounded-3xl p-8 relative overflow-hidden"
      >
        {/* Glow Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-300/10 blur-3xl -z-10"></div>

        {/* FEATURES */}
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Features Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#1f2937] p-5 rounded-2xl shadow-inner hover:shadow-blue-700/20 transition-all"
          >
            <h2 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
              Features
            </h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
              <li>Expense & Income Tracking</li>
              <li>Smart Categorization</li>
              <li>Budget Planning</li>
              <li>Analytics & Insight Charts</li>
              <li>Beautiful Dark UI Experience</li>
            </ul>
          </motion.div>

          {/* Upcoming Features */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#1f2937] p-5 rounded-2xl shadow-inner hover:shadow-blue-700/20 transition-all"
          >
            <h2 className="text-lg font-semibold text-blue-300 mb-3 flex items-center gap-2">
              Upcoming
            </h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
              <li>AI-based Monthly Insights</li>
              <li>Receipt Scanning (OCR)</li>
              <li>Shared Group Budgets</li>
              <li>Bank Syncing (Future)</li>
              <li>Advanced Notifications</li>
            </ul>
          </motion.div>
        </div>

        {/* GITHUB BUTTON */}
        <motion.a
          href="https://github.com/ujwals05/tracklit"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 mt-8 bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-md transition-all hover:bg-blue-700"
        >
          <Github className="w-5 h-5" />
          View Project on GitHub
        </motion.a>

        {/* DISCLAIMER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 p-4 bg-red-600/20 border border-red-600/40 rounded-xl text-xs text-red-300"
        >
          <strong>Disclaimer:</strong> Parts of the UI and enhancements were
          assisted by AI tools like ChatGPT, but the code, logic, and structure
          are manually reviewed and implemented for accuracy.
        </motion.div>

        {/* FOOTER */}
        <p className="mt-6 text-xs text-gray-400 text-center">
          Built with ❤️ by{" "}
          <a
            href="https://www.linkedin.com/in/ujwal-s-6718762b0/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-400 hover:underline"
          >
            Ujwal
          </a>{" "}
          | TrackLit
        </p>
      </motion.div>
    </div>
  );
};

export default AboutUs;
