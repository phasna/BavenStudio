import { useEffect, useState } from 'react';
import introPc from '../assets/Video/Bavenstudio_Version PC.mp4';
import introMobile from '../assets/Video/Bavenstudio_Version MOBILE.mp4';
import { useLanguage } from '../context/LanguageContext.jsx';

const MOBILE_BREAKPOINT = '(max-width: 720px)';

export default function IntroVideo({ onFinish }) {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_BREAKPOINT).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_BREAKPOINT);
    const handleChange = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'var(--color-ink, #111820)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <video
        key={isMobile ? 'mobile' : 'pc'}
        src={isMobile ? introMobile : introPc}
        autoPlay
        muted
        playsInline
        onEnded={onFinish}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      <button
        type="button"
        onClick={onFinish}
        style={{
          position: 'absolute',
          bottom: 32,
          right: 32,
          padding: '10px 20px',
          background: 'transparent',
          border: '1px solid var(--color-off-white, #f4f1ea)',
          borderRadius: 999,
          color: 'var(--color-off-white, #f4f1ea)',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
      >
        {t('intro.skip')}
      </button>
    </div>
  );
}
