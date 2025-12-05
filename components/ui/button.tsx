import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const baseStyles =
            "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50";

        const variants = {
            primary:
                "bg-accent text-accent-foreground hover:opacity-90 active:opacity-80",
            secondary:
                "bg-background-secondary text-foreground border border-border hover:bg-border",
            ghost: "text-foreground hover:bg-background-secondary",
            outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        };

        const sizes = {
            sm: "h-9 px-4 text-sm rounded-button",
            md: "h-11 px-6 text-body rounded-button",
            lg: "h-14 px-8 text-lg rounded-button",
            icon: "h-10 w-10 p-0 rounded-button",
        };

        return (
            <button
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };
