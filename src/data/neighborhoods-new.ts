// ============================================================================
// BETHESDA UNFILTERED — NEIGHBORHOOD DATA
// ============================================================================
// This file is the single source of truth for all neighborhood content.
// To add a neighborhood: copy any object below, change the fields, done.
// To edit one: find it by `slug` and edit in place. No component changes needed.
//
// SCHEMA NOTES:
// - `cluster` is the high school cluster: 'whitman' | 'wj' | 'bcc'
// - `lifestyleTracks` powers the quiz + filters. Allowed values:
//     'nature' | 'walkable' | 'preppy' | 'value' | 'urban' | 'balanced' | 'academic'
// - `priceLow` / `priceHigh` are numeric (for sliders/sorting);
//   `priceRange` is the human-readable display string.
// - `ratings` are 1–5 "real talk" scores. Higher = more of that trait.
//     walkability, kidDensity, commutePain (5 = worst commute), pretension, weekendVibe
// ============================================================================

export type Cluster = 'whitman' | 'wj' | 'bcc' | 'dc'

export type LifestyleTrack =
  | 'nature'
  | 'walkable'
  | 'preppy'
  | 'value'
  | 'urban'
  | 'balanced'
  | 'academic'

export interface SchoolAssignment {
  elementary: string
  middle: string
  high: string
}

export interface RealTalkRatings {
  walkability: number   // 1 = car-dependent, 5 = walk everywhere
  kidDensity: number    // 1 = few kids, 5 = packed with families
  commutePain: number   // 1 = easy commute, 5 = brutal
  pretension: number    // 1 = unpretentious, 5 = performatively gracious
  weekendVibe: number   // 1 = sleepy, 5 = always something going on
}

export interface Neighborhood {
  id: string
  name: string
  slug: string
  cluster: Cluster
  schools: SchoolAssignment
  priceRange: string
  priceLow: number
  priceHigh: number
  zipCode: string
  vibe: string                 // one-line gut take
  shortDescription: string     // card-level summary
  fullDescription: string      // detail page body
  realTalk: string             // the unfiltered insider take
  lifestyleTracks: LifestyleTrack[]
  pros: string[]
  cons: string[]
  ratings: RealTalkRatings
  coordinates: { lat: number; lng: number }
}

// ============================================================================
// CLUSTER METADATA (for cluster overview pages)
// ============================================================================

export const CLUSTERS: Record<Cluster, { name: string; high: string; blurb: string }> = {
  whitman: {
    name: 'Walt Whitman HS Cluster',
    high: 'Walt Whitman High School',
    blurb:
      'The marquee down-county cluster (20816, parts of 20817). Top public high school in Maryland, strong athletics—lacrosse, swimming, tennis—and exceptional college placement. Competitive culture; many families supplement with private college counseling.',
  },
  wj: {
    name: 'Walter Johnson HS Cluster',
    high: 'Walter Johnson High School',
    blurb:
      'Centered on 20814 and parts of 20817. More urban and condo-heavy near downtown Bethesda, more conventional suburban toward NIH and Rock Creek. Strong schools, generally better value than the Whitman premium.',
  },
  bcc: {
    name: 'Bethesda-Chevy Chase HS Cluster',
    high: 'Bethesda-Chevy Chase High School',
    blurb:
      'The Chevy Chase municipalities and surrounding areas (mostly 20815). A patchwork of incorporated villages with their own governments and tax structures, all sharing "Chevy Chase" addresses but feeling distinct block to block.',
  },
  dc: {
    name: 'DC — Upper Northwest',
    high: 'Jackson-Reed HS (in-boundary) + charter/private options',
    blurb:
      'The affluent Upper Northwest DC neighborhoods that draw the same families as Bethesda and Chevy Chase MD. These are in DCPS (not MCPS): most feed Jackson-Reed HS (formerly Woodrow Wilson) in-boundary, with heavy use of the DC charter lottery and private schools. School data here is provisional—DCPS boundaries and the charter lottery work very differently from MCPS, so verify by address and confirm current in-boundary feeds.',
  },
}

// ============================================================================
// NEIGHBORHOODS
// ============================================================================

export const NEIGHBORHOODS: Neighborhood[] = [
  // ---------------------------------------------------------------- WHITMAN
  {
    id: 'bannockburn',
    name: 'Bannockburn',
    slug: 'bannockburn',
    cluster: 'whitman',
    schools: { elementary: 'Bannockburn ES', middle: 'Pyle MS', high: 'Walt Whitman HS' },
    priceRange: '$900K–$2M+',
    priceLow: 900000,
    priceHigh: 2000000,
    zipCode: '20817',
    vibe: 'Space and nature without going full suburban. Less pretentious than most.',
    shortDescription: 'Quiet, wooded, mid-century homes on large lots with strong community identity.',
    fullDescription:
      'Quiet, wooded, mid-century homes on large lots. Strong community identity with its own pool and civic association. Feels tucked away despite proximity to MacArthur Blvd. Homes range from modest ramblers to significantly expanded colonials.',
    realTalk:
      'One of the few Whitman-cluster spots that feels genuinely unpretentious. You get the schools and the trees without the Edgemoor price of admission or attitude.',
    lifestyleTracks: ['nature', 'balanced'],
    pros: ['Whitman cluster', 'Wooded, large lots', 'Community pool', 'Less pretentious'],
    cons: ['Car-dependent', 'Tucked away from downtown'],
    ratings: { walkability: 2, kidDensity: 4, commutePain: 3, pretension: 2, weekendVibe: 2 },
    coordinates: { lat: 38.9637, lng: -77.1419 },
  },
  {
    id: 'glen-echo-heights',
    name: 'Glen Echo / Glen Echo Heights',
    slug: 'glen-echo-heights',
    cluster: 'whitman',
    schools: { elementary: 'Bannockburn ES', middle: 'Pyle MS', high: 'Walt Whitman HS' },
    priceRange: '$700K–$1.5M',
    priceLow: 700000,
    priceHigh: 1500000,
    zipCode: '20812',
    vibe: 'Creative, outdoorsy, tight-knit. People choose it deliberately.',
    shortDescription: 'Artistic legacy, eclectic housing, proximity to the park and Clara Barton Parkway.',
    fullDescription:
      'Artistic legacy from the Chautauqua era, eclectic housing stock, proximity to Glen Echo Park and Clara Barton Parkway. The Heights is slightly more conventional; Glen Echo proper has historic cottages and quirky charm.',
    realTalk:
      'People here chose it on purpose—it self-selects for a creative, river-and-park-oriented crowd. The housing stock is genuinely eclectic, which is rare around here.',
    lifestyleTracks: ['nature', 'balanced'],
    pros: ['Whitman cluster', 'Park access', 'Character homes', 'Tight community'],
    cons: ['Older housing stock varies widely', 'Car-dependent'],
    ratings: { walkability: 2, kidDensity: 3, commutePain: 3, pretension: 2, weekendVibe: 3 },
    coordinates: { lat: 38.9685, lng: -77.1419 },
  },
  {
    id: 'brookmont',
    name: 'Brookmont',
    slug: 'brookmont',
    cluster: 'whitman',
    schools: { elementary: 'Carderock Springs ES', middle: 'Pyle MS', high: 'Walt Whitman HS' },
    priceRange: '$600K–$1M',
    priceLow: 600000,
    priceHigh: 1000000,
    zipCode: '20816',
    vibe: 'Unpretentious, outdoor-focused families. Kayakers and climbers.',
    shortDescription: 'Below the Beltway along the river, feels almost like a small town.',
    fullDescription:
      'Below the Beltway along the river, feels almost like a small town. Modest post-war housing, strong civic identity. Carderock Springs ES is small and beloved.',
    realTalk:
      'The most "small town" feeling pocket in the Whitman cluster, and the relative value play. Draws people who actually use the river—kayakers, climbers, Billy Goat Trail regulars.',
    lifestyleTracks: ['nature', 'value'],
    pros: ['Whitman cluster value', 'River access', 'Small-town feel', 'Beloved small ES'],
    cons: ['Modest housing', 'Below Beltway location'],
    ratings: { walkability: 2, kidDensity: 3, commutePain: 3, pretension: 1, weekendVibe: 2 },
    coordinates: { lat: 38.9489, lng: -77.1175 },
  },
  {
    id: 'little-falls',
    name: 'Little Falls',
    slug: 'little-falls',
    cluster: 'whitman',
    schools: { elementary: 'Somerset ES', middle: 'Westland MS', high: 'Walt Whitman HS' },
    priceRange: '$600K–$1.2M',
    priceLow: 600000,
    priceHigh: 1200000,
    zipCode: '20816',
    vibe: 'Practical Whitman access without paying Bethesda premium.',
    shortDescription: 'Mixed housing between Brookmont and Westmoreland Hills, good value.',
    fullDescription:
      'Between Brookmont and Westmoreland Hills. Mixed housing, some townhomes. Good value for the schools.',
    realTalk:
      'A value-conscious way into the Whitman cluster. Townhome options here make it one of the more accessible entry points.',
    lifestyleTracks: ['value', 'balanced'],
    pros: ['Whitman cluster', 'Good value', 'Townhome options'],
    cons: ['Mixed housing character', 'Less cohesive identity'],
    ratings: { walkability: 3, kidDensity: 3, commutePain: 3, pretension: 2, weekendVibe: 2 },
    coordinates: { lat: 38.9533, lng: -77.1086 },
  },
  {
    id: 'westmoreland-hills',
    name: 'Westmoreland Hills',
    slug: 'westmoreland-hills',
    cluster: 'whitman',
    schools: { elementary: 'Westbrook ES', middle: 'Westland MS', high: 'Walt Whitman HS' },
    priceRange: '$900K–$1.8M',
    priceLow: 900000,
    priceHigh: 1800000,
    zipCode: '20816',
    vibe: 'Traditional families, less turnover.',
    shortDescription: 'Established neighborhood with solid colonials and ramblers near Mass Ave.',
    fullDescription:
      'Established neighborhood with solid colonials and ramblers. Adjacent to Massachusetts Ave. Good bones, less flashy than Kenwood.',
    realTalk:
      'Steady, established, low-turnover. You buy here for solid bones and the Westbrook→Whitman pattern, not for flash.',
    lifestyleTracks: ['balanced', 'preppy'],
    pros: ['Whitman cluster', 'Westbrook ES', 'Established', 'Solid housing'],
    cons: ['Some Mass Ave traffic noise', 'Less flashy'],
    ratings: { walkability: 2, kidDensity: 4, commutePain: 3, pretension: 3, weekendVibe: 2 },
    coordinates: { lat: 38.9583, lng: -77.1019 },
  },
  {
    id: 'kenwood',
    name: 'Kenwood',
    slug: 'kenwood',
    cluster: 'whitman',
    schools: { elementary: 'Westbrook ES', middle: 'Westland MS', high: 'Walt Whitman HS' },
    priceRange: '$1.5M–$5M+',
    priceLow: 1500000,
    priceHigh: 5000000,
    zipCode: '20815',
    vibe: 'Affluent, traditional, performatively gracious.',
    shortDescription: 'The cherry blossoms draw crowds. Grand homes, old Bethesda money.',
    fullDescription:
      'The cherry blossoms in spring draw crowds—literally. Grand homes, stately streets, old Bethesda money. Kenwood Country Club anchors the social scene for some.',
    realTalk:
      'The cherry-blossom crowds in spring are a real thing—gridlock on your own street for two weeks. Beautiful, traditional, and the most "performatively gracious" address in the cluster.',
    lifestyleTracks: ['preppy'],
    pros: ['Whitman cluster', 'Grand homes', 'Iconic streets', 'Country club adjacent'],
    cons: ['Expensive', 'Cherry blossom crowds', 'Can feel stuffy'],
    ratings: { walkability: 2, kidDensity: 3, commutePain: 3, pretension: 5, weekendVibe: 2 },
    coordinates: { lat: 38.9647, lng: -77.0972 },
  },
  {
    id: 'kenwood-park',
    name: 'Kenwood Park',
    slug: 'kenwood-park',
    cluster: 'whitman',
    schools: { elementary: 'Westbrook ES', middle: 'Westland MS', high: 'Walt Whitman HS' },
    priceRange: '$1M–$2M',
    priceLow: 1000000,
    priceHigh: 2000000,
    zipCode: '20815',
    vibe: 'Kenwood adjacent without the stuffiness.',
    shortDescription: 'More accessible than Kenwood proper, walkable to downtown Bethesda.',
    fullDescription:
      'More accessible than Kenwood proper. Solid colonials, good community feel, walking distance to downtown Bethesda.',
    realTalk:
      'Gets you the Westbrook→Whitman pattern and walkability to downtown without the Kenwood-proper price or attitude. A genuine sweet spot.',
    lifestyleTracks: ['balanced', 'walkable'],
    pros: ['Whitman cluster', 'Walkable to downtown', 'Good community', 'More accessible'],
    cons: ['Still not cheap'],
    ratings: { walkability: 4, kidDensity: 4, commutePain: 2, pretension: 3, weekendVibe: 3 },
    coordinates: { lat: 38.9689, lng: -77.0975 },
  },
  {
    id: 'springfield',
    name: 'Springfield',
    slug: 'springfield',
    cluster: 'whitman',
    schools: { elementary: 'Wood Acres ES', middle: 'Pyle MS', high: 'Walt Whitman HS' },
    priceRange: '$1.5M–$3.5M',
    priceLow: 1500000,
    priceHigh: 3500000,
    zipCode: '20816',
    vibe: 'Established wealth, old trees, privacy.',
    shortDescription: 'Large lots, significant homes, quiet streets. One of the more prestigious feeders.',
    fullDescription:
      'Large lots, significant homes, quiet streets. One of the more prestigious Whitman-feeding neighborhoods.',
    realTalk:
      'Quiet, leafy, and prestigious in a low-key way. The Wood Acres ES feeder is a major draw and the lots are genuinely large.',
    lifestyleTracks: ['preppy', 'nature'],
    pros: ['Whitman cluster', 'Wood Acres ES', 'Large lots', 'Privacy'],
    cons: ['Expensive', 'Car-dependent'],
    ratings: { walkability: 2, kidDensity: 4, commutePain: 3, pretension: 4, weekendVibe: 2 },
    coordinates: { lat: 38.9614, lng: -77.1156 },
  },
  {
    id: 'sumner',
    name: 'Sumner',
    slug: 'sumner',
    cluster: 'whitman',
    schools: { elementary: 'Wood Acres ES', middle: 'Pyle MS', high: 'Walt Whitman HS' },
    priceRange: '$1.2M–$2.5M',
    priceLow: 1200000,
    priceHigh: 2500000,
    zipCode: '20816',
    vibe: 'WASP-y, preppy undertone—wealth that is there but not displayed.',
    shortDescription: 'Wood Acres feeder with continuity of character; Congressional CC influence.',
    fullDescription:
      'Adjacent to Springfield, similar feel but slightly more accessible price points. Named for Charles Sumner. Unlike areas that have turned over completely through teardowns, Sumner maintains pockets of original character even as individual homes are updated—a 1952 colonial next to a 2019 new build, and somehow it works. Congressional Country Club\'s influence is felt here; many residents are members, and club life (golf, tennis, swimming) shapes weekend routines.',
    realTalk:
      'A well-worn Volvo over a new Range Rover kind of place. Most desirable streets cluster near Wood Acres ES (Falstone Ave, Millwood Rd). Avoid streets backing up to Massachusetts Ave—the traffic noise is real and it affects resale.',
    lifestyleTracks: ['preppy', 'balanced'],
    pros: ['Whitman cluster', 'Wood Acres ES', 'Continuity of character', 'Congressional adjacent'],
    cons: ['Mass Ave traffic on the edges', 'Private-school pull for HS'],
    ratings: { walkability: 2, kidDensity: 4, commutePain: 3, pretension: 4, weekendVibe: 2 },
    coordinates: { lat: 38.9603, lng: -77.1208 },
  },
  {
    id: 'bradley-hills',
    name: 'Bradley Hills',
    slug: 'bradley-hills',
    cluster: 'whitman',
    schools: { elementary: 'Bradley Hills ES', middle: 'Pyle MS', high: 'Walt Whitman HS' },
    priceRange: '$800K–$1.8M',
    priceLow: 800000,
    priceHigh: 1800000,
    zipCode: '20817',
    vibe: 'Academic/research families, international mix from NIH.',
    shortDescription: 'Wooded, winding streets, mid-century and colonial mix near NIH.',
    fullDescription:
      'Wooded, winding streets, mid-century and colonial mix. Near NIH. Some rentals due to NIH proximity.',
    realTalk:
      'The NIH proximity gives it a genuinely international, academic flavor and a few more rentals than neighbors. Good Whitman access with a slightly different demographic feel.',
    lifestyleTracks: ['academic', 'nature'],
    pros: ['Whitman cluster', 'NIH proximity', 'Wooded', 'International community'],
    cons: ['Some rentals', 'Winding/hilly streets'],
    ratings: { walkability: 2, kidDensity: 3, commutePain: 2, pretension: 3, weekendVibe: 2 },
    coordinates: { lat: 38.9939, lng: -77.1119 },
  },
  {
    id: 'battery-park',
    name: 'Battery Park',
    slug: 'battery-park',
    cluster: 'whitman',
    schools: { elementary: 'Bethesda ES', middle: 'Westland MS', high: 'Walt Whitman HS' },
    priceRange: '$1M–$2.5M',
    priceLow: 1000000,
    priceHigh: 2500000,
    zipCode: '20814',
    vibe: 'Families who want walkability to Metro, restaurants, shops.',
    shortDescription: 'Walking distance to downtown Bethesda; urban-suburban hybrid.',
    fullDescription:
      'Walking distance to downtown Bethesda. Mix of older homes and teardown/rebuilds. Urban-suburban hybrid.',
    realTalk:
      'The rare Whitman-cluster pocket where you can actually walk to Metro and dinner. That walkability is the whole pitch, and it commands a premium.',
    lifestyleTracks: ['walkable', 'balanced'],
    pros: ['Whitman cluster', 'Walk to downtown + Metro', 'Bethesda ES'],
    cons: ['Teardown churn', 'Premium for walkability'],
    ratings: { walkability: 5, kidDensity: 4, commutePain: 2, pretension: 3, weekendVibe: 4 },
    coordinates: { lat: 38.9886, lng: -77.0972 },
  },
  {
    id: 'edgemoor',
    name: 'Edgemoor',
    slug: 'edgemoor',
    cluster: 'whitman',
    schools: { elementary: 'Bethesda ES', middle: 'Westland MS', high: 'Walt Whitman HS' },
    priceRange: '$2M–$6M+',
    priceLow: 2000000,
    priceHigh: 6000000,
    zipCode: '20814',
    vibe: 'Quiet wealth, privacy, country club adjacent.',
    shortDescription: "One of Bethesda's most affluent pockets. Large lots, old money feel.",
    fullDescription:
      "One of Bethesda's most affluent pockets. Large lots, significant setbacks, mature landscaping. Old money feel.",
    realTalk:
      'The top of the Bethesda market and it knows it. Walkable to downtown yet feels insulated. This is quiet, established wealth—not new-money showiness.',
    lifestyleTracks: ['preppy', 'walkable'],
    pros: ['Whitman cluster', 'Walk to downtown', 'Prestige', 'Large lots'],
    cons: ['Very expensive', 'Can feel insular'],
    ratings: { walkability: 4, kidDensity: 3, commutePain: 2, pretension: 5, weekendVibe: 3 },
    coordinates: { lat: 38.9869, lng: -77.1016 },
  },
  {
    id: 'greenwich-forest',
    name: 'Greenwich Forest',
    slug: 'greenwich-forest',
    cluster: 'whitman',
    schools: { elementary: 'Bethesda ES', middle: 'Westland MS', high: 'Walt Whitman HS' },
    priceRange: '$1.2M–$2M',
    priceLow: 1200000,
    priceHigh: 2000000,
    zipCode: '20814',
    vibe: 'Engaged families, walkable to downtown.',
    shortDescription: 'Compact neighborhood of colonials with strong community identity.',
    fullDescription:
      'Compact neighborhood of colonials near downtown. Strong community identity, pool/civic association.',
    realTalk:
      'Tight, engaged, and walkable—an active civic association and pool give it a real neighborhood feel close to downtown.',
    lifestyleTracks: ['walkable', 'balanced'],
    pros: ['Whitman cluster', 'Walkable', 'Community pool', 'Engaged neighbors'],
    cons: ['Compact lots', 'Premium pricing'],
    ratings: { walkability: 4, kidDensity: 4, commutePain: 2, pretension: 3, weekendVibe: 3 },
    coordinates: { lat: 38.9817, lng: -77.1003 },
  },
  {
    id: 'alta-vista',
    name: 'Alta Vista',
    slug: 'alta-vista',
    cluster: 'whitman',
    schools: { elementary: 'Bethesda ES', middle: 'Westland MS', high: 'Walt Whitman HS' },
    priceRange: '$900K–$1.5M',
    priceLow: 900000,
    priceHigh: 1500000,
    zipCode: '20814',
    vibe: 'Value play for Whitman cluster.',
    shortDescription: 'Small neighborhood of mid-century homes near NIH, unpretentious.',
    fullDescription:
      'Small neighborhood of mid-century homes near NIH. Unpretentious for the location.',
    realTalk:
      'One of the genuine value entries into the Whitman cluster. Mid-century stock, no pretense, close to NIH.',
    lifestyleTracks: ['value', 'balanced'],
    pros: ['Whitman cluster value', 'NIH proximity', 'Unpretentious'],
    cons: ['Modest housing', 'Small area'],
    ratings: { walkability: 3, kidDensity: 3, commutePain: 2, pretension: 2, weekendVibe: 2 },
    coordinates: { lat: 38.9967, lng: -77.1019 },
  },
  {
    id: 'huntington-terrace',
    name: 'Huntington Terrace',
    slug: 'huntington-terrace',
    cluster: 'whitman',
    schools: { elementary: 'Bethesda ES', middle: 'Westland MS', high: 'Walt Whitman HS' },
    priceRange: '$800K–$1.4M',
    priceLow: 800000,
    priceHigh: 1400000,
    zipCode: '20814',
    vibe: 'Entry point to Whitman cluster.',
    shortDescription: 'Mid-century housing near NIH, a practical choice.',
    fullDescription:
      'Similar to Alta Vista—mid-century housing near NIH, practical choice.',
    realTalk:
      'A practical, lower-priced doorway into the Whitman cluster. You are buying schools and location, not a showpiece house.',
    lifestyleTracks: ['value', 'balanced'],
    pros: ['Whitman cluster value', 'NIH proximity', 'Practical'],
    cons: ['Modest housing', 'Lower curb appeal'],
    ratings: { walkability: 3, kidDensity: 3, commutePain: 2, pretension: 2, weekendVibe: 2 },
    coordinates: { lat: 38.9989, lng: -77.0997 },
  },

  // ---------------------------------------------------------------- WALTER JOHNSON
  {
    id: 'downtown-bethesda',
    name: 'Downtown Bethesda',
    slug: 'downtown-bethesda',
    cluster: 'wj',
    schools: { elementary: 'Bethesda ES', middle: 'Westland MS', high: 'Walter Johnson HS' },
    priceRange: '$400K–$2M+',
    priceLow: 400000,
    priceHigh: 2000000,
    zipCode: '20814',
    vibe: 'Young professionals, empty nesters, walkability over yards.',
    shortDescription: 'High-rises, condos, townhomes—true urban living for Montgomery County.',
    fullDescription:
      'High-rises, condos, townhomes. True urban living for Montgomery County. Walk to Metro, restaurants, everything. (School assignment varies by exact location—confirm the address; some areas feed WJ, some Whitman.)',
    realTalk:
      'As urban as MoCo gets. Great if you prioritize walk-to-everything over a yard. Double-check school assignment by address—it splits between WJ and Whitman here.',
    lifestyleTracks: ['urban', 'walkable'],
    pros: ['Metro + restaurants at your door', 'Condo price entry', 'Low maintenance'],
    cons: ['Little yard space', 'School assignment varies', 'Urban density'],
    ratings: { walkability: 5, kidDensity: 2, commutePain: 1, pretension: 3, weekendVibe: 5 },
    coordinates: { lat: 38.9847, lng: -77.0947 },
  },
  {
    id: 'woodmont-triangle',
    name: 'Woodmont Triangle',
    slug: 'woodmont-triangle',
    cluster: 'wj',
    schools: { elementary: 'Bethesda ES', middle: 'Westland MS', high: 'Walter Johnson HS' },
    priceRange: '$350K–$800K',
    priceLow: 350000,
    priceHigh: 800000,
    zipCode: '20814',
    vibe: 'Urban, convenient, younger demographic.',
    shortDescription: 'Commercial/residential hybrid downtown; mostly condos.',
    fullDescription:
      'The more commercial/residential hybrid part of downtown. Newer construction, some older apartment buildings. Mostly condos.',
    realTalk:
      'The most affordable way to plant a flag in downtown Bethesda. Skews young and convenient; not where most families land long-term.',
    lifestyleTracks: ['urban', 'value'],
    pros: ['Affordable condos', 'Walkable', 'Restaurants/nightlife'],
    cons: ['Commercial feel', 'Less family-oriented'],
    ratings: { walkability: 5, kidDensity: 1, commutePain: 1, pretension: 2, weekendVibe: 5 },
    coordinates: { lat: 38.9889, lng: -77.0958 },
  },
  {
    id: 'bradley-manor',
    name: 'Bradley Manor',
    slug: 'bradley-manor',
    cluster: 'wj',
    schools: { elementary: 'Bradley Hills ES', middle: 'Westland MS', high: 'Walter Johnson HS' },
    priceRange: '$900K–$1.6M',
    priceLow: 900000,
    priceHigh: 1600000,
    zipCode: '20817',
    vibe: 'NIH families, practical choice.',
    shortDescription: 'Solid colonials and split-levels near NIH; good value vs. Edgemoor.',
    fullDescription:
      'Solid colonials and split-levels near NIH. Less glamorous than nearby Edgemoor but good value.',
    realTalk:
      'The unglamorous-but-smart pick next to far pricier neighbors. Bradley Hills ES feeder, NIH-convenient, and you keep six figures in your pocket.',
    lifestyleTracks: ['value', 'academic'],
    pros: ['Good value', 'NIH proximity', 'Solid housing'],
    cons: ['Less prestige', 'WJ not Whitman'],
    ratings: { walkability: 2, kidDensity: 4, commutePain: 2, pretension: 2, weekendVibe: 2 },
    coordinates: { lat: 38.9919, lng: -77.1064 },
  },
  {
    id: 'burning-tree-valley',
    name: 'Burning Tree Valley',
    slug: 'burning-tree-valley',
    cluster: 'wj',
    schools: { elementary: 'Burning Tree ES', middle: 'Pyle MS', high: 'Walter Johnson HS' },
    priceRange: '$1M–$2M',
    priceLow: 1000000,
    priceHigh: 2000000,
    zipCode: '20817',
    vibe: 'Traditional, golf-adjacent but not country club elite.',
    shortDescription: 'Upper-middle-class colonials near the famously exclusive golf club.',
    fullDescription:
      'Named for the (men-only, famously exclusive) golf club. The neighborhood itself is upper-middle-class colonials and ramblers.',
    realTalk:
      'The club name carries more cachet than the neighborhood, which is solidly upper-middle and pleasant. Burning Tree ES is a draw.',
    lifestyleTracks: ['preppy', 'balanced'],
    pros: ['Burning Tree ES', 'Quiet', 'Traditional'],
    cons: ['Car-dependent', 'WJ not Whitman'],
    ratings: { walkability: 2, kidDensity: 3, commutePain: 3, pretension: 3, weekendVibe: 2 },
    coordinates: { lat: 39.0017, lng: -77.1283 },
  },
  {
    id: 'ayrlawn',
    name: 'Ayrlawn',
    slug: 'ayrlawn',
    cluster: 'wj',
    schools: { elementary: 'Wyngate ES', middle: 'Westland MS', high: 'Walter Johnson HS' },
    priceRange: '$700K–$1.3M',
    priceLow: 700000,
    priceHigh: 1300000,
    zipCode: '20814',
    vibe: 'Working professionals, good value.',
    shortDescription: 'Older housing stock between Bethesda and NIH, some townhomes.',
    fullDescription:
      'Between Bethesda and NIH, older housing stock, some townhomes. Feels more modest than surrounding areas.',
    realTalk:
      'More modest than its neighbors, which is the point—real value between Bethesda and NIH with townhome options.',
    lifestyleTracks: ['value', 'balanced'],
    pros: ['Good value', 'Central location', 'Townhome options'],
    cons: ['Older housing', 'Modest feel'],
    ratings: { walkability: 3, kidDensity: 3, commutePain: 2, pretension: 2, weekendVibe: 2 },
    coordinates: { lat: 39.0011, lng: -77.0978 },
  },
  {
    id: 'pyle-estates-wyngate',
    name: 'Pyle Estates / Wyngate',
    slug: 'pyle-estates-wyngate',
    cluster: 'wj',
    schools: { elementary: 'Wyngate ES', middle: 'Westland MS', high: 'Walter Johnson HS' },
    priceRange: '$900K–$1.8M',
    priceLow: 900000,
    priceHigh: 1800000,
    zipCode: '20814',
    vibe: 'Classic suburban families.',
    shortDescription: 'Suburban colonials, cul-de-sacs, near Rock Creek Park.',
    fullDescription:
      'Suburban colonials, cul-de-sacs, family-oriented. Near Rock Creek Park.',
    realTalk:
      'About as classic-suburban as the WJ cluster gets—cul-de-sacs, families, park access. Wyngate ES is well regarded.',
    lifestyleTracks: ['balanced', 'nature'],
    pros: ['Wyngate ES', 'Family-oriented', 'Rock Creek Park access'],
    cons: ['Car-dependent', 'Conventional'],
    ratings: { walkability: 2, kidDensity: 4, commutePain: 3, pretension: 2, weekendVibe: 2 },
    coordinates: { lat: 39.0042, lng: -77.1086 },
  },

  // ---------------------------------------------------------------- BCC
  {
    id: 'north-chevy-chase',
    name: 'North Chevy Chase',
    slug: 'north-chevy-chase',
    cluster: 'bcc',
    schools: { elementary: 'North Chevy Chase ES', middle: 'Silver Creek MS', high: 'Bethesda-Chevy Chase HS' },
    priceRange: '$950K–$1.8M',
    priceLow: 950000,
    priceHigh: 1800000,
    zipCode: '20815',
    vibe: 'Practical BCC choice. Prioritizing schools over prestige.',
    shortDescription: 'Unincorporated area with good value for the BCC cluster.',
    fullDescription:
      'Unincorporated north of Chevy Chase proper. More modest housing, good value for BCC schools. Mid-century colonials and split-levels.',
    realTalk:
      'Good schools, reasonable prices, no municipal overhead. The sensible BCC choice if you care about the cluster more than the address cachet.',
    lifestyleTracks: ['value', 'balanced'],
    pros: ['BCC schools', 'Good value', 'No municipal taxes'],
    cons: ['Less prestigious', 'Modest housing'],
    ratings: { walkability: 2, kidDensity: 3, commutePain: 3, pretension: 2, weekendVibe: 2 },
    coordinates: { lat: 38.9845, lng: -77.0723 },
  },
  {
    id: 'friendship-heights',
    name: 'Village of Friendship Heights',
    slug: 'friendship-heights',
    cluster: 'bcc',
    schools: { elementary: 'Somerset ES', middle: 'Westland MS', high: 'Bethesda-Chevy Chase HS' },
    priceRange: '$350K–$1.5M',
    priceLow: 350000,
    priceHigh: 1500000,
    zipCode: '20815',
    vibe: 'Urban retail hub on the DC border.',
    shortDescription: 'Shopping and condo district straddling the MD/DC line.',
    fullDescription:
      'Commercial hub with upscale retail and a mix of condos. Straddles the MD/DC border. Metro accessible. (Confirm elementary assignment by exact address.)',
    realTalk:
      'The MD side sits in the BCC cluster. A good way to get walkability and shopping without downtown Bethesda prices—but it reads commercial, not neighborhoody.',
    lifestyleTracks: ['urban', 'walkable'],
    pros: ['Metro access', 'Shopping', 'Walkable', 'Affordable condos'],
    cons: ['Commercial feel', 'Less community', 'Traffic'],
    ratings: { walkability: 5, kidDensity: 1, commutePain: 1, pretension: 3, weekendVibe: 4 },
    coordinates: { lat: 38.9612, lng: -77.0856 },
  },
  {
    id: 'town-of-somerset',
    name: 'Town of Somerset',
    slug: 'town-of-somerset',
    cluster: 'bcc',
    schools: { elementary: 'Somerset ES', middle: 'Westland MS', high: 'Bethesda-Chevy Chase HS' },
    priceRange: '$1.5M–$4M',
    priceLow: 1500000,
    priceHigh: 4000000,
    zipCode: '20815',
    vibe: 'Small incorporated town with an excellent elementary.',
    shortDescription: 'Tiny incorporated town built around Somerset ES.',
    fullDescription:
      'Small incorporated municipality with just a few hundred homes. Somerset ES is the draw. Strong community identity.',
    realTalk:
      'People specifically seek Somerset for the elementary school. Tiny, tight-knit, and the municipal identity is part of the appeal.',
    lifestyleTracks: ['preppy', 'balanced'],
    pros: ['Somerset ES', 'Tight community', 'Walkable to downtown'],
    cons: ['Municipal taxes', 'Limited inventory', 'Expensive'],
    ratings: { walkability: 4, kidDensity: 4, commutePain: 2, pretension: 4, weekendVibe: 3 },
    coordinates: { lat: 38.9656, lng: -77.0912 },
  },
  {
    id: 'chevy-chase-village',
    name: 'Chevy Chase Village',
    slug: 'chevy-chase-village',
    cluster: 'bcc',
    schools: { elementary: 'Chevy Chase ES', middle: 'Silver Creek MS', high: 'Bethesda-Chevy Chase HS' },
    priceRange: '$1.5M–$5M+',
    priceLow: 1500000,
    priceHigh: 5000000,
    zipCode: '20815',
    vibe: 'Historic, gracious, self-governed, established wealth.',
    shortDescription: 'Grand homes along Connecticut Ave with its own village government.',
    fullDescription:
      'One of the original streetcar suburbs—grand homes, broad avenues, mature trees. Self-governed with its own village services and municipal tax. Among the most prestigious addresses in the BCC cluster.',
    realTalk:
      'Old, gracious, and self-governed—you pay municipal taxes for noticeably better services. The Connecticut Ave corridor here is genuinely historic.',
    lifestyleTracks: ['preppy', 'walkable'],
    pros: ['Prestige + history', 'Village services', 'Walkable corridor', 'BCC cluster'],
    cons: ['Municipal taxes', 'Expensive', 'Can feel formal'],
    ratings: { walkability: 4, kidDensity: 3, commutePain: 2, pretension: 5, weekendVibe: 3 },
    coordinates: { lat: 38.9789, lng: -77.0786 },
  },
  {
    id: 'town-of-chevy-chase',
    name: 'Town of Chevy Chase',
    slug: 'town-of-chevy-chase',
    cluster: 'bcc',
    schools: { elementary: 'Chevy Chase ES', middle: 'Silver Creek MS', high: 'Bethesda-Chevy Chase HS' },
    priceRange: '$1.3M–$2.8M',
    priceLow: 1300000,
    priceHigh: 2800000,
    zipCode: '20815',
    vibe: 'BCC schools and a Chevy Chase address without Village pretension.',
    shortDescription: 'Well-maintained colonials with its own governance and a lower profile than the Village.',
    fullDescription:
      'The Town of Chevy Chase offers the Chevy Chase address and schools without the astronomical prices. Homes are well-maintained colonials on reasonable lots. The community has its own governance but a lower profile than the Village.',
    realTalk:
      'The more accessible entry to the Chevy Chase name—you keep the schools and community feel while skipping the Village pretension and price ceiling. Upper-middle-class and steady.',
    lifestyleTracks: ['balanced', 'preppy'],
    pros: ['BCC schools', 'Chevy Chase address', 'Own governance', 'More accessible than Village'],
    cons: ['Municipal taxes', 'Less prestige than the Village'],
    ratings: { walkability: 3, kidDensity: 4, commutePain: 2, pretension: 3, weekendVibe: 3 },
    coordinates: { lat: 38.9803, lng: -77.0747 },
  },
  {
    id: 'chevy-chase-section-3',
    name: 'Chevy Chase Section 3',
    slug: 'chevy-chase-section-3',
    cluster: 'bcc',
    schools: { elementary: 'Rosemary Hills / Chevy Chase ES', middle: 'Silver Creek MS', high: 'Bethesda-Chevy Chase HS' },
    priceRange: '$1.5M–$3.5M',
    priceLow: 1500000,
    priceHigh: 3500000,
    zipCode: '20815',
    vibe: 'Civically engaged families who want Chevy Chase schools and a hand in local governance.',
    shortDescription: 'Incorporated municipality between CC Village and Bethesda, with its own town council.',
    fullDescription:
      'Between Chevy Chase Village and Bethesda, Section 3 is an incorporated municipality with its own town council. The homes are substantial colonials, and the community is engaged in local governance. Section 3 offers the Chevy Chase schools with a distinct community identity.',
    realTalk:
      'The municipal structure means real local control over certain services, and the residents who choose it tend to be the type who show up to town council meetings. Well-maintained, stable, substantial homes.',
    lifestyleTracks: ['balanced', 'preppy'],
    pros: ['Chevy Chase schools', 'Community governance', 'Substantial homes', 'Walkable to downtown'],
    cons: ['Municipal taxes', 'Not as prestigious as the Village'],
    ratings: { walkability: 4, kidDensity: 4, commutePain: 2, pretension: 4, weekendVibe: 3 },
    coordinates: { lat: 38.9756, lng: -77.0812 },
  },
  {
    id: 'chevy-chase-section-5',
    name: 'Chevy Chase Section 5',
    slug: 'chevy-chase-section-5',
    cluster: 'bcc',
    schools: { elementary: 'North Chevy Chase ES', middle: 'Silver Creek MS', high: 'Bethesda-Chevy Chase HS' },
    priceRange: '$1.1M–$2.2M',
    priceLow: 1100000,
    priceHigh: 2200000,
    zipCode: '20815',
    vibe: 'BCC cluster on a more moderate budget than the Village.',
    shortDescription: 'Small municipality north of downtown Bethesda, near Rock Creek Park.',
    fullDescription:
      'North of downtown Bethesda, Section 5 is a small municipality feeding the BCC cluster. The housing stock is a mix of colonials and mid-century homes at price points below the Village. Rock Creek Park is nearby for recreation.',
    realTalk:
      'Good value for the Chevy Chase schools, with municipal governance giving you a say in services. The Rock Creek Park access is a real perk for an in-close municipality.',
    lifestyleTracks: ['balanced', 'value'],
    pros: ['BCC schools', 'Good value', 'Near Rock Creek Park', 'Community governance'],
    cons: ['Less prestigious', 'Municipal taxes'],
    ratings: { walkability: 3, kidDensity: 3, commutePain: 2, pretension: 3, weekendVibe: 3 },
    coordinates: { lat: 38.9812, lng: -77.0778 },
  },
  {
    id: 'village-of-martins-additions',
    name: "Village of Martin's Additions",
    slug: 'village-of-martins-additions',
    cluster: 'bcc',
    schools: { elementary: 'Chevy Chase ES', middle: 'Silver Creek MS', high: 'Bethesda-Chevy Chase HS' },
    priceRange: '$1.2M–$2.2M',
    priceLow: 1200000,
    priceHigh: 2200000,
    zipCode: '20815',
    vibe: 'Village-scale community for people who want to know all their neighbors.',
    shortDescription: 'Tiny municipality of just a few blocks with a strong community identity.',
    fullDescription:
      "A tiny municipality of just a few blocks with strong community identity. Martin's Additions has charming older homes and a tight-knit feel. The village sits between Bethesda and Chevy Chase, offering proximity to both commercial districts. (Confirm elementary assignment by exact address.)",
    realTalk:
      'Small enough that everyone knows everyone—the community identity is wildly outsized for the few blocks it covers. Charming older homes and walkable to two downtowns.',
    lifestyleTracks: ['balanced', 'walkable'],
    pros: ['Tight-knit community', 'Charming homes', 'Between two downtowns', 'BCC cluster'],
    cons: ['Municipal taxes', 'Very limited inventory', 'Confirm ES by address'],
    ratings: { walkability: 4, kidDensity: 4, commutePain: 2, pretension: 4, weekendVibe: 3 },
    coordinates: { lat: 38.9712, lng: -77.0759 },
  },
  {
    id: 'chevy-chase-view',
    name: 'Chevy Chase View',
    slug: 'chevy-chase-view',
    cluster: 'bcc',
    schools: { elementary: 'Rosemary Hills / North Chevy Chase ES', middle: 'Silver Creek MS', high: 'Bethesda-Chevy Chase HS' },
    priceRange: '$1M–$2M',
    priceLow: 1000000,
    priceHigh: 2000000,
    zipCode: '20815',
    vibe: 'Quiet incorporated town, residential and low-key.',
    shortDescription: 'Small incorporated town near Kensington with its own town governance.',
    fullDescription:
      'A small incorporated town toward the Kensington edge of the Chevy Chase municipalities. Quiet, residential, with mid-century and colonial housing. Its own town government handles certain local services. (Confirm elementary assignment by exact address.)',
    realTalk:
      'One of the lesser-known Chevy Chase municipalities—quiet and residential without the Village price or profile. A practical, low-key option for the BCC cluster.',
    lifestyleTracks: ['balanced', 'value'],
    pros: ['BCC cluster', 'Quiet', 'Own governance', 'More affordable than core CC'],
    cons: ['Municipal taxes', 'Less central', 'Confirm ES by address'],
    ratings: { walkability: 2, kidDensity: 3, commutePain: 3, pretension: 2, weekendVibe: 2 },
    coordinates: { lat: 39.0073, lng: -77.0758 },
  },

  // ------------------------------------------- WHITMAN (Carderock Springs feeders)
  {
    id: 'carderock-springs',
    name: 'Carderock Springs',
    slug: 'carderock-springs',
    cluster: 'whitman',
    schools: { elementary: 'Carderock Springs ES', middle: 'Pyle MS', high: 'Walt Whitman HS' },
    priceRange: '$800K–$1.6M',
    priceLow: 800000,
    priceHigh: 1600000,
    zipCode: '20816',
    vibe: 'Mid-century modern design lovers and trail people. Strong civic identity.',
    shortDescription: 'Architecturally distinctive mid-century neighborhood with its own pool and the Capital Crescent Trail running through.',
    fullDescription:
      'A nationally recognized mid-century modern enclave with a strong civic identity, its own pool, and regular neighborhood events. Carderock Springs ES is small and well-loved. The Capital Crescent Trail runs through the neighborhood and the C&O Canal is nearby for hiking and biking.',
    realTalk:
      'One of the more affordable entry points to the Whitman cluster, and architecturally one of the most distinctive. You are below the Beltway—certain trips mean navigating around it—but the DC commute can actually be easier since you skip a lot of the congestion. No commercial district; you head to Bethesda or Cabin John for shopping.',
    lifestyleTracks: ['nature', 'value'],
    pros: ['Affordable for Whitman', 'Trail access', 'Community pool', 'Distinctive architecture'],
    cons: ['Below Beltway navigation', 'No commercial district'],
    ratings: { walkability: 2, kidDensity: 3, commutePain: 2, pretension: 2, weekendVibe: 2 },
    coordinates: { lat: 38.9589, lng: -77.1234 },
  },
  {
    id: 'mohican-hills',
    name: 'Mohican Hills',
    slug: 'mohican-hills',
    cluster: 'whitman',
    schools: { elementary: 'Carderock Springs ES', middle: 'Pyle MS', high: 'Walt Whitman HS' },
    priceRange: '$900K–$1.7M',
    priceLow: 900000,
    priceHigh: 1700000,
    zipCode: '20816',
    vibe: 'Nature-oriented families wanting Whitman schools without eastern Bethesda prices.',
    shortDescription: 'Wooded neighborhood adjacent to Carderock Springs with larger lots and varied home styles.',
    fullDescription:
      'Adjacent to Carderock Springs with a similar wooded feel but slightly different housing stock. Mohican Hills offers larger lots and more variety in home styles, and feeds the same beloved elementary school. Access to parkland and trails is a major draw.',
    realTalk:
      'A place for people who actually want the outdoors and the natural setting—not walkability or urban amenities. Larger lots than the Carderock norm, and less expensive than eastern Bethesda for the same Whitman pattern.',
    lifestyleTracks: ['nature', 'balanced'],
    pros: ['Larger lots', 'Nature access', 'Whitman schools', 'Cheaper than eastern Bethesda'],
    cons: ['Not walkable', 'Limited commercial nearby'],
    ratings: { walkability: 1, kidDensity: 3, commutePain: 3, pretension: 2, weekendVibe: 2 },
    coordinates: { lat: 38.9701, lng: -77.1389 },
  },
  {
    id: 'wilson-knolls',
    name: 'Wilson Knolls',
    slug: 'wilson-knolls',
    cluster: 'whitman',
    schools: { elementary: 'Carderock Springs ES', middle: 'Pyle MS', high: 'Walt Whitman HS' },
    priceRange: '$750K–$1.3M',
    priceLow: 750000,
    priceHigh: 1300000,
    zipCode: '20816',
    vibe: 'Value-seekers who want Carderock Springs ES without the premium.',
    shortDescription: 'Small enclave near Carderock Springs offering good value for Whitman schools.',
    fullDescription:
      'A small enclave near Carderock Springs feeding the same elementary school. One of the more affordable footholds in the Whitman cluster, with a similar wooded, nature-adjacent character.',
    realTalk:
      'Small, quiet, and about the cheapest way into the Carderock Springs ES → Whitman pattern. If schools are the goal and you can live without flash, this is a smart play.',
    lifestyleTracks: ['value', 'nature'],
    pros: ['Whitman cluster value', 'Carderock Springs ES', 'Nature-adjacent'],
    cons: ['Modest housing', 'Small/obscure', 'Not walkable'],
    ratings: { walkability: 2, kidDensity: 3, commutePain: 3, pretension: 1, weekendVibe: 2 },
    coordinates: { lat: 38.9622, lng: -77.1278 },
  },

  // ------------------------------------------- BCC / WJ edge (downtown-adjacent)
  {
    id: 'drummond',
    name: 'Drummond',
    slug: 'drummond',
    cluster: 'bcc',
    schools: { elementary: 'Bethesda ES', middle: 'Westland MS', high: 'Bethesda-Chevy Chase HS' },
    priceRange: '$1M–$2M',
    priceLow: 1000000,
    priceHigh: 2000000,
    zipCode: '20815',
    vibe: 'Architecture enthusiasts who appreciate mid-century design.',
    shortDescription: 'Interesting mid-century modern architecture between Bethesda and Chevy Chase.',
    fullDescription:
      'Between downtown Bethesda and Chevy Chase, Drummond offers a mix of housing styles including some distinctive mid-century modern homes. The neighborhood is convenient to both commercial districts and has an interesting architectural character.',
    realTalk:
      'More varied and architecturally interesting than its neighbors, with good access to both Bethesda and Chevy Chase. The flip side: it lacks a single distinct identity, and the housing stock is a real mix.',
    lifestyleTracks: ['balanced', 'walkable'],
    pros: ['Interesting architecture', 'Central location', 'BCC schools'],
    cons: ['Variable housing', 'No distinct identity'],
    ratings: { walkability: 3, kidDensity: 3, commutePain: 2, pretension: 3, weekendVibe: 3 },
    coordinates: { lat: 38.9867, lng: -77.0834 },
  },
  {
    id: 'maplewood',
    name: 'Maplewood',
    slug: 'maplewood',
    cluster: 'bcc',
    schools: { elementary: 'Bethesda ES', middle: 'Westland MS', high: 'Bethesda-Chevy Chase HS' },
    priceRange: '$1M–$2.2M',
    priceLow: 1000000,
    priceHigh: 2200000,
    zipCode: '20814',
    vibe: 'Families willing to renovate for location, or pay a premium for already-updated homes.',
    shortDescription: 'Mix of original and renovated homes near downtown Bethesda.',
    fullDescription:
      'A mix of original mid-century homes and major renovations or teardowns. Maplewood is close to downtown Bethesda but maintains a residential feel. The neighborhood has seen significant investment as families update older homes or build new.',
    realTalk:
      'Good value relative to Edgemoor for similar downtown convenience—if you are willing to take on a renovation or pay up for one someone else already did. Active teardown scene, so the streetscape is in flux.',
    lifestyleTracks: ['balanced', 'walkable'],
    pros: ['Near downtown', 'BCC schools', 'Good value vs Edgemoor'],
    cons: ['Teardown activity', 'Variable housing'],
    ratings: { walkability: 4, kidDensity: 3, commutePain: 2, pretension: 3, weekendVibe: 3 },
    coordinates: { lat: 38.9878, lng: -77.0889 },
  },

  // ------------------------------------------- NEEDS VERIFICATION (limited source detail)
  // The four below were built from neighborhood lists with thinner profile data.
  // Confirm school assignments, price ranges, and cluster before publishing.
  {
    id: 'westgate',
    name: 'Westgate',
    slug: 'westgate',
    cluster: 'whitman',
    schools: { elementary: 'Westbrook ES', middle: 'Westland MS', high: 'Walt Whitman HS' },
    priceRange: '$1M–$2M',
    priceLow: 1000000,
    priceHigh: 2000000,
    zipCode: '20816',
    vibe: 'Established residential pocket near Westbrook ES and the DC line.',
    shortDescription: 'Quiet residential neighborhood near the Westbrook ES feeder and Massachusetts Ave.',
    fullDescription:
      'An established residential neighborhood in the Westbrook ES feeder area near the DC line and Massachusetts Avenue. Solid colonials and ramblers, convenient to both downtown Bethesda and the District. (Profile built from limited source data—verify before publishing.)',
    realTalk:
      'A steady, established Whitman-cluster pocket close to the DC line. Verify the exact elementary feeder by address, as this area sits near a boundary seam.',
    lifestyleTracks: ['balanced'],
    pros: ['Whitman cluster', 'Close to DC', 'Established'],
    cons: ['Some traffic near Mass Ave', 'Verify school assignment'],
    ratings: { walkability: 3, kidDensity: 3, commutePain: 2, pretension: 3, weekendVibe: 2 },
    coordinates: { lat: 38.9603, lng: -77.0978 },
  },
  {
    id: 'east-bethesda',
    name: 'East Bethesda',
    slug: 'east-bethesda',
    cluster: 'bcc',
    schools: { elementary: 'Bethesda ES', middle: 'Westland MS', high: 'Bethesda-Chevy Chase HS' },
    priceRange: '$700K–$1.5M',
    priceLow: 700000,
    priceHigh: 1500000,
    zipCode: '20814',
    vibe: 'Walkable, in-close, more accessible entry near downtown Bethesda.',
    shortDescription: 'Compact, walkable neighborhood just east of downtown Bethesda with smaller homes and lots.',
    fullDescription:
      'Just east of downtown Bethesda, this is a compact, walkable neighborhood of smaller homes and lots—bungalows and modest colonials, some updated. One of the more accessible footholds close to downtown. (Profile built from limited source data—verify before publishing.)',
    realTalk:
      'A genuine value entry for walk-to-downtown living, with smaller homes than the marquee neighborhoods. Confirm the school assignment by address—this area can straddle feeders.',
    lifestyleTracks: ['walkable', 'value'],
    pros: ['Walkable to downtown', 'More accessible pricing', 'In-close'],
    cons: ['Smaller homes/lots', 'Verify school assignment', 'Some through-traffic'],
    ratings: { walkability: 4, kidDensity: 3, commutePain: 1, pretension: 2, weekendVibe: 4 },
    coordinates: { lat: 38.9856, lng: -77.0889 },
  },
  {
    id: 'bethesda-park',
    name: 'Bethesda Park',
    slug: 'bethesda-park',
    cluster: 'wj',
    schools: { elementary: 'Wyngate ES', middle: 'Westland MS', high: 'Walter Johnson HS' },
    priceRange: '$800K–$1.5M',
    priceLow: 800000,
    priceHigh: 1500000,
    zipCode: '20814',
    vibe: 'Practical residential area with good value for the WJ cluster.',
    shortDescription: 'Residential neighborhood north of downtown with mid-century housing and reasonable pricing.',
    fullDescription:
      'A practical residential neighborhood north of downtown Bethesda with mostly mid-century housing. Reasonable pricing for the area and convenient to NIH and downtown. (Profile built from limited source data—verify before publishing.)',
    realTalk:
      'A no-frills, reasonably priced option in the WJ cluster. Verify the exact elementary and high school feeder by address before relying on it.',
    lifestyleTracks: ['value', 'balanced'],
    pros: ['Good value', 'Convenient to NIH/downtown', 'Practical'],
    cons: ['Modest housing', 'Verify school assignment', 'Less distinct identity'],
    ratings: { walkability: 3, kidDensity: 3, commutePain: 2, pretension: 2, weekendVibe: 2 },
    coordinates: { lat: 39.0011, lng: -77.0944 },
  },
  {
    id: 'sonoma',
    name: 'Sonoma',
    slug: 'sonoma',
    cluster: 'wj',
    schools: { elementary: 'Wyngate ES', middle: 'Westland MS', high: 'Walter Johnson HS' },
    priceRange: '$900K–$1.6M',
    priceLow: 900000,
    priceHigh: 1600000,
    zipCode: '20817',
    vibe: 'Small residential pocket, quiet and family-oriented.',
    shortDescription: 'Small, quiet residential enclave in the greater Bethesda area.',
    fullDescription:
      'A small residential pocket in the greater Bethesda area, quiet and family-oriented with mid-century and colonial housing. (Profile built from limited source data—verify cluster, school assignment, and boundaries before publishing.)',
    realTalk:
      'One of the lesser-known small pockets. Treat the school and cluster data here as provisional until verified against the MCPS boundary tool.',
    lifestyleTracks: ['balanced', 'value'],
    pros: ['Quiet', 'Family-oriented', 'Reasonable pricing'],
    cons: ['Obscure/small', 'Verify all school + cluster data', 'Limited inventory'],
    ratings: { walkability: 2, kidDensity: 3, commutePain: 3, pretension: 2, weekendVibe: 2 },
    coordinates: { lat: 39.0058, lng: -77.1119 },
  },

  // ------------------------------------------- WHITMAN (additional Wood Acres / river pockets)
  {
    id: 'wood-acres',
    name: 'Wood Acres',
    slug: 'wood-acres',
    cluster: 'whitman',
    schools: { elementary: 'Wood Acres ES', middle: 'Pyle MS', high: 'Walt Whitman HS' },
    priceRange: '$1.1M–$2.5M',
    priceLow: 1100000,
    priceHigh: 2500000,
    zipCode: '20816',
    vibe: 'Classic family suburbia built around a top elementary.',
    shortDescription: 'The larger classic-suburban neighborhood surrounding Wood Acres ES—distinct from Springfield.',
    fullDescription:
      'The classic-suburban neighborhood that surrounds Wood Acres Elementary, distinct from the larger-lot Springfield pocket nearby. Solid colonials and ramblers on family-friendly streets, with the school as the organizing center of community life. Wood Acres ES is one of the most sought-after elementaries in the Whitman cluster.',
    realTalk:
      'Different from Springfield—Wood Acres is the everyday family-suburbia neighborhood (sidewalks, kids, walk-to-school), where Springfield is the larger-lot, more prestigious pocket. People here buy specifically for Wood Acres ES and the walk-to-school life.',
    lifestyleTracks: ['balanced'],
    pros: ['Wood Acres ES', 'Walk-to-school streets', 'High kid density', 'Whitman cluster'],
    cons: ['Premium for the school', 'Car-dependent beyond the neighborhood'],
    ratings: { walkability: 3, kidDensity: 5, commutePain: 3, pretension: 3, weekendVibe: 3 },
    coordinates: { lat: 38.9583, lng: -77.1133 },
  },
  {
    id: 'fort-sumner',
    name: 'Fort Sumner',
    slug: 'fort-sumner',
    cluster: 'whitman',
    schools: { elementary: 'Westbrook ES', middle: 'Pyle MS', high: 'Walt Whitman HS' },
    priceRange: '$1M–$2.2M',
    priceLow: 1000000,
    priceHigh: 2200000,
    zipCode: '20816',
    vibe: 'Quiet riverside-adjacent enclave near the DC line.',
    shortDescription: 'Established neighborhood near the Potomac and the DC line, in the Whitman cluster.',
    fullDescription:
      'A quiet, established neighborhood in west Bethesda near the Potomac and the DC line, close to the Capital Crescent Trail and MacArthur Blvd corridor. Mature trees, solid colonials, and a settled feel. (Verify the exact elementary feeder by address—this area sits near a Westbrook/Wood Acres boundary seam.)',
    realTalk:
      'A settled, leafy pocket close to the river and the DC line, with easy trail access. Confirm the elementary assignment by address before relying on it—the feeder boundary runs near here.',
    lifestyleTracks: ['nature', 'balanced'],
    pros: ['Whitman cluster', 'Trail + river proximity', 'Quiet', 'Close to DC line'],
    cons: ['Verify school assignment', 'Car-dependent', 'Limited commercial nearby'],
    ratings: { walkability: 2, kidDensity: 3, commutePain: 2, pretension: 3, weekendVibe: 2 },
    coordinates: { lat: 38.9608, lng: -77.1089 },
  },

  // ===========================================================================
  // DC — UPPER NORTHWEST (DCPS, not MCPS)
  // ---------------------------------------------------------------------------
  // These draw the same buyers as Bethesda/Chevy Chase MD but are in the
  // District. School data is PROVISIONAL: most feed Jackson-Reed HS in-boundary,
  // but DC families lean heavily on the charter lottery and private schools, and
  // DCPS boundaries shift. Verify every in-boundary feed by address before publishing.
  // ===========================================================================
  {
    id: 'palisades',
    name: 'Palisades',
    slug: 'palisades',
    cluster: 'dc',
    schools: { elementary: 'Key ES', middle: 'Hardy MS', high: 'Jackson-Reed HS' },
    priceRange: '$1M–$3M+',
    priceLow: 1000000,
    priceHigh: 3000000,
    zipCode: '20016',
    vibe: 'Leafy, village-y DC neighborhood along the river with a small-town feel.',
    shortDescription: 'River-adjacent NW DC neighborhood with a tight community and parade-on-the-Fourth charm.',
    fullDescription:
      'A leafy, village-feeling neighborhood in upper NW DC stretching along the Potomac above Georgetown. Known for its small-town character, the Palisades Fourth of July parade, MacArthur Blvd shops, and proximity to the C&O Canal and Capital Crescent Trail. Housing ranges from bungalows to substantial homes. (DCPS feeds provisional—verify by address.)',
    realTalk:
      'The DC neighborhood that feels most like the Bethesda river pockets—trail access, a real community, and you stay in the District for the tax and lifestyle reasons some families prefer. The in-boundary schools are the question mark; many families lottery into charters or go private.',
    lifestyleTracks: ['nature', 'walkable', 'balanced'],
    pros: ['Village feel', 'Trail + river', 'MacArthur Blvd shops', 'Strong community'],
    cons: ['DCPS in-boundary uncertainty', 'Charter/private reliance', 'DC taxes'],
    ratings: { walkability: 3, kidDensity: 3, commutePain: 2, pretension: 3, weekendVibe: 3 },
    coordinates: { lat: 38.9189, lng: -77.1003 },
  },
  {
    id: 'au-park',
    name: 'American University Park',
    slug: 'au-park',
    cluster: 'dc',
    schools: { elementary: 'Janney ES', middle: 'Deal MS', high: 'Jackson-Reed HS' },
    priceRange: '$1.1M–$2.5M',
    priceLow: 1100000,
    priceHigh: 2500000,
    zipCode: '20016',
    vibe: 'Family-dense, walkable DC neighborhood with the strongest in-boundary public feed.',
    shortDescription: 'One of the most sought-after family neighborhoods in NW DC, anchored by the Janney–Deal–Jackson-Reed feed.',
    fullDescription:
      'A family-dense, walkable neighborhood in upper NW DC near the Tenleytown and Friendship Heights commercial districts and Metro. AU Park is anchored by what is widely considered the strongest in-boundary DCPS feed in the city: Janney ES → Deal MS → Jackson-Reed HS. Colonials and bungalows on tree-lined streets. (Verify in-boundary status by address.)',
    realTalk:
      'This is the DC neighborhood that competes most directly with the Bethesda/Chevy Chase MD crowd, precisely because Janney–Deal–Jackson-Reed is the one in-boundary DCPS feed families trust without lottery gymnastics. You pay for that certainty.',
    lifestyleTracks: ['walkable', 'balanced', 'academic'],
    pros: ['Strong in-boundary feed', 'Walk to Metro + shops', 'High kid density', 'Stay in DC'],
    cons: ['Premium pricing', 'DC taxes', 'Verify boundary by address'],
    ratings: { walkability: 4, kidDensity: 5, commutePain: 2, pretension: 3, weekendVibe: 4 },
    coordinates: { lat: 38.9478, lng: -77.0897 },
  },
  {
    id: 'spring-valley',
    name: 'Spring Valley',
    slug: 'spring-valley',
    cluster: 'dc',
    schools: { elementary: 'Key ES', middle: 'Hardy MS', high: 'Jackson-Reed HS' },
    priceRange: '$1.5M–$5M+',
    priceLow: 1500000,
    priceHigh: 5000000,
    zipCode: '20016',
    vibe: 'Established DC wealth—large lots, embassies, quiet prestige.',
    shortDescription: 'One of DC\'s most affluent neighborhoods, with large lots and a gracious, established feel.',
    fullDescription:
      'One of the most affluent neighborhoods in DC, near American University with large lots, mature landscaping, and a number of ambassadorial residences. Spring Valley is the DC analog to Edgemoor or Kenwood—established, gracious, and expensive. (DCPS feeds provisional—verify by address.)',
    realTalk:
      'The DC equivalent of the top Bethesda/Chevy Chase addresses—quiet, established wealth. Like those, many families here go private for school regardless of the in-boundary feed.',
    lifestyleTracks: ['preppy'],
    pros: ['Prestige', 'Large lots', 'Quiet', 'Near AU'],
    cons: ['Very expensive', 'Private-school reliance', 'DC taxes', 'Car-dependent'],
    ratings: { walkability: 2, kidDensity: 3, commutePain: 2, pretension: 5, weekendVibe: 2 },
    coordinates: { lat: 38.9389, lng: -77.0967 },
  },
  {
    id: 'wesley-heights',
    name: 'Wesley Heights',
    slug: 'wesley-heights',
    cluster: 'dc',
    schools: { elementary: 'Key ES', middle: 'Hardy MS', high: 'Jackson-Reed HS' },
    priceRange: '$1.3M–$4M',
    priceLow: 1300000,
    priceHigh: 4000000,
    zipCode: '20016',
    vibe: 'Upscale, wooded, residential—Spring Valley\'s slightly more compact neighbor.',
    shortDescription: 'Affluent wooded neighborhood near AU, between Spring Valley and the Palisades.',
    fullDescription:
      'An upscale, wooded residential neighborhood near American University, adjacent to Spring Valley and above the Palisades. A mix of large single-family homes and some upscale condos/co-ops along Foxhall and New Mexico Ave. (DCPS feeds provisional—verify by address.)',
    realTalk:
      'Quieter and a touch more compact than Spring Valley but the same affluent, established character. Some good condo/co-op options here for downsizers who want to stay in upper NW.',
    lifestyleTracks: ['preppy', 'nature'],
    pros: ['Upscale + wooded', 'Near AU', 'Condo options', 'Quiet'],
    cons: ['Expensive', 'Private-school reliance', 'DC taxes', 'Car-dependent'],
    ratings: { walkability: 2, kidDensity: 3, commutePain: 2, pretension: 4, weekendVibe: 2 },
    coordinates: { lat: 38.9261, lng: -77.0922 },
  },
  {
    id: 'kent-foxhall',
    name: 'Kent / Foxhall',
    slug: 'kent-foxhall',
    cluster: 'dc',
    schools: { elementary: 'Key ES', middle: 'Hardy MS', high: 'Jackson-Reed HS' },
    priceRange: '$1.2M–$4M',
    priceLow: 1200000,
    priceHigh: 4000000,
    zipCode: '20007',
    vibe: 'Secluded, leafy, river-adjacent enclaves above the Palisades.',
    shortDescription: 'Quiet, secluded NW DC pockets near the river, Foxhall Road, and Battery Kemble Park.',
    fullDescription:
      'Secluded, leafy enclaves in far NW DC near the Potomac, Foxhall Road, and Battery Kemble Park. Large homes on private lots with a tucked-away feel. Among the quieter and more exclusive corners of the District. (DCPS feeds provisional—verify by address.)',
    realTalk:
      'For people who want big-lot seclusion inside the District. Very quiet, very leafy, very private—the trade-off is you are car-dependent and far from Metro.',
    lifestyleTracks: ['nature', 'preppy'],
    pros: ['Seclusion', 'Park + river proximity', 'Large lots', 'In DC'],
    cons: ['Car-dependent', 'Far from Metro', 'Private-school reliance', 'DC taxes'],
    ratings: { walkability: 1, kidDensity: 2, commutePain: 3, pretension: 4, weekendVibe: 2 },
    coordinates: { lat: 38.9242, lng: -77.0958 },
  },
  {
    id: 'chevy-chase-dc',
    name: 'Chevy Chase DC',
    slug: 'chevy-chase-dc',
    cluster: 'dc',
    schools: { elementary: 'Lafayette ES', middle: 'Deal MS', high: 'Jackson-Reed HS' },
    priceRange: '$1.1M–$2.8M',
    priceLow: 1100000,
    priceHigh: 2800000,
    zipCode: '20015',
    vibe: 'Family-dense DC neighborhood west of Connecticut Ave with strong in-boundary schools.',
    shortDescription: 'The DC side of Chevy Chase, anchored by Lafayette ES and the Deal–Jackson-Reed feed.',
    fullDescription:
      'The District side of Chevy Chase, west of Connecticut Ave, a family-dense neighborhood with a strong in-boundary feed (Lafayette ES → Deal MS → Jackson-Reed HS). Colonials and bungalows, walkable to the Connecticut Ave corridor and Lafayette-Pointer Branch Park. (Verify in-boundary status by address.)',
    realTalk:
      'Shares the Chevy Chase name with the MD municipalities but is fully in DC—different taxes, different schools. Lafayette is a trusted in-boundary elementary, which keeps families here rather than fleeing to private or MD.',
    lifestyleTracks: ['walkable', 'balanced'],
    pros: ['Strong in-boundary feed (Lafayette)', 'Family-dense', 'Walkable corridor', 'In DC'],
    cons: ['DC taxes', 'Premium pricing', 'Verify boundary by address'],
    ratings: { walkability: 4, kidDensity: 5, commutePain: 2, pretension: 3, weekendVibe: 3 },
    coordinates: { lat: 38.9656, lng: -77.0708 },
  },
  {
    id: 'barnaby-woods',
    name: 'Barnaby Woods',
    slug: 'barnaby-woods',
    cluster: 'dc',
    schools: { elementary: 'Lafayette ES', middle: 'Deal MS', high: 'Jackson-Reed HS' },
    priceRange: '$1.1M–$2.5M',
    priceLow: 1100000,
    priceHigh: 2500000,
    zipCode: '20015',
    vibe: 'Quiet, wooded, family-oriented—Chevy Chase DC\'s leafy northern edge.',
    shortDescription: 'Wooded residential neighborhood at the northern edge of Chevy Chase DC near Rock Creek Park.',
    fullDescription:
      'A quiet, heavily wooded residential neighborhood at the northern edge of Chevy Chase DC, bordering Rock Creek Park. Solid single-family homes, family-oriented, with the same Lafayette–Deal–Jackson-Reed feed as Chevy Chase DC. (Verify in-boundary status by address.)',
    realTalk:
      'The leafier, quieter cousin of Chevy Chase DC, right against Rock Creek Park. Same school feed, a bit more nature, a bit less corridor walkability.',
    lifestyleTracks: ['nature', 'balanced'],
    pros: ['Wooded + park-adjacent', 'Strong in-boundary feed', 'Quiet', 'Family-oriented'],
    cons: ['Less walkable than CC DC', 'DC taxes', 'Verify boundary by address'],
    ratings: { walkability: 2, kidDensity: 4, commutePain: 3, pretension: 3, weekendVibe: 2 },
    coordinates: { lat: 38.9744, lng: -77.0639 },
  },
  {
    id: 'hawthorne',
    name: 'Hawthorne',
    slug: 'hawthorne',
    cluster: 'dc',
    schools: { elementary: 'Lafayette ES', middle: 'Deal MS', high: 'Jackson-Reed HS' },
    priceRange: '$1.1M–$2.4M',
    priceLow: 1100000,
    priceHigh: 2400000,
    zipCode: '20012',
    vibe: 'Small, secluded, wooded enclave above Rock Creek Park.',
    shortDescription: 'Tiny tucked-away neighborhood at DC\'s northern tip, wooded and quiet.',
    fullDescription:
      'A small, secluded, wooded enclave at the far northern tip of DC above Rock Creek Park, near the Maryland line. Quiet streets, mid-century and colonial homes, a tucked-away feel. (DCPS feeds provisional—verify by address.)',
    realTalk:
      'One of the most under-the-radar pockets in upper NW—small, wooded, and quiet, right at the MD line. If you want seclusion inside the District without Foxhall prices, look here.',
    lifestyleTracks: ['nature', 'value'],
    pros: ['Secluded + wooded', 'Park-adjacent', 'Quiet', 'In DC at the MD line'],
    cons: ['Car-dependent', 'Obscure/small', 'Verify boundary by address', 'DC taxes'],
    ratings: { walkability: 1, kidDensity: 3, commutePain: 3, pretension: 2, weekendVibe: 1 },
    coordinates: { lat: 38.9839, lng: -77.0578 },
  },
  {
    id: 'tenleytown',
    name: 'Tenleytown',
    slug: 'tenleytown',
    cluster: 'dc',
    schools: { elementary: 'Janney ES', middle: 'Deal MS', high: 'Jackson-Reed HS' },
    priceRange: '$700K–$2M',
    priceLow: 700000,
    priceHigh: 2000000,
    zipCode: '20016',
    vibe: 'Walkable, Metro-served urban node with the strong Janney–Deal feed.',
    shortDescription: 'Metro-served commercial-and-residential hub on Wisconsin Ave with strong in-boundary schools.',
    fullDescription:
      'A walkable urban node on Wisconsin Ave centered on the Tenleytown-AU Metro, with a mix of condos, rowhouses, and single-family homes. Shares the coveted Janney ES → Deal MS → Jackson-Reed HS feed with AU Park. Retail, Metro, and library at the core. (Verify in-boundary status by address.)',
    realTalk:
      'The walkable, Metro-served option with the same strong in-boundary feed as AU Park, plus condo entry points that make it more accessible. Great if you want urban convenience and the Janney–Deal track.',
    lifestyleTracks: ['urban', 'walkable', 'academic'],
    pros: ['Metro at your door', 'Strong in-boundary feed', 'Condo entry points', 'Walkable'],
    cons: ['Urban density', 'DC taxes', 'Verify boundary by address'],
    ratings: { walkability: 5, kidDensity: 3, commutePain: 1, pretension: 2, weekendVibe: 4 },
    coordinates: { lat: 38.9478, lng: -77.0789 },
  },
  {
    id: 'friendship-heights-dc',
    name: 'Friendship Heights DC',
    slug: 'friendship-heights-dc',
    cluster: 'dc',
    schools: { elementary: 'Janney ES', middle: 'Deal MS', high: 'Jackson-Reed HS' },
    priceRange: '$400K–$1.8M',
    priceLow: 400000,
    priceHigh: 1800000,
    zipCode: '20016',
    vibe: 'Metro-and-retail hub living on the DC side of the line.',
    shortDescription: 'The DC side of Friendship Heights—condos, rowhouses, and single-family streets around the Metro and Wisconsin Ave retail.',
    fullDescription:
      'The District side of Friendship Heights, centered on the Friendship Heights Metro and the Wisconsin Ave retail corridor. A mix of condo buildings, rowhouses, and single-family streets that blend into AU Park to the south. Most of the area carries the Janney ES → Deal MS → Jackson-Reed HS feed. (Verify in-boundary status by address.)',
    realTalk:
      'People treat Friendship Heights as one place, but the DC and MD sides differ on taxes and schools. The DC side gets you the coveted Janney–Deal feed with condo entry points well below AU Park house prices—one of the better value plays in upper NW if in-boundary status checks out for the specific address.',
    lifestyleTracks: ['urban', 'walkable', 'value'],
    pros: ['Metro at your door', 'Strong in-boundary feed', 'Condo entry points', 'Retail convenience'],
    cons: ['Commercial feel at the core', 'DC taxes', 'Verify boundary by address'],
    ratings: { walkability: 5, kidDensity: 3, commutePain: 1, pretension: 3, weekendVibe: 4 },
    coordinates: { lat: 38.9583, lng: -77.0856 },
  },
  {
    id: 'forest-hills',
    name: 'Forest Hills',
    slug: 'forest-hills',
    cluster: 'dc',
    schools: { elementary: 'Murch ES', middle: 'Deal MS', high: 'Jackson-Reed HS' },
    priceRange: '$1.2M–$4M',
    priceLow: 1200000,
    priceHigh: 4000000,
    zipCode: '20008',
    vibe: 'Gracious, wooded, embassy-dotted neighborhood near Rock Creek Park and the Metro.',
    shortDescription: 'Affluent, leafy NW DC neighborhood between Connecticut Ave and Rock Creek Park.',
    fullDescription:
      'A gracious, wooded neighborhood between Connecticut Ave and Rock Creek Park, dotted with embassies and large homes, near the Van Ness-UDC Metro. Affluent and established with both grand single-family homes and upscale condos along Connecticut. (DCPS feeds provisional—verify by address.)',
    realTalk:
      'Leafy, established, and Metro-served—a strong option for families who want upper-NW prestige with Rock Creek Park access. Condos along Connecticut give downsizers a way in.',
    lifestyleTracks: ['nature', 'preppy', 'walkable'],
    pros: ['Wooded + park-adjacent', 'Metro access', 'Condo options', 'Established'],
    cons: ['Expensive', 'DC taxes', 'Verify boundary by address'],
    ratings: { walkability: 3, kidDensity: 3, commutePain: 2, pretension: 4, weekendVibe: 3 },
    coordinates: { lat: 38.9489, lng: -77.0578 },
  },
]

// ============================================================================
// QUIZ CONFIG — "Find Your Neighborhood"
// ============================================================================
// Each answer maps to lifestyle tracks and/or rating preferences.
// Matching logic (build this in the quiz component):
//   - Tally track weights from answers; score each neighborhood by overlap
//     with its lifestyleTracks, plus closeness on key ratings + budget fit.
//   - Return a ranked list with a match % and a one-line "why this matched".

export interface QuizOption {
  label: string
  tracks: LifestyleTrack[]
  // optional rating nudges, 1–5 target the answer pushes toward
  ratingTargets?: Partial<RealTalkRatings>
}

export interface QuizQuestion {
  id: string
  question: string
  type: 'single' | 'multi'
  options: QuizOption[]
}

export const QUIZ: QuizQuestion[] = [
  {
    id: 'priority',
    question: 'What matters most in your next neighborhood?',
    type: 'single',
    options: [
      { label: 'Top schools, full stop', tracks: ['academic', 'balanced'] },
      { label: 'Walk to dinner and Metro', tracks: ['walkable', 'urban'], ratingTargets: { walkability: 5 } },
      { label: 'Space, trees, and quiet', tracks: ['nature'], ratingTargets: { walkability: 2, weekendVibe: 2 } },
      { label: 'Best value for the schools', tracks: ['value'] },
    ],
  },
  {
    id: 'budget',
    question: "What's your realistic budget?",
    type: 'single',
    options: [
      { label: 'Under $900K', tracks: ['value', 'urban'] },
      { label: '$900K–$1.5M', tracks: ['balanced', 'value'] },
      { label: '$1.5M–$2.5M', tracks: ['balanced', 'preppy'] },
      { label: '$2.5M+', tracks: ['preppy'] },
    ],
  },
  {
    id: 'cluster',
    question: 'Any high school cluster preference?',
    type: 'single',
    options: [
      { label: 'Whitman', tracks: ['balanced'] },
      { label: 'Walter Johnson', tracks: ['value'] },
      { label: 'Bethesda-Chevy Chase', tracks: ['preppy'] },
      { label: 'Open to DC (Upper NW)', tracks: ['walkable', 'urban'] },
      { label: 'No preference', tracks: ['balanced'] },
    ],
  },
  {
    id: 'vibe',
    question: 'Pick the weekend that sounds best.',
    type: 'single',
    options: [
      { label: 'Trail run, then the farmers market', tracks: ['nature'], ratingTargets: { weekendVibe: 3 } },
      { label: 'Brunch downtown, walk everywhere', tracks: ['walkable', 'urban'], ratingTargets: { weekendVibe: 5 } },
      { label: 'Tennis at the club, dinner with neighbors', tracks: ['preppy'], ratingTargets: { pretension: 4 } },
      { label: 'Quiet day at home, kids in the cul-de-sac', tracks: ['balanced'], ratingTargets: { kidDensity: 4, weekendVibe: 2 } },
    ],
  },
  {
    id: 'kids',
    question: 'How important is a kid-dense, family-heavy street?',
    type: 'single',
    options: [
      { label: 'Essential—want kids everywhere', tracks: ['balanced'], ratingTargets: { kidDensity: 5 } },
      { label: 'Nice but not required', tracks: ['balanced'], ratingTargets: { kidDensity: 3 } },
      { label: "Prefer a quieter, mixed crowd", tracks: ['urban'], ratingTargets: { kidDensity: 2 } },
    ],
  },
  {
    id: 'commute',
    question: 'How do you feel about the commute downtown?',
    type: 'single',
    options: [
      { label: 'Must be short—Metro or quick drive', tracks: ['urban', 'walkable'], ratingTargets: { commutePain: 1 } },
      { label: 'Some commute is fine for the right house', tracks: ['nature', 'balanced'], ratingTargets: { commutePain: 3 } },
    ],
  },
  {
    id: 'pretension',
    question: 'Where do you land on the prestige-vs-low-key spectrum?',
    type: 'single',
    options: [
      { label: 'Low-key, well-worn Volvo energy', tracks: ['value', 'nature'], ratingTargets: { pretension: 2 } },
      { label: 'Comfortable with gracious and established', tracks: ['preppy'], ratingTargets: { pretension: 4 } },
      { label: "Don't care either way", tracks: ['balanced'] },
    ],
  },
]
