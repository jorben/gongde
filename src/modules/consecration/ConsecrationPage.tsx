import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Cpu, Award, Smartphone, Calendar, Tag } from 'lucide-react'

const DEVICES = [
  { id: '1', name: '智能佛珠手串', type: '手串', icon: <Cpu /> },
  { id: '2', name: '智能护身戒指', type: '戒指', icon: <Smartphone /> },
]

const CONSECRATION_RECORDS = [
  { 
    id: '1', 
    master: '元空大师', 
    temple: '宝华寺住持', 
    date: '2022年2月30日', 
    tag: '限100体',
    isHighlight: true 
  },
  { 
    id: '2', 
    master: '玄真大师', 
    temple: '国清寺', 
    date: '2024年12月30日', 
    tag: '线上开光',
    isHighlight: false 
  },
]

export const ConsecrationPage = () => {
  const [isBinding, setIsBinding] = useState(false)
  const [isConsecrated, setIsConsecrated] = useState(false)

  const startBinding = () => {
    setIsBinding(true)
    setTimeout(() => {
      setIsBinding(false)
      setIsConsecrated(true)
    }, 3000)
  }

  if (isConsecrated) {
    return (
      <div className="flex flex-col items-center space-y-6 pb-4">
        <h2 className="text-2xl font-serif font-bold text-zen-text tracking-widest">数字开光证书</h2>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full aspect-[3/4] max-h-[60vh] bg-[#FCFAF5] rounded-2xl border-[8px] border-[#D4C4A8]/20 p-6 text-zen-text shadow-xl relative overflow-hidden flex flex-col items-center justify-between"
        >
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/vintage-paper.png')]" />
          
          {/* Corner Elements */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-zen-gold/30 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-zen-gold/30 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-zen-gold/30 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-zen-gold/30 rounded-br-lg" />
          
          <div className="relative z-10 text-center space-y-4 w-full">
            <div className="w-14 h-14 bg-zen-gold/10 rounded-full flex items-center justify-center mx-auto">
              <Award size={28} className="text-zen-gold" strokeWidth={1.5} />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-2xl font-serif font-bold text-zen-gold tracking-[0.2em]">开光大吉</h3>
              <div className="h-0.5 w-16 bg-zen-gold/20 mx-auto" />
            </div>

            <div className="space-y-3 text-left font-serif leading-relaxed px-2">
              <p className="text-xs text-zen-text/40 tracking-widest">兹证明：</p>
              <div className="space-y-1">
                <p className="text-lg font-bold tracking-widest border-b border-zen-text/10 pb-1">智能佛珠手串</p>
                <p className="text-[11px] text-zen-text/60 leading-relaxed">
                  已于 <span className="text-zen-gold">2026年01月22日</span> 完成线上开光仪式，承蒙佛力加持，护佑平安喜乐。
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 w-full flex flex-col items-center gap-2">
            <div className="zen-vertical-text text-[9px] text-zen-text/20 font-serif tracking-widest h-14">
              功德 APP 开光专用印鉴
            </div>
            <div className="w-10 h-10 bg-zen-pink/20 rounded-lg flex items-center justify-center border border-zen-pink/30 text-zen-pink text-[9px] font-bold">
              开光<br/>印玺
            </div>
          </div>
        </motion.div>

        <button 
          onClick={() => setIsConsecrated(false)}
          className="text-zen-gold/60 hover:text-zen-gold text-xs tracking-widest border-b border-zen-gold/20 pb-1 transition-all"
        >
          返回开光模块
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-4">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-serif font-bold text-zen-text tracking-widest">开光加持</h1>
        <p className="text-[10px] text-zen-text/40 italic">" 万物有灵 · 虔诚加持 "</p>
      </div>

      <div className="space-y-5">
        <div className="zen-card p-5 space-y-4">
          <h3 className="text-lg font-serif font-bold text-zen-text flex items-center gap-2">
            <Cpu size={20} className="text-zen-gold" strokeWidth={1.5} /> 
            <span>智能硬件绑定</span>
          </h3>
          <div className="space-y-3">
            {DEVICES.map(device => (
              <div key={device.id} className="flex items-center justify-between p-4 bg-zen-bg/50 rounded-xl group hover:bg-white transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-zen-gold shadow-sm group-hover:scale-105 transition-transform">
                    {device.icon}
                  </div>
                  <span className="font-serif font-bold text-sm text-zen-text">{device.name}</span>
                </div>
                <button 
                  onClick={startBinding}
                  className="px-4 py-1.5 bg-zen-gold/10 text-zen-gold rounded-full text-xs font-bold hover:bg-zen-gold hover:text-white transition-all disabled:opacity-50"
                  disabled={isBinding}
                >
                  {isBinding ? '连接中' : '去绑定'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Consecration Records */}
        <div className="space-y-3">
          {CONSECRATION_RECORDS.map(record => (
            <motion.div 
              key={record.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`zen-card p-4 relative overflow-hidden ${
                record.isHighlight 
                  ? 'border-2 border-zen-gold bg-gradient-to-r from-zen-gold/10 to-zen-gold/5 shadow-lg shadow-zen-gold/20' 
                  : ''
              }`}
            >
              {record.isHighlight && (
                <div className="absolute top-0 right-0 bg-zen-gold text-white text-[9px] px-3 py-1 rounded-bl-lg font-bold">
                  精选
                </div>
              )}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    record.isHighlight ? 'bg-zen-gold text-white' : 'bg-zen-gold/10 text-zen-gold'
                  }`}>
                    <Sparkles size={18} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-serif font-bold ${record.isHighlight ? 'text-zen-gold' : 'text-zen-text'}`}>
                        {record.temple}{record.master}开光
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-zen-text/50">
                      <Calendar size={12} />
                      <span>{record.date}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                  record.isHighlight 
                    ? 'bg-zen-pink/20 text-zen-pink' 
                    : 'bg-zen-text/10 text-zen-text/60'
                }`}>
                  <Tag size={10} />
                  {record.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
