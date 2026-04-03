import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  it('renders trigger', () => {
    render(<Dialog trigger={<button>Open</button>} />);
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('shows title when open', () => {
    render(
      <Dialog open={true} headerTitle="Confirm Action">
        <p>Body</p>
      </Dialog>
    );
    expect(screen.getByText('Confirm Action')).toBeInTheDocument();
  });

  it('shows description when open', () => {
    render(
      <Dialog open={true} headerTitle="Title" headerDescription="Are you sure?">
        <p>Body</p>
      </Dialog>
    );
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('renders children when open', () => {
    render(
      <Dialog open={true} headerTitle="Title">
        <p>Dialog body content</p>
      </Dialog>
    );
    expect(screen.getByText('Dialog body content')).toBeInTheDocument();
  });
});
