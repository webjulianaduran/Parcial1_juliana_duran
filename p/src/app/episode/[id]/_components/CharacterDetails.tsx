'use client';

import { useEffect, useState } from "react";
import { Character } from "../../model/episode.interfaces";

interface CharacterProps {
  id: string
}

export const CharacterDetails = ({id}:CharacterProps) => {
  useEffect(() => {
    traer()
  
  }, [])
  
  const [character, setcharacter] = useState<Character | null>(null)
  const traer = async ()=> 
    {
      const result =await fetch(`https://rickandmortyapi.com/api/character/${id}`)
      const data = await result.json()
      setcharacter(data)
    }
    

  return (
    <div>CharacterDetails <h1>{character?.name}</h1></div>
  )
}