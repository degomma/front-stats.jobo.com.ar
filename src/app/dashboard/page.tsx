"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [topArtists, setTopArtists] = useState<string[]>([]);
  const [topSongs, setTopSongs] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [activeList, setActiveList] = useState<'artists' | 'songs' | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setToken(token);
    } else {
      router.push("/");
    }
  }, [router]);

  const cleanData = (data: string) => {
    return data
      .replace(/^\[|\]$/g, '') // Elimina los corchetes al inicio y al final
      .split(',')
      .map(item => item.trim().replace(/^"|"$/g, '')) // Elimina las comillas y espacios
      .filter(item => item !== "");
  };

  const fetchTopArtists = async () => {
    if (!token) return;
    setError("");
    try {
      const response = await fetch("http://localhost:8080/topArtists", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch top artists: ${response.statusText}`);
      }
      const data = await response.text();
      const artists = cleanData(data);
      setTopArtists(artists);
      setActiveList('artists');
    } catch (err) {
      setError(`Error al obtener los artistas: ${err instanceof Error ? err.message : err}`);
    }
  };

  const fetchTopSongs = async () => {
    if (!token) return;
    setError("");
    try {
      const response = await fetch("http://localhost:8080/topSongs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch top songs: ${response.statusText}`);
      }
      const data = await response.text();
      const songs = cleanData(data);
      setTopSongs(songs);
      setActiveList('songs');
    } catch (err) {
      setError(`Error al obtener las canciones: ${err instanceof Error ? err.message : err}`);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Stats Jobo</h1>

      <div style={styles.buttonContainer}>
        <button onClick={fetchTopArtists} style={styles.button}>
          Top Artistas
        </button>
        <button onClick={fetchTopSongs} style={styles.button}>
          Top Canciones
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.listContainer}>
        {activeList === 'artists' && (
          <div>
            <h2 style={styles.subtitle}>Top Artistas</h2>
            <div style={styles.backgroundContainer}>
              <div style={styles.rectangularList}>
                {topArtists.map((artist, index) => (
                  <div key={index} style={styles.listItem}>
                    {artist}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeList === 'songs' && (
          <div>
            <h2 style={styles.subtitle}>Top Canciones</h2>
            <div style={styles.backgroundContainer}>
              <div style={styles.rectangularList}>
                {topSongs.map((song, index) => (
                  <div key={index} style={styles.listItem}>
                    {song}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#e8f5e9", // Fondo más oscuro que #e8f5e9
    color: "black",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "white",
    backgroundColor: "#11181c",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  error: {
    color: "red",
    fontSize: "1rem",
  },
  listContainer: {
    marginTop: "20px",
    textAlign: "left",
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    maxWidth: "600px",
  },
  subtitle: {
    fontSize: "1.5rem",
    borderBottom: "1px solid #444",
    paddingBottom: "10px",
    marginBottom: "20px",
    textAlign: "center", // Texto centrado
  },
  backgroundContainer: {
    padding: "20px",
    backgroundColor: "#6f2da8", // Fondo más oscuro que #e8f5e9
    borderRadius: "12px", // Bordes redondeados
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra suave
  },
  rectangularList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  listItem: {
    backgroundColor: "#bca0dc", // Rectángulo más oscuro
    borderRadius: "8px",
    padding: "15px",
    border: "1px solid #444",
    fontSize: "1rem",
    textAlign: "left",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
};
