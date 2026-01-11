export const ThemeButton = ({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md border transition cursor-pointer
      ${
        active
          ? "bg-primary text-white border-primary"
          : "border-gray-300 hover:bg-gray-50"
      }
    `}
  >
    {label}
  </button>
);
