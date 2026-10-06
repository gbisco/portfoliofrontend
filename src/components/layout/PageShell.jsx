import Navbar from './Navbar'
import Footer from './Footer'
import '../../styles/components/layout/page-shell.css'

function PageShell({ children }) {
  return (
    <div className="page-shell">
      <Navbar />

      <main className="page-shell__content">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default PageShell