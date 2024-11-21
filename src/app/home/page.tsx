'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Intentar obtener el token desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("accessToken");

    if (token) {
      // Almacenar el token en localStorage
      localStorage.setItem("accessToken", token);
      setIsLoggedIn(true);
      // Redirigir al Dashboard
      router.push("/dashboard"); // Redirige a /dashboard
    }
  }, []); // Solo ejecutar al cargar la página

  const handleLogin = () => {
    router.push("http://localhost:8080/login"); // Redirigir al login de Spotify
  };

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      {!isLoggedIn ? (
        <button onClick={handleLogin}>Login con Spotify</button>
      ) : (
        <div>
          <button onClick={() => router.push("/dashboard")}>Ir al Dashboard</button>
        </div>
      )}
    </div>
  );
}
