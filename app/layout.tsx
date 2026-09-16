import './global.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Navbar } from '@/components/nav'
import Footer from '@/components/footer'
import { defaultFont, fonts } from '@/config'
import { resolveFonts } from '@/lib/fonts'
import { cn } from '@/lib/utils'

export { metadata } from "@/config"

const siteFonts = resolveFonts(fonts)
const fontClasses = {
  sans: 'font-sans',
  serif: 'font-serif',
  monospace: 'font-mono',
}

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
      <body className={cn(fontClasses[defaultFont], 'antialiased flow-root')}>
        {/* Keep page sizing separate from the body styles used by modal scroll locking. */}
        <div className="max-w-4xl mt-8 sm:mt-12 mx-auto px-6 md:px-4">
          <Navbar />
          <main className="min-w-0">{children}</main>
          <Footer />
        </div>
        <SpeedInsights />
      </body>
    </html>
  )
}
