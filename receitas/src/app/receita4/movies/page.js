export default async function Home({ searchParams }) {
  const { titleSearchKey = "bagdad", year="1940"} = await searchParams;

  const res = await fetch(
    `http://www.omdbapi.com/?apikey=d47e94e4&s=${titleSearchKey}&y=${year}`
  );

  const data = await res.json();

  return (
    <div>
      <div>
        {data.Search.map((m) => (
          <div key={m.imdbID} style={{ marginBottom: "20px" }}>
            <h3>
              {m.Title} --- {m.Year}
            </h3>
            <img
              src={m.Poster}
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
