export const SvgMiddleCircle = ({
  width = 128,
  height = 64,
  stroke = "rgba(255,255,255,0.3)",
}) => (
  <svg viewBox="0 0 128 64" width={width} height={height}>
    <circle stroke={stroke} fill="transparent" strokeWidth="2" cx="64" cy="32" r="30" />
  </svg>
);
