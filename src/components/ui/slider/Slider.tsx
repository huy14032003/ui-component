import * as React from 'react';
import { Slider as BaseSlider } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@/lib/utils/cn';

const sliderVariants = tv({
  slots: {
    root: 'relative flex w-full touch-none select-none items-center py-4 data-disabled:opacity-50 data-disabled:cursor-not-allowed',
    control: 'relative flex w-full items-center', 
    track: 'relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary data-disabled:bg-muted',
    indicator: 'absolute h-full bg-primary data-disabled:bg-muted-foreground/30',
    thumb: 'block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 data-disabled:border-muted-foreground data-disabled:bg-muted data-disabled:pointer-events-none',
  }
});

const { root, control, track, indicator, thumb } = sliderVariants();

/** Props for the Slider component */
export interface SliderProps extends React.ComponentPropsWithoutRef<typeof BaseSlider.Root> {
    className?: string;
}

const Slider = React.forwardRef<React.ElementRef<typeof BaseSlider.Root>, SliderProps>(
  ({ className, ...props }, ref) => (
    <BaseSlider.Root
      ref={ref}
      className={root({ className })}
      aria-label={props['aria-label'] ?? 'Slider'}
      {...props}
    >
      {/* 1. Thêm BaseSlider.Control bọc ngoài */}
      <BaseSlider.Control className={control()}>
        
        <BaseSlider.Track className={track()}>
          <BaseSlider.Indicator className={indicator()} />
        </BaseSlider.Track>

        {/* 2. Đưa Thumb ra ngoài Track, đứng ngang hàng */}
        <BaseSlider.Thumb className={thumb()} />
        
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
)
Slider.displayName = 'Slider';

export { Slider };