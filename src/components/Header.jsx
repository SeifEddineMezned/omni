export default function Header({ user }) {
  return (
    <header className="header">
      <h1>OMNI Dashboard</h1>
      <div>
        <span>Hello, {user.name}</span>
        <span className="status">{user.mood}</span>
      </div>
    </header>
  );
}
