import * as React from 'react';
import { tv } from 'tailwind-variants';
import { Check, Circle } from 'lucide-react';

const contextMenuVariants = tv({
  slots: {
    content:
      'fixed z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-background p-1 text-foreground shadow-md animate-in fade-in-0 zoom-in-95',
    item: 'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    checkboxItem:
      'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground',
    radioItem:
      'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground',
    label: 'px-2 py-1.5 text-sm font-semibold',
    separator: '-mx-1 my-1 h-px bg-border',
    shortcut: 'ml-auto text-xs tracking-widest opacity-60',
    indicatorWrapper: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
  },
});

const styles = contextMenuVariants();

/* ─── Context ───────────────────────────────────────────────────── */

interface ContextMenuState {
  open: boolean;
  position: { x: number; y: number };
}

const ContextMenuContext = React.createContext<{
  state: ContextMenuState;
  close: () => void;
}>({ state: { open: false, position: { x: 0, y: 0 } }, close: () => {} });

/* ─── Root ──────────────────────────────────────────────────────── */

/** Props for the ContextMenu root */
export interface ContextMenuProps {
  children: React.ReactNode;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ children }) => {
  const [state, setState] = React.useState<ContextMenuState>({
    open: false,
    position: { x: 0, y: 0 },
  });

  const close = React.useCallback(() => setState(s => ({ ...s, open: false })), []);

  React.useEffect(() => {
    if (state.open) {
      const handler = () => close();
      document.addEventListener('click', handler);
      document.addEventListener('contextmenu', handler);
      return () => {
        document.removeEventListener('click', handler);
        document.removeEventListener('contextmenu', handler);
      };
    }
  }, [state.open, close]);

  return (
    <ContextMenuContext.Provider value={{ state, close }}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === ContextMenuTrigger) {
          return React.cloneElement(child as React.ReactElement<{ onContextMenu?: (e: React.MouseEvent) => void }>, {
            onContextMenu: (e: React.MouseEvent) => {
              e.preventDefault();
              setState({ open: true, position: { x: e.clientX, y: e.clientY } });
            },
          });
        }
        return child;
      })}
    </ContextMenuContext.Provider>
  );
};
ContextMenu.displayName = 'ContextMenu';

/* ─── Trigger ───────────────────────────────────────────────────── */

export interface ContextMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuTrigger = React.forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>{children}</div>
  )
);
ContextMenuTrigger.displayName = 'ContextMenuTrigger';

/* ─── Content ───────────────────────────────────────────────────── */

/** Props for the ContextMenuContent component */
export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ className, ...props }, ref) => {
    const { state } = React.useContext(ContextMenuContext);
    if (!state.open) return null;
    return (
      <div
        ref={ref}
        className={styles.content({ className })}
        style={{ top: state.position.y, left: state.position.x }}
        role="menu"
        {...props}
      />
    );
  }
);
ContextMenuContent.displayName = 'ContextMenuContent';

/* ─── Item ──────────────────────────────────────────────────────── */

/** Props for the ContextMenuItem component */
export interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Add left padding to align with items that have icons */
  inset?: boolean;
  disabled?: boolean;
}

const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ className, inset, disabled, onClick, ...props }, ref) => {
    const { close } = React.useContext(ContextMenuContext);
    return (
      <div
        ref={ref}
        role="menuitem"
        className={styles.item({ className: `${inset ? 'pl-8' : ''} ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className ?? ''}` })}
        onClick={(e) => { onClick?.(e); close(); }}
        {...props}
      />
    );
  }
);
ContextMenuItem.displayName = 'ContextMenuItem';

/* ─── CheckboxItem ──────────────────────────────────────────────── */

export interface ContextMenuCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const ContextMenuCheckboxItem = React.forwardRef<HTMLDivElement, ContextMenuCheckboxItemProps>(
  ({ className, children, checked, onCheckedChange, ...props }, ref) => (
    <div
      ref={ref}
      role="menuitemcheckbox"
      aria-checked={checked}
      className={styles.checkboxItem({ className })}
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <span className={styles.indicatorWrapper()}>
        {checked && <Check className="h-4 w-4" />}
      </span>
      {children}
    </div>
  )
);
ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

/* ─── RadioGroup + RadioItem ────────────────────────────────────── */

const ContextMenuRadioContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

export interface ContextMenuRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const ContextMenuRadioGroup = React.forwardRef<HTMLDivElement, ContextMenuRadioGroupProps>(
  ({ value, onValueChange, ...props }, ref) => (
    <ContextMenuRadioContext.Provider value={{ value, onValueChange }}>
      <div ref={ref} role="group" {...props} />
    </ContextMenuRadioContext.Provider>
  )
);
ContextMenuRadioGroup.displayName = 'ContextMenuRadioGroup';

export interface ContextMenuRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const ContextMenuRadioItem = React.forwardRef<HTMLDivElement, ContextMenuRadioItemProps>(
  ({ className, children, value, ...props }, ref) => {
    const ctx = React.useContext(ContextMenuRadioContext);
    const isChecked = ctx.value === value;
    return (
      <div
        ref={ref}
        role="menuitemradio"
        aria-checked={isChecked}
        className={styles.radioItem({ className })}
        onClick={() => ctx.onValueChange?.(value)}
        {...props}
      >
        <span className={styles.indicatorWrapper()}>
          {isChecked && <Circle className="h-2 w-2 fill-current" />}
        </span>
        {children}
      </div>
    );
  }
);
ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';

/* ─── Label ─────────────────────────────────────────────────────── */

const ContextMenuLabel = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={styles.label({ className })} {...props} />
  )
);
ContextMenuLabel.displayName = 'ContextMenuLabel';

/* ─── Separator ─────────────────────────────────────────────────── */

const ContextMenuSeparator = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={styles.separator({ className })} {...props} />
  )
);
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

/* ─── Shortcut ──────────────────────────────────────────────────── */

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={styles.shortcut({ className })} {...props} />
);
ContextMenuShortcut.displayName = 'ContextMenuShortcut';

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  contextMenuVariants,
};
