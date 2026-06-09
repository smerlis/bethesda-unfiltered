import type { Neighborhood } from '../data/neighborhoods';

const walkabilityDots = (level: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={`inline-block w-2.5 h-2.5 rounded-full mr-0.5 ${
        i < level ? 'bg-emerald-500' : 'bg-gray-200'
      }`}
    />
  ));

const clusterColors: Record<string, string> = {
  Whitman: 'bg-blue-100 text-blue-800',
  BCC: 'bg-purple-100 text-purple-800',
  'Walter Johnson': 'bg-amber-100 text-amber-800',
  'Jackson-Reed DC': 'bg-rose-100 text-rose-800',
};

export default function NeighborhoodCard({ neighborhood }: { neighborhood: Neighborhood }) {
  const n = neighborhood;
  return (
    <a
      href={`/neighborhood/${n.id}`}
      className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900">{n.name}</h3>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${
              clusterColors[n.schoolCluster] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {n.schoolCluster}
          </span>
        </div>
        <p className="text-sm text-emerald-700 font-medium mb-2">{n.vibe}</p>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{n.description}</p>
        {n.knownFor && n.knownFor.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {n.knownFor.slice(0, 2).map((item) => (
              <span key={item} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                {item}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span>Walkability:</span>
            <span className="flex">{walkabilityDots(n.walkability)}</span>
          </div>
          <span className="font-semibold text-gray-700">{n.avgPrice}</span>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {n.elementary} &rarr; {n.middleSchool} &rarr; {n.highSchool}
        </div>
      </div>
    </a>
  );
}
