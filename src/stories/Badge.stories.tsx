import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@/components/ui/badge/Badge';

const meta = {
  title: 'General/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'success', 'warning', 'danger', 'soft-primary', 'soft-success', 'soft-warning', 'soft-danger', 'glass', 'gradient'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    pulse: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Badge>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Badge' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
    </div>
  ),
};

export const SoftVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="soft-primary">Primary</Badge>
      <Badge variant="soft-success">Success</Badge>
      <Badge variant="soft-warning">Warning</Badge>
      <Badge variant="soft-danger">Danger</Badge>
    </div>
  ),
};

export const WithPulse: Story = {
  args: { children: 'Live', variant: 'danger', pulse: true },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const Gradient: Story = {
  args: { children: 'Pro', variant: 'gradient' },
};

export const Glass: Story = {
  render: () => (
    <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
      <Badge variant="glass">Glass Badge</Badge>
    </div>
  ),
};
