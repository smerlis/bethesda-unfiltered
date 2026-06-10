# BETHESDA UNFILTERED — DATA MERGE SPEC + BUILD INSTRUCTIONS
# For Claude Code (Fable). Read this entire file before touching anything.

## CONTEXT
Two neighborhood data files exist and must be merged into one:
- **FILE A (repo):** `src/data/neighborhoods.ts` — 40 neighborhoods, 23-field schema.
  Contains the irreplaceable lived-in content: insiderTip, localDining, localShopping,
  parksAndRec, commuteNotes, housingStock, localLore, bestFor, notGreatFor, knownFor,
  highlights, tags, description. **This prose is the product. Preserve it VERBATIM.
  Do not rewrite, summarize, or "improve" it.**
- **FILE B (new):** `neighborhoods-new.ts` (place in repo root or src/data/) — 53
  neighborhoods, different schema. Contains what File A lacks: coordinates (lat/lng),
  priceLow/priceHigh (numeric), priceRange (display), zipCode, 5-axis realTalk ratings,
  lifestyleTracks, pros/cons, shortDescription/fullDescription/realTalk text, plus a
  full quiz config (QUIZ + CLUSTERS metadata).

Union ≈ 65 neighborhoods.

## MERGED SCHEMA (field-by-field rules)
Every neighborhood in the output gets ALL of these fields:

| Field | Source | Rule |
|---|---|---|
| id / slug | B's slug style (kebab) | Use mapping table below for renames |
| name | A if exists, else B | |
| cluster | A's value on conflict | enum: 'whitman' \| 'wj' \| 'bcc' \| 'dc'. Map A's labels: Whitman→whitman, Walter Johnson→wj, BCC→bcc, Jackson-Reed DC→dc |
| schools {elementary, middle, high} | **A's values on conflict** | Add `schoolsVerified: false` to every entry. Where A and B disagree, add a code comment `// CONFLICT: new file said X` — do not silently drop |
| vibeLabel | A's `vibe` (short label, e.g. "Urban Village") | B-only neighborhoods: derive a 2-4 word label from B's vibe sentence |
| vibe | B's `vibe` (one-line gut take) | A-only neighborhoods: derive from A's description first clause |
| shortDescription | B | A-only: first 1–2 sentences of A's description |
| description | A's `description` verbatim | B-only: use B's fullDescription |
| realTalk | B | A-only: use A's insiderTip as the realTalk seed (verbatim) |
| insiderTip | A verbatim | B-only: leave empty string + `// TODO content` |
| highlights, tags, knownFor, localDining, localShopping, parksAndRec, commuteNotes, housingStock, localLore | A verbatim | B-only: empty arrays / empty strings + `// TODO content`. **NEVER invent restaurant names, shop names, or lore. Hallucinated local facts destroy the site's credibility. Leave blank instead.** |
| bestFor / notGreatFor | A verbatim | B-only: use B's pros/cons |
| pros / cons | B | A-only: use A's bestFor/notGreatFor |
| priceRange / priceLow / priceHigh | B | A-only: parse A's avgPrice + housingStock text into numbers; mark with `priceEstimated: true` |
| zipCode | B | A-only: derive from geography; mark `// verify` |
| coordinates {lat, lng} | B | A-only: derive from known geography; ensure NO two neighborhoods share identical coords; mark `// verify` |
| ratings {walkability, kidDensity, commutePain, pretension, weekendVibe} | B | walkability conflict: keep A's 1–5 value. A-only: derive conservatively from A's text (tags like 'walkable', commuteNotes), comment `// derived` |
| lifestyleTracks | B | A-only: derive from A's tags (walkable/metro→walkable or urban; nature/wooded/trails→nature; value/affordable→value; luxury/prestigious→preppy; family/community→balanced) |
| lastUpdated | new | Set all to today's date |
| schoolsVerified | new | `false` for ALL entries until the MCPS/DCPS pass |

Also port from File B unchanged: `CLUSTERS` metadata (add A's cluster naming), `QUIZ` config, helper functions from A (`getNeighborhoodsByCluster`, `getNeighborhoodById` — update to new schema).

## ID MAPPING (same place, different ids — merge these, do not duplicate)
- bethesda-downtown (A) = downtown-bethesda (B)  // NOTE cluster conflict: A=Whitman, B=wj. Keep A + comment. Splits by address in reality.
- somerset (A) = town-of-somerset (B)
- section-three (A) = chevy-chase-section-3 (B)
- section-five (A) = chevy-chase-section-5 (B)
- wyngate (A) = pyle-estates-wyngate (B) → final id: wyngate
- forest-hills-dc (A) = forest-hills (B) → final id: forest-hills-dc
- palisades-dc (A) = palisades (B) → final id: palisades-dc
- flemming-park (A) → fix typo → fleming-park
- Identical ids in both: battery-park, edgemoor, bradley-hills, glen-echo-heights, bannockburn, sumner, wood-acres, brookmont, little-falls, kenwood, kenwood-park, greenwich-forest, huntington-terrace, alta-vista, chevy-chase-dc, barnaby-woods, hawthorne, friendship-heights-dc, tenleytown, spring-valley

## KNOWN SCHOOL CONFLICTS (keep A's value, add comment, schoolsVerified:false)
- kenwood, kenwood-park: A=Somerset ES/North Bethesda MS/BCC; B=Westbrook/Westland/Whitman. **A is the deliberate correction from earlier sessions. A wins.**
- alta-vista, greenwich-forest, huntington-terrace: A=BCC; B=Whitman. A wins, flag.
- downtown-bethesda: A=Whitman, B=wj — genuinely splits by address; flag prominently.
- Middle-school pattern: A lists Westland MS on several Whitman feeders (wood-acres, sumner, bannockburn, glen-echo-heights, bradley-hills, brookmont) where B says Pyle MS. Reality check needed — Pyle generally feeds Whitman, Westland feeds B-CC. Flag ALL of these; do not trust either file.
- brookmont, little-falls: ES conflicts (Wood Acres vs Carderock Springs / Somerset). Flag.
- somerset: MS conflict (North Bethesda MS vs Westland MS). Flag.
- forest-hills-dc: Oyster-Adams (A) vs Murch (B). Flag.
- friendship-heights-dc: Lafayette (A) vs Janney (B). Flag.
- spring-valley, palisades-dc: Deal MS (A) vs Hardy MS (B). Flag.

## NEIGHBORHOODS ONLY IN FILE B (add whole; rich-content fields stay empty TODOs)
carderock-springs, mohican-hills, wilson-knolls, westmoreland-hills, springfield,
westgate, east-bethesda, bethesda-park, sonoma, fort-sumner, chevy-chase-village,
town-of-chevy-chase, village-of-martins-additions, chevy-chase-view, north-chevy-chase,
friendship-heights (MD side), woodmont-triangle, drummond, maplewood, bradley-manor,
burning-tree-valley, ayrlawn, au-park, wesley-heights, kent-foxhall.
(B's four flagged-thin entries — westgate, east-bethesda, bethesda-park, sonoma — keep
their NEEDS VERIFICATION comments.)

## NEIGHBORHOODS ONLY IN FILE A (add whole; B-derived fields per rules above)
chevy-chase-west, rollingwood, garrett-park, garrett-park-estates, luxmanor,
tilden-woods, north-bethesda (Pike District), rock-creek-highlands, kensington,
fleming-park, old-georgetown-village, cleveland-park, crestwood-dc.

## VALIDATION (must pass before building UI)
1. `tsc --noEmit --strict` clean.
2. No duplicate ids/slugs. No two identical coordinate pairs.
3. Count check: ~65 entries; every entry has every field in the merged schema.
4. Print a conflict report: every entry where a `// CONFLICT` comment was added.

## THEN BUILD (after merge passes validation)
- Next.js App Router, static generation (`generateStaticParams`) — one real HTML page
  per neighborhood, per cluster, per top-10 list. Tailwind + shadcn/ui.
- Routes: / (home + email capture), /neighborhoods (filter/sort), /neighborhood/[slug],
  /clusters/[cluster], /compare (2–3 side-by-side), /quiz (results gated by optional
  email capture), /best/[list-slug] (top-10 list pages — build the template + 3 seed
  lists from ratings data: walkable, value-for-schools, nature), /ask (question intake).
- Map page/component: Leaflet + OpenStreetMap (free, no key), pins colored by cluster,
  using coordinates.
- Forms: Netlify Forms for email capture + /ask intake (fields: question, moving-from,
  budget band, kids' ages, priorities). No backend.
- SEO: unique title + meta description per page, OG tags, JSON-LD on neighborhood
  pages, sitemap.xml, robots.txt, proper favicon and site title.
- Footer disclaimers on every page: school boundaries change — verify with MCPS/DCPS;
  not real-estate, legal, or financial advice. Neighborhood pages with
  schoolsVerified:false show a small "verify school assignment" note.
- Analytics: Plausible snippet (placeholder domain config).
- Voice: trusted local friend, honest, specific, no realtor-speak. Where content is a
  TODO, render the section as absent — never fill with generic filler.
- Git: work on branch `fable-rebuild`. Do NOT touch main. Report the Netlify deploy
  preview URL pattern when done.
