'use client';

import Image, { ImageProps } from 'next/image';

type SmartImageProps = Omit<ImageProps, 'src'> & {
  src: string;
};

const isRemoteSrc = (src: string) => /^https?:\/\//i.test(src);

export default function SmartImage({ src, ...props }: SmartImageProps) {
  if (isRemoteSrc(src)) {
    return <Image src={src} loader={({ src: loaderSrc }) => loaderSrc} unoptimized {...props} />;
  }

  return <Image src={src} {...props} />;
}
