import { ButtonHTMLAttributes, FC, forwardRef } from "react"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "../lib/utils"

const buttonVariants = cva(
  "flex px-2 h-9 items-center justify-center rounded-md",
  {
    variants: {
      appearance: {
        solid: "text-white font-bold text-sm",
        outlined: "border",
      },
      variant: {
        primary: "",
        blue: "",
        red: "",
      },
    },
    compoundVariants: [
      {
        appearance: "solid",
        variant: "primary",
        className: "bg-green-600",
      },
      {
        appearance: "solid",
        variant: "blue",
        className: "bg-blue-600",
      },
      {
        appearance: "solid",
        variant: "red",
        className: "bg-red-600",
      },
      {
        appearance: "outlined",
        variant: "primary",
        className: "border-green-600 bg-green-50",
      },
      {
        appearance: "outlined",
        variant: "blue",
        className: "border-blue-600 bg-blue-50",
      },
      {
        appearance: "outlined",
        variant: "red",
        className: "border-red-600 bg-red-50",
      },
    ],
    defaultVariants: {
      appearance: "solid",
      variant: "primary",
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, appearance, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ appearance, variant, className }))}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
