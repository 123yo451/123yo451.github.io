import './global.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ResponsiveNavbar } from '@/components/resnav'
import Footer from '@/components/footer'
import { fonts } from '@/config'
import { resolveFonts } from '@/lib/fonts'

export { metadata } from "@/config"

const siteFonts = resolveFonts(fonts)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className="text-black bg-white"
    >
      <head>
        {siteFonts.stylesheets.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <style dangerouslySetInnerHTML={{ __html: siteFonts.css }} />
      </head>
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
