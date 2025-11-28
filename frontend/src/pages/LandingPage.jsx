import { motion } from "framer-motion";
import {
  ArrowRight,
  PieChart,
  Wallet,
  BellRing,
  LineChart,
} from "lucide-react";
import { FaRobot } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/userAuthStore.js";

export default function LandingPage() {
  const { authUser } = useAuthStore();
  return (
    <div className="min-h-screen bg-[#0A0F1F] text-white">
      {/* HERO SECTION */}
      <section className="pt-28 pb-24 px-6 text-center max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-extrabold leading-tight"
        >
          Take Control of Your <span className="text-blue-500">Expenses</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto"
        >
          Track your daily spending, set budgets, and gain insights using
          AI-powered analytics — all in one dashboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 flex justify-center gap-5"
        >
          <Link
            to={!authUser ? "/login" : "/dashboard"}
            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-lg font-semibold transition flex items-center gap-2 text-white"
          >
            Start Tracking
            <ArrowRight size={20} />
          </Link>

          <button className="px-8 py-4 rounded-xl border border-gray-600 hover:bg-gray-800 transition text-lg">
            View Demo
          </button>
        </motion.div>

        {/* Decorative Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white/5 rounded-xl border border-gray-700"
          >
            <h3 className="text-4xl font-bold text-blue-500">₹12,450</h3>
            <p className="text-gray-400 mt-2">Total Monthly Spending</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white/5 rounded-xl border border-gray-700"
          >
            <h3 className="text-4xl font-bold text-blue-500">₹3,200</h3>
            <p className="text-gray-400 mt-2">Saved This Month</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white/5 rounded-xl border border-gray-700"
          >
            <h3 className="text-4xl font-bold text-blue-500">18%</h3>
            <p className="text-gray-400 mt-2">Overspending Risk</p>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="mt-28 px-6">
        <h2 className="text-4xl font-bold text-center">Why Choose TrackLit?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14 max-w-7xl mx-auto">
          {/* Card 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-white/5 rounded-2xl border border-gray-700 shadow-xl"
          >
            <Wallet className="text-blue-500" size={50} />
            <h3 className="text-2xl font-semibold mt-5">
              Smart Expense Tracking
            </h3>
            <p className="text-gray-400 mt-3">
              Add expenses effortlessly with category suggestions.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-white/5 rounded-2xl border border-gray-700 shadow-xl"
          >
            <FaRobot className="text-blue-500" size={50} />
            <h3 className="text-2xl font-semibold mt-5">AI-Based Insights</h3>
            <p className="text-gray-400 mt-3">
              Identify patterns and receive AI-powered money tips.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-white/5 rounded-2xl border border-gray-700 shadow-xl"
          >
            <BellRing className="text-blue-500" size={50} />
            <h3 className="text-2xl font-semibold mt-5">Budget Alerts</h3>
            <p className="text-gray-400 mt-3">
              Stay disciplined with limit alerts and reminders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-28 px-6 text-center max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold">How It Works</h2>
        <p className="text-gray-400 mt-3 mb-12">
          Just 3 simple steps to take full control of your financial life.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-10 bg-white/5 rounded-2xl border border-gray-700"
          >
            <h3 className="text-4xl font-bold text-blue-500">1</h3>
            <p className="mt-4 text-gray-300">
              Create your account & set categories.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-10 bg-white/5 rounded-2xl border border-gray-700"
          >
            <h3 className="text-4xl font-bold text-blue-500">2</h3>
            <p className="mt-4 text-gray-300">
              Add daily expense and income entries.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-10 bg-white/5 rounded-2xl border border-gray-700"
          >
            <h3 className="text-4xl font-bold text-blue-500">3</h3>
            <p className="mt-4 text-gray-300">
              Get insights using charts & analytics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      {!authUser ? (
        <section className="mt-32 px-6 py-24 text-center bg-white/5 border-t border-gray-700">
          <h2 className="text-4xl font-extrabold">
            Ready to Master Your Money?
          </h2>
          <p className="text-gray-400 mt-3">
            Join thousands of users tracking their finances smarter.
          </p>

          <button className="mt-10 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-xl font-semibold rounded-2xl transition flex items-center mx-auto gap-2">
            Create Free Account <LineChart size={22} />
          </button>
        </section>
      ) : null}

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 border-t border-gray-700 mt-10">
        © {new Date().getFullYear()} TrackLit — All Rights Reserved.
      </footer>
    </div>
  );
}
