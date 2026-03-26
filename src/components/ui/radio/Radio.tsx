import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@lib/utils/cn';

const radioVariants = tv({
  slots: {
    root: 'group flex items-start gap-3 cursor-pointer select-none outline-none',
    indicator: 'relative flex shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    dot: 'block rounded-full transition-transform duration-200 scale-0 group-data-[state=checked]:scale-100',
    labelContainer: 'flex flex-col gap-0.5',
    label: 'text-sm font-medium leading-none text-slate-900',
    description: 'text-xs text-slate-500',
  },
  variants: {
    variant: {
      solid: {
        indicator: 'bg-white border-slate-300 group-data-[state=checked]:border-primary',
        dot: 'bg-primary',
      },
     
    
    },
    intent: {
      primary: {
        indicator: 'group-data-[state=checked]:border-primary',
        dot: 'bg-primary',
      },
      success: {
        indicator: 'group-data-[state=checked]:border-success',
        dot: 'bg-success',
      },
      danger: {
        indicator: 'group-data-[state=checked]:border-danger',
        dot: 'bg-danger',
      },
      warning: {
        indicator: 'group-data-[state=checked]:border-warning',
        dot: 'bg-warning',
      },
    },
    size: {
      sm: {
        indicator: 'h-4 w-4',
        dot: 'h-1.5 w-1.5',
        label: 'text-xs',
      },
      md: {
        indicator: 'h-5 w-5',
        dot: 'h-2 w-2',
        label: 'text-sm',
      },
      lg: {
        indicator: 'h-6 w-6',
        dot: 'h-2.5 w-2.5',
        label: 'text-base',
      },
    },
    disabled: {
      true: {
        root: 'opacity-50 cursor-not-allowed pointer-events-none',
      },
    },
  },
  defaultVariants: {
    variant: 'solid',
    intent: 'primary',
    size: 'md',
  },
});

export interface RadioProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioVariants> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Radio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioProps
>(({ className, variant, intent, size, disabled, label, description, children, ...props }, ref) => {
  const styles = radioVariants({ variant, intent, size, disabled });

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(styles.root(), className)}
      disabled={disabled}
      {...props}
    >
      <div className={styles.indicator()}>
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <div className={styles.dot()} />
        </RadioGroupPrimitive.Indicator>
      </div>
      {(label || description || children) && (
        <div className={styles.labelContainer()}>
          {label && <span className={styles.label()}>{label}</span>}
          {children && <span className={styles.label()}>{children}</span>}
          {description && <span className={styles.description()}>{description}</span>}
        </div>
      )}
    </RadioGroupPrimitive.Item>
  );
});

Radio.displayName = RadioGroupPrimitive.Item.displayName;
