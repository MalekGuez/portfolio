"use client";

// import { useRouter } from 'next/navigation';
import { works } from '@/data/works';

export default function WorkDetailPage({ params }) {
  const { 'work-name': workName } = params;

  const work = works.find((w) => w.title.toLowerCase().replace(/\s+/g, '-') === workName);

  if (!work) {
    
  }

  return (
    <>
    </>
  );
}