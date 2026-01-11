import { cn } from "@/lib/class-name";

const LineThrough = ({ className }: { className?: string }) => {
  return (
    <div className={cn(className)}>
      <div className={cn("border-t border-mid-grey")} />
    </div>
  );
};

export default LineThrough;
