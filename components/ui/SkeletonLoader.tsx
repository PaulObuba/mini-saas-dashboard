import { cn } from "@/lib/class-name";

const SkeletonLoader = ({ className = "" }: { className?: string }) => {
  return <span className={cn("bg-gray-200 animate-pulse block", className)} />;
};

export default SkeletonLoader;
