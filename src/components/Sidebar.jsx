export default function Sidebar() {
  const links = ["Dashboard", "Tasks", "Goals", "AI Insights", "Settings"];
  return (
    <aside className="sidebar">
      <ul>
        {links.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </aside>
  );
}
