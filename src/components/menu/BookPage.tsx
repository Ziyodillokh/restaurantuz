import { forwardRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  side?: "left" | "right";
  variant?: "paper" | "aged";
};

/**
 * A single book page. forwardRef is REQUIRED for react-pageflip children.
 */
const BookPage = forwardRef<HTMLDivElement, Props>(
  ({ children, side = "right", variant = "paper" }, ref) => {
    const tex = variant === "aged" ? "texture-paper-aged" : "texture-paper";
    const edge = side === "right" ? "book-edge-right" : "book-edge-left";
    return (
      <div ref={ref} className={`${tex} ${edge} h-full w-full overflow-hidden relative`}>
        {/* Subtle vignette for depth */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, hsl(20 40% 15% / 0.18) 100%)",
          }}
        />
        <div className="absolute inset-0 p-6 md:p-9 text-[hsl(20_30%_15%)] flex flex-col">
          {children}
        </div>
      </div>
    );
  }
);
BookPage.displayName = "BookPage";

export default BookPage;

/* Hard pages (cover, section dividers, back) — leather */
export const HardPage = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, ref) => (
    <div ref={ref} className="texture-leather h-full w-full grid place-items-center text-[hsl(38_55%_72%)] p-6">
      {children}
    </div>
  )
);
HardPage.displayName = "HardPage";
