export function Nav_Bar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="flex w-full items-center justify-between px-6 py-3">
        {/* Logo on the left */}
        <div className="flex items-center">
          <img src="/logo.png" alt="TUrnUp Logo" className="h-12 w-auto" />
        </div>

        {/* Navigation buttons on the right */}
        <div className="flex items-center space-x-4">
          <a
            href="/events"
            className="px-4 py-2 font-medium text-gray-700 transition-colors hover:text-[#ffcc00]"
          >
            Events
          </a>
          <a
            href="/organizations"
            className="px-4 py-2 font-medium text-gray-700 transition-colors hover:text-[#ffcc00]"
          >
            Organizations
          </a>
        </div>
      </div>
    </nav>
  );
}
