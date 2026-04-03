import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from './Form';
import { useForm } from 'react-hook-form';
import { Input } from '../input/Input';
import * as React from 'react';

function TestForm({ error }: { error?: string }) {
  const form = useForm({ defaultValues: { name: '' } });

  React.useEffect(() => {
    if (error) form.setError('name', { message: error });
  }, [error, form]);

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl><Input placeholder="Enter name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

describe('Form', () => {
  it('renders label', () => {
    render(<TestForm />);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('renders input with placeholder', () => {
    render(<TestForm />);
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
  });

  it('shows validation error message', () => {
    render(<TestForm error="Name is required" />);
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });
});
