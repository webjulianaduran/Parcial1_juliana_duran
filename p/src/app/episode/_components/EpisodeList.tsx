'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { Episode } from "../model/episode.interfaces";

export const EpisodeList = () => {

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const title =   `tienes  ${episodes.length}`

  useEffect(() => {
    fetchEpisode();

 
  }, [page]);

  const fetchEpisode = async () => {

    const episodes = localStorage.getItem('episodes')
   
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode?page=${page}`
      );
      const data = await response.json();
      console.log(data);
      setEpisodes(data.results);
      setIsLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  if (isLoading) {
    return <span >Cargando...</span>;
  }

  if (error) {
    return <span>Error inesperado intenta nuevamente</span>;
  }

  return (
    <div className="">
      <h1>{title}</h1>
     

      {episodes && episodes.length}
      <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
        {episodes?.map(e => (
          <div key={e.id}>
            <h3>{e.name}</h3>
            <h3>{e.air_date}</h3>
            <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
              <h3>{e.characters[0]}</h3>
              <h3>{e.characters[1]}</h3>
              <h3>{e.characters[2]}</h3>
              <h3>{e.characters[3]}</h3>
              <h3>{e.characters[4]}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


