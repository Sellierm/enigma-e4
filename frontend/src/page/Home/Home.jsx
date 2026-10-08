import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle";
import { useAuth } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const initialTasks = [
  {
    id: 1,
    title: "Découvrir le projet",
    description: "Lire le CONTRIBUTING.md et lancer l'application en local.",
    completed: true,
    createdAt: "2026-10-01T09:00:00.000Z",
    dueDate: "2026-10-01",
    priority: false,
  },
  {
    id: 2,
    title: "Créer ma première branche",
    description: "Respecter la convention feature/..., fix/... ou docs/...",
    completed: false,
    createdAt: "2026-10-01T09:00:00.000Z",
    dueDate: "2026-10-03",
    priority: true,
  },
  {
    id: 3,
    title: "Ouvrir une Pull Request",
    description: "Référencer l'Issue avec Closes #n et demander une revue.",
    completed: false,
    createdAt: "2026-10-01T09:00:00.000Z",
    dueDate: "2026-10-09",
    priority: false,
  },
];

export function loadTasks() {
  const savedTasks = localStorage.getItem("team-tasks");

  return savedTasks ? JSON.parse(savedTasks) : initialTasks;
}

export function filterTasks(tasks, filter) {
  const orderedTasks = [...tasks].sort(
    (a, b) => Number(b.priority) - Number(a.priority),
  );

  if (filter === "todo") {
    return orderedTasks.filter((task) => !task.completed);
  }

  if (filter === "done") {
    return orderedTasks.filter((task) => task.completed);
  }

  if (filter === "priority") {
    return orderedTasks.filter((task) => task.priority);
  }

  return orderedTasks;
}

export function createTask(
  title,
  id = Date.now(),
  options = {},
) {
  const task = {
    id,
    title: title.trim(),
    completed: false,
    priority: false,
  };

  const hasExtraDetails =
    Object.prototype.hasOwnProperty.call(options, "description") ||
    Object.prototype.hasOwnProperty.call(options, "dueDate") ||
    Object.prototype.hasOwnProperty.call(options, "createdAt");

  if (!hasExtraDetails) {
    return task;
  }

  const { description = "", dueDate = "", createdAt = new Date().toISOString() } = options;

  return {
    ...task,
    description: description.trim(),
    dueDate,
    createdAt,
  };
}

export function countRemainingTasks(tasks) {
  return tasks.filter((task) => !task.completed).length;
}

export function countCompletedTasks(tasks) {
  return tasks.filter((task) => task.completed).length;
}

export function formatRemainingTasks(count) {
  return `${count} tâche${count > 1 ? "s" : ""} restante${count > 1 ? "s" : ""}`;
}

export function formatCompletedTasks(count) {
  return `${count} terminée${count > 1 ? "s" : ""}`;
}

function toUiTask(task) {
  return {
    ...task,
    completed: Boolean(task.completed),
    priority: Boolean(task.priority),
    description: task.description ?? "",
    dueDate: task.dueDate ?? "",
    createdAt: task.createdAt ?? new Date().toISOString(),
  };
}

function Home() {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      return;
    }

    async function fetchUserTasks() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_URL}/api/task/getUsertask/${userId}`,
          { credentials: "include" },
        );

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des tâches");
        }

        const data = await response.json();
        setTasks(Array.isArray(data) ? data.map(toUiTask) : []);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les tâches.");
      } finally {
        setLoading(false);
      }
    }

    fetchUserTasks();
  }, [userId]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  function saveTasks(nextTasks) {
    setTasks(nextTasks.map(toUiTask));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/task/createOne`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la tâche");
      }

      const createdTask = await response.json();
      saveTasks([...tasks, { ...createdTask, dueDate }]);
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (err) {
      console.error(err);
      setError("Impossible de créer la tâche.");
    }
  }

  function toggleTask(id) {
    saveTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function togglePriority(id) {
    saveTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, priority: !task.priority } : task,
      ),
    );
  }

  async function deleteTask(id) {
    try {
      const response = await fetch(`${API_URL}/api/task/deleteOne/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la tâche");
      }

      saveTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error(err);
      setError("Impossible de supprimer la tâche.");
    }
  }

  function startEditing(task) {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  }

  function cancelEditing() {
    setEditingTaskId(null);
    setEditingTitle("");
  }

  async function saveEditedTask(event, id) {
    event.preventDefault();

    const trimmedTitle = editingTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/task/updateOne/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmedTitle }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la modification de la tâche");
      }

      saveTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, title: trimmedTitle } : task,
        ),
      );
      cancelEditing();
    } catch (err) {
      console.error(err);
      setError("Impossible de modifier la tâche.");
    }
  }

  const visibleTasks = useMemo(
    () => filterTasks(tasks, filter),
    [tasks, filter],
  );

  const remainingCount = countRemainingTasks(tasks);
  const completedCount = countCompletedTasks(tasks);

  return (
    <main className="container">
      <header className="hero">
        <ThemeToggle />
        <p className="eyebrow">GitHub Team Workshop</p>
        <h1>Team Tasks</h1>
        <p>
          Une petite application React pour apprendre à travailler en équipe
          comme en entreprise.
        </p>
      </header>

      <section className="card">
        <form className="task-form" onSubmit={handleSubmit}>
          <label htmlFor="task-title">Nouvelle tâche</label>
          <div className="form-row">
            <input
              id="task-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ex. Ajouter un test"
            />
            <button type="submit">Ajouter</button>
          </div>

          <label htmlFor="task-description">Description</label>
          <textarea
            id="task-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Détails de la tâche (optionnel)"
            rows={2}
          />

          <label htmlFor="task-due-date">Échéance</label>
          <input
            id="task-due-date"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </form>

        <div className="toolbar">
          <div className="counters">
            <strong>{formatRemainingTasks(remainingCount)}</strong>
            <span>{formatCompletedTasks(completedCount)}</span>
          </div>

          <div className="filters" aria-label="Filtrer les tâches">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
              type="button"
            >
              Toutes
            </button>
            <button
              className={filter === "todo" ? "active" : ""}
              onClick={() => setFilter("todo")}
              type="button"
            >
              À faire
            </button>
            <button
              className={filter === "done" ? "active" : ""}
              onClick={() => setFilter("done")}
              type="button"
            >
              Terminées
            </button>
            <button
              className={filter === "priority" ? "active" : ""}
              onClick={() => setFilter("priority")}
              type="button"
            >
              Prioritaires
            </button>
          </div>
        </div>

        {error && <p className="empty">{error}</p>}

        <ul className="task-list">
          {loading ? (
            <li className="empty">Chargement des tâches...</li>
          ) : visibleTasks.length === 0 ? (
            <li className="empty">Aucune tâche dans cette catégorie.</li>
          ) : (
            visibleTasks.map((task) => (
              <li className={`task ${task.priority ? "important" : ""}`} key={task.id}>
                {editingTaskId === task.id ? (
                  <form
                    className="edit-form"
                    onSubmit={(event) => saveEditedTask(event, task.id)}
                  >
                    <input
                      aria-label={`Modifier ${task.title}`}
                      value={editingTitle}
                      onChange={(event) => setEditingTitle(event.target.value)}
                      autoFocus
                    />
                    <div className="edit-actions">
                      <button className="edit-button" type="submit">
                        Enregistrer
                      </button>
                      <button
                        className="edit-button"
                        type="button"
                        onClick={cancelEditing}
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="task-main">
                      <label className={task.completed ? "completed" : ""}>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                        />
                        <span>{task.title}</span>
                      </label>

                      {task.priority && (
                        <span className="priority-badge">Prioritaire</span>
                      )}
                    </div>

                    <div className="task-actions">
                      <button
                        className={`priority-toggle ${task.priority ? "active" : ""}`}
                        type="button"
                        onClick={() => togglePriority(task.id)}
                        aria-label={
                          task.priority
                            ? `Retirer la priorité à ${task.title}`
                            : `Marquer ${task.title} comme prioritaire`
                        }
                      >
                        {task.priority ? "★" : "☆"}
                      </button>

                      <Link className="details-link" to={`/tasks/${task.id}`}>
                        Détails
                      </Link>

                      <button
                        className="edit-button"
                        type="button"
                        onClick={() => startEditing(task)}
                        aria-label={`Modifier ${task.title}`}
                      >
                        Modifier
                      </button>

                      <button
                        className="delete"
                        type="button"
                        onClick={() => deleteTask(task.id)}
                        aria-label={`Supprimer ${task.title}`}
                      >
                        Supprimer
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      </section>

      <footer>
        <span>React + Vite</span>
        <span>•</span>
        <span>GitHub Flow</span>
      </footer>
    </main>
  );
}

export default Home;