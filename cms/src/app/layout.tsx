import React from 'react'

export const metadata = {
  title: 'Бекенд Payload CMS — Центр професійної освіти Боско',
  description: 'API та адміністративна панель системи управління стипендіальними програмами',
  icons: [{ rel: 'icon', type: 'image/png', url: '/logo.png' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body style={{ margin: 0, backgroundColor: '#f8fafc' }}>
        {children}
      </body>
    </html>
  )
}
