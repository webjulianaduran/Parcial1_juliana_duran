'use client';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Episode } from './model/episode.interfaces';
import { EpisodeList } from './_components/EpisodeList';
import { FavoritesList } from './favorites/FavoritosList';
import EpisodeForm from './create/_components/EpisodeForm';
import { readFavIds, writeFavIds } from './favorites/manejofaoritos';

const LOCAL_EP_KEY = 'local_episodes';

export default function EpisodesLayoutPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [favIds, setFavIds] = useState<number[]>([]);

  useEffect(() => {
    async function fetchAll() {
      const first = await fetch('https://rickandmortyapi.com/api/episode').then(r => r.json());
      const pages = first.info?.pages ?? 1;
      const all: Episode[] = [...(first.results ?? [])];
      if (pages > 1) {
        const rest = await Promise.all(
          Array.from({ length: pages - 1 }, (_, i) =>
            fetch(`https://rickandmortyapi.com/api/episode?page=${i + 2}`).then(r => r.json())
          )
        );
        rest.forEach(d => all.push(...(d.results ?? [])));
      }
      const raw = localStorage.getItem(LOCAL_EP_KEY);
      const local: Episode[] = raw ? JSON.parse(raw) : [];
      const map = new Map<number, Episode>();
      all.forEach(e => map.set(e.id, e));
      local.forEach(e => map.set(e.id, e));
      setEpisodes(Array.from(map.values()));
    }
    fetchAll();
    setFavIds(readFavIds());
  }, []);

  useEffect(() => {
    writeFavIds(favIds);
  }, [favIds]);

  const manejarFav = (ep: Episode) => {
  setFavIds(prev => {
    const exists = prev.includes(ep.id);
    const next = exists ? prev.filter(id => id !== ep.id) : [ep.id, ...prev];
    writeFavIds(next);
    toast[exists ? 'warning' : 'success'](
      exists ? `Quitado de favoritos: ${ep.name}` : `Añadido a favoritos: ${ep.name}`,
      { id: `fav-${ep.id}` }
    );

    return next;
  });
};

  const addEpisode = (ep: Episode) => {
    setEpisodes(prev => [ep, ...prev]);
    const raw = localStorage.getItem(LOCAL_EP_KEY);
    const list: Episode[] = raw ? JSON.parse(raw) : [];
    localStorage.setItem(LOCAL_EP_KEY, JSON.stringify([ep, ...list]));
    toast.success('Episodio guardado correctamente');
  };

  return (
    <>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <section className="border-2 rounded-xl p-4 h-[700px] flex flex-col">
            <h2 className="text-lg font-semibold mb-3">Lista desde API</h2>
            <div className="flex-1 overflow-y-auto pr-1">
              <EpisodeList episodes={episodes} favIds={favIds} onManejarFav={manejarFav} />
            </div>
          </section>

          <div className="grid grid-rows-2 gap-6">
            <section className="border-2 rounded-xl p-4 h-[375px] flex flex-col">
              <h2 className="text-lg font-semibold mb-3">Favoritos</h2>
              <div className="flex-1 overflow-y-auto pr-1">
                <FavoritesList episodes={episodes} favIds={favIds} onManejarFav={manejarFav} />
              </div>
            </section>

            <section className="border-2 rounded-xl p-4 h-[300px] flex flex-col">
              <h2 className="text-lg font-semibold mb-3">Crear recurso para la lista de la API</h2>
              <div className="flex-1 overflow-y-auto pr-1">
                <EpisodeForm onAdd={addEpisode} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
