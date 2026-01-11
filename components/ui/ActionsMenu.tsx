import React, { useState } from "react";
import { HiDotsHorizontal, HiDotsVertical } from "react-icons/hi";
import Typography from "./Typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { cn } from "@/lib/class-name";

export interface ActionItem {
  icon: React.ReactNode;
  title: string;
  action: string;
  danger?: boolean;
  children?: ActionItem[];
}

interface ActionsMenuProps {
  items: ActionItem[];
  onSelect: (action: string) => void;
  triggerClassName?: string;
  contentClassName?: string;
  horizontal?: boolean;
  contentAlign?: "start" | "center" | "end" | undefined;
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({
  items,
  onSelect,
  triggerClassName,
  contentClassName,
  contentAlign,
  horizontal = true,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          triggerClassName,
          "pointer-events-auto flex size-8 justify-center py-2 focus:border-0 focus:outline-none"
        )}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {horizontal ? (
          <HiDotsHorizontal className="text-[#98A2B3] font-bold rotate-180" />
        ) : (
          <HiDotsVertical className="text-[#98A2B3] font-bold rotate-180" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={contentAlign ?? "end"}
        className={cn(
          "p-2 rounded-xl",
          "data-[state=open]:animate-scaleIn",
          contentClassName
        )}
        style={{
          backgroundColor: "var(--background-50)",
          color: "var(--text-50)",
        }}
      >
        {items.map((item, i) =>
          item.children ? (
            <DropdownMenu key={i}>
              <DropdownMenuTrigger className="cursor-pointer items-center gap-2 text-left hover:bg-light-grey">
                {item.icon}
                <Typography variant={"smallText"}>{item.title}</Typography>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className={cn("p-2.5 rounded-lg", contentClassName)}
                style={{
                  backgroundColor: "var(--background-900)",
                  color: "var(--text-50)",
                }}
              >
                {item.children.map((sub, j) => (
                  <DropdownMenuItem
                    key={j}
                    onSelect={(e) => {
                      e.stopPropagation();
                      setOpen(false);
                      onSelect(sub.action);
                    }}
                    className="cursor-pointer items-center gap-2 text-left hover:bg-light-grey"
                  >
                    {sub.icon}
                    <Typography variant={"xSmallText"}>{sub.title}</Typography>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenuItem
              key={i}
              className={cn(
                "cursor-pointer items-center gap-2 text-left hover:bg-light-grey",
                item.danger && "text-[#E10000]"
              )}
              style={{
                backgroundColor: "var(--background-50)",
                // color: "var(--text-50)",
              }}
              onSelect={(e) => {
                setOpen(false);
                onSelect(item.action);
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              {item.icon}
              <Typography variant="xSmallText">{item.title}</Typography>
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsMenu;
