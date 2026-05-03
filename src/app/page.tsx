import { ScrollVideoBackground } from '@/components/ScrollVideoBackground';
import { Navbar } from '@/components/Navbar';
import { ScrollJourney } from '@/components/ScrollJourney';

export default function Home() {
  return (
    <>
      <ScrollVideoBackground />
      <Navbar />
      <main>
        <ScrollJourney />
      </main>
    </>
  );
}
