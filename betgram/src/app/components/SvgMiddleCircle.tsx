export const SvgMiddleCircle = ({
  width = 128,
  height = 32,
  stroke = "rgba(255,255,255,0.3)",
  isHome = false
}) => (
  <svg
    viewBox="0 0 128 32"
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform={!isHome ? "rotate(180 64 16)" : ""}>
      <circle
        cx="64"        // centro orizzontale
        cy="50"        // centro verticale
        r="47"         // raggio (lascia un po' di margine)
        stroke={stroke}
        fill="none"
        strokeWidth="2"
      />
    </g>

  </svg>
);
