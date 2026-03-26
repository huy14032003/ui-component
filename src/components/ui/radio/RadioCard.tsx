import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@lib/utils/cn';

const radioCardVariants = tv({
  slots: {
    root: 'group relative flex flex-col gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    header: 'flex items-center justify-between',
    indicatorContainer: 'h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors',
    dot: 'h-2 w-2 rounded-full scale-0 transition-transform group-data-[state=checked]:scale-100',
    content: 'flex flex-col gap-1',
    title: 'font-semibold text-slate-900 ',
    description: 'text-sm text-slate-500 ',
    icon: 'text-slate-400 group-data-[state=checked]:text-primary transition-colors',
  },
  variants: {
    variant: {
      solid: {
        root: 'bg-white border-slate-200 hover:border-slate-300 data-[state=checked]:border-primary data-[state=checked]:bg-primary/5',
        indicatorContainer: 'border-slate-300 data-[state=checked]:border-primary',
        dot: 'bg-primary',
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
  },
});

export interface RadioCardProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, 'title'>,
    VariantProps<typeof radioCardVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}

export const RadioCard = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioCardProps
>(({ className, variant, disabled, title, description, icon, children, ...props }, ref) => {
  const styles = radioCardVariants({ variant, disabled });

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(styles.root(), className)}
      disabled={disabled}
      {...props}
    >
      <div className={styles.header()}>
        <div className="flex items-center gap-3">
          {icon && <div className={styles.icon()}>{icon}</div>}
          {title && <span className={styles.title()}>{title}</span>}
        </div>
        <div className={styles.indicatorContainer()}>
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <div className={styles.dot()} />
          </RadioGroupPrimitive.Indicator>
        </div>
      </div>
      {(description || children) && (
        <div className={styles.content()}>
          {description && <span className={styles.description()}>{description}</span>}
          {children}
        </div>
      )}
    </RadioGroupPrimitive.Item>
  );
});

RadioCard.displayName = 'RadioCard';