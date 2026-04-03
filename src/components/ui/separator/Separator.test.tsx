import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Separator } from './Separator';

describe('Separator', () => {
  it('renders with role="none" when decorative (default)', () => {
    render(<Separator data-testid="sep" />);
    expect(screen.getByTestId('sep')).toHaveAttribute('role', 'none');
  });

  it('renders with role="separator" when not decorative', () => {
    render(<Separator decorative={false} data-testid="sep" />);
    expect(screen.getByTestId('sep')).toHaveAttribute('role', 'separator');
  });

  it('sets aria-orientation when not decorative', () => {
    render(<Separator decorative={false} orientation="vertical" data-testid="sep" />);
    const el = screen.getByTestId('sep');
    expect(el).toHaveAttribute('role', 'separator');
    expect(el).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('does not set aria-orientation when decorative', () => {
    render(<Separator orientation="vertical" data-testid="sep" />);
    expect(screen.getByTestId('sep')).not.toHaveAttribute('aria-orientation');
  });
});
