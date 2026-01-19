const DEFAULT_POSTER_DIR = '/videos/posters';

export const getVideoPoster = (videoSrc: string, posterDir = DEFAULT_POSTER_DIR) => {
  const fileName = videoSrc.split('/').pop();
  if (!fileName) {
    return `${posterDir}/ErgoPack_RE.jpg`;
  }

  const baseName = fileName.replace(/\.[^/.]+$/, '');
  return `${posterDir}/${baseName}.jpg`;
};

export const getHostedVideoUrl = (videoSrc: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_VIDEO_HOST_BASE_URL;
  if (!baseUrl) {
    return videoSrc;
  }

  const fileName = videoSrc.split('/').pop();
  if (!fileName) {
    return baseUrl.replace(/\/$/, '');
  }

  return `${baseUrl.replace(/\/$/, '')}/${fileName}`;
};
