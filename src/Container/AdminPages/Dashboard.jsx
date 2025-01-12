"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {} from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
      const dispatch = useDispatch()
  return (
   <div className="">
       <h1 className="text-2xl font-bold  text-[#4D4D4D]">Dashboard</h1>
   </div>
  )
}

export default Dashboard