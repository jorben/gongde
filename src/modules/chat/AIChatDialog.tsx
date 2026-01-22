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
          className="fixed inset-x-4 bottom-6 top-20 bg-white border-2 border-duo-yellow/30 rounded-[32px] shadow-[0_20px_50px_rgba(212,160,23,0.3)] z-[60] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 border-b-2 border-amber-100/30 flex justify-between items-center bg-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-duo-yellow border-2 border-duo-yellow/10 shadow-sm">
                <Sparkles size={28} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-xl font-black text-duo-text">智慧法师 AI</h3>
                <p className="text-[11px] font-black text-amber-900/40 uppercase tracking-widest">今日机缘: {10 - dailyData.chatCount}/10</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-amber-50 rounded-xl transition-colors text-amber-200 hover:text-duo-text active:scale-90">
              <X size={24} strokeWidth={3} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-amber-50/20">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-5 rounded-[24px] text-base font-bold leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-duo-yellow text-white rounded-tr-none border-b-[6px] border-duo-yellow-dark shadow-[0_4px_0_0_#B8860B]' 
                    : 'bg-white text-duo-text rounded-tl-none border-2 border-amber-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border-2 border-amber-100/50 flex gap-2">
                  <div className="w-2 h-2 bg-duo-yellow/40 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-duo-yellow/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-duo-yellow/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 bg-white border-t-[3px] border-amber-100/30">
            <div className="flex gap-4 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="在此寻求开示..."
                className="flex-1 bg-amber-50/50 border-2 border-amber-100/50 rounded-2xl px-6 py-4 text-base font-bold focus:border-duo-yellow/50 outline-none placeholder:text-amber-900/20 text-duo-text transition-all shadow-inner"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-16 h-16 duo-btn-yellow flex items-center justify-center disabled:opacity-30 disabled:translate-y-[6px] disabled:shadow-none"
              >
                <Send size={28} strokeWidth={3} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
