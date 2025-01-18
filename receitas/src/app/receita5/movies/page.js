// pages/receita5/movies/page.js
export default async function MoviesPage({ searchParams }) {
  const { titleSearchKey = "bagdad", year = "1940" } = await searchParams;

  const res = await fetch(
    `http://www.omdbapi.com/?apikey=d47e94e4&s=${titleSearchKey}&y=${year}`
  );
  const data = await res.json();

  const movies = data.Search || [];

  return (
    <div>
      <h1>Filmes</h1>
      {movies.length > 0 ? (
        movies.map((m) => (
          <div key={m.imdbID} style={{ marginBottom: "20px" }}>
            <h3>
              {m.Title} --- {m.Year}
            </h3>
            <img
              src={m.Poster !== "N/A" ? m.Poster : "/placeholder.jpg"}
              alt={m.Title}
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        ))
      ) : (
        <p>Nenhum filme encontrado para os critérios fornecidos.</p>
      )}
    </div>
  );
}
