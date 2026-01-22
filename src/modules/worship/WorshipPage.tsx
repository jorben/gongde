import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
import { Sparkles, MapPin, ChevronRight, ChevronLeft } from 'lucide-react'

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
  const [buddhaIndex, setBuddhaIndex] = useState(0)
  const [wish, setWish] = useState('')
  const [merits, setMerits] = useState<{ id: number; x: number; y: number }[]>([])
  const [presetWishes, setPresetWishes] = useState<string[]>(() => getRandomWishes(BUDDHAS[0].name))
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [slideDirection, setSlideDirection] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const selectedBuddha = BUDDHAS[buddhaIndex]
  const wishExhausted = dailyData.wishCount >= MAX_DAILY_WISHES

  // 切换到上一个菩萨
  const handlePrevBuddha = () => {
    setSlideDirection(-1)
    setBuddhaIndex((prev) => (prev - 1 + BUDDHAS.length) % BUDDHAS.length)
  }

  // 切换到下一个菩萨
  const handleNextBuddha = () => {
    setSlideDirection(1)
    setBuddhaIndex((prev) => (prev + 1) % BUDDHAS.length)
  }

  // 触摸滑动处理
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNextBuddha()
      } else {
        handlePrevBuddha()
      }
    }
    touchStartX.current = null
  }

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
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-duo-text tracking-tight drop-shadow-sm">诚心祈愿</h1>
        <div className="inline-flex items-center gap-3 px-8 py-3 bg-white rounded-2xl border-2 border-duo-yellow/20 shadow-[0_4px_0_0_#FFB800]">
          <span className="text-xs font-black text-amber-900/40 uppercase tracking-widest">当前功德</span>
          <span className="text-duo-yellow font-black text-3xl">{totalMerit}</span>
        </div>
      </div>

      {/* Buddha Image Display with Swipe */}
      <div 
        className="relative w-full flex items-center justify-center flex-shrink-0 py-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left Arrow */}
        <button 
          onClick={handlePrevBuddha}
          className="absolute left-2 z-20 p-2 text-amber-200 hover:text-duo-yellow transition-colors"
        >
          <ChevronLeft size={44} strokeWidth={3} />
        </button>

        {/* Buddha Image Container */}
        <div className="relative w-80 h-80 flex items-center justify-center">
          <div className="relative w-60 h-60 bg-white/50 rounded-full flex items-center justify-center border-4 border-white shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)] z-10 overflow-visible">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selectedBuddha.name}
                initial={{ opacity: 0, scale: 0.8, x: slideDirection * 100 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -slideDirection * 100 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img 
                  src={selectedBuddha.image} 
                  alt={selectedBuddha.name}
                  className="w-80 h-80 object-contain drop-shadow-xl"
                />
              </motion.div>
            </AnimatePresence>

            {/* Floating Merits */}
            <AnimatePresence>
              {merits.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, scale: 0.5, y: 20, x: m.x }}
                  animate={{ opacity: 1, scale: 1.2, y: m.y }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  className="absolute text-duo-yellow font-black text-2xl pointer-events-none whitespace-nowrap z-20 drop-shadow-sm"
                >
                  功德 +1
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Arrow */}
        <button 
          onClick={handleNextBuddha}
          className="absolute right-2 z-20 p-2 text-amber-200 hover:text-duo-yellow transition-colors"
        >
          <ChevronRight size={44} strokeWidth={3} />
        </button>
      </div>

      {/* Buddha Name and Tags */}
      <div className="flex flex-col items-center gap-3 -mt-2">
        <div className="text-duo-text font-black text-2xl">{selectedBuddha.name}</div>
        <div className="flex gap-2">
          {selectedBuddha.tags.map((tag) => (
            <span
              key={tag}
              className="px-5 py-2 text-xs font-black bg-white text-duo-yellow rounded-2xl border-2 border-duo-yellow/20 shadow-[0_2px_0_0_rgba(255,184,0,0.2)] uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Wish Input Section */}
      <div className="w-full duo-card p-6 space-y-5">
        <div className="space-y-3">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">祈愿内容</label>
          <textarea
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder="诚心祈愿，万事顺遂..."
            className={`w-full bg-amber-50/50 border-2 border-amber-100/50 rounded-2xl p-4 text-sm font-bold text-duo-text placeholder:text-amber-900/20 focus:border-duo-yellow/30 focus:bg-white outline-none transition-all duration-300 ${
              isInputFocused ? 'h-28 shadow-inner' : 'h-14'
            }`}
            rows={isInputFocused ? 3 : 1}
            disabled={wishExhausted}
          />
          {/* 预设心愿标签 - 横向滚动 */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {presetWishes.map((presetWish, index) => (
              <button
                key={index}
                onClick={() => !wishExhausted && setWish(presetWish)}
                disabled={wishExhausted}
                className={`px-4 py-2 text-xs font-black rounded-xl transition-all whitespace-nowrap flex-shrink-0 border-2 ${
                  wishExhausted
                    ? 'bg-amber-50/20 text-amber-900/20 border-amber-100/20 cursor-not-allowed'
                    : wish === presetWish
                      ? 'bg-amber-50 text-duo-yellow border-duo-yellow/20'
                      : 'bg-white text-amber-900/40 border-amber-100/50 hover:border-duo-yellow/20 hover:text-duo-yellow'
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
          className={`w-full py-5 rounded-[24px] font-black text-xl flex items-center justify-center gap-4 transition-all ${
            wishExhausted
              ? 'bg-amber-100/50 text-amber-900/20 border-b-6 border-amber-200 cursor-not-allowed translate-y-[6px]'
              : 'duo-btn-yellow'
          }`}
        >
          {wishExhausted ? '今日已圆满' : (
            <>
              <Sparkles size={22} strokeWidth={3} />
              <span className="uppercase tracking-wider">祈愿礼拜 ({MAX_DAILY_WISHES - dailyData.wishCount}/{MAX_DAILY_WISHES})</span>
            </>
          )}
        </button>

        {/* 快捷入口 */}
        <div className="flex justify-around pt-2">
          {[
            { icon: '🪔', label: '请香' },
            { icon: '🙏', label: '功德' },
            { icon: '💝', label: '募捐' }
          ].map((item) => (
            <button
              key={item.label}
              disabled
              className="flex flex-col items-center gap-2 opacity-40 cursor-not-allowed group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-50 border-2 border-gray-100 flex items-center justify-center text-2xl transition-transform group-hover:scale-105">
                {item.icon}
              </div>
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-tighter">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Quote */}
      <div className="text-center pt-4">
        <p className="text-xs font-black text-amber-900/20 uppercase tracking-[0.2em]">" 心诚则灵 · 随缘自在 "</p>
      </div>
    </div>
  )
}
