import { useParams, Link } from 'react-router-dom';
import { getNeighborhoodById } from '../data/neighborhoods';

const clusterColors: Record<string, string> = {
  Whitman: 'bg-blue-100 text-blue-800',
  BCC: 'bg-purple-100 text-purple-800',
  'Walter Johnson': 'bg-amber-100 text-amber-800',
  'Jackson-Reed DC': 'bg-rose-100 text-rose-800',
};

const walkabilityBar = (level: number) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`h-3 w-8 rounded ${i < level ? 'bg-emerald-500' : 'bg-gray-200'}`}
      />
    ))}
    <span className="ml-2 text-sm text-gray-600">{level}/5</span>
  </div>
);

export default function NeighborhoodDetail() {
  const { id } = useParams<{ id: string }>();
  const neighborhood = getNeighborhoodById(id || '');

  if (!neighborhood) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Neighborhood Not Found</h1>
        <Link to="/" className="text-emerald-600 hover:text-emerald-800 font-medium">
          Back to all neighborhoods
        </Link>
      </div>
    );
  }

  const n = neighborhood;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-800 mb-6"
      >
        &larr; Back to all neighborhoods
      </Link>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">{n.name}</h1>
              <p className="text-emerald-100 text-lg">{n.vibe}</p>
            </div>
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                clusterColors[n.schoolCluster] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {n.schoolCluster}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-gray-700 text-base leading-relaxed">{n.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                School Pipeline
              </h3>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-gray-500">Elementary:</span>{' '}
                  <span className="font-medium text-gray-900">{n.elementary}</span>
                </div>
                <div>
                  <span className="text-gray-500">Middle:</span>{' '}
                  <span className="font-medium text-gray-900">{n.middleSchool}</span>
                </div>
                <div>
                  <span className="text-gray-500">High:</span>{' '}
                  <span className="font-medium text-gray-900">{n.highSchool}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                At a Glance
              </h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-500">Avg Price:</span>{' '}
                  <span className="font-semibold text-gray-900">{n.avgPrice}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Walkability:</span>
                  <div className="mt-1">{walkabilityBar(n.walkability)}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Highlights
            </h3>
            <div className="flex flex-wrap gap-2">
              {n.highlights.map((h) => (
                <span
                  key={h}
                  className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {n.tags.map((t) => (
                <span
                  key={t}
                  className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded text-xs font-medium"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
