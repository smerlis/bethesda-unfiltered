import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      location.pathname === path
        ? 'bg-emerald-700 text-white'
        : 'text-emerald-100 hover:bg-emerald-600 hover:text-white'
    }`;

  return (
    <header className="bg-emerald-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              Bethesda Unfiltered
            </span>
          </Link>
          <nav className="flex space-x-2">
            <Link to="/" className={linkClass('/')}>
              Neighborhoods
            </Link>
            <Link to="/quiz" className={linkClass('/quiz')}>
              Find Your Fit
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
