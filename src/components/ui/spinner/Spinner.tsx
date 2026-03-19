import React from 'react'
import * as Icons from '@components/icons'
import { cn } from '@lib/utils/cn';
type SpinnerVariant = 'circle' | 'dots' | 'pulse' | 'bars';

interface SpinnerProps {
  variant?: SpinnerVariant;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}
const Spinner = ({ variant = 'circle', size = 'md', className }: SpinnerProps) => {
    const sizeClasses = {
        xs: "w-1 h-1",
        sm: "w-2 h-2",
        md: "w-4 h-4",
        lg: "w-6 h-6",
    };
    const variantClasses = {
        circle: "animate-spin",
        dots: "animate-pulse",
        pulse: "animate-pulse",
        bars: "animate-pulse",
    };
    const sizeClass = sizeClasses[size];
    const variantClass = variantClasses[variant];
    if(variant === 'circle'){
        return (
            <Icons.Loader2 className={cn(sizeClass, variantClass, className)} />
        )
    }
  
}

export default Spinner