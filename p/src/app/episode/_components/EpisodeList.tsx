'use client';
import { Episode } from '../model/episode.interfaces';
import { EpisodeCard } from './EpisodeCard';

type Props = {
  episodes: Episode[];
  favIds: number[];
  onManejarFav: (ep: Episode) => void;
};

export function EpisodeList({ episodes, favIds, onManejarFav }: Props) {
  const visible = episodes.filter(e => !favIds.includes(e.id));
  if (!visible.length) return <p className="text-sm text-neutral-500">No hay episodios (o todos son favoritos).</p>;

  return (
    <div >
      {visible.map(ep => (
        <EpisodeCard key={ep.id} episode={ep} isFav={favIds.includes(ep.id)} onManejarFav={onManejarFav} />
      ))}
    </div>
  );
}
