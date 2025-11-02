import { cn } from "@/lib/utils"

interface StatusProps {
  value: "active" | "inactive" | "pending" | "success" | "error" | "warning"
  label?: string
  className?: string
  size?: "sm" | "md"
}

export function Status({
  value,
  label,
  className,
  size = "md",
}: StatusProps) {
  const colors = {
    active: "bg-green-100 text-green-700 border-green-300",
    success: "bg-green-100 text-green-700 border-green-300",
    inactive: "bg-gray-100 text-gray-700 border-gray-300",
    pending: "bg-blue-100 text-blue-700 border-blue-300",
    error: "bg-red-100 text-red-700 border-red-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
  }

  const dots = {
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
  }

  const paddings = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center border rounded-full font-medium",
        colors[value],
        paddings[size],
        className
      )}
    >
      <span
        className={cn("rounded-full mr-1.5", dots[size], {
          "bg-green-500": value === "active" || value === "success",
          "bg-red-500": value === "error" || value === "inactive",
          "bg-yellow-500": value === "warning",
          "bg-blue-500": value === "pending",
        })}
      />
      {label || value.charAt(0).toUpperCase() + value.slice(1)}
    </span>
  )
}
