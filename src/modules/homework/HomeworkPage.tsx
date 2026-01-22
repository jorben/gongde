import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, BookOpen, Music, CheckCircle2 } from 'lucide-react'

const SUTRAS = [
  { id: '1', name: '心经', duration: '5 分钟', difficulty: '入门', content: '观自在菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。舍利子，色不异空，空不异色，色即是空，空即是色，受想行识亦复如是。舍利子，是诸法空相，不生不灭，不垢不净，不增不减。是故空中无色，无受想行识，无眼耳鼻舌身意，无色声香味触法，无眼界乃至无意识界，无无明亦无无明尽，乃至无老死亦无老死尽。' },
  { id: '2', name: '金刚经', duration: '45 分钟', difficulty: '中等', content: '如是我闻。一时佛在舍卫国。祗树给孤独园。与大比丘众。千二百五十人俱。尔时世尊。食时。著衣持钵。入舍卫大城乞食。于其城中。次第乞已。还至本处。饭食讫。收衣钵。洗足已。敷座而坐。' },
  { id: '3', name: '大悲咒', duration: '8 分钟', difficulty: '入门', content: '南无、喝啰怛那、哆啰夜耶．南无、阿唎耶，婆卢羯帝、烁钵啰耶．菩提萨埵婆耶．摩诃萨埵婆耶．摩诃、迦卢尼迦耶．唵，萨皤啰罚曳．数怛那怛写．南无、悉吉栗埵、伊蒙阿唎耶．婆卢吉帝、室佛啰楞驮婆．南无、那啰谨墀．' },
]

export const HomeworkPage = () => {
  const [selectedSutra, setSelectedSutra] = useState<typeof SUTRAS[0] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  if (selectedSutra) {
    return (
      <div className="flex flex-col h-[calc(100dvh-8rem)] -mx-4 -mt-6 px-4 pt-4">
        <button 
          onClick={() => { setSelectedSutra(null); setIsPlaying(false); }}
          className="text-duo-yellow mb-6 self-start flex items-center gap-2 font-black text-xs uppercase tracking-widest"
        >
          <span className="text-xl">←</span>
          <span>返回修行</span>
        </button>
        
        <div className="text-center mb-6 space-y-2">
          <h2 className="text-3xl font-black text-duo-text">{selectedSutra.name}</h2>
          <div className="flex justify-center gap-4">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50/50 text-[11px] font-black text-amber-900/40 rounded-lg border-2 border-amber-100/50"><BookOpen size={12} strokeWidth={3} /> {selectedSutra.duration}</span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-[11px] font-black text-duo-yellow rounded-lg border-2 border-duo-yellow/10"><Sparkles size={12} strokeWidth={3} /> {selectedSutra.difficulty}</span>
          </div>
        </div>

        <div className="flex-1 duo-card p-6 overflow-y-auto relative bg-white/50 border-amber-100/30 shadow-inner min-h-0">
          <motion.div
            initial={{ y: 0 }}
            animate={isPlaying ? { y: -2000 } : {}}
            transition={{ duration: 60, ease: "linear" }}
            className="text-lg leading-[2.4] text-center font-bold text-duo-text/80 tracking-wide"
          >
            {selectedSutra.content.split('。').map((sentence, i) => (
              <p key={i} className="mb-4">{sentence}{sentence && '。'}</p>
            ))}
            {selectedSutra.content.repeat(5).split('。').map((sentence, i) => (
              <p key={i} className="mb-4">{sentence}{sentence && '。'}</p>
            ))}
          </motion.div>
        </div>

        <div className="py-8 flex justify-center items-center gap-12 flex-shrink-0">
          <button className="text-amber-300 hover:text-duo-yellow transition-colors active:scale-90"><Music size={32} strokeWidth={3} /></button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-24 h-24 rounded-[32px] flex items-center justify-center text-white transition-all ${
              isPlaying ? 'bg-duo-yellow border-b-[6px] border-duo-yellow-dark shadow-[0_6px_0_0_#B8860B]' : 'duo-btn-yellow'
            }`}
          >
            {isPlaying ? <Pause size={44} fill="currentColor" strokeWidth={0} /> : <Play size={44} fill="currentColor" strokeWidth={0} className="ml-1" />}
          </button>
          <button className="text-amber-300 hover:text-amber-500 transition-colors active:scale-90"><CheckCircle2 size={32} strokeWidth={3} /></button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-duo-text tracking-tight">功课修行</h1>
        <p className="text-xs font-black text-amber-900/20 uppercase tracking-[0.2em]">" 每日一课，积沙成塔 "</p>
      </div>
      
      <div className="space-y-5">
        <div className="flex gap-8 border-b-2 border-amber-100/50">
          <button className="text-duo-yellow border-b-4 border-duo-yellow -mb-[2px] pb-3 font-black uppercase tracking-widest text-xs transition-all">经书列表</button>
          <button className="text-amber-900/20 pb-3 text-xs font-black uppercase tracking-widest hover:text-duo-text transition-all">佛教音乐</button>
        </div>

        <div className="space-y-4">
          {SUTRAS.map((sutra) => (
            <motion.div
              key={sutra.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98, y: 2 }}
              onClick={() => setSelectedSutra(sutra)}
              className="duo-card p-5 flex items-center justify-between cursor-pointer group hover:border-duo-yellow/20 transition-all"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-duo-yellow border-2 border-duo-yellow/10 group-hover:bg-duo-yellow group-hover:text-white group-hover:border-duo-yellow transition-all">
                  <BookOpen size={28} strokeWidth={2.5} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-xl text-duo-text group-hover:text-duo-yellow transition-colors">{sutra.name}</h3>
                  <div className="flex items-center gap-3 text-[11px] font-black text-amber-900/40 uppercase tracking-tight">
                    <span>{sutra.duration}</span>
                    <span className="w-1.5 h-1.5 bg-amber-100/50 rounded-full" />
                    <span>{sutra.difficulty}</span>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50/50 flex items-center justify-center text-amber-200 group-hover:text-duo-yellow group-hover:bg-amber-50 transition-all">
                <Play size={20} fill="currentColor" strokeWidth={0} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="duo-card p-6 bg-amber-50/30 border-amber-100/10 shadow-none relative overflow-hidden">
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 p-4 opacity-[0.05] text-duo-yellow">
          <BookOpen size={100} strokeWidth={3} />
        </div>

        <h4 className="text-duo-yellow font-black mb-5 flex items-center gap-2 text-base uppercase tracking-widest">
          <Sparkles size={18} strokeWidth={3} /> 修行统计
        </h4>
        <div className="grid grid-cols-2 gap-8 relative z-10">
          <div className="space-y-1">
            <div className="text-3xl font-black text-duo-text">0</div>
            <div className="text-[10px] text-amber-900/40 font-black uppercase tracking-wider">累计功课 (次)</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black text-duo-text">0</div>
            <div className="text-[10px] text-amber-900/40 font-black uppercase tracking-wider">修行时长 (分)</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Sparkles = ({ size, strokeWidth = 2 }: { size: number; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="m5 3 1 1"/><path d="m19 3-1 1"/><path d="m5 21 1-1"/><path d="m19 21-1-1"/>
  </svg>
)
