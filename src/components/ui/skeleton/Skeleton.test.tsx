import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders with animate-pulse class', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('animate-pulse');
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="h-10 w-40" />);
    expect(container.firstChild).toHaveClass('h-10', 'w-40');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
