export default function TaskList({ tasks }) {
  return (
    <div className="tasks">
      <h3>Today's Tasks</h3>
      {tasks.map((t) => (
        <div key={t.id} className="task">
          <p>{t.title}</p>
          <span
            className={`status ${
              t.status === "Done"
                ? "done"
                : t.status === "In Progress"
                ? "progress"
                : "todo"
            }`}
          >
            {t.status}
          </span>
        </div>
      ))}
    </div>
  );
}
