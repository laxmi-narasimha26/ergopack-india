'use client';

import { useState, useEffect } from 'react';
import { Award, Globe, ShieldCheck, Headphones } from 'lucide-react';
import SmartImage from '@/components/media/SmartImage';
import { getHostedVideoUrl } from '@/lib/media/video';

export default function VideoHeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const videoSrc = isMobile ? '/videos/mobile.mp4' : '/videos/ErgoPack_RE.mp4';
  const posterSrc = isMobile ? '/videos/posters/mobile.jpg' : '/videos/posters/ErgoPack_RE.jpg';
  const watchUrl = getHostedVideoUrl(videoSrc);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Static poster background - Shows instantly */}
      <div
        className="absolute inset-0 z-0 bg-black"
        style={{
          backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #000000 50%, #0d0d0d 100%)',
        }}
      />

      {/* Main Hero Video */}
      <div className="absolute inset-0 z-0">
        <SmartImage
          src={posterSrc}
          alt="ErgoPack hero video poster"
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      <div className="absolute top-6 right-6 z-20">
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-black/60"
        >
          Watch video
        </a>
      </div>

      {/* Scroll Indicator - Desktop only */}
      <div className="absolute bottom-32 right-12 items-center gap-4 z-20 hidden md:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 text-right">
          Scroll to Explore
        </span>
        <div className="w-[1px] h-12 bg-white/20" />
      </div>

      {/* Bottom Content - Feature Icons */}
      <div className="absolute bottom-8 left-0 z-20 w-full px-8 md:px-16 pointer-events-none">
        <div className="max-w-[1800px] mx-auto w-full">
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-white/10 pt-8 backdrop-blur-sm">
            {[
              { title: 'German Engineering', subtitle: 'Precision Crafted', Icon: Award },
              { title: 'Global Leader', subtitle: '55+ Countries', Icon: Globe },
              { title: 'Patented Technology', subtitle: 'Ergonomic Excellence', Icon: ShieldCheck },
              { title: 'Premium Support', subtitle: '24/7 Assistance', Icon: Headphones },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-ergopack/50 transition-colors duration-300">
                  <item.Icon className="w-6 h-6 text-ergopack" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white font-serif text-lg tracking-wide">{item.title}</h3>
                  <p className="text-white/60 text-xs uppercase tracking-widest">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
