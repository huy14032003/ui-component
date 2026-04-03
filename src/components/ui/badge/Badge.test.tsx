import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders with default variant', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { container } = render(<Badge variant="danger">Error</Badge>);
    expect(container.firstChild).toHaveClass('bg-danger');
  });

  it('renders pulse indicator', () => {
    render(<Badge pulse>Live</Badge>);
    expect(screen.getByText('Live')).toBeInTheDocument();
    // Pulse creates nested spans with animate-ping
    const badge = screen.getByText('Live').closest('span');
    expect(badge?.querySelector('.animate-ping')).toBeInTheDocument();
  });

  it('applies size variants', () => {
    const { container } = render(<Badge size="lg">Large</Badge>);
    expect(container.firstChild).toHaveClass('text-sm');
  });
});
