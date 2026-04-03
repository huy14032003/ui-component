import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  it('renders trigger', () => {
    render(<Drawer trigger={<button>Open Drawer</button>} />);
    expect(screen.getByText('Open Drawer')).toBeInTheDocument();
  });

  it('shows title when open', () => {
    render(
      <Drawer open={true} title="Settings">
        <p>Content</p>
      </Drawer>
    );
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('shows description when open', () => {
    render(
      <Drawer open={true} title="Settings" description="Adjust preferences">
        <p>Content</p>
      </Drawer>
    );
    expect(screen.getByText('Adjust preferences')).toBeInTheDocument();
  });

  it('renders children when open', () => {
    render(
      <Drawer open={true} title="Panel">
        <p>Drawer body here</p>
      </Drawer>
    );
    expect(screen.getByText('Drawer body here')).toBeInTheDocument();
  });
});
