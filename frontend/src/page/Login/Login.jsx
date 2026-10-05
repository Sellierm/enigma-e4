import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authClient } from "../../lib/auth-client";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export default function Login({ initialMode = "login" }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
  };

const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "", success: "" });

    try {
      if (mode === "register") {
        // Validation simple du nom
        if (form.name.trim() === "") {
          setStatus({ loading: false, error: "Veuillez entrer un nom", success: "" });
          return;
        }

        const { data, error } = await authClient.signUp.email({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          callbackURL: "http://localhost:5173/",
        });

        if (error) {
          setStatus({ loading: false, error: error.message || "Erreur lors de l'inscription", success: "" });
          return;
        }

        const { error: signInError } = await authClient.signIn.email({
          email: form.email.trim(),
          password: form.password,
          rememberMe: true,
        });

        if (signInError) {
          setStatus({ loading: false, error: "Compte créé mais échec de la connexion auto", success: "" });
          return;
        }

        setStatus({ loading: false, error: "", success: "Inscription et connexion réussies !" });
        navigate("/");

      } else {
        // Mode Connexion (login)
        const { data, error } = await authClient.signIn.email({
            email: form.email.trim(),
            password: form.password,
            rememberMe: true,
            callbackURL: "http://localhost:5173/",
        });

        if (error) {
          setStatus({ loading: false, error: error.message || "Email ou mot de passe incorrect", success: "" });
          return;
        }

        setStatus({ loading: false, error: "", success: "Connexion réussie !" });
        navigate("/");
      }

    } catch (err) {
      console.error(err);
      setStatus({ loading: false, error: "Une erreur réseau est survenue", success: "" });
    }
  };


  const isRegister = mode === "register";

  return (
    <main className="login-page" style={styles.page}>
      <section style={styles.card} aria-labelledby="auth-title">
        <div style={styles.tabs} role="tablist" aria-label="Choix du mode d’authentification">
          <button
            type="button"
            onClick={() => setMode("login")}
            style={{ ...styles.tabButton, ...(mode === "login" ? styles.tabButtonActive : {}) }}
            aria-selected={mode === "login"}
            role="tab"
          >
            Connexion
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            style={{ ...styles.tabButton, ...(mode === "register" ? styles.tabButtonActive : {}) }}
            aria-selected={mode === "register"}
            role="tab"
          >
            Inscription
          </button>
        </div>

        <h1 id="auth-title" style={styles.title}>
          {isRegister ? "Inscription" : "Connexion"}
        </h1>
        <p style={styles.subtitle}>
          {isRegister ? "Créez votre compte pour accéder à votre espace" : "Connectez-vous à votre compte"}
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {isRegister && (
            <>
              <label htmlFor="name" style={styles.label}>
                Nom
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </>
          )}

          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label htmlFor="password" style={styles.label}>
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            style={styles.input}
          />

          {status.error && (
            <p style={styles.error} role="alert">
              {status.error}
            </p>
          )}
          {status.success && (
            <p style={styles.success} role="status">
              {status.success}
            </p>
          )}

          <button type="submit" disabled={status.loading} style={styles.button}>
            {status.loading ? (isRegister ? "Inscription…" : "Connexion…") : isRegister ? "Créer mon compte" : "Se connecter"}
          </button>
        </form>
      </section>
    </main>
  );
}

const styles = {
  page: {
    display: "grid",
    placeItems: "center",
    padding: "24px",
    background: "#f4f7fb",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "36px",
    borderRadius: "16px",
    background: "#fff",
    boxShadow: "0 12px 35px rgba(15, 23, 42, .12)",
  },
  tabs: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    marginBottom: "20px",
    background: "#e2e8f0",
    padding: "6px",
    borderRadius: "10px",
  },
  tabButton: {
    border: "none",
    borderRadius: "8px",
    padding: "10px 12px",
    background: "transparent",
    color: "#475569",
    fontWeight: 700,
    cursor: "pointer",
  },
  tabButtonActive: {
    background: "#fff",
    color: "#0f172a",
    boxShadow: "0 2px 8px rgba(15, 23, 42, 0.08)",
  },
  title: { margin: "0 0 8px", color: "#172033", textAlign: "center" },
  subtitle: { margin: "0 0 28px", color: "#64748b", textAlign: "center" },
  form: { display: "grid", gap: "10px" },
  label: { marginTop: "8px", color: "#334155", fontWeight: 600 },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "16px",
  },
  button: {
    marginTop: "14px",
    padding: "13px",
    border: 0,
    borderRadius: "8px",
    color: "#fff",
    background: "#2563eb",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
  },
  error: { margin: "8px 0 0", color: "#dc2626" },
  success: { margin: "8px 0 0", color: "#15803d" },
};