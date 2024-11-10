import { useRouter } from 'next/navigation';
import worksData from '@/data/worksData';

export default function WorkDetailPage({ params }) {
  const { 'work-name': workName } = params;

  const work = worksData.find((w) => w.title.toLowerCase().replace(/\s+/g, '-') === workName);

  if (!work) {
    
  }

  return (
    <>
    </>
  );
}