import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dracula.wtf - Bloodsucker Detector',
  description: 'Analyze text to detect vampire-like behavior. Get your Vampire Scale score with a Dracula-style roast.',
  keywords: 'vampire detector, text analysis, humor, satire, dracula',
  authors: [{ name: 'Dracula.wtf' }],
  icons: {
    icon: '/dracula.png',
    shortcut: '/dracula.png',
    apple: '/dracula.png',
  },
  openGraph: {
    title: 'Dracula.wtf - Bloodsucker Detector',
    description: 'How vampiric is your text? Get roasted by Dracula himself.',
    url: 'https://dracula.wtf',
    siteName: 'Dracula.wtf',
    images: [
      {
        url: 'https://dracula.wtf/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Dracula.wtf - Bloodsucker Detector',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dracula.wtf - Bloodsucker Detector',
    description: 'How vampiric is your text? Get roasted by Dracula himself.',
    images: ['https://dracula.wtf/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Hotjar Tracking Code for Site 6515744 */}
        <Script
          id="hotjar"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:6515744,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-charcoal-800 bg-charcoal-950/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <a href="/" className="flex items-center space-x-2 group">
                  <img src="/dracula.png" alt="Dracula" className="w-8 h-8 object-contain" />
                  <h1 className="font-serif text-2xl font-bold text-blood-400 group-hover:text-blood-300 transition-colors">
                    dracula.wtf
                  </h1>
                </a>
                <nav className="flex items-center space-x-4">
                  <a href="/analytics" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
                    Analytics
                  </a>
                  <a href="/legal/privacy" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
                    Privacy
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-charcoal-800 bg-charcoal-950/80 backdrop-blur-sm mt-auto">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400">
                <p>© 2025 dracula.wtf - Detect vampires with humor</p>
                <p className="mt-2 sm:mt-0">No actual vampires were harmed</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}