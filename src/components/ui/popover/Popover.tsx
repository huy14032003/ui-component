import * as React from 'react';
import { Popover as BasePopover } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@lib/utils/cn';

const popoverVariants = tv({
  slots: {
    popup: 'z-50 w-72 rounded-md border border-border bg-background p-4 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-side-bottom:slide-in-from-top-2 data-side-left:slide-in-from-right-2 data-side-right:slide-in-from-left-2 data-side-top:slide-in-from-bottom-2',
    arrow: 'fill-popover stroke-border stroke-[1px]',
  }
});

const { popup, arrow } = popoverVariants();

export interface PopoverProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Root> {
    trigger: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}

const Popover = ({ trigger, children, className, ...props }: PopoverProps) => {
  return (
    <BasePopover.Root {...props}>
      <BasePopover.Trigger render={<div className="inline-block">{trigger}</div>} />
      <BasePopover.Portal>
        <BasePopover.Positioner sideOffset={4}>
          <BasePopover.Popup className={popup({ className })}>
            <BasePopover.Arrow className={arrow()} />
            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}

export { Popover };
