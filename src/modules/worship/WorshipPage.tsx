import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
import { Sparkles, MapPin, ChevronRight } from 'lucide-react'

const BUDDHAS = [
  { name: '观音菩萨', domain: '慈悲、平安', tags: ['平安', '健康'], color: 'text-blue-200', image: '/bodhisattva-guanyin.png' },
  { name: '文殊菩萨', domain: '智慧、学业', tags: ['学业', '智慧'], color: 'text-orange-200', image: '/bodhisattva-wenshu.png' },
  { name: '地藏菩萨', domain: '超度、孝道', tags: ['长寿', '孝道'], color: 'text-yellow-200', image: '/bodhisattva-dizang.png' },
  { name: '财神', domain: '财运、事业', tags: ['财富', '事业'], color: 'text-red-200', image: '/bodhisattva-caishen.png' },
]

const MAX_DAILY_WISHES = 3

// 预设心愿列表，按菩萨分类
const PRESET_WISHES: Record<string, string[]> = {
  '观音菩萨': [
    '愿家人平安健康',
    '愿一切众生离苦得乐',
    '愿世界和平安宁',
    '愿父母身体康健',
    '愿疾病早日痊愈',
    '愿出入平安顺遂',
  ],
  '文殊菩萨': [
    '愿考试金榜题名',
    '愿学业有成',
    '愿开启智慧明灯',
    '愿孩子学业进步',
    '愿工作面试顺利',
    '愿思维清晰敏捷',
  ],
  '地藏菩萨': [
    '愿先人往生净土',
    '愿历代宗亲得度',
    '愿父母福寿绵长',
    '愿冤亲债主解怨',
    '愿六道众生离苦',
    '愿孝心感动天地',
  ],
  '财神': [
    '愿财运亨通发达',
    '愿事业蒸蒸日上',
    '愿生意兴隆红火',
    '愿工作升职加薪',
    '愿投资收益丰厚',
    '愿贵人相助成功',
  ],
}

// 随机获取指定数量的心愿
const getRandomWishes = (buddhaName: string, count: number = 4): string[] => {
  const wishes = PRESET_WISHES[buddhaName] || PRESET_WISHES['观音菩萨']
  const shuffled = [...wishes].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export const WorshipPage = () => {
  const navigate = useNavigate()
  const { totalMerit, addWorshipRecord, dailyData, resetDailyDataIfNeeded, selectedTemple } = useUserStore()
  const [selectedBuddha, setSelectedBuddha] = useState(BUDDHAS[0])
  const [wish, setWish] = useState('')
  const [merits, setMerits] = useState<{ id: number; x: number; y: number }[]>([])
  const [presetWishes, setPresetWishes] = useState<string[]>(() => getRandomWishes(BUDDHAS[0].name))
  const [isInputFocused, setIsInputFocused] = useState(false)

  const wishExhausted = dailyData.wishCount >= MAX_DAILY_WISHES

  useEffect(() => {
    resetDailyDataIfNeeded()
  }, [])

  // 当选择不同菩萨时，更新预设心愿
  useEffect(() => {
    setPresetWishes(getRandomWishes(selectedBuddha.name))
  }, [selectedBuddha])

  const handleWorship = () => {
    if (wishExhausted) {
      alert('今日许愿次数已用完，请明日再来')
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
    <div className="flex flex-col items-center space-y-6 pb-4">
      {/* LBS Location - Fixed Top Left */}
      <button
        onClick={() => navigate('/temples')}
        className="fixed top-4 left-4 z-40 flex items-center gap-1.5 px-3 py-1.5 bg-white/60 hover:bg-white/80 rounded-full text-xs text-zen-text/70 transition-all border border-zen-gold/20 shadow-sm backdrop-blur-sm"
      >
        <MapPin size={12} className="text-zen-gold" />
        {selectedTemple ? (
          <>
            <span className="max-w-[120px] truncate">{selectedTemple}</span>
            <ChevronRight size={12} className="text-zen-text/40" />
          </>
        ) : (
          <span>点击查找附近的寺庙</span>
        )}
      </button>

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif font-bold text-zen-text tracking-widest">许愿</h1>
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-zen-gold/10 rounded-full">
          <span className="text-xs text-zen-text/60">累积功德</span>
          <span className="text-zen-gold font-bold text-lg">{totalMerit}</span>
        </div>
      </div>

      {/* Buddha Selection */}
      <div className="w-full flex justify-between gap-2 overflow-x-auto pb-2 no-scrollbar">
        {BUDDHAS.map((b) => (
          <button
            key={b.name}
            onClick={() => setSelectedBuddha(b)}
            className={`flex-1 min-w-[76px] p-2.5 rounded-xl transition-all duration-300 border ${
              selectedBuddha.name === b.name
                ? 'bg-white shadow-lg shadow-zen-gold/10 border-zen-gold text-zen-gold scale-105'
                : 'bg-white/40 border-transparent text-zen-text/40 hover:bg-white/60'
            }`}
          >
            <div className="text-[11px] font-bold mb-0.5">{b.name}</div>
            <div className="text-[9px] opacity-70 leading-tight">{b.domain}</div>
          </button>
        ))}
      </div>

      {/* Buddha Image Display */}
      <div className="relative w-52 h-52 flex items-center justify-center flex-shrink-0">
        {/* Decorative Rings */}
        <div className="absolute inset-0 border border-zen-gold/10 rounded-full animate-[spin_20s_linear_infinite]" />
        <div className="absolute inset-3 border border-zen-gold/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        
        <div className="relative w-44 h-44 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-inner border border-white/50 overflow-hidden">
          <motion.div
            key={selectedBuddha.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img 
              src={selectedBuddha.image} 
              alt={selectedBuddha.name}
              className="w-80 h-80 object-contain drop-shadow-md"
            />
          </motion.div>

          {/* Floating Merits */}
          <AnimatePresence>
            {merits.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20, x: m.x }}
                animate={{ opacity: 1, y: m.y }}
                exit={{ opacity: 0 }}
                className="absolute text-zen-gold font-bold text-xl pointer-events-none whitespace-nowrap z-10"
              >
                功德 +1
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Buddha Name and Tags */}
      <div className="flex items-center gap-2 -mt-2">
        <div className="text-zen-text font-serif text-lg tracking-widest">{selectedBuddha.name}</div>
        <div className="flex gap-1">
          {selectedBuddha.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] bg-zen-gold/15 text-zen-gold rounded-full border border-zen-gold/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Wish Input Section */}
      <div className="w-full zen-card p-5 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-zen-text/40 ml-1">所求心愿</label>
          <textarea
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder="诚心祈愿，万事顺遂..."
            className={`w-full bg-zen-bg/50 border-none rounded-xl p-3 text-sm text-zen-text placeholder:text-zen-text/20 focus:ring-1 focus:ring-zen-gold/30 resize-none transition-all duration-300 ${
              isInputFocused ? 'h-24' : 'h-10'
            }`}
            rows={isInputFocused ? 3 : 1}
            disabled={wishExhausted}
          />
          {/* 预设心愿标签 */}
          <div className="flex flex-wrap gap-2">
            {presetWishes.map((presetWish, index) => (
              <button
                key={index}
                onClick={() => !wishExhausted && setWish(presetWish)}
                disabled={wishExhausted}
                className={`px-3 py-1.5 text-xs rounded-full transition-all ${
                  wishExhausted
                    ? 'bg-zen-text/5 text-zen-text/20 cursor-not-allowed'
                    : wish === presetWish
                      ? 'bg-zen-gold/20 text-zen-gold border border-zen-gold/30'
                      : 'bg-zen-bg/60 text-zen-text/60 hover:bg-zen-gold/10 hover:text-zen-gold border border-transparent'
                }`}
              >
                {presetWish}
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={handleWorship}
          disabled={wishExhausted}
          className={`w-full py-3.5 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all ${
            wishExhausted
              ? 'bg-zen-text/5 text-zen-text/20 cursor-not-allowed'
              : 'zen-btn-gold'
          }`}
        >
          {wishExhausted ? '今日祈愿已圆满' : (
            <>
              <Sparkles size={18} />
              <span>祈愿礼拜 ({MAX_DAILY_WISHES - dailyData.wishCount}/{MAX_DAILY_WISHES})</span>
            </>
          )}
        </button>

        {/* 快捷入口 */}
        <div className="flex justify-center gap-6 pt-2">
          <button
            disabled
            className="flex flex-col items-center gap-1.5 opacity-50 cursor-not-allowed"
          >
            <div className="w-12 h-12 rounded-full bg-zen-gold/10 border border-zen-gold/20 flex items-center justify-center">
              <span className="text-xl">🪔</span>
            </div>
            <span className="text-[10px] text-zen-text/60">请香</span>
          </button>
          <button
            disabled
            className="flex flex-col items-center gap-1.5 opacity-50 cursor-not-allowed"
          >
            <div className="w-12 h-12 rounded-full bg-zen-gold/10 border border-zen-gold/20 flex items-center justify-center">
              <span className="text-xl">🙏</span>
            </div>
            <span className="text-[10px] text-zen-text/60">功德</span>
          </button>
          <button
            disabled
            className="flex flex-col items-center gap-1.5 opacity-50 cursor-not-allowed"
          >
            <div className="w-12 h-12 rounded-full bg-zen-gold/10 border border-zen-gold/20 flex items-center justify-center">
              <span className="text-xl">💝</span>
            </div>
            <span className="text-[10px] text-zen-text/60">募捐</span>
          </button>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="text-center">
        <p className="text-[10px] text-zen-text/30 font-serif tracking-widest italic">" 心诚则灵 · 随缘自在 "</p>
      </div>
    </div>
  )
}
