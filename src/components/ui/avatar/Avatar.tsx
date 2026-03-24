import React, { useState } from 'react';
import { cn } from '@lib/utils/cn';
import { tv, type VariantProps } from 'tailwind-variants';
import { User } from 'lucide-react';

export const avatarStyles = tv({
    base: 'relative inline-flex items-center justify-center shrink-0 overflow-hidden bg-gray-100 text-gray-500 font-medium select-none',
    variants: {
        size: {
            sm: 'w-8 h-8 text-xs',
            md: 'w-10 h-10 text-sm',
            lg: 'w-12 h-12 text-base',
            xl: 'w-16 h-16 text-lg',
        },
        shape: {
            circle: 'rounded-full',
            square: 'rounded-lg',
        },
        bordered: {
            true: 'ring-2 ring-white',
        }
    },
    defaultVariants: {
        size: 'md',
        shape: 'circle',
        bordered: false,
    },
});

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarStyles> {
    src?: string;
    alt?: string;
    fallback?: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ src, alt, size, shape, bordered, fallback, className, ...props }, ref) => {
        const [hasError, setHasError] = useState(false);

        return (
            <div
                ref={ref}
                className={avatarStyles({ size, shape, bordered, className })}
                {...props}
            >
                {src && !hasError ? (
                    <img
                        src={src}
                        alt={alt || 'Avatar'}
                        className="w-full h-full object-cover"
                        onError={() => setHasError(true)}
                    />
                ) : (
                    fallback || <User className={cn(
                        "text-gray-400",
                        size === 'sm' && "w-4 h-4",
                        size === 'md' && "w-5 h-5",
                        size === 'lg' && "w-6 h-6",
                        size === 'xl' && "w-8 h-8"
                    )} />
                )}
            </div>
        );
    }
);

Avatar.displayName = 'Avatar';

export default Avatar;
