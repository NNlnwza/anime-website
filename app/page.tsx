import React from 'react';
import Navbar from './components/Navbar';
import AnimeCard from './components/AnimeCard';
import { Anime } from './types/anime';

// Mock data สำหรับตัวอย่าง
const featuredAnime: Anime[] = [
  {
    id: '1',
    title: 'SPY x FAMILY',
    image: '/images/spy-x-family.jpg',
    type: 'Both',
    description: 'A spy on an undercover mission gets married and adopts a child as part of his cover. His wife and daughter have secrets of their own, and all three must strive to keep their true identities hidden from each other.',
    episodes: 25,
    status: 'Ongoing',
    rating: 8.9
  },
  {
    id: '2',
    title: 'DAN DA DAN',
    image: '/images/dandadan.jpg',
    type: 'Sub',
    description: 'A story that follows the supernatural encounters of high school students Momo Ayase and Ken Takakura.',
    episodes: 12,
    status: 'Ongoing',
    rating: 8.5
  },
  // เพิ่มอนิเมะอื่นๆ ตามต้องการ
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a1b1f]">
      <Navbar />
      
      {/* Hero section */}
      <section className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mt-8 mb-6">Featured Anime</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredAnime.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">Spring 2024 Anime</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredAnime.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 