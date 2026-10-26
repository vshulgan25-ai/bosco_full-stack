import Link from 'next/link'

export default function RootPage() {
  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '800px',
      margin: '60px auto',
      padding: '32px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      color: '#1e293b'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <img src="/logo.png" alt="Bosco Logo" style={{ height: '48px', width: 'auto' }} />
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#0f172a' }}>
            Центр професійної освіти св. Івана Боско
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '15px' }}>
            Бекенд Payload CMS + PostgreSQL (Neon) • Навчальний рік 2026–2027
          </p>
        </div>
      </div>

      <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #0284c7', marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#0369a1' }}>Статус бекенду: Активний ✅</h3>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
          Бекенд успішно налаштований для взаємодії з клієнтським додатком на Vite + TypeScript.
          База даних підключена через реляційну хмарну СУБД <strong>Neon PostgreSQL</strong>.
        </p>
      </div>

      <h2 style={{ fontSize: '18px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '16px' }}>
        Доступні системні маршрути та API:
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li style={{ padding: '12px', backgroundColor: '#f1f5f9', borderRadius: '6px' }}>
          <strong>Адміністративна панель:</strong>{' '}
          <Link href="/admin" style={{ color: '#0284c7', fontWeight: 600 }}>/admin</Link> — керування стипендіями, користувачами та заявками
        </li>
        <li style={{ padding: '12px', backgroundColor: '#f1f5f9', borderRadius: '6px' }}>
          <strong>Кастомний ендпоінт /api/common:</strong>{' '}
          <Link href="/api/common" target="_blank" style={{ color: '#0284c7', fontWeight: 600 }}>/api/common</Link> — повертає чистий JSON для Header та Footer
        </li>
        <li style={{ padding: '12px', backgroundColor: '#f1f5f9', borderRadius: '6px' }}>
          <strong>Кастомний ендпоінт /api/page:</strong>{' '}
          <Link href="/api/page?path=/" target="_blank" style={{ color: '#0284c7', fontWeight: 600 }}>/api/page?path=/</Link> — повертає сплющений JSON головної сторінки з блоками
        </li>
        <li style={{ padding: '12px', backgroundColor: '#f1f5f9', borderRadius: '6px' }}>
          <strong>Ендпоінт прийому заявок:</strong>{' '}
          <span style={{ fontFamily: 'monospace', color: '#334155' }}>POST /api/apply</span> — збереження заявки учня
        </li>
      </ul>

      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <Link
          href="/admin"
          style={{
            display: 'inline-block',
            backgroundColor: '#0284c7',
            color: '#ffffff',
            padding: '12px 28px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '15px'
          }}
        >
          Увійти в адмін-панель Payload CMS →
        </Link>
      </div>
    </div>
  )
}
