import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const aspectRatioVariants = tv({
  base: 'relative w-full overflow-hidden',
});

/** Props for the AspectRatio component */
export interface AspectRatioProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aspectRatioVariants> {
  /** Width-to-height ratio (e.g. 16/9, 4/3, 1) */
  ratio?: number;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = 1, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={aspectRatioVariants({ className })}
      style={{ paddingBottom: `${(1 / ratio) * 100}%`, ...style }}
      {...props}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  )
);
AspectRatio.displayName = 'AspectRatio';

export { AspectRatio, aspectRatioVariants };
