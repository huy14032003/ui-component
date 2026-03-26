import React from 'react';
import { cn } from '@lib/utils/cn';
import { tv, type VariantProps } from 'tailwind-variants';

const dotStyles = tv({
    base: 'absolute w-3 h-3 rounded-full border-2 bg-white',
    variants: {
        color: {
            primary: 'border-primary text-primary',
            secondary: 'border-secondary text-secondary',
            danger: 'border-danger text-danger',
            success: 'border-success text-success!',
            warning: 'border-warning text-warning',
            gray: 'border-gray-400 text-gray-400',
        }
    },
    defaultVariants: {
        color: 'primary'
    }
});

const itemStyles = tv({
    base: 'relative flex-shrink-0',
    variants: {
        direction: {
            vertical: 'pb-4',
            horizontal: 'pr-4'
        }
    },
    defaultVariants: { direction: 'vertical' }
});

const lineStyles = tv({
    base: 'absolute bg-gray-200',
    variants: {
        direction: {
            vertical: 'left-[5px] top-4.5 bottom-0 w-[2px] h-full',
            horizontal: 'top-[11px] left-3 w-full h-[2px]'
        }
    },
    defaultVariants: { direction: 'vertical' }
});

const contentStyles = tv({
    base: 'text-gray-700',
    variants: {
        direction: {
            vertical: 'ml-6',
            horizontal: 'mt-6'
        }
    },
    defaultVariants: { direction: 'vertical' }
});

export interface TimelineItemProps extends React.HTMLAttributes<HTMLLIElement> {
    color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'gray';
    dot?: React.ReactNode;
    isLast?: boolean; // Injected by parent Timeline
    direction?: 'vertical' | 'horizontal'; // Injected by parent Timeline
    width?: string | number;
    height?: string | number;
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
    ({ className, color = 'primary', dot, isLast = false, direction = 'vertical', children, width, height, style: propsStyle, ...props }, ref) => {
        const itemStyle: React.CSSProperties = {
            ...propsStyle,
            ...(direction === 'horizontal' ? { width: width ?? (isLast ? 'auto' : 200) } : { minHeight: height ?? 60 })
        };

        return (
            <li ref={ref} className={itemStyles({ direction, className })} style={itemStyle} {...props}>
                {/* Connecting Line */}
                {!isLast && (
                    <div className={lineStyles({ direction })} />
                )}

                {/* Dot */}
                <div className="absolute left-0 top-1.5 flex items-center justify-center w-3 h-3">
                    {dot ? (
                        <div className=" relative z-10 bg-white inline-flex items-center justify-center">
                            {dot}
                        </div>
                    ) : (
                        <div className={cn(dotStyles({ color }), "left-0 top-0")} />
                    )}
                </div>

                {/* Content */}
                <div className={contentStyles({ direction })}>
                    {children}
                </div>
            </li>
        );
    }
);

TimelineItem.displayName = 'TimelineItem';

export default TimelineItem;
