export const Section = ({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div
    className="border border-gray-200 rounded-xl p-6 space-y-4 h-full"
    style={{
      backgroundColor: "var(--background-50)",
      color: "var(--text-700)",
    }}
  >
    <div className="flex gap-3 items-start">
      <div className="text-primary text-xl">{icon}</div>
      <div>
        <h2 className="font-medium">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>
    </div>
    {children}
  </div>
);
