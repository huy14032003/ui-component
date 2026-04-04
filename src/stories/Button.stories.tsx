import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/button/Button';
import { Mail, ArrowRight, Download, Trash2 } from 'lucide-react';

const meta = {
  title: 'General/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'secondary', 'danger', 'link', 'glass', 'glass-white', 'glass-amber', 'glass-green', 'glass-purple', 'glass-pink'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'Button size',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows a loading spinner',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: { children: 'Button', variant: 'solid' },
};

export const Outline: Story = {
  args: { children: 'Outline', variant: 'outline' },
};

export const Ghost: Story = {
  args: { children: 'Ghost', variant: 'ghost' },
};

export const Secondary: Story = {
  args: { children: 'Secondary', variant: 'secondary' },
};

export const Danger: Story = {
  args: { children: 'Delete', variant: 'danger', leftIcon: <Trash2 className="h-4 w-4" /> },
};

export const Link: Story = {
  args: { children: 'Link Button', variant: 'link' },
};

export const WithLeftIcon: Story = {
  args: { children: 'Send Email', leftIcon: <Mail className="h-4 w-4" /> },
};

export const WithRightIcon: Story = {
  args: { children: 'Next', rightIcon: <ArrowRight className="h-4 w-4" /> },
};

export const Loading: Story = {
  args: { children: 'Saving...', isLoading: true },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon"><Download className="h-4 w-4" /></Button>
    </div>
  ),
};

export const AllVariants: Story = {
  args: {
    variant: "glass-purple"
  },

  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="link">Link</Button>
    </div>
  )
};

export const GlassVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
      <Button variant="glass">Glass</Button>
      <Button variant="glass-white">White</Button>
      <Button variant="glass-amber">Amber</Button>
      <Button variant="glass-green">Green</Button>
      <Button variant="glass-purple">Purple</Button>
      <Button variant="glass-pink">Pink</Button>
    </div>
  ),
};
