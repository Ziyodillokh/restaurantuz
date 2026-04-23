import logo from "@/assets/imron-logo.png";
import { cn } from "@/lib/utils";

/** The IMRON crown wordmark. Usage: <Brandmark /> or <Brandmark variant="compact" /> */
export default function Brandmark({
  className,
  variant = "full",
}: {
  className?: string;
  variant?: "full" | "compact" | "icon";
}) {
  const h =
    variant === "icon" ? "h-9 w-9" : variant === "compact" ? "h-8 md:h-9" : "h-10 md:h-12";
  return (
    <img
      src={logo}
      alt="Imron Restoran"
      draggable={false}
      className={cn(h, "w-auto select-none", className)}
    />
  );
}
