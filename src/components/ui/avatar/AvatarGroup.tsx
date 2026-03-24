import React from 'react';
import { cn } from '@lib/utils/cn';
import Avatar, { type AvatarProps } from './Avatar';
import { type VariantProps } from 'tailwind-variants';
import { avatarStyles } from './Avatar';

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarStyles> {
    max?: number;
    children: React.ReactNode;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
    ({ max = 3, size = 'md', shape = 'circle', className, children, ...props }, ref) => {
        const childrenArray = React.Children.toArray(children).filter(React.isValidElement);
        const totalAvatars = childrenArray.length;
        const visibleAvatars = childrenArray.slice(0, max);
        const overflowCount = totalAvatars - max;

        return (
            <div
                ref={ref}
                className={cn('flex items-center -space-x-3', className)}
                {...props}
            >
                {visibleAvatars.map((childNode, index) => {
                    const child = childNode as React.ReactElement<AvatarProps>;
                    // Inject bordered=true and size/shape props to children so they overlap nicely
                    return React.cloneElement(child, {
                        key: index,
                        size: child.props.size || size,
                        shape: child.props.shape || shape,
                        bordered: child.props.bordered !== undefined ? child.props.bordered : true,
                        className: cn('relative z-0 hover:z-10 transition-transform', child.props.className),
                    });
                })}

                {overflowCount > 0 && (
                    <Avatar
                        size={size}
                        shape={shape}
                        bordered={true}
                        className="bg-gray-200 text-gray-600 font-semibold relative z-0 hover:z-10 transition-transform"
                        fallback={`+${overflowCount}`}
                    />
                )}
            </div>
        );
    }
);

AvatarGroup.displayName = 'AvatarGroup';

export default AvatarGroup;
