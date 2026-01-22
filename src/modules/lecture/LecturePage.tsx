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
    <div className="space-y-8 pb-4">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-serif font-bold text-zen-text tracking-widest">禅修讲经</h1>
        <p className="text-[10px] text-zen-text/40 italic">" 闻思修行 · 智慧增广 "</p>
      </div>

      {/* Live Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <h2 className="text-xl font-serif font-bold text-zen-text flex items-center gap-2">
            <Video size={20} className="text-zen-gold" strokeWidth={1.5} /> 
            <span>讲经直播</span>
          </h2>
          <span className="text-[9px] text-zen-gold/60 font-medium tracking-widest uppercase">Live</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar">
          {LIVES.map(live => (
            <div key={live.id} className="min-w-[220px] zen-card overflow-hidden group border-none hover:shadow-xl transition-all duration-500">
              <div className="h-28 bg-zen-gold/5 flex items-center justify-center text-5xl relative">
                {live.thumbnail}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-zen-gold scale-75 group-hover:scale-100 transition-transform duration-500">
                    <PlayCircle size={28} fill="currentColor" className="opacity-80" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-zen-pink text-[8px] px-2 py-0.5 rounded-full flex items-center gap-1.5 text-white font-bold shadow-lg shadow-zen-pink/20">
                  <div className="w-1 h-1 bg-white rounded-full animate-ping" /> 直播中
                </div>
              </div>
              <div className="p-4 space-y-2 bg-white">
                <h3 className="font-serif font-bold text-zen-text text-sm group-hover:text-zen-gold transition-colors line-clamp-1">{live.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-zen-text/60 font-serif">{live.master}</span>
                  <span className="flex items-center gap-1 text-[9px] text-zen-text/30"><Heart size={10} /> {live.viewers}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <h2 className="text-xl font-serif font-bold text-zen-text flex items-center gap-2">
            <ShoppingBag size={20} className="text-zen-gold" strokeWidth={1.5} /> 
            <span>佛系商城</span>
          </h2>
          <button className="text-[9px] text-zen-gold font-bold tracking-widest hover:underline uppercase transition-all">查看全部</button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {PRODUCTS.map(product => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -4 }}
              className="zen-card p-4 group hover:bg-white transition-all duration-300"
            >
              <div className="aspect-square bg-zen-bg rounded-xl mb-3 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-500 shadow-inner">
                {product.image}
              </div>
              <div className="space-y-2">
                <div className="space-y-0.5">
                  <div className="text-[8px] text-zen-gold font-bold tracking-widest uppercase opacity-60">{product.category}</div>
                  <h3 className="text-xs font-serif font-bold text-zen-text truncate group-hover:text-zen-gold transition-colors">{product.name}</h3>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zen-text font-serif font-bold text-sm">{product.price}</span>
                  <button className="w-8 h-8 bg-zen-gold/10 rounded-full flex items-center justify-center text-zen-gold hover:bg-zen-gold hover:text-white transition-all">
                    <ShoppingBag size={14} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interaction */}
      <div className="zen-card p-4 flex items-center justify-between border-none bg-zen-gold/5 overflow-hidden relative">
        {/* Decorative Ring */}
        <div className="absolute -right-3 -bottom-3 w-16 h-16 border-4 border-zen-gold/5 rounded-full" />
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-zen-gold">
            <MessageSquare size={18} strokeWidth={1.5} />
          </div>
          <div className="space-y-0.5">
            <p className="font-serif font-bold text-zen-gold text-sm">随喜赞叹</p>
            <p className="text-[9px] text-zen-text/40">234 位同修在线</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-zen-gold text-white rounded-full text-[10px] font-bold shadow-lg shadow-zen-gold/20 hover:scale-105 transition-all active:scale-95 relative z-10">
          加入互动
        </button>
      </div>
    </div>
  )
}
