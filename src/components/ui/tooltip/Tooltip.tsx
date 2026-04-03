import * as React from 'react';
import { Tooltip as BaseTooltip } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';

const tooltipVariants = tv({
  slots: {
    popup: 'z-50 overflow-hidden rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-side-bottom:slide-in-from-top-2 data-side-left:slide-in-from-right-2 data-side-right:slide-in-from-left-2 data-side-top:slide-in-from-bottom-2',
    arrow: 'fill-popover',
  }
});

const { popup, arrow } = tooltipVariants();

/** Props for the Tooltip component */
export interface TooltipProps extends React.ComponentPropsWithoutRef<typeof BaseTooltip.Root> {
  /** Content displayed inside the tooltip popup */
  content: React.ReactNode;
  children: React.ReactNode;
  /** Which side of the trigger to render the tooltip */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Alignment relative to the trigger */
  align?: 'start' | 'center' | 'end';
}

const Tooltip = React.forwardRef<React.ElementRef<typeof BaseTooltip.Root>, TooltipProps>(
  ({ children, content, side = 'top', align = 'center', ...props }, ref) => {
    return (
      <BaseTooltip.Root {...props}>
        <BaseTooltip.Trigger render={React.isValidElement(children) ? children : <span>{children}</span>} />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner side={side} align={align} sideOffset={4}>
            <BaseTooltip.Popup className={popup()} role="tooltip">
              <BaseTooltip.Arrow className={arrow()} />
              {content}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export { Tooltip };
