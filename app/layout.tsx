import './globals.css';
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/index';


export const metadata = {
  title: "SEP Conseils : Cabinet d'extermination de paie",
  description: "Cabinet d'extermination de paie",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
