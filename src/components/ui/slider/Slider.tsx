import { Slider as AriaSlider, SliderOutput, SliderThumb, SliderTrack, Label, type SliderProps } from 'react-aria-components';
import { cn } from '@lib/utils/cn';
import { tv } from 'tailwind-variants';

export interface CustomSliderProps<T extends number | number[]> extends SliderProps<T> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  label?: string;
  showValueLabel?: boolean;
  typeSlider?: 'default' | 'point';
}

const sliderVariants = tv({
  slots: {
    trackFill: '',
    thumb: 'relative rounded-full border-2 shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2 outline-none transition-colors',
    arrow: 'absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-8',
  },
  variants: {
    variant: {
      primary: {
        trackFill: 'bg-primary group-data-[disabled]:bg-gray-300',
        thumb: 'bg-primary border-primary outline-primary/50 group-data-[dragging]:bg-primary-dark group-data-[disabled]:bg-gray-400 group-data-[disabled]:border-gray-400',
        arrow: 'border-t-primary'
      },
      secondary: {
        trackFill: 'bg-secondary group-data-[disabled]:bg-gray-300',
        thumb: 'bg-secondary border-secondary outline-secondary/50 group-data-[dragging]:bg-secondary-dark group-data-[disabled]:bg-gray-400 group-data-[disabled]:border-gray-400',
        arrow: 'border-t-secondary'
      },
      danger: {
        trackFill: 'bg-danger group-data-[disabled]:bg-gray-300',
        thumb: 'bg-danger border-danger outline-danger/50 group-data-[dragging]:bg-danger-dark group-data-[disabled]:bg-gray-400 group-data-[disabled]:border-gray-400',
        arrow: 'border-t-danger'
      },
      success: {
        trackFill: 'bg-success group-data-[disabled]:bg-gray-300',
        thumb: 'bg-success border-success outline-success/50 group-data-[dragging]:bg-success-dark group-data-[disabled]:bg-gray-400 group-data-[disabled]:border-gray-400',
        arrow: 'border-t-success'
      },
      warning: {
        trackFill: 'bg-warning group-data-[disabled]:bg-gray-300',
        thumb: 'bg-warning border-warning outline-warning/50 group-data-[dragging]:bg-warning-dark group-data-[disabled]:bg-gray-400 group-data-[disabled]:border-gray-400',
        arrow: 'border-t-warning'
      }
    },
    typeSlider: {
      default: {
        thumb: 'w-3 h-3 top-3'
      },
      point: {
        thumb: 'w-3 h-3 -top-1'
      }
    },
    isDisabled: {
      true: {
        arrow: 'border-t-gray-400'
      }
    }
  }
});

export function Slider<T extends number | number[]>({
  variant = 'primary',
  label,
  showValueLabel = true,
  className,
  typeSlider = 'default',
  ...props
}: CustomSliderProps<T>) {
  const { trackFill, thumb, arrow } = sliderVariants({ 
    variant, 
    typeSlider, 
    isDisabled: props.isDisabled 
  });

  return (
    <AriaSlider
      {...props}
      aria-label={props['aria-label'] || label || "Slider"}
      className={cn(
        'group flex flex-col gap-2 w-full touch-none',
        className
      )}
    >
      {(label || showValueLabel) && (
        <div className="flex justify-between items-center text-sm font-medium">
          {label && <Label className="text-gray-700 group-data-disabled:text-gray-400">{label}</Label>}
          {showValueLabel && <SliderOutput className="text-gray-600 group-data-disabled:text-gray-400" />}
        </div>
      )}

      <SliderTrack className="relative w-full h-6 flex items-center cursor-pointer group-data-disabled:cursor-default">
        {({ state }) => (
          <>
            {/* Background Track */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 rounded-full bg-gray-200" />

            {/* Fill Track */}
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 h-1 rounded-full transition-colors",
                trackFill()
              )}
              style={{ width: state.getThumbPercent(0) * 100 + '%' }}
            />

            {/* Thumb */}
            <SliderThumb className={thumb()}>
              {/* Downward Arrow */}
              {typeSlider === 'point' && <div className={arrow()} />}
            </SliderThumb>
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  );
}
