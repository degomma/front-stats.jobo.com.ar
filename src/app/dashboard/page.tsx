"use client";  // Esta línea indica que el componente se debe renderizar en el cliente

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [topArtists, setTopArtists] = useState<string[]>([]);
  const [topSongs, setTopSongs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    // Obtener el accessToken desde localStorage
    const token = localStorage.getItem("accessToken");
    
    if (token) {
      setToken(token);
    }

    // Si no hay token, redirigir al login
    if (!token) {
      router.push("/");  // Si no hay token, redirigir a la página de login
    }
  }, [router]);

  const fetchTopArtists = async () => {
    if (!token) return;
    
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8080/topArtists", {
        headers: {
          Authorization: `Bearer ${token}`, // Pasar el token en las cabeceras
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch top artists: ${response.statusText}`);
      }
      
      const data = await response.text();
      setTopArtists(data.split("\n"));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(`Error al obtener los artistas: ${err instanceof Error ? err.message : err}`);
    }
  };

  const fetchTopSongs = async () => {
    if (!token) return;
    
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8080/topSongs", {
        headers: {
          Authorization: `Bearer ${token}`, // Pasar el token en las cabeceras
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch top songs: ${response.statusText}`);
      }
      
      const data = await response.text();
      setTopSongs(data.split("\n"));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(`Error al obtener las canciones: ${err instanceof Error ? err.message : err}`);
    }
  };

  return (
    <div className="dashboard">
      <h1>Bienvenido al Dashboard</h1>
      <div>
        <button onClick={fetchTopArtists} disabled={loading}>Top Artistas</button>
        <button onClick={fetchTopSongs} disabled={loading}>Top Canciones</button>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "green" }}>{error}</p>}

      <div>
        <h2>Top Artistas</h2>
        <ul>
          {topArtists.map((artist, index) => (
            <li key={index}>{artist}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Top Canciones</h2>
        <ul>
          {topSongs.map((song, index) => (
            <li key={index}>{song}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
