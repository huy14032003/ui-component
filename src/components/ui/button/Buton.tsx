import { cn } from "@lib/utils/cn";
import Spinner from "../spinner/Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantClass = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  danger: "bg-destructive text-destructive-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
};

const sizeClass = {
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  className,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-busy={isLoading}
      className={cn(
        "rounded transition-all  hover:opacity-70",
        variantClass[variant],
        sizeClass[size],
        isDisabled && "opacity-70 cursor-not-allowed",
        className
      )}
      {...props}
    >

      <div className={cn("flex items-center justify-center gap-2")}>
        {isLoading && iconPosition === 'left' ? <Spinner variant='circle' size={size} /> : icon && iconPosition === 'left' && icon}
        {children}
        {isLoading && iconPosition === 'right' ? <Spinner variant='circle' size={size} /> : icon && iconPosition === 'right' && icon}
      </div>
    </button>
  );
};