export default function SkeletonLoader() {
  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        {/* Score skeleton */}
        <div className="shimmer" style={{ width: '160px', height: '160px', borderRadius: '50%' }} />
        <div className="shimmer" style={{ width: '200px', height: '24px', borderRadius: '8px' }} />
        {/* Section cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', width: '100%' }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="shimmer" style={{ height: '100px', borderRadius: '12px' }} />
          ))}
        </div>
        {/* Text blocks */}
        {[1,2,3].map(i => (
          <div key={i} className="shimmer" style={{ width: '100%', height: '80px', borderRadius: '12px' }} />
        ))}
      </div>
    </div>
  )
}
