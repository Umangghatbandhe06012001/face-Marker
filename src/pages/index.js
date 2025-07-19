import RecordedVideosList from '../components/RecordedVideoList';
import dynamic from 'next/dynamic';

const FaceTracker = dynamic(() => import('@/components/FaceTracker'), { ssr: false });
// import RecordedVideosList from '@/components/RecordedVideoList';

export default function Home() {
  return (
    <div className='bg-[black]'>
      <h1 className='rainbow-text w-[100%] text-center font-[Poppins] typing-effect font-bold h-[70px] text-transparent'>Face Tracker</h1>
      <main className="flex justify-center min-h-screen px-3 bg-black mx-[30px] max-[768px]:flex-col">
        
        <FaceTracker />
        <RecordedVideosList />
      </main>

    </div>
  );
}
