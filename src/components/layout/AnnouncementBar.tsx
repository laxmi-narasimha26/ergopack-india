'use client';

import { X, MapPin } from 'lucide-react';

export const ANNOUNCEMENT_DISMISS_KEY = 'announcement-exhibitions-2026-dismissed';

interface AnnouncementBarProps {
  onDismiss: () => void;
}

export default function AnnouncementBar({ onDismiss }: AnnouncementBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-[110] bg-[#0B1F3A] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-9 flex items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs relative">
        <span className="hidden sm:inline-flex items-center gap-1.5 font-medium uppercase tracking-wide text-white/70">
          <MapPin className="w-3.5 h-3.5" />
          Meet Us At
        </span>
        <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-center">
          <span>
            <strong className="font-semibold">Packplus 2026</strong> · 20–22 Aug · Booth A89, Delhi
          </span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span>
            <strong className="font-semibold">Vietnamplas 2026</strong> · 9–12 Sep · Booth B1322,
            HCMC
          </span>
        </span>
        <button
          aria-label="Dismiss announcement"
          onClick={onDismiss}
          className="absolute right-4 sm:right-10 p-1 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
