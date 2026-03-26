import React, { useState } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Check, ChevronDown, Loader2, Search, X } from 'lucide-react'
import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '../../../lib/utils/cn'

/**
 * Variants cho SelectTrigger
 */
const selectVariants = tv({
    base: 'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm ring-offset-background transition-all duration-300 placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 cursor-pointer active:scale-[0.99] shadow-sm',
    variants: {
        variant: {
            solid: 'bg-background border border-secondary/20 hover:border-primary/50',
            glass: 'backdrop-blur-xl border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_1px_3px_rgba(0,0,0,0.1)]',
            outline: 'bg-transparent border-input hover:bg-secondary/10',
            ghost: 'bg-transparent border-transparent hover:bg-secondary/10 shadow-none',
        },
        color: {
            primary: 'text-foreground focus:ring-primary/50',
            secondary: 'text-secondary-foreground focus:ring-secondary/50',
            success: 'text-success focus:ring-success/50',
            danger: 'text-danger focus:ring-danger/50',
        },
        size: {
            sm: 'h-6 px-2 text-xs',
            md: 'h-8 px-4',
            lg: 'h-10 px-8 text-base',
        },
    },
    compoundVariants: [
        {
            variant: 'glass',
            color: 'primary',
            className: 'bg-white/5 border-white/10 text-white hover:bg-white/10'
        }
    ],
    defaultVariants: {
        variant: 'solid',
        color: 'primary',
        size: 'md',
    },
})

/**
 * Variants cho Item trong Select
 */
const selectItemVariants = tv({
    base: 'relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors duration-200',
    variants: {
        variant: {
            solid: 'focus:bg-primary/10 focus:text-primary',
            glass: 'focus:bg-white/10 focus:text-white',
        }
    },
    defaultVariants: {
        variant: 'solid'
    }
})

/**
 * Variants cho Content (Dropdown)
 */
const selectContentVariants = tv({
    base: 'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    variants: {
        variant: {
            solid: ' border border-secondary/20 bg-background',
            glass: 'backdrop-blur-2xl bg-neutral-900/90 border-white/10 text-white shadow-2xl',
        }
    },
    defaultVariants: {
        variant: 'solid'
    }
})

// --- Types ---
export interface SelectOption {
    label: string
    value: string
    icon?: React.ReactNode
    disabled?: boolean
}

export interface SelectProps extends VariantProps<typeof selectVariants> {
    options: SelectOption[]
    placeholder?: string
    defaultValue?: string
    value?: string
    onValueChange?: (value: string) => void
    disabled?: boolean
    isLoading?: boolean
    className?: string
    label?: string
    error?: string
    isClearable?: boolean
}

// --- Components ---

/**
 * Single Select using PopoverPrimitive for full control (Clearable support)
 */
const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
    ({ options, placeholder = 'Chọn...', variant, color, size, className, label, error, onValueChange, defaultValue, value: controlledValue, disabled, isLoading, isClearable = true, ...props }, ref) => {
        const [open, setOpen] = React.useState(false)
        const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(defaultValue || '')

        const isControlled = controlledValue !== undefined
        const value = isControlled ? controlledValue : uncontrolledValue

        const handleClear = (e: React.MouseEvent | React.PointerEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (!isControlled) {
                setUncontrolledValue('')
            }
            onValueChange?.('')
            setOpen(false)
        }

        const handleSelect = (val: string) => {
            if (!isControlled) {
                setUncontrolledValue(val)
            }
            onValueChange?.(val)
            setOpen(false)
        }

        const selectedOption = options.find(opt => opt.value === value)

        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && <label className="text-sm font-medium leading-none opacity-90">{label}</label>}
                <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
                    <PopoverPrimitive.Trigger asChild>
                        <button
                            ref={ref}
                            disabled={disabled || isLoading}
                            className={cn(
                                selectVariants({ variant, color, size, className }),
                                "text-left",
                                error && "border-danger ring-danger/20"
                            )}
                            {...props}
                        >
                            <span className={cn("block truncate flex-1", !selectedOption && "text-muted-foreground")}>
                                {selectedOption ? selectedOption.label : placeholder}
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0 opacity-50">
                                {isClearable && value && !disabled && !isLoading && (
                                    <X 
                                        className="h-3.5 w-3.5 cursor-pointer hover:text-danger hover:scale-110 transition-all pointer-events-auto" 
                                        onPointerDown={handleClear}
                                    />
                                )}
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")} />
                                )}
                            </div>
                        </button>
                    </PopoverPrimitive.Trigger>
                    <PopoverPrimitive.Portal>
                        <PopoverPrimitive.Content
                            sideOffset={4}
                            className={cn(selectContentVariants({ variant: variant === 'glass' ? 'glass' : 'solid' }), "w-(--radix-popover-trigger-width) p-1")}
                        >
                            <div className="max-h-60 overflow-y-auto">
                                {options.map((option) => (
                                    <div
                                        key={option.value}
                                        className={cn(
                                            selectItemVariants({ variant: variant === 'glass' ? 'glass' : 'solid' }),
                                            "cursor-pointer",
                                            value === option.value && (variant === 'glass' ? "bg-white/10" : "bg-primary/10")
                                        )}
                                        onClick={() => handleSelect(option.value)}
                                    >
                                        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                            {value === option.value && <Check className="h-4 w-4" />}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {option.icon}
                                            {option.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </PopoverPrimitive.Content>
                    </PopoverPrimitive.Portal>
                </PopoverPrimitive.Root>
                {error && <span className="text-xs text-danger">{error}</span>}
            </div>
        )
    }
)

Select.displayName = 'Select'

// --- MultiSelect ---

export interface MultiSelectProps extends VariantProps<typeof selectVariants> {
    options: SelectOption[]
    placeholder?: string
    defaultValue?: string[]
    value?: string[]
    onChange?: (value: string[]) => void
    disabled?: boolean
    isLoading?: boolean
    className?: string
    label?: string
    error?: string
    isClearable?: boolean
    showSelectAll?: boolean
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
    ({ options, placeholder = 'Chọn nhiều...', variant, color, size, className, label, error, onChange, defaultValue, value: controlledValue, disabled, isLoading, isClearable = true, showSelectAll, ...props }, ref) => {
        const [open, setOpen] = React.useState(false)
        const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(defaultValue || [])

        const isControlled = controlledValue !== undefined
        const value = isControlled ? controlledValue : uncontrolledValue

        const toggleOption = (val: string) => {
            const newValue = value.includes(val)
                ? value.filter((v) => v !== val)
                : [...value, val]

            if (!isControlled) {
                setUncontrolledValue(newValue)
            }
            onChange?.(newValue)
        }

        const removeOption = (val: string) => {
            const newValue = value.filter((v) => v !== val)
            if (!isControlled) {
                setUncontrolledValue(newValue)
            }
            onChange?.(newValue)
        }

        const handleClear = (e: React.MouseEvent | React.PointerEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (!isControlled) setUncontrolledValue([])
            onChange?.([])
        }

        const handleSelectAll = () => {
             const allValues = options.map(opt => opt.value)
             const newValue = value.length === options.length ? [] : allValues
             if (!isControlled) setUncontrolledValue(newValue)
             onChange?.(newValue)
        }

        const selectedOptions = options.filter(opt => value.includes(opt.value))

        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && <label className="text-sm font-medium">{label}</label>}
                <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
                    <PopoverPrimitive.Trigger asChild>
                        <button
                            ref={ref}
                            disabled={disabled || isLoading}
                            className={cn(
                                selectVariants({ variant, color, size, className }),
                                " max-h-20 overflow-auto h-auto py-1.5 flex-wrap gap-2 text-left",
                                error && "border-danger ring-danger/20"
                            )}
                            {...props}
                        >
                            <div className="flex flex-wrap gap-1.5 items-center flex-1">
                                {selectedOptions.length > 0 ? (
                                    selectedOptions.map(opt => (
                                        <span
                                            key={opt.value}
                                            className={cn(
                                                "rounded-md px-2 py-0.5 text-xs font-medium flex items-center gap-1.5 transition-all",
                                                variant === 'glass' ? "bg-white/10 text-white border border-white/5" : "bg-primary/10 text-primary border border-primary/10"
                                            )}
                                            onClick={(e) => { e.stopPropagation(); removeOption(opt.value); }}
                                        >
                                            {opt.label}
                                            <X className="h-3 w-3 cursor-pointer hover:text-danger hover:scale-110 transition-all" />
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-muted-foreground">{placeholder}</span>
                                )}
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 opacity-50">
                                {isClearable && value.length > 0 && !disabled && !isLoading && (
                                    <X 
                                        className="h-3.5 w-3.5 cursor-pointer hover:text-danger hover:scale-110 transition-all pointer-events-auto" 
                                        onPointerDown={handleClear}
                                    />
                                )}
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />}
                            </div>
                        </button>
                    </PopoverPrimitive.Trigger>
                    <PopoverPrimitive.Portal>
                        <PopoverPrimitive.Content
                            className={cn(selectContentVariants({ variant: variant === 'glass' ? 'glass' : 'solid' }), "w-(--radix-popover-trigger-width) flex flex-col")}
                            align="start"
                            sideOffset={4}
                        >
                            {showSelectAll && options.length > 0 && (
                                <div 
                                    className={cn(
                                        selectItemVariants({ variant: variant === 'glass' ? 'glass' : 'solid' }),
                                        "cursor-pointer border-b border-input/10 mb-1 font-medium"
                                    )}
                                    onClick={handleSelectAll}
                                >
                                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                        {value.length === options.length && <Check className="h-4 w-4" />}
                                        {value.length > 0 && value.length < options.length && <div className="h-0.5 w-2 bg-foreground" />}
                                    </span>
                                    {value.length === options.length ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                                </div>
                            )}
                            <div className="p-1">
                                {options.map((option) => {
                                    const isSelected = value.includes(option.value)
                                    return (
                                        <div
                                            key={option.value}
                                            className={cn(selectItemVariants({ variant: variant === 'glass' ? 'glass' : 'solid' }), "cursor-pointer", isSelected && (variant === 'glass' ? "bg-white/5" : "bg-primary/5"))}
                                            onClick={() => toggleOption(option.value)}
                                        >
                                            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                                {isSelected && <Check className="h-4 w-4" />}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                {option.icon}
                                                {option.label}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </PopoverPrimitive.Content>
                    </PopoverPrimitive.Portal>
                </PopoverPrimitive.Root>
                {error && <span className="text-xs text-danger">{error}</span>}
            </div>
        )
    }
)

MultiSelect.displayName = 'MultiSelect'

// --- Autocomplete ---

export interface AutocompleteProps extends VariantProps<typeof selectVariants> {
    options: SelectOption[]
    placeholder?: string
    defaultValue?: string
    value?: string
    onChange?: (value: string) => void
    disabled?: boolean
    isLoading?: boolean
    className?: string
    label?: string
    error?: string
    isClearable?: boolean
}

const Autocomplete = React.forwardRef<HTMLButtonElement, AutocompleteProps>(
    ({ options, placeholder = 'Tìm kiếm...', variant, color, size, className, label, error, onChange, defaultValue, value: controlledValue, disabled, isLoading, isClearable = true, ...props }, ref) => {
        const [open, setOpen] = React.useState(false)
        const [search, setSearch] = React.useState('')
        const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(defaultValue || '')

        const isControlled = controlledValue !== undefined
        const value = isControlled ? controlledValue : uncontrolledValue

        const handleClear = (e: React.MouseEvent | React.PointerEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (!isControlled) setUncontrolledValue('')
            onChange?.('')
        }

        const filteredOptions = options.filter(opt =>
            opt.label.toLowerCase().includes(search.toLowerCase())
        )

        const selectedOption = options.find(opt => opt.value === value)

        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && <label className="text-sm font-medium">{label}</label>}
                <PopoverPrimitive.Root open={open} onOpenChange={(o) => {
                    setOpen(o)
                    if (!o) setSearch('') // Reset search on close
                }}>
                    <PopoverPrimitive.Trigger asChild>
                        <button
                            ref={ref}
                            disabled={disabled || isLoading}
                            className={cn(
                                selectVariants({ variant, color, size, className }),
                                "text-left",
                                error && "border-danger ring-danger/20"
                            )}
                            {...props}
                        >
                            <span className={cn("block truncate flex-1", !selectedOption && "text-muted-foreground")}>
                                {selectedOption ? selectedOption.label : placeholder}
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0 opacity-50">
                                {isClearable && value && !disabled && !isLoading && (
                                    <X 
                                        className="h-3.5 w-3.5 cursor-pointer hover:text-danger hover:scale-110 transition-all pointer-events-auto" 
                                        onPointerDown={handleClear}
                                    />
                                )}
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />}
                            </div>
                        </button>
                    </PopoverPrimitive.Trigger>
                    <PopoverPrimitive.Portal>
                        <PopoverPrimitive.Content
                            className={cn(selectContentVariants({ variant: variant === 'glass' ? 'glass' : 'solid' }), "w-(--radix-popover-trigger-width) flex flex-col")}
                            align="start"
                            sideOffset={4}
                        >
                            <div className="flex items-center border-b border-input/10 px-3 py-2 gap-2 shrink-0">
                                <Search className="h-4 w-4 shrink-0 opacity-50" />
                                <input
                                    className="flex h-8 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Tìm kiếm..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    autoFocus
                                />
                                {search && <X className="h-4 w-4 cursor-pointer opacity-50 hover:opacity-100" onClick={() => setSearch('')} />}
                            </div>
                            <div className="p-1 overflow-y-auto max-h-[300px]">
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map((option) => (
                                        <div
                                            key={option.value}
                                            className={cn(
                                                selectItemVariants({ variant: variant === 'glass' ? 'glass' : 'solid' }),
                                                "cursor-pointer",
                                                value === option.value && (variant === 'glass' ? "bg-white/10" : "bg-primary/10")
                                            )}
                                            onClick={() => {
                                                if (!isControlled) {
                                                    setUncontrolledValue(option.value)
                                                }
                                                onChange?.(option.value)
                                                setOpen(false)
                                            }}
                                        >
                                            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                                {value === option.value && <Check className="h-4 w-4" />}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                {option.icon}
                                                {option.label}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-6 text-center text-sm text-muted-foreground">Không tìm thấy kết quả.</div>
                                )}
                            </div>
                        </PopoverPrimitive.Content>
                    </PopoverPrimitive.Portal>
                </PopoverPrimitive.Root>
                {error && <span className="text-xs text-danger">{error}</span>}
            </div>
        )
    }
)

Autocomplete.displayName = 'Autocomplete'

export { Select, MultiSelect, Autocomplete }