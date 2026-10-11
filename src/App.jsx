import { Route, Routes } from 'react-router-dom'

import PageShell from './components/layout/PageShell'
import Home from './pages/Home'
import Experience from './pages/Experience'
import Education from './pages/Education'
import Projects from './pages/Projects'


function App() {
  return (
    <PageShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
      </Routes>
    </PageShell>
  )
}

export default App