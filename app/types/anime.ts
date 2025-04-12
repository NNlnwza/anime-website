export interface Anime {
  id: string;
  title: string;
  image: string;
  type: 'Sub' | 'Dub' | 'Both';
  description: string;
  episodes: number;
  status: 'Ongoing' | 'Completed';
  rating: number;
}

export interface AnimeCategory {
  id: string;
  name: string;
  slug: string;
} 