import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components'
import React from 'react'
import { cn } from '@lib/utils/cn'
import Spinner from '../spinner/Spinner'
import { tv } from 'tailwind-variants';

interface ButtonProps extends AriaButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'outline' | 'outlineDanger' | 'outlineSuccess' | 'outlineWarning' | 'outlinePrimary' | 'outlineSecondary' | 'dashed' | 'dashedDanger' | 'dashedSuccess' | 'dashedWarning' | 'dashedPrimary' | 'dashedSecondary' | 'ghost' | 'ghostDanger' | 'ghostSuccess' | 'ghostWarning' | 'ghostPrimary' | 'ghostSecondary'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const buttonStyles = tv({
  base: 'inline-flex items-center justify-center rounded transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
  variants: {
    intent: {
      solid: 'text-white hover:opacity-80',
      ghost: 'bg-transparent hover:bg-opacity-10',
      outline: 'border hover:bg-opacity-5',
      dashed: 'border border-dashed hover:bg-opacity-5',
    },
    color: {
      primary: ' text-primary-foreground border-primary',
      secondary: ' text-secondary-foreground border-secondary',
      danger: ' text-danger-foreground border-danger',
      success: ' text-success-foreground border-success',
      warning: ' text-warning-foreground border-warning',
    },
    size: {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-5 py-2.5 text-base',
    },
  },
  // Đây là phần "ảo thuật" để xử lý các case ghostPrimary, outlineDanger...
  compoundVariants: [
    // Ghost variants — dùng CSS variable
    { intent: 'ghost', color: 'primary',   class: 'text-primary   hover:bg-primary/10' },
    { intent: 'ghost', color: 'danger',    class: 'text-danger    hover:bg-danger/10' },
    { intent: 'ghost', color: 'success',   class: 'text-success   hover:bg-success/10' },
    { intent: 'ghost', color: 'warning',   class: 'text-warning   hover:bg-warning/10' },
    { intent: 'ghost', color: 'secondary', class: 'text-secondary hover:bg-secondary/10' },
    // Outline variants
    { intent: 'outline', color: 'primary',   class: 'border-primary/40   text-primary   hover:bg-primary/5' },
    { intent: 'outline', color: 'danger',    class: 'border-danger/40    text-danger    hover:bg-danger/5' },
    { intent: 'outline', color: 'success',   class: 'border-success/40   text-success   hover:bg-success/5' },
    { intent: 'outline', color: 'warning',   class: 'border-warning/40   text-warning   hover:bg-warning/5' },
    { intent: 'outline', color: 'secondary', class: 'border-secondary/40 text-secondary hover:bg-secondary/5' },
    // Dashed variants
    { intent: 'dashed', color: 'primary',   class: 'border-primary/40   text-primary   hover:bg-primary/5' },
    { intent: 'dashed', color: 'danger',    class: 'border-danger/40    text-danger    hover:bg-danger/5' },
    { intent: 'dashed', color: 'success',   class: 'border-success/40   text-success   hover:bg-success/5' },
    { intent: 'dashed', color: 'warning',   class: 'border-warning/40   text-warning   hover:bg-warning/5' },
    { intent: 'dashed', color: 'secondary', class: 'border-secondary/40 text-secondary hover:bg-secondary/5' },
    // Solid variants
    { intent: 'solid', color: 'primary',   class: 'bg-primary   text-primary-foreground' },
    { intent: 'solid', color: 'danger',    class: 'bg-danger    text-danger-foreground' },
    { intent: 'solid', color: 'success',   class: 'bg-success   text-success-foreground' },
    { intent: 'solid', color: 'warning',   class: 'bg-warning   text-warning-foreground' },
    { intent: 'solid', color: 'secondary', class: 'bg-secondary text-secondary-foreground' },
  ],
  defaultVariants: {
    intent: 'solid',
    color: 'primary',
    size: 'md',
  },
});

type ButtonIntent = 'solid' | 'ghost' | 'outline' | 'dashed';
type ButtonColor = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';

const getVariantProps = (variant: NonNullable<ButtonProps['variant']>): { intent: ButtonIntent; color: ButtonColor } => {
  if (variant.startsWith('outline')) {
    return { intent: 'outline', color: (variant.replace('outline', '').toLowerCase() || 'primary') as ButtonColor };
  }
  if (variant.startsWith('dashed')) {
    return { intent: 'dashed', color: (variant.replace('dashed', '').toLowerCase() || 'primary') as ButtonColor };
  }
  if (variant.startsWith('ghost')) {
    return { intent: 'ghost', color: (variant.replace('ghost', '').toLowerCase() || 'primary') as ButtonColor };
  }
  return { intent: 'solid', color: variant as ButtonColor };
};

const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading,
  icon,
  iconPosition = 'left',
  className,
  children,
  isDisabled,
  ...props
}: ButtonProps) => {
  const { intent, color } = getVariantProps(variant);

  return (
    <AriaButton
      aria-label={props['aria-label'] || (typeof children === 'string' ? children : undefined) || "Button"}
      isDisabled={isDisabled || isLoading}
      className={(values) =>
        buttonStyles({
          intent,
          color,
          size,
          className: typeof className === 'function' ? className(values) : className
        })
      }
      {...props}
    >
      <>
        {isLoading && iconPosition === 'left' ? <Spinner variant='circle' size={size} /> : icon && iconPosition === 'left' && icon}
        {children}
        {isLoading && iconPosition === 'right' ? <Spinner variant='circle' size={size} /> : icon && iconPosition === 'right' && icon}
      </>
    </AriaButton>
  )
}

export default Button