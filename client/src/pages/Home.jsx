import { useState } from 'react';
import GenderSplit from '../components/GenderSplit.jsx';
import IntroVideo from '../components/IntroVideo.jsx';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <IntroVideo onFinish={() => setShowIntro(false)} />;
  }

  return <GenderSplit />;
}
