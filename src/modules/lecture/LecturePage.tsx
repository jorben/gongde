import React from 'react'
import { motion } from 'framer-motion'
import { Video, ShoppingBag, Heart, MessageSquare, PlayCircle } from 'lucide-react'

const LIVES = [
  { id: '1', title: '《金刚经》深层解析', master: '慧能法师', viewers: '1.2k', thumbnail: '🧘' },
  { id: '2', title: '日常禅修：如何静心', master: '弘一居士', viewers: '856', thumbnail: '🍵' },
]

const PRODUCTS = [
  { id: '1', name: '手工沉香', price: '￥199', category: '文创', image: '🪵' },
  { id: '2', name: '紫檀佛珠', price: '￥599', category: '智能硬件', image: '📿' },
  { id: '3', name: '《心经》抄经本', price: '￥39', category: '经书', image: '📖' },
]

export const LecturePage = () => {
  return (
    <div className="p-6 space-y-8 pb-24">
      {/* Live Section */}
      <section>
        <h2 className="text-2xl font-bold text-gongde-gold mb-4 flex items-center gap-2">
          <Video size={24} /> 讲经直播
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {LIVES.map(live => (
            <div key={live.id} className="min-w-[240px] bg-black/30 rounded-2xl overflow-hidden border border-white/10 group">
              <div className="h-32 bg-gongde-red/20 flex items-center justify-center text-6xl relative">
                {live.thumbnail}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <PlayCircle size={48} className="text-gongde-gold" />
                </div>
                <div className="absolute top-2 left-2 bg-red-600 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse" /> 直播中
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gongde-gold mb-1">{live.title}</h3>
                <div className="flex justify-between items-center text-xs opacity-60">
                  <span>{live.master}</span>
                  <span className="flex items-center gap-1"><Heart size={10} /> {live.viewers}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gongde-gold flex items-center gap-2">
            <ShoppingBag size={24} /> 佛系商城
          </h2>
          <button className="text-xs text-gongde-gold opacity-60">更多 →</button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {PRODUCTS.map(product => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -5 }}
              className="bg-black/20 rounded-2xl p-4 border border-white/10"
            >
              <div className="aspect-square bg-white/5 rounded-xl mb-4 flex items-center justify-center text-4xl">
                {product.image}
              </div>
              <div className="text-[10px] text-gongde-gold opacity-60 mb-1">{product.category}</div>
              <h3 className="text-sm font-bold mb-2 truncate">{product.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-gongde-gold font-bold">{product.price}</span>
                <button className="p-2 bg-gongde-gold/10 rounded-full text-gongde-gold hover:bg-gongde-gold hover:text-gongde-brown transition-colors">
                  <ShoppingBag size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interaction */}
      <div className="bg-gongde-red/30 p-4 rounded-xl flex items-center justify-between border border-gongde-gold/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gongde-gold rounded-full flex items-center justify-center text-gongde-brown">
            <MessageSquare size={20} />
          </div>
          <div className="text-xs">
            <p className="font-bold text-gongde-gold">随喜赞叹</p>
            <p className="opacity-60">当前有 234 位同修在线交流</p>
          </div>
        </div>
        <button className="px-4 py-1.5 bg-gongde-gold text-gongde-brown rounded-full text-xs font-bold">加入互动</button>
      </div>
    </div>
  )
}
