import * as React from 'react';
import { Drawer, type DrawerProps } from '../drawer/Drawer';

/** Props for the Sheet component (alias for Drawer with side-panel defaults) */
export interface SheetProps extends DrawerProps {}

const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
  ({ direction = 'right', size = 'lg', ...props }, ref) => (
    <Drawer ref={ref} direction={direction} size={size} {...props} />
  )
);
Sheet.displayName = 'Sheet';

export { Sheet };
