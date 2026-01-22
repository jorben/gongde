import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Flower2, BookOpen, Sparkles, Video, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { AIChatDialog } from '../modules/chat/AIChatDialog'

const navItems = [
  { path: '/', icon: Flower2, label: '许愿' },
  { path: '/homework', icon: BookOpen, label: '功课' },
  { path: '/consecration', icon: Sparkles, label: '开光' },
  { path: '/lecture', icon: Video, label: '讲经' },
]

export const Navigation = () => {
  const location = useLocation()

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/70 backdrop-blur-xl border border-white/50 px-6 py-3 flex justify-around items-center z-50 rounded-[32px] shadow-2xl shadow-black/5">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.path
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              isActive ? 'text-zen-gold scale-110' : 'text-zen-text/60 hover:text-zen-gold/60'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-70'}`}>
              {item.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="nav-underline"
                className="absolute -bottom-1 w-1 h-1 bg-zen-gold rounded-full"
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

export const AIChatButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="fixed right-6 bottom-28 w-14 h-14 bg-zen-gold rounded-full shadow-xl shadow-zen-gold/20 flex items-center justify-center text-white z-50 border border-white/30"
    >
      <MessageCircle size={26} strokeWidth={2} />
      <div className="absolute -top-1 -right-1 bg-zen-pink text-white text-[9px] px-2 py-0.5 rounded-full font-bold shadow-sm">
        AI
      </div>
    </motion.button>
  )
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="min-h-[100dvh] bg-zen-bg text-zen-text relative overflow-x-hidden font-sans">
      {/* Zen Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-zen-gold/5 blur-[100px] rounded-full" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-zen-pink/5 blur-[80px] rounded-full" />
        <div className="absolute -bottom-[5%] left-[20%] w-[50%] h-[50%] bg-zen-green/5 blur-[120px] rounded-full" />
        
        {/* Subtle Paper Texture Effect */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
      </div>
      
      <main className="relative z-10 max-w-md mx-auto px-4 pt-6 pb-28">
        {children}
      </main>

      <AIChatButton onClick={() => setIsChatOpen(true)} />
      <AIChatDialog isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <Navigation />
    </div>
  )
}
