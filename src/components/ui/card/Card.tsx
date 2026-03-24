import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@lib/utils/cn';

const card = tv({
  slots: {
    base: 'rounded-2xl flex flex-col overflow-hidden transition-all duration-200 font-sans',
    header: 'p-6 flex flex-col gap-1.5',
    title: 'text-xl font-bold text-neutral-800 dark:text-neutral-100 leading-none tracking-tight',
    description: 'text-sm text-neutral-500 dark:text-neutral-400',
    content: 'p-6 pt-0',
    footer: 'p-6 pt-0 flex items-center',
  },
  variants: {
    variant: {
      elevated: {
        base: 'bg-white dark:bg-neutral-900 shadow-xl shadow-black/5 border border-neutral-200 dark:border-neutral-800',
      },
      bordered: {
        base: 'bg-transparent border-2 border-neutral-200 dark:border-neutral-800',
      },
      flat: {
        base: 'bg-neutral-100 dark:bg-neutral-800 border-none',
      },
      ghost: {
        base: 'bg-transparent border-none shadow-none',
      },
    },
    isHoverable: {
      true: {
        base: 'hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-black/10 transition-transform cursor-pointer',
      },
    },
    isPressable: {
      true: {
        base: 'active:scale-[0.98] cursor-pointer',
      },
    },
    fullWidth: {
      true: {
        base: 'w-full',
      },
    },
  },
  defaultVariants: {
    variant: 'elevated',
  },
});

type CardVariants = VariantProps<typeof card>;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, CardVariants {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, isHoverable, isPressable, fullWidth, ...props }, ref) => {
    const { base } = card({ variant, isHoverable, isPressable, fullWidth });
    return <div ref={ref} className={base({ className })} {...props} />;
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { header } = card();
    return <div ref={ref} className={header({ className })} {...props} />;
  }
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    const { title } = card();
    return <h3 ref={ref} className={title({ className })} {...props} />;
  }
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { description } = card();
    return <p ref={ref} className={description({ className })} {...props} />;
  }
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { content } = card();
    return <div ref={ref} className={content({ className })} {...props} />;
  }
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { footer } = card();
    return <div ref={ref} className={footer({ className })} {...props} />;
  }
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
