export default function DottedLine({
  className = "",
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="100"
      preserveAspectRatio="none"
      viewBox="0 0 200 100"
      width="200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={inverted ? "M 0 50 Q 100 100, 200 50" : "M 0 50 Q 100 0, 200 50"}
        fill="none"
        opacity="0.5"
        stroke="currentColor"
        strokeDasharray="8,6"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}
