'use client';

import SmartImage from '@/components/media/SmartImage';
import { getHostedVideoUrl, getVideoPoster } from '@/lib/media/video';

interface VideoPosterLinkProps {
  videoSrc: string;
  posterSrc?: string;
  watchUrl?: string;
  title: string;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  linkClassName?: string;
  sizes?: string;
  linkLabel?: string;
}

export default function VideoPosterLink({
  videoSrc,
  posterSrc,
  watchUrl,
  title,
  className,
  imageClassName,
  overlayClassName,
  linkClassName,
  sizes = '100vw',
  linkLabel = 'Watch video',
}: VideoPosterLinkProps) {
  const poster = posterSrc ?? getVideoPoster(videoSrc);
  const href = watchUrl ?? getHostedVideoUrl(videoSrc);

  return (
    <div className={`relative ${className ?? ''}`}>
      <SmartImage
        src={poster}
        alt={title}
        fill
        sizes={sizes}
        className={imageClassName ?? 'object-cover'}
      />
      <div
        className={`absolute inset-0 ${overlayClassName ?? 'bg-gradient-to-t from-black/60 via-black/20 to-transparent'}`}
      />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${linkLabel}: ${title}`}
        className={
          linkClassName ??
          'absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white/20'
        }
      >
        {linkLabel}
      </a>
    </div>
  );
}
