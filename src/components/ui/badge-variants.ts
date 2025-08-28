import { cva } from "class-variance-authority"

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 premium-gradient",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 glass-card",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border glass-effect",
        success: "border-transparent bg-emerald text-white hover:bg-emerald/80 shadow-lg",
        warning: "border-transparent bg-orange text-white hover:bg-orange/80 shadow-lg",
        info: "border-transparent bg-cyan text-white hover:bg-cyan/80 shadow-lg",
        premium: "premium-gradient text-white shadow-lg neon-glow border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)