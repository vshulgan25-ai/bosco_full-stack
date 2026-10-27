import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function RootPage() {
  const siteUrl = process.env.FRONTEND_URL
  redirect(siteUrl && /^https?:\/\//i.test(siteUrl) ? siteUrl : '/admin')
}
