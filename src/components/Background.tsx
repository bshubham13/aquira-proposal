export function Background() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-blob blob-one" /><div className="ambient-blob blob-two" />
      <div className="grain" />
      {Array.from({ length: 14 }, (_, index) => <i key={index} className="ambient-star" style={{ '--i': index } as React.CSSProperties}>✦</i>)}
    </div>
  )
}
