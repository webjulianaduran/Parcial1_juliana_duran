'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Episode } from '../model/episode.interfaces';

type Character = { id: number; name: string; image: string };

export function EpisodeCard({
  episode,
  isFav,
  onManejarFav,
}: {
  episode: Episode;
  isFav: boolean;
  onManejarFav: (ep: Episode) => void;
}) {
  const [chars, setChars] = useState<Character[]>([]);

  useEffect(() => {
    const ids = episode.characters
      .slice(0, 5)
      .map((u: string) => u.split('/').pop())
      .filter(Boolean) as string[];

    if (!ids.length) return setChars([]);

    fetch(`https://rickandmortyapi.com/api/character/${ids.join(',')}`)
      .then(r => r.json())
      .then(d => setChars(Array.isArray(d) ? d : [d]))
      .catch(() => setChars([]));
  }, [episode.characters]);

  return (
    <div className="mt-6 border rounded p-4 flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold">{episode.name}</h3>
        <p className="text-sm text-neutral-500 whitespace-nowrap">{episode.air_date}</p>
      </div>

      <div className="mt-4 rounded border p-5">
        <div className="flex flex-wrap justify-start gap-x-8 gap-y-4 max-w-full">
          {chars.map((c) => (
            <div key={c.id} className="flex flex-col items-center gap-1  ">
              <Image
                src={c.image}
                alt={c.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-neutral-200"
              />
              <p className="text-sm text-neutral-700 text-center truncate w-full">{c.name}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => onManejarFav(episode)}
        className={`mt-6 self-end rounded-full px-3 py-1 text-sm transition ${
          isFav ? 'bg-neutral-200 hover:bg-neutral-300' : 'bg-neutral-200 hover:bg-neutral-300'
        }`}
        aria-pressed={isFav}
      >
        {isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      </button>
    </div>
  );
}
