import React from 'react';
import { cn } from '@lib/utils/cn';

export interface TimelineProps extends React.HTMLAttributes<HTMLUListElement> {
    children: React.ReactNode;
    direction?: 'vertical' | 'horizontal';
}

const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>(
    ({ className, children, direction = 'vertical', ...props }, ref) => {
        // Wrap each child to pass an isLast prop, so the last item doesn't render the connecting line
        const items = React.Children.toArray(children).filter(React.isValidElement);

        return (
            <ul 
                ref={ref} 
                className={cn(
                    'm-0 p-0 list-none text-sm', 
                    direction === 'horizontal' ? 'flex flex-row overflow-x-auto w-full' : '',
                    className
                )} 
                {...props}
            >
                {items.map((child, index) => {
                    return React.cloneElement(child as React.ReactElement<any>, {
                        isLast: index === items.length - 1,
                        direction,
                    });
                })}
            </ul>
        );
    }
);

Timeline.displayName = 'Timeline';

export default Timeline;
