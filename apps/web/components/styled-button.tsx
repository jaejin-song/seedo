import { cn } from "@repo/ui/lib/utils";

interface StyledButtonProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export function StyledButton({
  children,
  selected = false,
  onClick,
}: StyledButtonProps) {
  return (
    <button
      className={cn(
        "flex flex-col border rounded-xl p-3",
        selected && "bg-gray-900",
        !selected && "bg-gray-800"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
