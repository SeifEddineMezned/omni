export default function Dashboard({ stats }) {
  return (
    <div className="dashboard">
      {stats.map((s, i) => (
        <div key={i} className="card">
          <p>{s.label}</p>
          <h2>{s.value}</h2>
        </div>
      ))}
    </div>
  );
}
