import * as React from 'react';
import { Tabs as BaseTabs } from '@base-ui/react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@lib/utils/cn';

const tabsVariants = tv({
  slots: {
    rootSlots: 'flex flex-col w-full',
    list: 'relative inline-flex items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-fit',
    indicator: 'absolute top-1 bottom-1 left-[var(--active-tab-left)] w-[var(--active-tab-width)] rounded-md bg-background shadow-sm transition-all duration-300 ease-out z-0',
    trigger: 'relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-active:text-foreground data-active:font-semibold',
    panel: 'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  }
});

export interface TabsProps
  extends Omit<BaseTabs.Root.Props, 'className' | 'children'>,
    VariantProps<typeof tabsVariants> {
  className?: string;
  items: { label: string; value: string; content: React.ReactNode }[];
}

const Tabs = React.forwardRef<React.ElementRef<typeof BaseTabs.Root>, TabsProps>(
  ({ className, items, ...props }, ref) => {
    const { rootSlots, list, indicator, trigger, panel } = tabsVariants();
    
    return (
      <BaseTabs.Root
        ref={ref}
        className={rootSlots({ className })}
        {...props}
      >
        <BaseTabs.List className={list()}>
          <BaseTabs.Indicator className={indicator()} />
          {items.map((item) => (
            <BaseTabs.Tab
              key={item.value}
              value={item.value}
              className={trigger()}
            >
              {item.label}
            </BaseTabs.Tab>
          ))}
        </BaseTabs.List>
        {items.map((item) => (
          <BaseTabs.Panel
            key={item.value}
            value={item.value}
            className={panel()}
          >
            {item.content}
          </BaseTabs.Panel>
        ))}
      </BaseTabs.Root>
    );
  }
);

Tabs.displayName = 'Tabs';

export { Tabs };
