import * as React from 'react';
import { Combobox as BaseCombobox } from '@base-ui/react';
import { Check, ChevronDown, X, Loader2 } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@lib/utils/cn';

const comboboxVariants = tv({
  slots: {
    root: 'flex flex-col gap-1.5 w-full',
    inputContainer: 'flex flex-wrap items-center gap-1.5 min-h-10 w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm  focus-within:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-shadow transition-colors',
    input: 'flex-1 min-w-[120px] bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed',
    popup: 'z-50 w-[var(--anchor-width,var(--reference-width))] max-w-[var(--available-width)] overflow-hidden rounded-md border border-border bg-background text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-side-bottom:slide-in-from-top-2 data-side-left:slide-in-from-right-2 data-side-right:slide-in-from-left-2 data-side-top:slide-in-from-bottom-2',
    item: 'cursor-pointer relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
    indicator: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center',
    chip: 'inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground outline-none focus:ring-1 focus:ring-primary',
    chipRemove: 'hover:bg-primary/20 rounded-full p-0.5 transition-colors cursor-pointer',
    actionsHeader: 'flex items-center gap-1 p-1 border-b border-border sticky top-0 bg-background z-10',
    actionButton: 'flex-1 text-[10px] uppercase tracking-wider font-bold py-1.5 px-2 rounded-sm hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors text-center',
  }
});

export interface ComboBoxOption {
  label: string;
  value: string;
}

export interface ComboBoxProps {
  options: ComboBoxOption[];
  label?: string;
  placeholder?: string;
  value?: any;
  defaultValue?: any;
  onValueChange?: (value: any) => void;
  multiple?: boolean;
  isLoading?: boolean;
  className?: string;
  autocomplete?: boolean;
}

const ComboBox = React.forwardRef<HTMLInputElement, ComboBoxProps>(
  ({ options, label, placeholder, value, defaultValue, onValueChange, multiple, isLoading, className, autocomplete = true }, ref) => {
    const [inputValue, setInputValue] = React.useState('');
    const [internalValue, setInternalValue] = React.useState<any>(defaultValue || (multiple ? [] : null));

    const activeValue = value !== undefined ? value : internalValue;

    const handleValueChange = (newVal: any) => {
      if (value === undefined) {
        setInternalValue(newVal);
      }
      onValueChange?.(newVal);
    };

    // Filter options based on input value
    const filteredOptions = React.useMemo(() => {
      if (!inputValue || !autocomplete) return options;
      return options.filter(opt =>
        opt.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    }, [options, inputValue, autocomplete]);

    const { root, inputContainer, input, popup, item, indicator, chip, chipRemove, actionsHeader, actionButton } = comboboxVariants();
    const inputGroupRef = React.useRef<HTMLDivElement>(null);

    return (
      <BaseCombobox.Root
        value={activeValue}
        onValueChange={handleValueChange}
        multiple={multiple}
        onInputValueChange={setInputValue}
        autoHighlight
      >
        <div className={root({ className })}>
          {label && <label className="text-sm font-medium text-foreground">{label}</label>}

          <div className="relative w-full">
            <BaseCombobox.InputGroup ref={inputGroupRef} className={inputContainer()}>
              {multiple ? (
                <BaseCombobox.Chips className="flex flex-wrap items-center gap-1.5 flex-1 w-full min-w-0">
                  {Array.isArray(activeValue) && activeValue.map((val) => {
                    const option = options.find(o => o.value === val);
                    return (
                      <BaseCombobox.Chip key={val} className={chip()}>
                        {option?.label || val}
                        <BaseCombobox.ChipRemove className={chipRemove()}>
                          <X className="h-3 w-3" />
                        </BaseCombobox.ChipRemove>
                      </BaseCombobox.Chip>
                    );
                  })}
                  <BaseCombobox.Input
                    ref={ref}
                    readOnly={!autocomplete}
                    placeholder={Array.isArray(activeValue) && activeValue.length > 0 ? '' : placeholder}
                    className={input()}
                  />
                </BaseCombobox.Chips>
              ) : (
                <BaseCombobox.Input
                  ref={ref}
                  readOnly={!autocomplete}
                  placeholder={placeholder}
                  className={input()}
                />
              )}

              <BaseCombobox.Trigger className="text-muted-foreground transition-transform group-data-open:rotate-180 ml-auto">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronDown className="h-4 w-4" />}
              </BaseCombobox.Trigger>
            </BaseCombobox.InputGroup>

            <BaseCombobox.Portal>
              <BaseCombobox.Positioner
                anchor={inputGroupRef}
                sideOffset={4}
                style={{ width: 'var(--anchor-width)' }}
              >
                <BaseCombobox.Popup className={cn(popup(), 'min-w-0')}>
                  {multiple && options.length > 0 && (
                    <div className={actionsHeader()}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleValueChange(options.map((o) => o.value));
                        }}
                        className={actionButton()}
                      >
                        Chọn tất cả
                      </button>
                      <div className="w-px h-3 bg-border" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleValueChange([]);
                        }}
                        className={actionButton()}
                      >
                        Xóa tất cả
                      </button>
                    </div>
                  )}
                  <BaseCombobox.List className="p-1 max-h-[300px] overflow-auto">
                    {filteredOptions.length === 0 ? (
                      <div className="py-2 px-8 text-sm text-muted-foreground italic">Không tìm thấy kết quả.</div>
                    ) : (
                      filteredOptions.map((option) => (
                        <BaseCombobox.Item
                          key={option.value}
                          value={option.value}
                          className={item()}
                        >
                          <BaseCombobox.ItemIndicator className={indicator()}>
                            <Check className="h-4 w-4" />
                          </BaseCombobox.ItemIndicator>
                          {option.label}
                        </BaseCombobox.Item>
                      ))
                    )}
                  </BaseCombobox.List>
                </BaseCombobox.Popup>
              </BaseCombobox.Positioner>
            </BaseCombobox.Portal>
          </div>
        </div>
      </BaseCombobox.Root>
    );
  }
);

ComboBox.displayName = 'ComboBox';

export { ComboBox };
