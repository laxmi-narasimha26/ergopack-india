export interface SlideData {
  id: number;
  pairId: string;
  type:
    | 'intro'
    | 'cover'
    | 'hero'
    | 'detail'
    | 'problem'
    | 'solution'
    | 'compare-process'
    | 'physics'
    | 'data'
    | 'impact'
    | 'split'
    | 'montage'
    | 'credits';
  title: string;
  subtitle?: string;
  content: string;
  image: string;
  tagline?: string;
  overlay?: string;
  notes?: string;
}
