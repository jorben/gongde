import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Cpu, Award, Smartphone } from 'lucide-react'

const DEVICES = [
  { id: '1', name: '智能佛珠手串', type: '手串', icon: <Cpu /> },
  { id: '2', name: '智能护身戒指', type: '戒指', icon: <Smartphone /> },
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
      <div className="p-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gongde-gold mb-8">数字开光证书</h2>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full aspect-[3/4] bg-[#F5E6CA] rounded-xl border-8 border-[#D4AF37] p-8 text-[#3E2723] shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#D4AF37]" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#D4AF37]" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#D4AF37]" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#D4AF37]" />
          
          <div className="text-center space-y-6">
            <Award size={64} className="mx-auto text-[#D4AF37]" />
            <h3 className="text-3xl font-serif font-bold border-b-2 border-[#D4AF37] pb-4">开光大吉</h3>
            <div className="space-y-4 text-left font-serif">
              <p className="text-sm">兹证明：</p>
              <p className="text-xl font-bold">智能佛珠手串</p>
              <p className="text-sm">已于 <span className="underline">2026年01月22日</span> 完成线上开光仪式，加持平安喜乐，诸事顺遂。</p>
            </div>
            <div className="pt-8 opacity-40 italic text-xs">功德 APP 监制</div>
          </div>
        </motion.div>

        <button 
          onClick={() => setIsConsecrated(false)}
          className="mt-8 text-gongde-gold border-b border-gongde-gold pb-1"
        >
          返回开光模块
        </button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gongde-gold mb-8 text-center">开光模块</h1>

      <div className="space-y-6">
        <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
          <h3 className="text-lg font-bold text-gongde-gold mb-4 flex items-center gap-2">
            <Cpu size={20} /> 智能硬件绑定
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {DEVICES.map(device => (
              <div key={device.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="text-gongde-gold">{device.icon}</div>
                  <span className="text-sm font-medium">{device.name}</span>
                </div>
                <button 
                  onClick={startBinding}
                  className="px-4 py-1.5 bg-gongde-gold text-gongde-brown rounded-full text-xs font-bold"
                  disabled={isBinding}
                >
                  {isBinding ? '正在连接...' : '绑定'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gongde-red/30 p-6 rounded-2xl border border-gongde-gold/20 text-center">
          <Sparkles className="mx-auto text-gongde-gold mb-4" size={48} />
          <h3 className="text-xl font-bold text-gongde-gold mb-2">线上开光仪式</h3>
          <p className="text-sm opacity-60 mb-6">连接您的智能设备，开启沉浸式开光体验，获得专属数字证书。</p>
          <button 
            onClick={startBinding}
            className="w-full py-4 bg-gongde-gold text-gongde-brown rounded-full font-bold shadow-lg"
            disabled={isBinding}
          >
            {isBinding ? '正在准备仪式...' : '开启仪式'}
          </button>
        </div>
      </div>
    </div>
  )
}
