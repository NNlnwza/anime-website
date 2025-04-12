import Image from 'next/image';
import Link from 'next/link';
import { Anime } from '../types/anime';

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link href={`/anime/${anime.id}`} className="group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
        <Image
          src={anime.image}
          alt={anime.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-white font-medium">{anime.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-300">{anime.type}</span>
            {anime.status === 'Ongoing' && (
              <span className="px-2 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                Ongoing
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
} 