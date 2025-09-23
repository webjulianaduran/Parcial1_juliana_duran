import { redirect } from "next/navigation";
import { EpisodeDetails } from "./_components/EpisodeDetails";
import { CharacterDetails } from "./_components/CharacterDetails";

interface Props {
  params: {
    episodeId: string
    characerId: string
  },
 /*  searchParams: {
    page?: string
  } */
}


export default function EpisodeDetailsPage({params: {episodeId}}:Props) {

  if(isNaN(+episodeId) ){
    redirect('/episode')
  }

  return (
    <div>
      <h1>Episodio # {episodeId}</h1>
      <EpisodeDetails id={episodeId} />
    </div>
  );
}