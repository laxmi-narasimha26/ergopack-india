# Codex Change Log (this session)

This file lists changes made by Codex in this workspace during this session.
It does not try to enumerate unrelated pre-existing changes.

## Summary

- Removed inline video playback and replaced it with poster images and external "Watch video" links.
- Added media helpers and optimized image loading, then updated affected components/pages.
- Fixed build blockers (compare Suspense, offline client split, dynamic stats/sitemap).
- Resolved TypeScript issues and hook order violations.
- Updated formatting rules and ran a repo-wide Prettier pass.
- Re-encoded videos and generated posters in public assets.

## New files

- src/components/media/LazyVideo.tsx: deferred in-view video loader (now unused after poster-only strategy).
- src/components/media/SmartImage.tsx: client-safe Next/Image wrapper for local and remote URLs.
- src/components/media/VideoPosterLink.tsx: poster image with external "Watch video" link.
- src/lib/media/video.ts: helpers to map local video paths to posters and hosted URLs.
- src/app/compare/ComparePageClient.tsx: client component for compare logic (Suspense-wrapped).
- src/app/offline/OfflineClient.tsx: client-only offline page UI and handlers.
- public/videos/posters/\*.jpg: posters generated from mp4 files.

## Updated files (media and performance)

- next.config.js: removed experimental isrMemoryCacheSize; added cache headers for /images, /videos, /pdfs, /icons; set images.minimumCacheTTL to 86400.
- src/app/layout.tsx: removed global force-dynamic/revalidate to allow caching.
- src/app/compare/page.tsx: now Suspense wrapper; moved logic to ComparePageClient.
- src/components/elite/sections/VideoHeroSection.tsx: replaced autoplay video with poster + external link.
- src/components/elite/sections/AppleStyleProductShowcase.tsx: replaced inline videos with VideoPosterLink.
- src/components/products/ProductLinePage.tsx: replaced inline videos with VideoPosterLink; renamed feature video keys to videoSrc.
- src/components/products/FeatureHighlightCard.tsx: now uses VideoPosterLink and renamed prop to videoSrc.
- src/app/products/[slug]/sections/HeroSection.tsx: background video replaced with poster; adds "Watch Video" link.
- src/app/testimonials/page.tsx: testimonial cards use poster + external link only.
- src/components/testimonials/TestimonialsFooterSection.tsx: carousel uses poster + external link only.
- src/components/elite/shared/VideoPlayer.tsx: added preload="metadata" and playsInline.
- src/components/contact/ContactPopupContext.tsx: dynamic import + deferred mount for popup.
- src/components/elite/sections/ImageHeroSection.tsx: reduced image quality to 80.
- src/components/ui/ParallaxProductCard.tsx: removed priority image loading.
- src/app/page.tsx: removed unused imports.

## Updated files (image optimization)

- src/components/media/SmartImage.tsx added and used in:
  - src/app/blog/BlogListing.tsx
  - src/app/blog/[slug]/BlogPost.tsx
  - src/components/admin/BlogsTable.tsx
  - src/app/admin/media/page.tsx
  - src/components/presentation/slides/IntroSlide.tsx
  - src/components/presentation/PGPresentationDeck.tsx
- src/app/email-signature/page.tsx: switched to next/image.

## Updated files (build blockers and TS fixes)

- src/app/offline/page.tsx: now server wrapper over OfflineClient.
- src/app/api/stats/route.ts: export dynamic = "force-dynamic".
- src/app/sitemap.ts: export dynamic + revalidate; return [] when MONGODB_URI is missing.
- src/app/blog/[slug]/BlogPost.tsx: alt fallback for related blog titles.
- src/app/presentation/components/index.ts: removed Advanced3D export and LoadingScreen export.
- src/app/presentation/components/Models/VisualElements.tsx: fixed hook order and removed unused line ref.
- src/app/presentation/components/UI/AdvancedUI.tsx: icon style fix and hook order fix.
- src/app/products/[slug]/ProductDetailClient.tsx: moved useComparison above early returns.
- src/components/ui/Input.tsx, src/components/ui/Select.tsx, src/components/ui/Textarea.tsx: useId called unconditionally.

## Updated files (formatting and lint)

- .prettierrc: endOfLine set to auto.
- .eslintrc.json: prettier endOfLine override set to auto.
- .prettierignore: added temp_clean_comparison.tsx.

## Public asset changes

- public/videos/_.mp4 and public/videos/testimonials/_.mp4 re-encoded to H.264 with faststart.
- public/videos/posters/\*.jpg generated from videos.
- Updated poster references in testimonial data arrays.

## Commands run

- npm run format
- npm run lint (passes with warnings; no errors)
- npm run type-check (passes)
- npm run build (passes)

## Notes

- External video hosting uses NEXT_PUBLIC_VIDEO_HOST_BASE_URL. If unset, links open local /videos/\*.mp4.
- Lint warnings remain in several files (unused imports and hook deps). They pre-existed or were not addressed as part of the performance work.
