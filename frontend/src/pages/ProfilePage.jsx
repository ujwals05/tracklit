import React from "react";
import { motion } from "framer-motion";
import { Camera, Mail, User, Shield, LogOut, Wallet } from "lucide-react";

import { useAuthStore } from "../store/userAuthStore.js";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white pt-20 px-4">
        {console.log(authUser)}
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl font-extrabold tracking-tight">
            Your Profile
          </h1>
          <p className="text-gray-400 mt-2">
            Manage personal info, security settings & preferences.
          </p>
        </motion.div>

        {/* PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="max-w-4xl mx-auto mt-10 bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* PROFILE IMAGE */}
            <div className="relative">
              <img
                src={authUser.profilePic}
                alt="avatar"
                className="h-40 w-40 rounded-2xl shadow-lg object-cover border border-white/10"
              />
              <button className="absolute bottom-2 right-2 bg-black/60 p-2 rounded-full border border-white/20 hover:bg-black transition">
                <Camera size={18} />
              </button>
            </div>

            {/* USER INFO */}
            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  {authUser.fullName}
                  <User size={22} className="text-blue-400" />
                </h2>
                <p className="flex items-center gap-2 text-gray-400">
                  <Mail size={18} /> {authUser.email}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="bg-white/10 p-4 rounded-xl text-center border border-white/5">
                  <h3 className="text-xl font-bold">₹52,430</h3>
                  <p className="text-sm text-gray-400">Total Spent</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl text-center border border-white/5">
                  <h3 className="text-xl font-bold">23</h3>
                  <p className="text-sm text-gray-400">Transactions</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl text-center border border-white/5">
                  <h3 className="text-xl font-bold">4</h3>
                  <p className="text-sm text-gray-400">Categories</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SETTINGS CARDS */}
        <div className="max-w-4xl mx-auto mt-10 grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-xl hover:bg-white/10 transition cursor-pointer"
          >
            <h3 className="text-xl font-semibold flex items-center gap-3">
              <Shield className="text-blue-400" /> Security Settings
            </h3>
            <p className="text-gray-400 mt-2">
              Manage passwords, MFA, and access.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-xl hover:bg-white/10 transition cursor-pointer"
          >
            <h3 className="text-xl font-semibold flex items-center gap-3">
              <Wallet className="text-blue-400" /> Expense Preferences
            </h3>
            <p className="text-gray-400 mt-2">
              Control categories, limits & alerts.
            </p>
          </motion.div>
        </div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto mt-10 flex justify-center"
        >
          <button className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl flex items-center gap-2 font-semibold transition">
            <LogOut size={18} /> Logout
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default ProfilePage;
