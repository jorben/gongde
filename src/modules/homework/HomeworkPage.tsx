import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, BookOpen, Music, CheckCircle2 } from 'lucide-react'

const SUTRAS = [
  { id: '1', name: '心经', duration: '5 分钟', difficulty: '入门', content: '观自在菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。舍利子，色不异空，空不异色，色即是空，空即是色，受想行识亦复如是。舍利子，是诸法空相，不生不灭，不垢不净，不增不减。是故空中无色，无受想行识，无眼耳鼻舌身意，无色声香味触法，无眼界乃至无意识界，无无明亦无无明尽，乃至无老死亦无老死尽。' },
  { id: '2', name: '金刚经', duration: '45 分钟', difficulty: '中等', content: '如是我闻。一时佛在舍卫国。祗树给孤独园。与大比丘众。千二百五十人俱。尔时世尊。食时。著衣持钵。入舍卫大城乞食。于其城中。次第乞已。还至本处。饭食讫。收衣钵。洗足已。敷座而坐。' },
  { id: '3', name: '大悲咒', duration: '8 分钟', difficulty: '入门', content: '南无、喝啰怛那、哆啰夜耶．南无、阿唎耶，婆卢羯帝、烁钵啰耶．菩提萨埵婆耶．摩诃萨埵婆耶．摩诃、迦卢尼迦耶．唵，萨皤啰罚曳．数怛那怛写．南无、悉吉栗埵、伊蒙阿唎耶．婆卢吉帝、室佛啰楞驮婆．南无、那啰谨墀．' },
]

export const HomeworkPage = () => {
  const [selectedSutra, setSelectedSutra] = useState<typeof SUTRAS[0] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  if (selectedSutra) {
    return (
      <div className="flex flex-col h-screen bg-gongde-brown p-6 pb-24">
        <button 
          onClick={() => { setSelectedSutra(null); setIsPlaying(false); }}
          className="text-gongde-gold mb-6 self-start flex items-center gap-1"
        >
          ← 返回列表
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-gongde-gold mb-2">{selectedSutra.name}</h2>
          <div className="flex justify-center gap-4 text-xs opacity-60">
            <span>时长: {selectedSutra.duration}</span>
            <span>难度: {selectedSutra.difficulty}</span>
          </div>
        </div>

        <div className="flex-1 bg-black/30 rounded-2xl p-6 overflow-y-auto relative border border-gongde-gold/10">
          <motion.div
            initial={{ y: 0 }}
            animate={isPlaying ? { y: -2000 } : {}}
            transition={{ duration: 60, ease: "linear" }}
            className="text-xl leading-relaxed text-center font-serif text-gongde-gold/80"
          >
            {selectedSutra.content.repeat(10)}
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center items-center gap-8">
          <button className="text-white/40"><Music size={24} /></button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 bg-gongde-gold rounded-full flex items-center justify-center text-gongde-brown shadow-lg shadow-gongde-gold/20"
          >
            {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
          </button>
          <button className="text-white/40"><CheckCircle2 size={24} /></button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gongde-gold mb-8 text-center">功课修行</h1>
      
      <div className="space-y-4">
        <div className="flex gap-4 border-b border-white/10 pb-2 mb-4">
          <button className="text-gongde-gold border-b-2 border-gongde-gold pb-2 font-bold">经书列表</button>
          <button className="text-white/40 pb-2">佛教音乐</button>
        </div>

        {SUTRAS.map((sutra) => (
          <motion.div
            key={sutra.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedSutra(sutra)}
            className="bg-black/20 border border-white/10 p-4 rounded-xl flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gongde-red rounded-lg flex items-center justify-center text-gongde-gold">
                <BookOpen size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gongde-gold">{sutra.name}</h3>
                <p className="text-xs opacity-40">时长: {sutra.duration} | 难度: {sutra.difficulty}</p>
              </div>
            </div>
            <Play size={20} className="text-gongde-gold opacity-40" />
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-gongde-red/30 p-6 rounded-2xl border border-gongde-gold/20">
        <h4 className="text-gongde-gold font-bold mb-2 flex items-center gap-2">
          <Sparkles size={16} /> 修行统计
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-black/20 rounded-lg">
            <div className="text-2xl font-bold text-gongde-gold">0</div>
            <div className="text-[10px] opacity-40">累计功课 (次)</div>
          </div>
          <div className="text-center p-3 bg-black/20 rounded-lg">
            <div className="text-2xl font-bold text-gongde-gold">0</div>
            <div className="text-[10px] opacity-40">修行时长 (分)</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Sparkles = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="m5 3 1 1"/><path d="m19 3-1 1"/><path d="m5 21 1-1"/><path d="m19 21-1-1"/>
  </svg>
)
