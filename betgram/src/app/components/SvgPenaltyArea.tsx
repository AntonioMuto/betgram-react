export const SvgPenaltyArea = ({ width = 160, height = 75, stroke = "rgba(255,255,255,0.3)", isHome = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 160 75"
    width={width}
    height={height}
  >
    <defs>
      <clipPath id="cutoffRect">
        <rect x="0" y="1" width="160" height="75" />
      </clipPath>
    </defs>
    <g stroke={stroke} fill="transparent" strokeWidth="2" transform={!isHome ? "rotate( 180 80 37)" : ""}>
      <rect clipPath="url(#cutoffRect)" x="1" y="0" width="158" height="51" />
      <rect clipPath="url(#cutoffRect)" x="42" y="0" width="74" height="20" />
      <path d="M 40 52 A 50 50 0 0 0 119 52" />
    </g>
  </svg>
);
