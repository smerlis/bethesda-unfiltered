import { useState, useMemo } from 'react';
import { neighborhoods, SCHOOL_CLUSTERS } from '../data/neighborhoods';
import type { SchoolCluster } from '../data/neighborhoods';
import NeighborhoodCard from './NeighborhoodCard';

export default function NeighborhoodListIsland() {
  const [search, setSearch] = useState('');
  const [clusterFilter, setClusterFilter] = useState<SchoolCluster | 'all'>('all');
  const [walkabilityMin, setWalkabilityMin] = useState(1);
  const [sortBy, setSortBy] = useState<'name' | 'walkability' | 'cluster'>('cluster');

  const filtered = useMemo(() => {
    let result = neighborhoods.filter((n) => {
      const matchesSearch =
        search === '' ||
        n.name.toLowerCase().includes(search.toLowerCase()) ||
        n.vibe.toLowerCase().includes(search.toLowerCase()) ||
        n.tags.some((t) => t.includes(search.toLowerCase()));
      const matchesCluster = clusterFilter === 'all' || n.schoolCluster === clusterFilter;
      const matchesWalk = n.walkability >= walkabilityMin;
      return matchesSearch && matchesCluster && matchesWalk;
    });

    if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'walkability') {
      result = [...result].sort((a, b) => b.walkability - a.walkability);
    }

    return result;
  }, [search, clusterFilter, walkabilityMin, sortBy]);

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium text-gray-500 mb-1">Search</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, vibe, or tag..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">School Cluster</label>
          <select
            value={clusterFilter}
            onChange={(e) => setClusterFilter(e.target.value as SchoolCluster | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          >
            <option value="all">All Clusters</option>
            {SCHOOL_CLUSTERS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Min Walkability: {walkabilityMin}
          </label>
          <input
            type="range"
            min={1}
            max={5}
            value={walkabilityMin}
            onChange={(e) => setWalkabilityMin(Number(e.target.value))}
            className="w-32 accent-emerald-600"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'walkability' | 'cluster')}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          >
            <option value="cluster">School Cluster</option>
            <option value="name">Name A–Z</option>
            <option value="walkability">Most Walkable</option>
          </select>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Showing {filtered.length} of {neighborhoods.length} neighborhoods
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((n) => (
          <NeighborhoodCard key={n.id} neighborhood={n} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No neighborhoods match your filters.</p>
          <button
            onClick={() => {
              setSearch('');
              setClusterFilter('all');
              setWalkabilityMin(1);
            }}
            className="mt-3 text-emerald-600 hover:text-emerald-800 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
