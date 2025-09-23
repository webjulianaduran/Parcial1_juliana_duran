
export default async function AsyncEpisodePage() {

  const response = await fetch('https://rickandmortyapi.com/api/episode')
  const results = await response.json();

  return (
    <div>
      <h1>Async episodes</h1>
      {
        JSON.stringify(results)
      }
    </div>
  );
}