import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserStore } from '../../store/useUserStore'
import { Sparkles } from 'lucide-react'

const BUDDHAS = [
  { name: '观音菩萨', domain: '慈悲、平安', color: 'text-blue-200' },
  { name: '文殊菩萨', domain: '智慧、学业', color: 'text-orange-200' },
  { name: '地藏菩萨', domain: '超度、孝道', color: 'text-yellow-200' },
  { name: '财神', domain: '财运、事业', color: 'text-red-200' },
]

export const WorshipPage = () => {
  const { totalMerit, addWorshipRecord, dailyData, resetDailyDataIfNeeded } = useUserStore()
  const [selectedBuddha, setSelectedBuddha] = useState(BUDDHAS[0])
  const [wish, setWish] = useState('')
  const [showAnimation, setShowAnimation] = useState(false)
  const [merits, setMerits] = useState<{ id: number; x: number; y: number }[]>([])

  useEffect(() => {
    resetDailyDataIfNeeded()
  }, [])

  const handleWorship = () => {
    if (dailyData.wishUsed) {
      alert('今日已许愿，请明日再来')
      return
    }
    if (!wish.trim()) {
      alert('请输入您的心愿')
      return
    }

    addWorshipRecord({
      buddha: selectedBuddha.name,
      wish: wish,
      isCheckin: true,
    })

    // Trigger animation
    const id = Date.now()
    setMerits((prev) => [...prev, { id, x: Math.random() * 200 - 100, y: -100 }])
    setTimeout(() => {
      setMerits((prev) => prev.filter((m) => m.id !== id))
    }, 2000)

    setWish('')
  }

  return (
    <div className="flex flex-col items-center p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gongde-gold mb-2">大雄宝殿</h1>
        <p className="text-sm opacity-60">当前累积功德: <span className="text-gongde-gold font-bold text-lg">{totalMerit}</span></p>
      </div>

      {/* Buddha Selection */}
      <div className="w-full flex justify-between gap-2 overflow-x-auto pb-2">
        {BUDDHAS.map((b) => (
          <button
            key={b.name}
            onClick={() => setSelectedBuddha(b)}
            className={`flex-1 min-w-[80px] p-2 rounded-lg border transition-all ${
              selectedBuddha.name === b.name
                ? 'bg-gongde-red border-gongde-gold text-gongde-gold'
                : 'bg-black/20 border-white/10 text-white/60'
            }`}
          >
            <div className="text-xs font-bold">{b.name}</div>
            <div className="text-[10px] opacity-60">{b.domain}</div>
          </button>
        ))}
      </div>

      {/* Buddha Image Placeholder */}
      <div className="relative w-64 h-64 bg-black/40 rounded-full flex items-center justify-center border-4 border-gongde-gold/20">
        <motion.div
          key={selectedBuddha.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className={`text-6xl mb-2 ${selectedBuddha.color}`}>🙏</div>
          <div className="text-gongde-gold font-serif text-xl">{selectedBuddha.name}</div>
        </motion.div>

        {/* Floating Merits */}
        <AnimatePresence>
          {merits.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 0, x: m.x }}
              animate={{ opacity: 1, y: m.y }}
              exit={{ opacity: 0 }}
              className="absolute text-gongde-gold font-bold text-2xl pointer-events-none"
            >
              功德 +1
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Wish Input */}
      <div className="w-full space-y-4">
        <textarea
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          placeholder="虔诚输入您的心愿..."
          className="w-full h-24 bg-black/20 border border-gongde-gold/30 rounded-lg p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-gongde-gold"
          disabled={dailyData.wishUsed}
        />
        
        <button
          onClick={handleWorship}
          disabled={dailyData.wishUsed}
          className={`w-full py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all ${
            dailyData.wishUsed
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gongde-red border-2 border-gongde-gold text-gongde-gold hover:bg-red-900 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
          }`}
        >
          {dailyData.wishUsed ? '今日已圆满' : (
            <>
              <Sparkles size={20} />
              许愿礼拜
            </>
          )}
        </button>
      </div>

      {/* Records Preview */}
      <div className="w-full text-center">
        <p className="text-xs text-white/40 italic">“心诚则灵，诸事顺遂”</p>
      </div>
    </div>
  )
}
