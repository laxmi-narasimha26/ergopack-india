'use client';

import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazyVideoProps
  extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src' | 'preload'> {
  src: string;
  type?: string;
  preload?: 'none' | 'metadata' | 'auto';
}

const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(
  (
    {
      src,
      type = 'video/mp4',
      preload = 'metadata',
      autoPlay = true,
      loop = true,
      muted = true,
      playsInline = true,
      className,
      ...rest
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLVideoElement | null>(null);
    const { ref: inViewRef, inView } = useInView({ rootMargin: '200px', triggerOnce: true });
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
      if (inView) {
        setShouldLoad(true);
      }
    }, [inView]);

    const setRefs = useCallback(
      (node: HTMLVideoElement | null) => {
        inViewRef(node);
        internalRef.current = node;
        if (!forwardedRef) return;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else {
          forwardedRef.current = node;
        }
      },
      [inViewRef, forwardedRef]
    );

    useEffect(() => {
      if (!shouldLoad || !autoPlay || !internalRef.current) {
        return;
      }

      const playPromise = internalRef.current.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    }, [shouldLoad, autoPlay]);

    return (
      <video
        ref={setRefs}
        className={className}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload={shouldLoad ? preload : 'none'}
        {...rest}
      >
        {shouldLoad && <source src={src} type={type} />}
      </video>
    );
  }
);

LazyVideo.displayName = 'LazyVideo';

export default LazyVideo;
