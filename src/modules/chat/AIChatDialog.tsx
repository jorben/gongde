import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X, User, Sparkles } from 'lucide-react'
import { useUserStore } from '../../store/useUserStore'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export const AIChatDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { dailyData, addMerit } = useUserStore()
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '善哉，善哉。施主心中若有困惑，贫僧愿为您指点迷津。' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    if (dailyData.chatCount >= 10) {
      alert('今日机缘已尽，请明日再来。')
      return
    }

    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setIsLoading(true)

    // Simulate AI Response
    setTimeout(() => {
      const responses = [
        "心如工画师，能画诸世间。世间一切皆由心造。",
        "过去事已过去，未来事不必预思，把握当下即是修行。",
        "一花一世界，一叶一菩提。凡事随缘，莫要强求。",
        "若无闲事挂心头，便是人间好时节。",
        "修行即是修心，心平则路平。"
      ]
      const randomReply = responses[Math.floor(Math.random() * responses.length)]
      
      setMessages(prev => [...prev, { role: 'assistant', content: randomReply }])
      setIsLoading(false)
      
      // Update chat count in store
      useUserStore.setState((state) => ({
        dailyData: { ...state.dailyData, chatCount: state.dailyData.chatCount + 1 }
      }))
    }, 1000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          className="fixed inset-x-4 bottom-24 top-20 bg-gongde-brown/95 backdrop-blur-xl border-2 border-gongde-gold/30 rounded-3xl shadow-2xl z-[60] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-gongde-gold/20 flex justify-between items-center bg-gongde-red/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gongde-gold rounded-full flex items-center justify-center text-gongde-brown">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gongde-gold">智慧法师 AI</h3>
                <p className="text-[10px] opacity-60">今日剩余次数: {10 - dailyData.chatCount}/10</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-serif">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-gongde-gold text-gongde-brown rounded-tr-none' 
                    : 'bg-white/10 text-white rounded-tl-none border border-white/5'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gongde-gold rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-gongde-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-gongde-gold rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-black/20 border-t border-gongde-gold/20">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="请输入您的问题..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gongde-gold"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 bg-gongde-gold rounded-full flex items-center justify-center text-gongde-brown disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
