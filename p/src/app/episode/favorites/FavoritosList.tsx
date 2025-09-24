'use client';
import { Episode } from '../model/episode.interfaces';
import { EpisodeCard } from '../_components/EpisodeCard';

type Props = {
  episodes: Episode[];
  favIds: number[];
  onManejarFav: (ep: Episode) => void;
};

export function FavoritesList({ episodes = [], favIds = [], onManejarFav }: Props) {
  const favs = episodes.filter(e => favIds.includes(e.id));
  if (!favs.length) return <p className="text-sm text-neutral-500">Sin favoritos.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-1">
      {favs.map(ep => (
        <EpisodeCard key={ep.id} episode={ep} isFav={true} onManejarFav={onManejarFav} />
      ))}
    </div>
  );
}
