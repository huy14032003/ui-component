import React from 'react';
import { ProgressBar as AriaProgressBar, type ProgressBarProps } from 'react-aria-components';
import { cn } from '@lib/utils/cn';
import { tv } from 'tailwind-variants';

export interface CustomProgressRingProps extends ProgressBarProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  showValueLabel?: boolean;
}

const ringVariantClasses = tv({
  base: 'fill-none transition-all duration-300 ease-in-out',
  variants: {
    variant: {
      primary: 'stroke-primary',
      secondary: 'stroke-secondary',
      danger: 'stroke-danger',
      success: 'stroke-success',
      warning: 'stroke-warning',
    },
    isIndeterminate: {
      true: 'animate-[progress-ring-indeterminate_1.5s_ease-in-out_infinite]',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    isIndeterminate: false,
  },
});

const ringSizeMap = {
  sm: { size: 32, strokeWidth: 3, textSize: 'text-[10px]' },
  md: { size: 48, strokeWidth: 4, textSize: 'text-xs' },
  lg: { size: 64, strokeWidth: 5, textSize: 'text-sm' },
};

export function ProgressRing({
  variant = 'primary',
  size = 'md',
  showValueLabel = false,
  className,
  ...props
}: CustomProgressRingProps) {
  const { size: svgSize, strokeWidth, textSize } = ringSizeMap[size];
  const center = svgSize / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  return (
    <AriaProgressBar {...props} aria-label={props['aria-label'] || "Progress Ring"} className={cn("relative flex items-center justify-center", className)}>
      {({ percentage, isIndeterminate }) => {
        const offset = isIndeterminate ? 0 : circumference - ((percentage || 0) / 100) * circumference;
        
        return (
          <>
            <svg
              width={svgSize}
              height={svgSize}
              viewBox={`0 0 ${svgSize} ${svgSize}`}
              className={cn("transform -rotate-90", isIndeterminate ? "animate-[spin_1.5s_linear_infinite]" : "")}
            >
              <circle
                cx={center}
                cy={center}
                r={radius}
                className="stroke-gray-200 fill-none"
                strokeWidth={strokeWidth}
              />
              <circle
                cx={center}
                cy={center}
                r={radius}
                className={cn(
                  "fill-none transition-all duration-300 ease-in-out",
                  ringVariantClasses({ variant, isIndeterminate }),
                  isIndeterminate ? "animate-[progress-ring-indeterminate_1.5s_ease-in-out_infinite]" : ""
                )}
                strokeWidth={strokeWidth}
                strokeDasharray={isIndeterminate ? `${circumference * 0.7} ${circumference}` : circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            {showValueLabel && !isIndeterminate && (
              <span className={cn("absolute font-semibold text-gray-700 select-none", textSize)}>
                {Math.round(percentage || 0)}%
              </span>
            )}
            {/* For accessibility to announce value text if needed */}
            <span className="sr-only">
               {isIndeterminate ? 'Loading...' : `${Math.round(percentage || 0)}%`}
            </span>
          </>
        );
      }}
    </AriaProgressBar>
  );
}
