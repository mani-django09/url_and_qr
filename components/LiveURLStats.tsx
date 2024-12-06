'use client'

import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { Zap, Globe, Clock, Users } from 'lucide-react'

interface Stat {
  icon: JSX.Element
  label: string
  value: number
  unit: string
}

export function LiveURLStats() {
  const [stats, setStats] = useState<Stat[]>([
    { icon: <Zap className="w-6 h-6 text-yellow-500" />, label: "URLs Shortened", value: 0, unit: "" },
    { icon: <Globe className="w-6 h-6 text-blue-500" />, label: "Total Clicks", value: 0, unit: "" },
    { icon: <Clock className="w-6 h-6 text-green-500" />, label: "Avg. Response Time", value: 0, unit: "ms" },
    { icon: <Users className="w-6 h-6 text-purple-500" />, label: "Active Users", value: 0, unit: "" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => prevStats.map(stat => ({
        ...stat,
        value: stat.label === "Avg. Response Time" 
          ? Math.floor(Math.random() * 100) + 50 
          : stat.value + Math.floor(Math.random() * 10)
      })))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-center mb-6">Live URL Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {stat.icon}
            <h3 className="mt-2 text-sm font-medium text-gray-500">{stat.label}</h3>
            <motion.p 
              className="text-2xl font-semibold"
              key={stat.value}
              initial={{ scale: 1.5, color: "#4CAF50" }}
              animate={{ scale: 1, color: "#000000" }}
              transition={{ duration: 0.5 }}
            >
              {stat.value.toLocaleString()}{stat.unit}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

