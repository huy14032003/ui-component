import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { tv, type VariantProps } from 'tailwind-variants'
import { Loader2 } from 'lucide-react'
import { cn } from '../../../lib/utils/cn'

const buttonVariants = tv({
  base: 'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium  transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:scale-[0.98]',
  variants: {
    variant: {
      solid: 'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_1px_2px_rgba(0,0,0,0.1)] border border-black/5',
      glass: 'backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_1px_3px_rgba(0,0,0,0.1)]',
      outline: 'bg-transparent border border-input hover:bg-secondary/10 hover:text-accent-foreground',
      ghost: 'bg-transparent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline !shadow-none !border-none !bg-transparent',
    },
    color: {
      primary: 'text-primary hover:bg-primary/10',
      secondary: 'text-secondary hover:bg-secondary/10',
      success: 'text-success hover:bg-success/10',
      danger: 'text-danger hover:bg-danger/10',
      warning: 'text-warning hover:bg-warning/10',
    },
    size: {
      sm: 'h-6 px-2 text-xs',
      md: 'h-8 px-4',
      lg: 'h-10 px-8 text-base',
      icon: 'h-10 w-10',
    },
  },
  compoundVariants: [
    // Solid variants
    { variant: 'solid', color: 'primary', class: 'bg-primary text-primary-foreground hover:bg-primary/90' },
    { variant: 'solid', color: 'secondary', class: 'bg-secondary text-secondary-foreground hover:bg-secondary/80' },
    { variant: 'solid', color: 'success', class: 'bg-success text-success-foreground hover:bg-success/90' },
    { variant: 'solid', color: 'danger', class: 'bg-danger text-danger-foreground hover:bg-danger/90' },
    { variant: 'solid', color: 'warning', class: 'bg-warning text-warning-foreground hover:bg-warning/90' },

    // Glass variants with subtle gradients
    { variant: 'glass', color: 'primary', class: 'bg-gradient-to-b from-primary/30 to-primary/10 text-primary border-primary/30 hover:from-primary/40' },
    { variant: 'glass', color: 'secondary', class: 'bg-gradient-to-b from-slate-800/60 to-slate-900/80 text-white border-white/10 hover:from-slate-800/80' },
    { variant: 'glass', color: 'success', class: 'bg-gradient-to-b from-success/30 to-success/10 text-success border-success/30 hover:from-success/40' },
    { variant: 'glass', color: 'danger', class: 'bg-gradient-to-b from-danger/30 to-danger/10 text-danger border-danger/30 hover:from-danger/40' },
    { variant: 'glass', color: 'warning', class: 'bg-gradient-to-b from-warning/30 to-warning/10 text-warning border-warning/30 hover:from-warning/40' },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
})

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, size, asChild = false, isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
    const Component = asChild ? Slot : 'button'

    return (
      <Component
        className={cn(buttonVariants({ variant, color, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </Component>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
