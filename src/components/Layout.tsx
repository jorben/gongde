import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Flower2, BookOpen, Sparkles, Video, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { AIChatDialog } from '../modules/chat/AIChatDialog'

const navItems = [
  { path: '/', icon: Flower2, label: '礼拜' },
  { path: '/homework', icon: BookOpen, label: '功课' },
  { path: '/consecration', icon: Sparkles, label: '开光' },
  { path: '/lecture', icon: Video, label: '讲经' },
]

export const Navigation = () => {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gongde-red border-t border-gongde-gold/30 px-4 py-2 flex justify-around items-center z-50">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.path
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-gongde-gold' : 'text-white/60 hover:text-white'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs">{item.label}</span>
            {isActive && (
              <motion.div
                layoutId="nav-underline"
                className="w-1 h-1 bg-gongde-gold rounded-full"
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

export const AIChatButton = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed right-6 bottom-24 w-14 h-14 bg-gongde-gold rounded-full shadow-lg flex items-center justify-center text-gongde-brown z-50 border-2 border-white/20"
    >
      <MessageCircle size={28} />
      <div className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full border border-white">
        AI
      </div>
    </motion.button>
  )
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gongde-brown text-white pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--gongde-gold)_0%,transparent_70%)]" />
      </div>
      
      <main className="relative z-10 max-w-md mx-auto h-screen overflow-y-auto">
        {children}
      </main>

      <AIChatButton onClick={() => setIsChatOpen(true)} />
      <AIChatDialog isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <Navigation />
    </div>
  )
}
