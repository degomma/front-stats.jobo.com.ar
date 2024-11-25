'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("accessToken");

    if (token) {
      localStorage.setItem("accessToken", token);
      setIsLoggedIn(true);
      router.push("/dashboard");
    }
  }, []);

  const handleLogin = () => {
    router.push("http://localhost:8080/login");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>¡Bienvenido a Stats Jobo!</h1>
      {!isLoggedIn ? (
        <button style={styles.spotifyButton} onClick={handleLogin}>
          <img
            src="/Spotify_icon.png"
            alt="Spotify Logo"
            style={styles.spotifyLogo}
          />
          Iniciar Sesión con Spotify
        </button>
      ) : (
        <div>
          <button style={styles.spotifyButton} onClick={() => router.push("/dashboard")}>
            Ir al Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#e8f5e9", // Fondo
    fontFamily: "'Arial', sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "2rem",
    color: "#333",
  },
  spotifyButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "1rem 2rem",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#11181c", // Boton
    border: "none",
    borderRadius: "8px", // Borde
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
  spotifyLogo: {
    width: "36px",
    height: "36px",
  },
};
