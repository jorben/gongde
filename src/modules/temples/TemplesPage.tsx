import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, ArrowLeft, Loader2, Check } from 'lucide-react'
import { useUserStore } from '../../store/useUserStore'

interface Temple {
  id: string
  name: string
  image: string
  description: string
  distance: string
}

const TEMPLES_DATA: Temple[] = [
  {
    id: '1',
    name: '南海龙王神州庙',
    image: '/simiao/1.png',
    description: '南海龙王神州庙，位于海滨之畔，供奉龙王神像，香火鼎盛，祈求风调雨顺。',
    distance: '1.2km',
  },
  {
    id: '2',
    name: '普陀禅寺',
    image: '/simiao/2.png',
    description: '普陀禅寺，观音菩萨道场，环境清幽，古刹钟声悠扬，是禅修静心的圣地。',
    distance: '2.5km',
  },
  {
    id: '3',
    name: '灵隐古刹',
    image: '/simiao/3.png',
    description: '灵隐寺始建于东晋，历史悠久，佛教文化底蕴深厚，是江南著名的古刹名寺。',
    distance: '3.8km',
  },
  {
    id: '4',
    name: '大慈恩寺',
    image: '/simiao/4.png',
    description: '大慈恩寺，玄奘法师译经之所，大雁塔矗立其中，是佛教文化传承的重要场所。',
    distance: '5.1km',
  },
  {
    id: '5',
    name: '白马寺',
    image: '/simiao/5.png',
    description: '白马寺，中国第一古刹，佛教传入中国后兴建的第一座官办寺院，意义非凡。',
    distance: '8.3km',
  },
  {
    id: '6',
    name: '少林禅院',
    image: '/simiao/6.png',
    description: '少林寺，禅宗祖庭，武术圣地。千年古刹，传承禅武合一的独特文化。',
    distance: '12.6km',
  },
]

export const TemplesPage = () => {
  const navigate = useNavigate()
  const { selectedTemple, setSelectedTemple } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleRefreshLocation = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  const handleSelectTemple = (templeName: string) => {
    setSelectedTemple(templeName)
    navigate(-1)
  }

  return (
    <div className="flex flex-col min-h-full pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <ArrowLeft size={20} className="text-zen-text" />
        </button>
        <h1 className="text-xl font-serif font-bold text-zen-text tracking-widest">附近寺庙</h1>
        <button
          onClick={handleRefreshLocation}
          disabled={isLoading}
          className="p-2 -mr-2 rounded-full hover:bg-white/50 transition-colors"
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin text-zen-gold" />
          ) : (
            <MapPin size={20} className="text-zen-gold" />
          )}
        </button>
      </div>

      {/* Temple List */}
      <div className="space-y-4">
        {TEMPLES_DATA.map((temple, index) => (
          <motion.div
            key={temple.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`zen-card p-3 flex gap-3 cursor-pointer hover:shadow-lg transition-all ${
              selectedTemple === temple.name ? 'ring-2 ring-zen-gold' : ''
            }`}
            onClick={() => handleSelectTemple(temple.name)}
          >
            {/* Temple Image */}
            <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-zen-bg relative">
              <img
                src={temple.image}
                alt={temple.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/bodhisattva-guanyin.png'
                }}
              />
              {selectedTemple === temple.name && (
                <div className="absolute top-1 right-1 w-5 h-5 bg-zen-gold rounded-full flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
            </div>

            {/* Temple Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <div>
                <h3 className="text-base font-bold text-zen-text truncate">{temple.name}</h3>
                <p className="text-xs text-zen-text/60 mt-1 line-clamp-2 leading-relaxed">
                  {temple.description}
                </p>
              </div>
              <div className="flex items-center gap-1 text-zen-gold">
                <MapPin size={12} />
                <span className="text-xs font-medium">{temple.distance}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
