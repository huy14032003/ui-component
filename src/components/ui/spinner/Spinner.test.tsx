import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with role="status"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has screen reader text', () => {
    render(<Spinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('applies size variants', () => {
    const { container } = render(<Spinner size="xl" />);
    expect(container.firstChild).toHaveClass('h-12', 'w-12');
  });

  it('applies variant classes', () => {
    const { container } = render(<Spinner variant="muted" />);
    expect(container.firstChild).toHaveClass('text-muted-foreground');
  });
});
