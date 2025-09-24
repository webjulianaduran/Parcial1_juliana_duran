'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import type { Episode } from '../../model/episode.interfaces';

const schema = z.object({
  title: z.string().min(6, 'El título debe tener mínimo 6 caracteres'),
  characters: z
    .string()
    .regex(/^\d+-\d+-\d+-\d+-\d+$/, 'Usa 5 IDs separados por "-" (ej: 12-14-1-23-8)'),
});
type EpisodeFormData = z.infer<typeof schema>;

type Props = {
  onAdd: (ep: Episode) => void;
};

export default function EpisodeForm({ onAdd }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isValid } } =
    useForm<EpisodeFormData>({
      resolver: zodResolver(schema),
      defaultValues: { title: '', characters: '' },
      mode: 'onChange',
    });

  const onSubmit = (data: EpisodeFormData) => {
    const now = new Date();
    const ids = data.characters.split('-').map(s => s.trim());
    const ep: Episode = {
      id: Date.now(),
      name: data.title,
      air_date: now.toLocaleDateString(),
      characters: ids.map(id => `https://rickandmortyapi.com/api/character/${id}`),
    };
    onAdd(ep);
    toast.success('Episodio guardado correctamente');
    reset({ title: '', characters: '' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div>
        <label className="block font-medium">Título</label>
        <input className="w-full border rounded p-2" {...register('title')} placeholder="Nuevo episodio..." />
        {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block font-medium">IDs de personajes</label>
        <input className="w-full border rounded p-2" {...register('characters')} placeholder="12-14-1-23-8" />
        {errors.characters && <p className="text-sm text-red-600">{errors.characters.message}</p>}
      </div>

      <button
        disabled={!isValid || isSubmitting}
        className="px-4 py-2 text-sm rounded border border-gray-400 text-gray-700 hover:bg-gray-100 disabled:opacity-60"
      >
        {isSubmitting ? 'Enviando…' : 'Crear'}
      </button>
    </form>
  );
}
