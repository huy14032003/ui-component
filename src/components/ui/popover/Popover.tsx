import React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '../../../lib/utils/cn'

/**
 * Popover Variants using tailwind-variants
 */
const popoverContentVariants = tv({
    base: 'relative z-50 min-w-[8rem] overflow-hidden rounded-lg bg-popover p-4 text-popover-foreground shadow-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    variants: {
        variant: {
            solid: 'border border-secondary/20 bg-background',
            glass: 'backdrop-blur-2xl bg-gradient-to-b from-neutral-950/40 to-white-900/20 border  border-white/10 text-white shadow-2xl',
        }
    },
    defaultVariants: {
        variant: 'solid'
    }
})

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverAnchor = PopoverPrimitive.Anchor
const PopoverClose = PopoverPrimitive.Close

interface PopoverContentProps
    extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
    VariantProps<typeof popoverContentVariants> { }

const PopoverContent = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    PopoverContentProps
>(({ className, variant, align = 'center', sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={cn(popoverContentVariants({ variant }), className)}
            {...props}
        />
    </PopoverPrimitive.Portal>
))

PopoverContent.displayName = PopoverPrimitive.Content.displayName

export {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverAnchor,
    PopoverClose,
    popoverContentVariants
}

export default Popover