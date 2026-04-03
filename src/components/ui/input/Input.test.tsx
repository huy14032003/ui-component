import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';
import React from 'react';

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Input label="Email" id="email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<Input error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('renders description when no error', () => {
    render(<Input description="Helper text" />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('hides description when error is present', () => {
    render(<Input description="Helper text" error="Error" />);
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('toggles password visibility', async () => {
    const user = userEvent.setup();
    render(<Input type="password" placeholder="Password" />);

    const input = screen.getByPlaceholderText('Password');
    expect(input).toHaveAttribute('type', 'password');

    const toggleBtn = screen.getByRole('button');
    await user.click(toggleBtn);
    expect(input).toHaveAttribute('type', 'text');
  });
});
