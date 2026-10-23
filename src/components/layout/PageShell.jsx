import Navbar from './Navbar'
import Footer from './Footer'
import ScrollManager from './ScrollManager'
import ChatWidget from '../chat/ChatWidget'
import { GoogleAuthProvider } from '../../auth/GoogleAuthContext'
import '../../styles/components/layout/page-shell.css'

function PageShell({ children }) {
  return (
    <GoogleAuthProvider>
      <div className="page-shell">
        <Navbar />
        <ScrollManager />

        <main className="page-shell__content">
          {children}
        </main>

        <Footer />
        <ChatWidget />
      </div>
    </GoogleAuthProvider>
  )
}

export default PageShell