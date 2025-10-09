export const SvgCornerShape = ({
  size = 14,
  stroke = "rgba(255,255,255,0.3)",
  strokeWidth = 2,
  direction = "left",
  isHome = false
}) => {
  const cx = direction === "right" ? 10 : 1;
  const cy = isHome ? 1 : 10;

  return (
    <svg viewBox="0 0 14 14" width={size} height={size}>
        <circle
          stroke={stroke}
          fill="transparent"
          strokeWidth={strokeWidth}
          cx={cx}
          cy={cy}
          r="10"
        />
    </svg>
  );
};
