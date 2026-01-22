import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X, Sparkles } from 'lucide-react'
import { useUserStore } from '../../store/useUserStore'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export const AIChatDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { dailyData } = useUserStore()
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
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          className="fixed inset-x-4 bottom-24 top-20 bg-white/90 backdrop-blur-2xl border border-white/50 rounded-[32px] shadow-2xl z-[60] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 border-b border-zen-text/5 flex justify-between items-center bg-white/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zen-gold/10 rounded-2xl flex items-center justify-center text-zen-gold shadow-sm">
                <Sparkles size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-zen-text">智慧法师 AI</h3>
                <p className="text-[10px] text-zen-text/40 tracking-widest uppercase">今日机缘: {10 - dailyData.chatCount}/10</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-zen-bg rounded-full transition-colors text-zen-text/20 hover:text-zen-text">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 font-serif bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] bg-opacity-10">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-zen-gold text-white rounded-tr-none shadow-lg shadow-zen-gold/20' 
                    : 'bg-white text-zen-text rounded-tl-none shadow-sm border border-zen-text/5'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-zen-text/5 flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-zen-gold/40 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-zen-gold/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-zen-gold/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-5 bg-white border-t border-zen-text/5">
            <div className="flex gap-3 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="在此寻求开示..."
                className="flex-1 bg-zen-bg/50 border-none rounded-full px-5 py-3 text-sm focus:ring-1 focus:ring-zen-gold/30 placeholder:text-zen-text/20 text-zen-text transition-all"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-12 h-12 bg-zen-gold text-white rounded-full flex items-center justify-center shadow-lg shadow-zen-gold/20 disabled:opacity-30 disabled:shadow-none hover:scale-105 active:scale-95 transition-all"
              >
                <Send size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
