import * as React from 'react';
import { Progress as BaseProgress } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@lib/utils/cn';

const progressVariants = tv({
  slots: {
    root: 'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
    indicator: 'h-full w-full flex-1 bg-primary transition-all duration-500 ease-in-out',
  }
});

const { root, indicator } = progressVariants();

export interface ProgressProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseProgress.Root>, 'value'> {
    className?: string;
    value?: number | null;
}

const Progress = React.forwardRef<React.ElementRef<typeof BaseProgress.Root>, ProgressProps>(
  ({ className, value, ...props }, ref) => (
    <BaseProgress.Root
      ref={ref}
      className={root({ className })}
      value={value ?? null}
      {...props}
    >
      <BaseProgress.Indicator 
        className={indicator()} 
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }} 
      />
    </BaseProgress.Root>
  )
)
Progress.displayName = 'Progress';

export { Progress };
