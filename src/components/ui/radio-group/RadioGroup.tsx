import * as React from 'react';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react';
import { cn } from '@lib/utils/cn';

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof BaseRadioGroup> {
  className?: string;
}

const RadioGroup = React.forwardRef<React.ElementRef<typeof BaseRadioGroup>, RadioGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <BaseRadioGroup
        ref={ref}
        className={cn('grid gap-2', className)}
        {...props}
      />
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };
