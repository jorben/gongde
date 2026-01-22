import { motion } from 'framer-motion'
import { Video, ShoppingBag, Heart, MessageSquare, PlayCircle } from 'lucide-react'

const LIVES = [
  { id: '1', title: '《金刚经》深层解析', master: '慧能法师', viewers: '1.2k', thumbnail: '🧘' },
  { id: '2', title: '日常禅修：如何静心', master: '弘一居士', viewers: '856', thumbnail: '🍵' },
]

const PRODUCTS = [
  { id: '1', name: '手工沉香', price: '￥199', category: '文创', image: '/goods/chenxiang.png' },
  { id: '2', name: '紫檀佛珠', price: '￥599', category: '智能硬件', image: '/goods/fozhu.png' },
  { id: '3', name: '《金刚经》抄经本', price: '￥39', category: '经书', image: '/goods/jinggangjin.png' },
]

export const LecturePage = () => {
  return (
    <div className="space-y-10 pb-4">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-duo-text tracking-tight drop-shadow-sm">禅修讲经</h1>
        <p className="text-xs font-black text-amber-900/30 uppercase tracking-[0.2em]">" 闻思修行 · 智慧增广 "</p>
      </div>

      {/* Live Section */}
      <section className="space-y-5">
        <div className="flex justify-between items-end px-2">
          <h2 className="text-2xl font-black text-duo-text flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-duo-yellow">
              <Video size={24} strokeWidth={2.5} /> 
            </div>
            <span>讲经直播</span>
          </h2>
          <span className="text-[10px] font-black text-white bg-red-500 px-3 py-1 rounded-full tracking-widest uppercase shadow-sm animate-pulse">Live</span>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4">
          {LIVES.map(live => (
            <motion.div 
              key={live.id} 
              whileHover={{ scale: 1.02 }}
              className="min-w-[280px] duo-card overflow-hidden group border-amber-100"
            >
              <div className="h-40 bg-amber-50/50 flex items-center justify-center text-6xl relative border-b-2 border-amber-50">
                {live.thumbnail}
                <div className="absolute inset-0 bg-duo-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl text-duo-yellow scale-75 group-hover:scale-100 transition-transform duration-300">
                    <PlayCircle size={40} fill="currentColor" className="opacity-90" />
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[10px] px-3 py-1.5 rounded-xl flex items-center gap-2 text-duo-text font-black shadow-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  <span>2k+ 同修</span>
                </div>
              </div>
              <div className="p-5 space-y-3 bg-white">
                <h3 className="text-xl font-black text-duo-text line-clamp-1 group-hover:text-duo-yellow transition-colors">{live.title}</h3>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-amber-50 rounded-full flex items-center justify-center text-duo-yellow">
                      <Heart size={12} fill="currentColor" />
                    </div>
                    <span className="text-xs font-bold text-amber-900/60">{live.master}</span>
                  </div>
                  <span className="text-[10px] font-black text-amber-900/30 uppercase tracking-widest">{live.viewers} 赞叹</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Shop Section */}
      <section className="space-y-5">
        <div className="flex justify-between items-end px-2">
          <h2 className="text-2xl font-black text-duo-text flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-duo-yellow">
              <ShoppingBag size={24} strokeWidth={2.5} /> 
            </div>
            <span>宝物流通处</span>
          </h2>
          <button className="text-[10px] font-black text-duo-yellow uppercase tracking-widest hover:underline">查看全部</button>
        </div>
        
        <div className="grid grid-cols-2 gap-5">
          {PRODUCTS.map(product => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98, y: 4 }}
              className="duo-card p-5 group transition-all duration-300"
            >
              <div className="aspect-square bg-amber-50/50 rounded-2xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner border-2 border-amber-50 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="text-[9px] font-black text-duo-yellow uppercase tracking-widest opacity-60">{product.category}</div>
                  <h3 className="text-base font-black text-duo-text truncate group-hover:text-duo-yellow transition-colors">{product.name}</h3>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-duo-text font-black text-lg">{product.price}</span>
                  <button className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center text-duo-yellow border-2 border-amber-100 hover:bg-duo-yellow hover:text-white transition-all shadow-sm">
                    <ShoppingBag size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interaction */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="duo-card p-6 flex items-center justify-between bg-amber-50/30 border-amber-100 shadow-none relative overflow-hidden"
      >
        {/* Decorative Ring */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 border-[12px] border-duo-yellow/5 rounded-full" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 bg-white rounded-2xl border-2 border-amber-100 shadow-sm flex items-center justify-center text-duo-yellow">
            <MessageSquare size={28} strokeWidth={2.5} />
          </div>
          <div className="space-y-1">
            <p className="font-black text-duo-yellow text-lg leading-none">随喜赞叹</p>
            <p className="text-[10px] font-black text-amber-900/40 uppercase tracking-widest">234 位同修在线互动</p>
          </div>
        </div>
        <button className="duo-btn-yellow px-6 py-3 text-xs relative z-10">
          加入互动
        </button>
      </motion.div>
    </div>
  )
}
