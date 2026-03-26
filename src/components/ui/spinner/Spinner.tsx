import * as Icons from '@components/icons'
import { cn } from '@lib/utils/cn';
type SpinnerVariant = 'circle' | 'dots' | 'pulse' | 'bars';

interface SpinnerProps {
  variant?: SpinnerVariant;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}
const Spinner = ({ variant = 'circle', size = 'md', className, icon }: SpinnerProps) => {
    const sizeClasses = {
        xs: "w-2 h-2",
        sm: "w-3 h-3",
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
            icon ? (
                <div className={cn(sizeClass, variantClass, className)}>
                    {icon}
                </div>
            ) : (
                <Icons.Loader className={cn(sizeClass, variantClass, className)} />
            )
        )
    }
  
}

export default Spinner