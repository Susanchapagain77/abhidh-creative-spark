import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "group relative overflow-hidden bg-gradient-to-r from-primary via-accent to-primary/80 text-primary-foreground font-semibold shadow-[0_25px_60px_-30px_rgba(18,40,90,0.65)] transition-all duration-300 hover:-translate-y-0.5 focus-visible:ring-primary/60",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-white/15 bg-white/5 text-foreground transition-colors duration-300 hover:bg-white/12 hover:text-foreground shadow-[0_12px_30px_-20px_rgba(18,40,90,0.4)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_18px_40px_-24px_rgba(18,40,90,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary/90 focus-visible:ring-primary/40",
        ghost: "text-primary hover:bg-primary/10 hover:text-primary focus-visible:ring-primary/40",
        link: "text-primary underline-offset-4 hover:underline",
        hero:
          "group relative overflow-hidden rounded-full bg-gradient-to-r from-primary via-accent to-primary/80 text-primary-foreground font-semibold shadow-[0_35px_75px_-35px_rgba(18,40,90,0.7)] transition-all duration-300 hover:-translate-y-0.5 focus-visible:ring-primary/60",
        cta:
          "bg-accent text-accent-foreground shadow-[0_22px_55px_-30px_rgba(40,102,210,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/90 focus-visible:ring-primary/50 font-semibold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
