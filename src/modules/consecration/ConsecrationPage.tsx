import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Cpu, Award, Smartphone, Calendar, Tag, MapPin, ChevronLeft } from 'lucide-react'

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
      <div className="flex flex-col items-center space-y-8 pb-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-duo-text tracking-tight">开光证书</h1>
          <p className="text-xs font-black text-amber-900/30 uppercase tracking-[0.2em]">" 佛力加持 · 佑护平顺 "</p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-sm aspect-[3/4] bg-white rounded-[32px] border-4 border-duo-yellow/20 p-8 shadow-[0_12px_40px_rgba(212,160,23,0.15)] relative overflow-hidden flex flex-col items-center justify-between"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 p-8 opacity-[0.05] text-duo-yellow rotate-12">
            <Award size={180} strokeWidth={3} />
          </div>
          
          <div className="relative z-10 text-center space-y-6 w-full">
            <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto border-2 border-duo-yellow/10 shadow-sm">
              <Award size={40} className="text-duo-yellow" strokeWidth={2.5} />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-duo-yellow tracking-widest uppercase">开光大吉</h3>
              <div className="h-1.5 w-16 bg-duo-yellow/10 mx-auto rounded-full" />
            </div>

            <div className="space-y-4 text-left px-2">
              <p className="text-[10px] font-black text-amber-900/30 uppercase tracking-widest">兹证明：</p>
              <div className="space-y-2">
                <p className="text-2xl font-black text-duo-text tracking-tight border-b-2 border-amber-50 pb-2">智能佛珠手串</p>
                <p className="text-xs font-bold text-amber-900/60 leading-relaxed">
                  已于 <span className="text-duo-yellow font-black">2026年01月22日</span> 完成线上开光仪式，承蒙佛力加持，护佑平安喜乐。
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 w-full flex flex-col items-center gap-4">
            <div className="text-[9px] font-black text-amber-900/20 uppercase tracking-[0.3em]">
              功德 APP 专用认证
            </div>
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center border-2 border-duo-yellow/20 text-duo-yellow text-[10px] font-black shadow-sm rotate-12">
              开光<br/>印玺
            </div>
          </div>
        </motion.div>

        <button 
          onClick={() => setIsConsecrated(false)}
          className="duo-btn-gray flex items-center gap-2"
        >
          <ChevronLeft size={18} strokeWidth={3} />
          <span>返回加持</span>
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-4">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-duo-text tracking-tight drop-shadow-sm">开光加持</h1>
        <p className="text-xs font-black text-amber-900/30 uppercase tracking-[0.2em]">" 万物有灵 · 虔诚加持 "</p>
      </div>

      <div className="space-y-6">
        <div className="duo-card p-6 space-y-5">
          <h3 className="text-xl font-black text-duo-text flex items-center gap-3 uppercase tracking-widest">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-duo-yellow">
              <Cpu size={24} strokeWidth={2.5} /> 
            </div>
            <span>硬件绑定</span>
          </h3>
          <div className="space-y-4">
            {DEVICES.map(device => (
              <div key={device.id} className="flex items-center justify-between p-4 bg-amber-50/30 rounded-2xl border-2 border-amber-100/30 group hover:border-duo-yellow/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-duo-yellow border-2 border-amber-100 shadow-sm group-hover:scale-105 transition-transform">
                    {device.icon}
                  </div>
                  <span className="font-black text-base text-duo-text">{device.name}</span>
                </div>
                <button 
                  onClick={startBinding}
                  className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${
                    isBinding 
                      ? 'bg-amber-100 text-amber-900/30' 
                      : 'bg-duo-yellow text-white shadow-[0_3px_0_0_#B8860B] active:translate-y-[2px] active:shadow-none'
                  }`}
                  disabled={isBinding}
                >
                  {isBinding ? '连接中' : '去绑定'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Consecration Records */}
        <div className="space-y-4">
          {CONSECRATION_RECORDS.map(record => (
            <motion.div 
              key={record.id}
              whileHover={{ scale: 1.02 }}
              className={`duo-card p-6 relative overflow-hidden ${
                record.isHighlight 
                  ? 'border-duo-yellow shadow-[0_6px_0_0_#FFB800]' 
                  : ''
              }`}
            >
              {record.isHighlight && (
                <div className="absolute top-0 right-0 bg-duo-yellow text-white text-[10px] px-4 py-1.5 rounded-bl-2xl font-black uppercase tracking-wider">
                  精选仪式
                </div>
              )}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 ${
                    record.isHighlight 
                      ? 'bg-duo-yellow text-white border-duo-yellow-dark shadow-sm' 
                      : 'bg-amber-50 text-duo-yellow border-amber-100'
                  }`}>
                    <Sparkles size={28} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-black ${record.isHighlight ? 'text-duo-text' : 'text-duo-text'}`}>
                        {record.temple}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-amber-900/60">{record.master}开光</div>
                    <div className="flex items-center gap-2 text-[11px] font-black text-amber-900/30 uppercase">
                      <Calendar size={12} strokeWidth={3} />
                      <span>{record.date}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black flex items-center gap-1.5 border-2 ${
                  record.isHighlight 
                    ? 'bg-white text-duo-yellow border-duo-yellow/20 shadow-sm' 
                    : 'bg-amber-50/50 text-amber-900/40 border-amber-100/50'
                }`}>
                  <Tag size={12} strokeWidth={3} />
                  {record.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 开光地图模块 */}
        <div className="duo-card p-0 overflow-hidden relative border-amber-100">
          {/* 地图背景 */}
          <div className="absolute inset-0 bg-amber-50/50">
            {/* 模拟地图网格线 */}
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full" style={{
                backgroundImage: `
                  linear-gradient(rgba(212, 160, 23, 0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(212, 160, 23, 0.5) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }} />
            </div>
            {/* 模拟地图标记点 */}
            <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-duo-yellow rounded-full animate-ping opacity-30" />
            <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-duo-yellow rounded-full shadow-[0_0_10px_rgba(255,184,0,0.5)]" />
          </div>
          
          {/* 内容 */}
          <div className="relative z-10 p-6 space-y-4">
            <h3 className="text-xl font-black text-duo-text flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl border-2 border-amber-100 flex items-center justify-center shadow-sm">
                <MapPin size={28} className="text-duo-yellow" strokeWidth={2.5} />
              </div>
              <span>线下开光点</span>
            </h3>
            <p className="text-sm font-bold text-amber-900/60 leading-relaxed pl-1">
              绑定智能硬件，寻找您附近支持线下加持的寺庙与道场
            </p>
            <div className="flex justify-end pt-2">
              <button className="duo-btn-yellow px-6 py-3 text-xs flex items-center gap-2">
                <MapPin size={16} strokeWidth={3} />
                <span>查看附近地图</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
