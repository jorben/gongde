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
      <div className="flex flex-col h-[calc(100dvh-7rem)] bg-zen-bg -mx-4 -mt-6 px-4 pt-4">
        <button 
          onClick={() => { setSelectedSutra(null); setIsPlaying(false); }}
          className="text-zen-gold mb-4 self-start flex items-center gap-2 font-medium text-sm"
        >
          <span className="text-lg">←</span>
          <span>返回修行</span>
        </button>
        
        <div className="text-center mb-4 space-y-1">
          <h2 className="text-3xl font-serif text-zen-text tracking-[0.2em]">{selectedSutra.name}</h2>
          <div className="flex justify-center gap-4 text-[10px] text-zen-text/40 tracking-widest">
            <span className="flex items-center gap-1"><BookOpen size={10} /> {selectedSutra.duration}</span>
            <span className="flex items-center gap-1"><Sparkles size={10} /> {selectedSutra.difficulty}</span>
          </div>
        </div>

        <div className="flex-1 zen-card p-5 overflow-y-auto relative bg-white/40 border-none shadow-inner min-h-0">
          <motion.div
            initial={{ y: 0 }}
            animate={isPlaying ? { y: -2000 } : {}}
            transition={{ duration: 60, ease: "linear" }}
            className="text-lg leading-[2.2] text-center font-serif text-zen-text/80 tracking-widest"
          >
            {selectedSutra.content.split('。').map((sentence, i) => (
              <p key={i} className="mb-3">{sentence}{sentence && '。'}</p>
            ))}
            {selectedSutra.content.repeat(5).split('。').map((sentence, i) => (
              <p key={i} className="mb-3">{sentence}{sentence && '。'}</p>
            ))}
          </motion.div>
        </div>

        <div className="py-4 flex justify-center items-center gap-10 flex-shrink-0">
          <button className="text-zen-text/20 hover:text-zen-gold transition-colors"><Music size={22} /></button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 bg-zen-gold rounded-full flex items-center justify-center text-white shadow-xl shadow-zen-gold/30 transition-transform active:scale-90"
          >
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>
          <button className="text-zen-text/20 hover:text-zen-green transition-colors"><CheckCircle2 size={22} /></button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-4">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-serif font-bold text-zen-text tracking-widest">功课修行</h1>
        <p className="text-[10px] text-zen-text/40 italic">" 每日一课，积沙成塔 "</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-6 border-b border-zen-text/5 pb-1">
          <button className="text-zen-gold border-b-2 border-zen-gold pb-2 font-bold tracking-widest text-sm transition-all">经书列表</button>
          <button className="text-zen-text/30 pb-2 text-sm tracking-widest hover:text-zen-text transition-all">佛教音乐</button>
        </div>

        <div className="space-y-3">
          {SUTRAS.map((sutra) => (
            <motion.div
              key={sutra.id}
              whileHover={{ scale: 1.01, x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedSutra(sutra)}
              className="zen-card p-4 flex items-center justify-between cursor-pointer group hover:bg-white transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zen-gold/10 rounded-xl flex items-center justify-center text-zen-gold group-hover:bg-zen-gold group-hover:text-white transition-all">
                  <BookOpen size={24} strokeWidth={1.5} />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-serif font-bold text-lg text-zen-text">{sutra.name}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-zen-text/40">
                    <span>{sutra.duration}</span>
                    <span className="w-1 h-1 bg-zen-text/10 rounded-full" />
                    <span>{sutra.difficulty}</span>
                  </div>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-zen-bg flex items-center justify-center text-zen-gold/40 group-hover:text-zen-gold transition-all">
                <Play size={18} fill="currentColor" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="zen-card p-6 bg-zen-gold/5 border-none shadow-none relative overflow-hidden">
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 p-2 opacity-5">
          <BookOpen size={80} />
        </div>

        <h4 className="text-zen-gold font-serif font-bold mb-4 flex items-center gap-2 text-base">
          <Sparkles size={16} /> 修行统计
        </h4>
        <div className="grid grid-cols-2 gap-6 relative z-10">
          <div className="space-y-0.5">
            <div className="text-2xl font-serif font-bold text-zen-text">0</div>
            <div className="text-[9px] text-zen-text/40 tracking-[0.15em] uppercase">累计功课 (次)</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-2xl font-serif font-bold text-zen-text">0</div>
            <div className="text-[9px] text-zen-text/40 tracking-[0.15em] uppercase">修行时长 (分)</div>
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
