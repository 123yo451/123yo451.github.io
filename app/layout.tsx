import './global.css'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ResponsiveNavbar } from '@/components/resnav'
import Footer from '@/components/footer'

export { metadata } from "@/config"

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-3xl mt-8 sm:mt-12 mx-auto px-6 md:px-4">
        <ResponsiveNavbar />
        <main className="min-w-0">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
