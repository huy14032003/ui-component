import { Radio as AriaRadio, RadioGroup as AriaRadioGroup, Label, Text, type RadioGroupProps, type RadioProps as AriaRadioProps } from 'react-aria-components';
import { cn } from '@lib/utils/cn';
import React from 'react';
import { tv } from 'tailwind-variants';

// === RADIO ===
export interface CustomRadioProps extends Omit<AriaRadioProps, 'children' | 'value'> {
  value: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  description?: string;
  children?: React.ReactNode;
}

const radioSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const innerDotSizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
};

const radioMtClasses = {
  sm: 'mt-0.5',
  md: 'mt-0',
  lg: '-mt-0.5',
};


const variantClasses = tv({
  variants: {
    variant: {
      primary: "group-data-selected:border-primary group-data-focus-visible:ring-primary/50",
      secondary: "group-data-selected:border-secondary group-data-focus-visible:ring-secondary/50",
      danger: "group-data-selected:border-danger group-data-focus-visible:ring-danger/50",
      success: "group-data-selected:border-success group-data-focus-visible:ring-success/50",
      warning: "group-data-selected:border-warning group-data-focus-visible:ring-warning/50",
    },
    size: {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    },
  },
})

const innerDotVariantClasses = tv({
  variants: {
    variant: {
      primary: "bg-primary",
      secondary: "bg-secondary",
      danger: "bg-danger",
      success: "bg-success",
      warning: "bg-warning",
    },
    size: {
      sm: 'w-2 h-2',
      md: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
    },
  },
})
export function Radio({ variant = 'primary', size = 'md', label, description, className, ...props }: CustomRadioProps) {
  return (
    <AriaRadio
      {...props}
      className={cn(
        "group flex items-start gap-2.5 text-sm transition-colors outline-none",
        props.isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-90",
        className
      )}
    >
      <div className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
        radioMtClasses[size],
        "bg-white border-gray-300 shadow-sm",
        radioSizeClasses[size],
        "group-data-focus-visible:ring-2 group-data-focus-visible:ring-offset-1",
        "group-data-hovered:border-gray-400",

        // Variants for border

        variantClasses({ variant, size }),

        "group-data-invalid:border-danger"
      )}>
        {/* Inner Dot with scale animation */}
        <div className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block rounded-full transition-transform duration-200 scale-0 group-data-selected:scale-100",
          innerDotSizeClasses[size],
          innerDotVariantClasses({ variant, size }),
        )} />
      </div>
      {(label || props.children) && (
        <div className="flex flex-col">
          <span className="text-gray-900 group-data-disabled:text-gray-500 font-medium select-none">
            {label || props.children}
          </span>
          {description && (
            <Text slot="description" className="text-xs text-gray-500 mt-0.5">
              {description}
            </Text>
          )}
        </div>
      )}
    </AriaRadio>
  );
}

// === RADIO GROUP ===
export interface CustomRadioGroupProps extends Omit<RadioGroupProps, 'children'> {
  label?: string;
  description?: string;
  errorMessage?: string;
  children: React.ReactNode;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export function RadioGroup({ label, description, errorMessage, children, orientation = 'vertical', className, ...props }: CustomRadioGroupProps) {
  return (
    <AriaRadioGroup {...props} className={cn("flex flex-col gap-2", className)}>
      {label && <Label className="text-sm font-semibold text-gray-800">{label}</Label>}
      <div className={cn("flex", orientation === 'horizontal' ? "flex-row gap-5 flex-wrap" : "flex-col gap-3")}>
        {children}
      </div>
      {description && <Text slot="description" className="text-xs text-gray-500">{description}</Text>}
      {errorMessage && <Text slot="errorMessage" className="text-xs text-danger font-medium">{errorMessage}</Text>}
    </AriaRadioGroup>
  );
}

export default { Radio, RadioGroup };
