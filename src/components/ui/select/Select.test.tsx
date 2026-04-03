import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Select } from './Select';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
];

describe('Select', () => {
  it('renders with default placeholder', () => {
    render(<Select options={options} />);
    expect(screen.getByText('Select...')).toBeInTheDocument();
  });

  it('renders custom placeholder', () => {
    render(<Select options={options} placeholder="Pick one" />);
    expect(screen.getByText('Pick one')).toBeInTheDocument();
  });

  it('renders label', () => {
    render(<Select options={options} label="Fruit" />);
    expect(screen.getByText('Fruit')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Select options={options} error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('renders selected value', () => {
    render(<Select options={options} value="banana" />);
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });
});
