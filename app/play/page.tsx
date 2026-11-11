'use client';

import dynamic from 'next/dynamic';

const GamePortfolio = dynamic(() => import('../GamePortfolio'), { ssr: false });

export default function PlayPage() {
  return <GamePortfolio />;
}
