"use client";

export default function GeometricBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#f8f8f8]">
      {/* SVG grid with intersection dots — matching Himesh Mehta reference exactly */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Minor grid: very faint thin lines */}
          <pattern id="minor-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <line x1="24" y1="0" x2="24" y2="24" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
            <line x1="0" y1="24" x2="24" y2="24" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
          </pattern>
          {/* Major grid: slightly more visible lines with dots at intersections */}
          <pattern id="major-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* Fill with minor grid first */}
            <rect width="120" height="120" fill="url(#minor-grid)" />
            {/* Major lines */}
            <line x1="120" y1="0" x2="120" y2="120" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
            <line x1="0" y1="120" x2="120" y2="120" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
            {/* Dot at major intersection */}
            <circle cx="120" cy="120" r="1" fill="rgba(0,0,0,0.08)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#major-grid)" />
      </svg>

      {/* Soft radial vignette to fade edges gently */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(248,248,248,0.9)_100%)]" />
    </div>
  );
}
