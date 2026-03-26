import React from 'react';
import { Badge as RadixBadge } from '@radix-ui/themes';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../../../lib/utils/cn';

/**
 * Badge variants using tailwind-variants
 */
const badgeVariants = tv({
  base: 'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 gap-1.5 w-fit select-none',
  variants: {
    variant: {
      filled: '', // Subtle background (soft)
      solid: 'text-white shadow-sm', // Strong background
      outline: 'bg-transparent border shadow-sm', // Border only
      glass: 'backdrop-blur-md border border-white/10 shadow-lg', // Premium glassmorphism
    },
    intent: {
      default: '',
      success: '',
      error: '',
      warning: '',
      info: '',
    },
    size: {
      sm: 'px-2 py-0.5 text-[10px] h-5',
      md: 'px-2.5 py-0.5 text-xs h-6',
      lg: 'px-3 py-1 text-sm h-7',
    },
  },
  compoundVariants: [
    // Filled (Subtle)
    { variant: 'filled', intent: 'default', className: 'bg-secondary/10 text-secondary' },
    { variant: 'filled', intent: 'success', className: 'bg-success/10 text-success' },
    { variant: 'filled', intent: 'error', className: 'bg-danger/10 text-danger' },
    { variant: 'filled', intent: 'warning', className: 'bg-warning/10 text-warning' },
    { variant: 'filled', intent: 'info', className: 'bg-primary/10 text-primary' },

    // Solid (Strong)
    { variant: 'solid', intent: 'default', className: 'bg-secondary text-white' },
    { variant: 'solid', intent: 'success', className: 'bg-success text-white' },
    { variant: 'solid', intent: 'error', className: 'bg-danger text-white' },
    { variant: 'solid', intent: 'warning', className: 'bg-warning text-white' },
    { variant: 'solid', intent: 'info', className: 'bg-primary text-white' },

    // Outline (Bordered)
    { variant: 'outline', intent: 'default', className: 'border-secondary/30 text-secondary' },
    { variant: 'outline', intent: 'success', className: 'border-success/30 text-success' },
    { variant: 'outline', intent: 'error', className: 'border-danger/30 text-danger' },
    { variant: 'outline', intent: 'warning', className: 'border-warning/30 text-warning' },
    { variant: 'outline', intent: 'info', className: 'border-primary/30 text-primary' },

    // Glass (Premium)
    { variant: 'glass', intent: 'default', className: 'bg-secondary/10 text-secondary border-secondary/30' },
    { variant: 'glass', intent: 'success', className: 'bg-success/20 text-success border-success/30' },
    { variant: 'glass', intent: 'error', className: 'bg-danger/20 text-danger border-danger/30' },
    { variant: 'glass', intent: 'warning', className: 'bg-warning/20 text-warning border-warning/30' },
    { variant: 'glass', intent: 'info', className: 'bg-primary/20 text-primary border-primary/30' },
  ],
  defaultVariants: {
    variant: 'filled',
    intent: 'default',
    size: 'md',
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Badge = ({
  variant,
  intent,
  size,
  className,
  children,
  leftIcon,
  rightIcon,
  ...props
}: BadgeProps) => {
  return (
    <span className={cn(badgeVariants({ variant, intent, size }), className)} {...props}>
      {leftIcon && <span className="opacity-80 -ml-0.5">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="opacity-80 -mr-0.5">{rightIcon}</span>}
    </span>
  );
};

Badge.displayName = 'Badge';