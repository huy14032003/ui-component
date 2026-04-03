import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders with aria-pressed', () => {
    render(<Toggle>Bold</Toggle>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('toggles on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle onPressedChange={onChange}>Bold</Toggle>);

    await user.click(screen.getByRole('button'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('works in controlled mode', () => {
    const { rerender } = render(<Toggle pressed={false}>Bold</Toggle>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');

    rerender(<Toggle pressed={true}>Bold</Toggle>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('applies data-state attribute', () => {
    render(<Toggle pressed>Bold</Toggle>);
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'on');
  });
});
