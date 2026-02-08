export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  label: string;
  tags: string[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'walkability',
    question: 'How important is walkability to you?',
    options: [
      { label: 'Essential — I want to walk to shops, restaurants, and transit', tags: ['walkable', 'metro', 'urban'] },
      { label: 'Nice to have, but I\'m fine driving for most things', tags: ['community', 'suburban'] },
      { label: 'I prefer quiet streets and nature over sidewalk bustle', tags: ['quiet', 'nature', 'wooded'] },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your budget range?',
    options: [
      { label: 'Under $1M — looking for best value', tags: ['value', 'affordable'] },
      { label: '$1M–$1.5M — solid middle ground', tags: ['family', 'community'] },
      { label: '$1.5M+ — top of the market', tags: ['luxury', 'prestigious', 'large-lots'] },
    ],
  },
  {
    id: 'vibe',
    question: 'What vibe are you looking for?',
    options: [
      { label: 'Village charm — community events, local shops, neighbors who wave', tags: ['village', 'community', 'charming', 'small-town'] },
      { label: 'Urban energy — restaurants, nightlife, things to do', tags: ['urban', 'dining', 'nightlife', 'walkable'] },
      { label: 'Nature retreat — trees, trails, parks, and quiet', tags: ['nature', 'wooded', 'trails', 'quiet'] },
      { label: 'Prestigious & established — stately homes, large lots', tags: ['luxury', 'prestigious', 'established', 'large-lots'] },
    ],
  },
  {
    id: 'schools',
    question: 'Which school cluster matters most?',
    options: [
      { label: 'Whitman — top MCPS academics', tags: ['walkable', 'family'] },
      { label: 'BCC — strong academics, central location', tags: ['community', 'village'] },
      { label: 'Walter Johnson — great schools, more affordable', tags: ['value', 'suburban', 'family'] },
      { label: 'Jackson-Reed DC — excellent DC public schools', tags: ['dc'] },
      { label: 'No preference — show me everything', tags: [] },
    ],
  },
  {
    id: 'lifestyle',
    question: 'What\'s your weekend like?',
    options: [
      { label: 'Farmers market, brunch, browsing boutiques', tags: ['walkable', 'charming', 'dining'] },
      { label: 'Hiking, biking, kayaking — get me outside', tags: ['nature', 'trails', 'trail'] },
      { label: 'Pool, tennis, neighborhood cookout', tags: ['pool', 'swim-tennis', 'community'] },
      { label: 'Kids\' sports, school events, family time', tags: ['family', 'schools'] },
    ],
  },
  {
    id: 'housing',
    question: 'What type of home do you prefer?',
    options: [
      { label: 'Condo or townhome — low maintenance', tags: ['urban', 'metro', 'townhomes'] },
      { label: 'Classic colonial or Cape Cod', tags: ['charming', 'historic', 'established'] },
      { label: 'Mid-century modern or ranch', tags: ['mid-century', 'quirky'] },
      { label: 'Big lot, big house — room to spread out', tags: ['large-lots', 'luxury'] },
    ],
  },
];
