import logo from "@/assets/imron-logo.png";
import { cn } from "@/lib/utils";

/** The IMRON crown wordmark.
 * variants:
 *  - "compact": small inline (navbar)
 *  - "full": medium
 *  - "icon": tiny square
 *  - "medallion": large circular framed mark (hero / footer)
 */
export default function Brandmark({
  className,
  variant = "full",
}: {
  className?: string;
  variant?: "full" | "compact" | "icon" | "medallion";
}) {
  if (variant === "medallion") {
    return (
      <div
        className={cn(
          "logo-medallion rounded-full grid place-items-center aspect-square",
          "h-32 w-32 md:h-44 md:w-44 lg:h-52 lg:w-52",
          className
        )}
      >
        <img
          src={logo}
          alt="Imron Restoran"
          draggable={false}
          className="w-[78%] h-auto select-none drop-shadow-[0_4px_18px_hsl(var(--accent)/0.25)]"
        />
      </div>
    );
  }

  const h =
    variant === "icon"
      ? "h-9"
      : variant === "compact"
      ? "h-9 md:h-10"
      : "h-12 md:h-14";

  return (
    <img
      src={logo}
      alt="Imron Restoran"
      draggable={false}
      className={cn(h, "w-auto select-none", className)}
    />
  );
}

