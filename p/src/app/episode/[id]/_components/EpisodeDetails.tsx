'use client';

import { useEffect, useState } from "react";
import { Episode } from "../../model/episode.interfaces";

interface EpisodeProps {
  id: string
}

export const EpisodeDetails = ({id}:EpisodeProps) => {
  useEffect(() => {
    traer()
  
  }, [])
  
  const [episode, setepisode] = useState<Episode | null>(null)
  const traer = async ()=> 
    {
      const result =await fetch(`${id}`)
      const data = await result.json()
      setepisode(data)
      
    }
    

  return (
    <div>EpisodeDetails <h1>{episode?.name}</h1></div>
  )
}