# Component API Guidelines

## Component Structure

Every component lives at `src/components/ui/<name>/<Name>.tsx` with an optional
`<Name>.test.tsx` alongside it. Components are re-exported from the barrel file
at `src/components/ui/index.ts`.

## Required Patterns

### forwardRef & displayName

Every component must use `React.forwardRef` with proper generic typing and set
a `displayName` for DevTools and debugging:

```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  // ...
});
Button.displayName = "Button";
```

### Styling with tailwind-variants

Use `tv()` from `tailwind-variants` to define variants and slots. Never
hard-code Tailwind classes inline when a variant would be reusable:

```tsx
const buttonVariants = tv({
  base: "inline-flex items-center justify-center rounded-md",
  variants: {
    variant: { default: "bg-primary text-primary-foreground", outline: "border" },
    size: { sm: "h-8 px-3 text-sm", md: "h-10 px-4" },
  },
  defaultVariants: { variant: "default", size: "md" },
});
```

### Class merging with cn()

Always merge consumer classes through `cn()` from `@/lib/utils/cn` so that
Tailwind Merge resolves conflicts correctly:

```tsx
<button className={cn(buttonVariants({ variant, size }), className)} />
```

## Two API Patterns

### Prop-based (quick usage)

Components like **Dialog**, **Drawer**, and **AlertDialog** accept `trigger`,
`title`, `children`, and `footerContent` as props for simple one-liner usage:

```tsx
<Dialog trigger={<Button>Open</Button>} title="Confirm">Are you sure?</Dialog>
```

### Compound composition (maximum flexibility)

Components like **DropdownMenu**, **Accordion**, **Tabs**, **Breadcrumb**, and
**Pagination** expose multiple sub-components so consumers can compose freely:

```tsx
<Tabs.Root>
  <Tabs.List>
    <Tabs.Tab value="a">Tab A</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="a">Content A</Tabs.Panel>
</Tabs.Root>
```

## Accessibility

- Every interactive element must have an `aria-label` or a visible label.
- Decorative elements (icons, dividers) must use `aria-hidden="true"`.
- Use semantic HTML elements (`button`, `nav`, `dialog`, etc.) instead of
  generic `div`/`span` where applicable.

## Internationalization (i18n)

All user-facing strings (placeholders, empty-state messages, labels) must be
configurable via props with **English defaults**. Never hard-code display text
without exposing a prop override.

## Testing

Every component should have a corresponding `<Name>.test.tsx` file using
**Vitest** and **React Testing Library**. Tests should cover:

- Default rendering
- Variant/prop changes
- User interaction (click, keyboard)
- Accessibility attributes
