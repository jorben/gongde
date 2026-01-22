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
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t-2 border-gray-200 px-2 py-3 flex justify-around items-center z-50">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.path
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1.5 transition-all duration-200 px-4 py-2 rounded-xl ${
              isActive 
                ? 'bg-amber-50 text-duo-yellow scale-105 border-2 border-duo-yellow/20 shadow-[0_2px_0_0_rgba(212,160,23,0.1)]' 
                : 'text-amber-900/40 hover:bg-amber-50/50'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 3 : 2} />
            <span className={`text-[11px] font-extrabold uppercase tracking-wide ${isActive ? 'opacity-100' : 'opacity-80'}`}>
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}

export const AIChatButton = ({ onClick, isWorshipPage }: { onClick: () => void; isWorshipPage?: boolean }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95, y: 4 }}
      className={`fixed right-6 w-16 h-16 bg-duo-yellow text-white rounded-2xl flex items-center justify-center z-50 border-b-4 border-duo-yellow-dark shadow-[0_4px_0_0_#B8860B] ${
        isWorshipPage ? 'top-[48%]' : 'bottom-24'
      }`}
    >
      <MessageCircle size={32} strokeWidth={2.5} />
      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black border-2 border-white shadow-sm">
        AI大师
      </div>
    </motion.button>
  )
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const isWorshipPage = location.pathname === '/'

  return (
    <div className="min-h-[100dvh] text-duo-text relative overflow-x-hidden font-sans">
      <main className="relative z-10 max-w-md mx-auto px-4 pt-6 pb-32">
        {children}
      </main>

      <AIChatButton onClick={() => setIsChatOpen(true)} isWorshipPage={isWorshipPage} />
      <AIChatDialog isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <Navigation />
    </div>
  )
}
