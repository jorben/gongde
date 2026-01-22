import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

interface Product {
  id: string
  name: string
  description?: string
  price: string
  image?: string
}

interface CategoryConfig {
  title: string
  products: Product[]
}

const CATEGORY_DATA: Record<string, CategoryConfig> = {
  incense: {
    title: '请香',
    products: [
      { id: '1', name: '线香-檀香', price: '¥9', description: '传统檀香，清香怡人' },
      { id: '2', name: '柱香-可署名', price: '¥99', description: '可刻印祈愿人姓名' },
      { id: '3', name: '红烛', price: '¥9', description: '祈福红烛，光明吉祥' },
      { id: '4', name: '海南龙王庙专供大红烛', price: '¥888', description: '龙王庙特供，殊胜庄严' },
    ],
  },
  merit: {
    title: '功德',
    products: [
      { id: '1', name: '功德捐赠', price: '¥1起', description: '随喜功德，广种福田' },
      { id: '2', name: '弘法寺大雄宝殿修缮', price: '¥100起', description: '可在功德碑署名' },
      { id: '3', name: '弘法寺藏经阁建造', price: '¥100起', description: '可在功德碑署名' },
    ],
  },
  donation: {
    title: '募捐',
    products: [
      { id: '1', name: '留守儿童月捐计划', price: '随喜', description: '关爱留守儿童，传递温暖' },
      { id: '2', name: '腾讯公益合作计划', price: '随喜', description: '与腾讯公益携手行善' },
    ],
  },
}

export const ProductListPage = () => {
  const navigate = useNavigate()
  const { category } = useParams<{ category: string }>()
  
  const config = CATEGORY_DATA[category || ''] || CATEGORY_DATA.incense

  const handleProductClick = (product: Product) => {
    // 暂时弹窗提示
    alert(`即将开放：${product.name}`)
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-b from-amber-50 to-amber-50/95 backdrop-blur-sm">
        <div className="flex items-center px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-duo-text hover:bg-amber-100/50 rounded-full transition-colors"
          >
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
          <h1 className="flex-1 text-center text-xl font-black text-duo-text pr-8">
            {config.title}
          </h1>
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1 px-4 py-2 space-y-3">
        {config.products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="duo-card p-4 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-shadow active:scale-[0.98]"
          >
            {/* Product Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center border-2 border-amber-200/50 flex-shrink-0">
              <span className="text-2xl">
                {category === 'incense' && '🪔'}
                {category === 'merit' && '🙏'}
                {category === 'donation' && '💝'}
              </span>
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-black text-duo-text truncate">
                {product.name}
              </h3>
              {product.description && (
                <p className="text-xs text-amber-900/50 mt-1 truncate">
                  {product.description}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex-shrink-0">
              <span className="text-lg font-black text-duo-yellow">
                {product.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Tip */}
      <div className="px-4 py-6">
        <p className="text-center text-xs font-bold text-amber-900/30">
          " 随喜功德 · 福慧双修 "
        </p>
      </div>
    </div>
  )
}
