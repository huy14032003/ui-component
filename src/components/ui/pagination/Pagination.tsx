import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const paginationVariants = tv({
  slots: {
    nav: 'mx-auto flex w-full justify-center',
    list: 'flex flex-row items-center gap-1',
    item: '',
    link: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer hover:bg-accent hover:text-accent-foreground h-10 w-10',
    ellipsis: 'flex h-10 w-10 items-center justify-center',
  },
  variants: {
    active: {
      true: { link: 'border border-border bg-background shadow-sm' },
      false: {},
    },
    size: {
      sm: { link: 'h-8 w-8 text-xs' },
      md: { link: 'h-10 w-10 text-sm' },
      lg: { link: 'h-12 w-12 text-base' },
    },
  },
  defaultVariants: {
    active: false,
    size: 'md',
  },
});

/* ─── Root ──────────────────────────────────────────────────────────── */

export interface PaginationProps extends React.ComponentPropsWithoutRef<'nav'> {}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, ...props }, ref) => {
    const { nav } = paginationVariants();
    return <nav ref={ref} role="navigation" aria-label="pagination" className={nav({ className })} {...props} />;
  }
);
Pagination.displayName = 'Pagination';

/* ─── Content ───────────────────────────────────────────────────────── */

export interface PaginationContentProps extends React.ComponentPropsWithoutRef<'ul'> {}

const PaginationContent = React.forwardRef<HTMLUListElement, PaginationContentProps>(
  ({ className, ...props }, ref) => {
    const { list } = paginationVariants();
    return <ul ref={ref} className={list({ className })} {...props} />;
  }
);
PaginationContent.displayName = 'PaginationContent';

/* ─── Item ──────────────────────────────────────────────────────────── */

export interface PaginationItemProps extends React.ComponentPropsWithoutRef<'li'> {}

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => {
    const { item } = paginationVariants();
    return <li ref={ref} className={item({ className })} {...props} />;
  }
);
PaginationItem.displayName = 'PaginationItem';

/* ─── Link ──────────────────────────────────────────────────────────── */

/** Props for the PaginationLink component */
export interface PaginationLinkProps
  extends React.ComponentPropsWithoutRef<'button'>,
    Pick<VariantProps<typeof paginationVariants>, 'size'> {
  /** Whether this link represents the current page */
  isActive?: boolean;
}

const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ className, isActive, size, ...props }, ref) => {
    const { link } = paginationVariants({ active: isActive, size });
    return (
      <button
        ref={ref}
        aria-current={isActive ? 'page' : undefined}
        className={link({ className })}
        {...props}
      />
    );
  }
);
PaginationLink.displayName = 'PaginationLink';

/* ─── Previous ──────────────────────────────────────────────────────── */

/** Props for the PaginationPrevious component */
export interface PaginationPreviousProps extends React.ComponentPropsWithoutRef<'button'> {
  /** Optional text label displayed next to the chevron icon */
  label?: string;
}

const PaginationPrevious = React.forwardRef<HTMLButtonElement, PaginationPreviousProps>(
  ({ className, label, ...props }, ref) => {
    const { link } = paginationVariants();
    return (
      <button
        ref={ref}
        aria-label="Go to previous page"
        className={link({ className: `gap-1 ${label ? 'pl-2.5 w-auto px-4' : ''} ${className ?? ''}` })}
        {...props}
      >
        <ChevronLeft className="h-4 w-4" />
        {label && <span>{label}</span>}
      </button>
    );
  }
);
PaginationPrevious.displayName = 'PaginationPrevious';

/* ─── Next ──────────────────────────────────────────────────────────── */

/** Props for the PaginationNext component */
export interface PaginationNextProps extends React.ComponentPropsWithoutRef<'button'> {
  /** Optional text label displayed next to the chevron icon */
  label?: string;
}

const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationNextProps>(
  ({ className, label, ...props }, ref) => {
    const { link } = paginationVariants();
    return (
      <button
        ref={ref}
        aria-label="Go to next page"
        className={link({ className: `gap-1 ${label ? 'pr-2.5 w-auto px-4' : ''} ${className ?? ''}` })}
        {...props}
      >
        {label && <span>{label}</span>}
        <ChevronRight className="h-4 w-4" />
      </button>
    );
  }
);
PaginationNext.displayName = 'PaginationNext';

/* ─── Ellipsis ──────────────────────────────────────────────────────── */

export interface PaginationEllipsisProps extends React.ComponentPropsWithoutRef<'span'> {}

const PaginationEllipsis = React.forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  ({ className, ...props }, ref) => {
    const { ellipsis } = paginationVariants();
    return (
      <span ref={ref} aria-hidden className={ellipsis({ className })} {...props}>
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">More pages</span>
      </span>
    );
  }
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  paginationVariants,
};
