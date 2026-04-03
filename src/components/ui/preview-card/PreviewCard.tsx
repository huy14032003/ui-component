import * as React from 'react';
import { Popover as BasePopover } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';
import { Button } from '../button/Button';

const previewCardVariants = tv({
  slots: {
    popup: [
      'z-50 w-72 rounded-xl border border-border bg-background shadow-xl outline-none',
      'data-starting:animate-in data-ending:animate-out',
      'data-ending:fade-out-0 data-starting:fade-in-0',
      'data-ending:zoom-out-95 data-starting:zoom-in-95',
      'data-side-bottom:slide-in-from-top-2',
      'data-side-left:slide-in-from-right-2',
      'data-side-right:slide-in-from-left-2',
      'data-side-top:slide-in-from-bottom-2',
    ],
    cover: 'w-full overflow-hidden rounded-t-xl',
    body: 'p-4 space-y-2',
    title: 'font-semibold text-sm text-foreground leading-tight',
    description: 'text-xs text-muted-foreground leading-relaxed',
    footer: 'px-4 pb-4 pt-0 border-t border-border/50 mt-2 pt-3',
  },
});

export type PreviewCardSide = 'top' | 'right' | 'bottom' | 'left';
export type PreviewCardAlign = 'start' | 'center' | 'end';

/** Props for the PreviewCard component */
export interface PreviewCardProps {
  /** Element that triggers the preview card */
  trigger: React.ReactNode;
  /** Title text displayed in the card body */
  title?: string;
  /** Description text displayed below the title */
  description?: string;
  /** URL for the cover image at the top of the card */
  coverImage?: string;
  /** Alt text for the cover image */
  coverAlt?: string;
  /** Height in px of the cover image area */
  coverHeight?: number;
  children?: React.ReactNode;
  /** Content rendered in the card footer section */
  footerContent?: React.ReactNode;
  /** Which side of the trigger to render the card */
  side?: PreviewCardSide;
  /** Alignment relative to the trigger */
  align?: PreviewCardAlign;
  /** Distance in px between the trigger and the card */
  sideOffset?: number;
  /** Open the card on hover instead of click */
  openOnHover?: boolean;
  /** Width of the card in px */
  width?: number;
  className?: string;
}

const PreviewCard = React.forwardRef<HTMLSpanElement, PreviewCardProps>(({
  trigger,
  title,
  description,
  coverImage,
  coverAlt = '',
  coverHeight = 120,
  children,
  footerContent,
  side = 'bottom',
  align = 'start',
  sideOffset = 8,
  openOnHover = false,
  width = 288,
  className,
}, ref) => {
  const [open, setOpen] = React.useState(false);
  const slots = previewCardVariants();

  const triggerProps = openOnHover
    ? {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
      }
    : {};

  return (
    <BasePopover.Root open={open} onOpenChange={setOpen}>
      <BasePopover.Trigger
        nativeButton={false}
        render={
          <span
            ref={ref}
            className="inline-block cursor-pointer"
            {...triggerProps}
          >
            {trigger}
          </span>
        }
      />
      <BasePopover.Portal>
        <BasePopover.Positioner side={side} align={align} sideOffset={sideOffset}>
          <BasePopover.Popup
            className={slots.popup({ className })}
            style={{ width }}
          >
            {coverImage && (
              <div className={slots.cover()} style={{ height: coverHeight }}>
                <img
                  src={coverImage}
                  alt={coverAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {(title || description || children) && (
              <div className={slots.body()}>
                {title && <p className={slots.title()}>{title}</p>}
                {description && <p className={slots.description()}>{description}</p>}
                {children}
              </div>
            )}
            {footerContent && (
              <div className={slots.footer()}>{footerContent}</div>
            )}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
});

PreviewCard.displayName = 'PreviewCard';

export { PreviewCard };
