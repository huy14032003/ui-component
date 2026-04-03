import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders fallback text when no src', () => {
    render(<Avatar fallback="JD" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="John" />);
    expect(screen.getByAltText('John')).toBeInTheDocument();
  });

  it('shows fallback on image error', () => {
    render(<Avatar src="invalid.jpg" alt="John" fallback="JD" />);
    const img = screen.getByAltText('John');
    fireEvent.error(img);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('generates fallback from alt when no fallback prop', () => {
    render(<Avatar alt="John Doe" />);
    expect(screen.getByText('Jo')).toBeInTheDocument();
  });

  it('applies size variants', () => {
    const { container } = render(<Avatar size="xl" fallback="A" />);
    expect(container.firstChild).toHaveClass('h-16', 'w-16');
  });
});
