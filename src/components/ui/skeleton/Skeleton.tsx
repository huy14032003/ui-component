import React from 'react';
import { cn } from '@lib/utils/cn';
import { tv, type VariantProps } from 'tailwind-variants';

const skeletonStyles = tv({
    base: 'animate-pulse bg-gray-200',
    variants: {
        variant: {
            text: 'rounded-md w-full h-4',
            circle: 'rounded-full',
            rect: 'rounded-lg w-full h-full',
        }
    },
    defaultVariants: {
        variant: 'text'
    }
});

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonStyles> {
    width?: string | number;
    height?: string | number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, variant, width, height, style, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={skeletonStyles({ variant, className })}
                style={{
                    width: width ?? style?.width,
                    height: height ?? style?.height,
                    ...style
                }}
                {...props}
            />
        );
    }
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
