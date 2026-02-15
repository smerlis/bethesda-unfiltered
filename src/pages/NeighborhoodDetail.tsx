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

function ListSection({ title, items, icon }: { title: string; items: string[]; icon: string }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
        {icon} {title}
      </h3>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="text-sm text-gray-700 flex items-start gap-2">
            <span className="text-emerald-500 mt-1 shrink-0">&bull;</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

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

          {/* Insider Tip */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
            <h3 className="text-sm font-bold text-amber-800 mb-1">Insider Tip</h3>
            <p className="text-sm text-amber-900">{n.insiderTip}</p>
          </div>

          {/* At a Glance + Schools */}
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

          {/* Best For / Not Great For */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide mb-2">
                Best For
              </h3>
              <ul className="space-y-1">
                {n.bestFor.map((item) => (
                  <li key={item} className="text-sm text-emerald-800 flex items-start gap-2">
                    <span className="shrink-0">+</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-red-700 uppercase tracking-wide mb-2">
                Not Great For
              </h3>
              <ul className="space-y-1">
                {n.notGreatFor.map((item) => (
                  <li key={item} className="text-sm text-red-800 flex items-start gap-2">
                    <span className="shrink-0">-</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Known For */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Known For
            </h3>
            <div className="flex flex-wrap gap-2">
              {n.knownFor.map((item) => (
                <span
                  key={item}
                  className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Local Scene */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ListSection title="Local Dining" items={n.localDining} icon="🍽" />
            <ListSection title="Shopping & Markets" items={n.localShopping} icon="🛍" />
            <ListSection title="Parks & Recreation" items={n.parksAndRec} icon="🌳" />
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                🚗 Commute Reality
              </h3>
              <p className="text-sm text-gray-700">{n.commuteNotes}</p>
            </div>
          </div>

          {/* Housing Stock */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Housing Stock
            </h3>
            <p className="text-sm text-gray-700">{n.housingStock}</p>
          </div>

          {/* Local Lore */}
          <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-r-lg">
            <h3 className="text-sm font-bold text-indigo-800 mb-1">Local Lore</h3>
            <p className="text-sm text-indigo-900">{n.localLore}</p>
          </div>

          {/* Tags */}
          <div>
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
