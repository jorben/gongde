import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { WorshipPage } from './modules/worship/WorshipPage'
import { HomeworkPage } from './modules/homework/HomeworkPage'
import { ConsecrationPage } from './modules/consecration/ConsecrationPage'
import { LecturePage } from './modules/lecture/LecturePage'
import { TemplesPage } from './modules/temples/TemplesPage'
import { ProductListPage } from './modules/products/ProductListPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<WorshipPage />} />
          <Route path="/homework" element={<HomeworkPage />} />
          <Route path="/consecration" element={<ConsecrationPage />} />
          <Route path="/lecture" element={<LecturePage />} />
          <Route path="/temples" element={<TemplesPage />} />
          <Route path="/products/:category" element={<ProductListPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
