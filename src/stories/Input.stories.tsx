import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '@/components/ui/input/Input';
import { Search, Mail, Lock } from 'lucide-react';

const meta = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'flushed'],
    },
    label: { control: 'text' },
    error: { control: 'text' },
    description: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Enter text...' },
  decorators: [(Story) => <div className="w-[300px]"><Story /></div>],
};

export const WithLabel: Story = {
  args: { label: 'Email', placeholder: 'john@example.com' },
  decorators: [(Story) => <div className="w-[300px]"><Story /></div>],
};

export const WithDescription: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    description: 'This will be your public display name.',
  },
  decorators: [(Story) => <div className="w-[300px]"><Story /></div>],
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'john@example.com',
    error: 'Please enter a valid email address.',
    defaultValue: 'not-an-email',
  },
  decorators: [(Story) => <div className="w-[300px]"><Story /></div>],
};

export const WithIcon: Story = {
  args: {
    placeholder: 'Search...',
    icon: <Search className="h-4 w-4" />,
  },
  decorators: [(Story) => <div className="w-[300px]"><Story /></div>],
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
  decorators: [(Story) => <div className="w-[300px]"><Story /></div>],
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <Input variant="default" label="Default" placeholder="Default input" />
      <Input variant="filled" label="Filled" placeholder="Filled input" />
      <Input variant="flushed" label="Flushed" placeholder="Flushed input" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'Cannot edit',
    disabled: true,
  },
  decorators: [(Story) => <div className="w-[300px]"><Story /></div>],
};
