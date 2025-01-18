"use client";
import { useState } from "react";

export default function Home() {
  const [resultMovies, setResultMovies] = useState([]);
  const [typedTitle, setTypedTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleAction(event) {
    event.preventDefault();
    const titleSearchKey = event.target.titleSearchKey.value;
    setTypedTitle(titleSearchKey);

    setIsLoading(true);
    try {
      const httpRes = await fetch(
        `http://www.omdbapi.com/?apikey=d47e94e4&s=${titleSearchKey}`
      );

      const jsonRes = await httpRes.json();
      setResultMovies(jsonRes.Search || []);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <MovieForm
        handleAction={handleAction}
        typedTitle={typedTitle}
        setTypedTitle={setTypedTitle}
        isLoading={isLoading}
      />

      <MovieTable movies={resultMovies} />
    </div>
  );
}

export function MovieForm({
  handleAction,
  typedTitle,
  setTypedTitle,
  isLoading,
}) {
  return (
    <form onSubmit={handleAction} style={{ marginBottom: "20px" }}>
      <label htmlFor="idTitleSearchKey" style={{ marginRight: "10px" }}>
        Título
      </label>

      <input
        id="idTitleSearchKey"
        name="titleSearchKey"
        value={typedTitle}
        onChange={(e) => setTypedTitle(e.target.value)}
        style={{
          padding: "5px 10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginRight: "10px",
        }}
      />

      <button
        type="submit"
        disabled={isLoading}
        style={{
          padding: "5px 15px",
          borderRadius: "4px",
          backgroundColor: isLoading ? "#ccc" : "#007BFF",
          color: "#fff",
          border: "none",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Pesquisando..." : "Pesquisar"}
      </button>
    </form>
  );
}

export function MovieTable({ movies }) {
  return (
    <div>
      {movies.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
          }}
        >
          {movies.map((m) => (
            <div
              key={m.imdbID}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={
                  m.Poster !== "N/A"
                    ? m.Poster
                    : "https://via.placeholder.com/150"
                }
                alt={m.Title}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "4px",
                  marginBottom: "10px",
                }}
              />
              <h3 style={{ fontSize: "16px", margin: "10px 0 5px" }}>
                {m.Title}
              </h3>
              <p style={{ fontSize: "14px", color: "#666" }}>{m.Year}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum filme encontrado.</p>
      )}
    </div>
  );
}
