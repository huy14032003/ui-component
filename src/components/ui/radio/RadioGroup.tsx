import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@lib/utils/cn';

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, orientation = 'vertical', ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        'grid gap-2',
        orientation === 'horizontal' ? 'flex flex-row flex-wrap gap-4' : 'grid-cols-1',
        className
      )}
      {...props}
      ref={ref}
    />
  );
});

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
