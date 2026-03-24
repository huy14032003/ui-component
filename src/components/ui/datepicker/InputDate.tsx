import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import {
    Label,
    Group,
    DateInput,
    DateSegment,
    Button as AriaButton,
    Calendar,
    RangeCalendar,
    CalendarGrid,
    CalendarCell,
    CalendarGridHeader,
    CalendarHeaderCell,
    CalendarGridBody,
    Heading,
    TimeField,
    DatePicker,
    DateRangePicker,
    type DateValue,
    type RangeValue,
} from "react-aria-components";
import {
    today,
    now,
    getLocalTimeZone,
    toCalendarDateTime,
    toCalendarDate,
    CalendarDate,
    parseDate,
    parseDateTime,
} from "@internationalized/date";
import { tv } from "tailwind-variants";
import { cn } from "@lib/utils/cn";
import * as Icons from "@components/icons";

// ─── Help Functions ──────────────────────────────────────────────────────────
export type DateOutputFormat = "CalendarDate" | "ISO" | "Date" | "string";

function toOutputValue(val: DateValue | null | undefined, format: DateOutputFormat): any {
    if (!val) return null;
    switch (format) {
        case "ISO": return val.toString();
        case "Date": return new Date(val.toString());
        case "string": return val.toString().split("T")[0];
        default: return val;
    }
}

function fromInputValue(val: any, format: DateOutputFormat, showTime?: string): DateValue | null {
    if (!val) return null;
    const isTimeEnabled = showTime && showTime !== "day";
    
    let result: DateValue | null = null;
    if (typeof val === "string") {
        try {
            if (val.includes("T") || val.includes(" ")) {
                result = parseDateTime(val.replace(" ", "T"));
            } else {
                result = parseDate(val);
            }
        } catch { result = null; }
    } else if (val instanceof Date) {
        try {
            const iso = val.toISOString().split(".")[0];
            result = parseDateTime(iso);
        } catch { result = null; }
    } else {
        result = val;
    }

    if (result) {
        if (isTimeEnabled && !("hour" in result)) return toCalendarDateTime(result as CalendarDate);
        if (!isTimeEnabled && "hour" in result) return toCalendarDate(result);
    }
    return result;
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const fieldStyles = tv({
    base: "flex items-center bg-white border border-gray-300 rounded-lg shadow-sm outline-none transition-all group focus-within:ring-2 w-full",
    variants: {
        variant: {
            primary: "focus-within:border-primary focus-within:ring-primary/20",
            secondary: "focus-within:border-secondary focus-within:ring-secondary/20",
            danger: "focus-within:border-danger focus-within:ring-danger/20",
            success: "focus-within:border-success focus-within:ring-success/20",
            warning: "focus-within:border-warning focus-within:ring-warning/20",
        },
        size: {
            xs: "px-1.5 py-0.5 text-[10px] gap-1",
            sm: "px-2 py-1 text-xs gap-1.5",
            md: "px-3 py-1.5 text-sm gap-2",
            lg: "px-4 py-2 text-base gap-2",
        },
        isDisabled: { true: "opacity-50 cursor-not-allowed bg-gray-50" },
        isInvalid: { true: "border-danger focus-within:ring-danger/20" },
    },
    defaultVariants: { variant: "primary", size: "md" },
});

const segmentStyles = tv({
    base: "px-0.5 rounded-sm outline-none focus:bg-primary focus:text-white tabular-nums transition-colors caret-transparent",
    variants: {
        isPlaceholder: { true: "text-gray-400 font-normal" },
        type: { literal: "px-0 opacity-50" },
    },
});

const cellStyles = tv({
    base: "w-9 h-9 flex items-center justify-center rounded-lg text-sm cursor-pointer transition-colors outline-none",
    variants: {
        variant: {
            primary: "hover:bg-primary/10 data-selected:bg-primary data-selected:text-white",
            secondary: "hover:bg-secondary/10 data-selected:bg-secondary data-selected:text-white",
            danger: "hover:bg-danger/10 data-selected:bg-danger data-selected:text-white",
            success: "hover:bg-success/10 data-selected:bg-success data-selected:text-white",
            warning: "hover:bg-warning/10 data-selected:bg-warning data-selected:text-white",
        },
        isToday: { true: "font-bold underline decoration-2 underline-offset-2" },
        isDisabled: { true: "text-gray-300 cursor-not-allowed" },
        isUnavailable: { true: "text-red-400 line-through opacity-50" },
        isOutsideMonth: { true: "text-gray-400 opacity-60" },
    },
    defaultVariants: { variant: "primary" },
});

// ─── Manual Dropdown Wrapper ─────────────────────────────────────────────────
function CalendarDropdown({ isOpen, onClose, children, triggerRef, className }: {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    triggerRef: React.RefObject<HTMLElement | null>;
    className?: string;
}) {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        const handleOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
                triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, [isOpen, onClose, triggerRef]);

    if (!isOpen) return null;

    return (
        <div
            ref={dropdownRef}
            className={cn(
                "absolute top-full left-0 mt-2 z-9999 bg-white border border-gray-200 rounded-xl shadow-2xl p-3 animate-in fade-in zoom-in-95 duration-200",
                className
            )}
        >
            {children}
        </div>
    );
}

// ─── Shared Components ───────────────────────────────────────────────────────
function CalendarHeader({ icon }: { icon?: ReactNode }) {
    return (
        <header className="flex items-center justify-between p-1 pb-2">
            <AriaButton slot="previous" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 outline-none transition-colors">
                <Icons.ChevronLeft className="w-4 h-4" />
            </AriaButton>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                {icon}
                <Heading />
            </div>
            <AriaButton slot="next" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 outline-none transition-colors">
                <Icons.ChevronRight className="w-4 h-4" />
            </AriaButton>
        </header>
    );
}

function CalendarGridSection({ variant }: { variant?: string }) {
    return (
        <CalendarGrid className="w-full">
            <CalendarGridHeader>
                {(day) => <CalendarHeaderCell className="text-xs font-medium text-gray-400 w-9 h-9 text-center">{day}</CalendarHeaderCell>}
            </CalendarGridHeader>
            <CalendarGridBody>
                {(date) => (
                    <CalendarCell
                        date={date}
                        className={({ isToday, isDisabled, isUnavailable, isOutsideMonth }) =>
                            cellStyles({ variant: (variant as any) || "primary", isToday, isDisabled, isUnavailable, isOutsideMonth })
                        }
                    />
                )}
            </CalendarGridBody>
        </CalendarGrid>
    );
}

function ClearButton({ onClear }: { onClear: () => void }) {
    return (
        <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onClear(); }}
            className="flex-none p-0.5 rounded-full text-gray-300 hover:text-gray-500 hover:bg-gray-100 outline-none transition-colors"
            aria-label="Xoá"
        >
            <Icons.X className="w-3.5 h-3.5" />
        </button>
    );
}

function TimeSection({
    value, rangeValue, isRange, showTime, size,
    onChangeSingle, onChangeRange, onNow,
}: {
    value?: DateValue | null;
    rangeValue?: { start: DateValue | null; end: DateValue | null } | null;
    isRange?: boolean;
    showTime: string;
    size?: string;
    onChangeSingle?: (val: any) => void;
    onChangeRange?: (field: "start" | "end", val: any) => void;
    onNow?: () => void;
}) {
    if (showTime === "day") return null;
    return (
        <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-gray-500">
                    <Icons.Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Thời gian (24h)</span>
                </div>
                {onNow && (
                    <button type="button" onClick={onNow} className="text-xs text-primary font-medium hover:underline underline-offset-2">
                        Hiện tại
                    </button>
                )}
            </div>
            <div className="flex items-center gap-2">
                {isRange ? (
                    <>
                        <TimeField granularity={showTime as any} hourCycle={24} value={rangeValue?.start as any} onChange={(v) => onChangeRange?.("start", v)} className="flex-1">
                            <Group className={cn("flex items-center justify-center border border-gray-200 rounded-md bg-gray-50/50", size === "xs" ? "p-1" : "p-2")}>
                                <DateInput className="flex items-center">
                                    {(seg) => <DateSegment segment={seg} className="outline-none focus:bg-primary focus:text-white rounded-sm px-0.5 tabular-nums" />}
                                </DateInput>
                            </Group>
                        </TimeField>
                        <span className="text-gray-300 text-xs">—</span>
                        <TimeField granularity={showTime as any} hourCycle={24} value={rangeValue?.end as any} onChange={(v) => onChangeRange?.("end", v)} className="flex-1">
                            <Group className={cn("flex items-center justify-center border border-gray-200 rounded-md bg-gray-50/50", size === "xs" ? "p-1" : "p-2")}>
                                <DateInput className="flex items-center">
                                    {(seg) => <DateSegment segment={seg} className="outline-none focus:bg-primary focus:text-white rounded-sm px-0.5 tabular-nums" />}
                                </DateInput>
                            </Group>
                        </TimeField>
                    </>
                ) : (
                    <TimeField granularity={showTime as any} hourCycle={24} value={value as any} onChange={onChangeSingle} className="w-full" isDisabled={!value}>
                        <Group className={cn("flex items-center justify-center border border-gray-200 rounded-md bg-gray-50/50", size === "xs" ? "p-1" : "p-2")}>
                            <DateInput className="flex items-center">
                                {(seg) => <DateSegment segment={seg} className="outline-none focus:bg-primary focus:text-white rounded-sm px-0.5 tabular-nums" />}
                            </DateInput>
                        </Group>
                    </TimeField>
                )}
            </div>
        </div>
    );
}

// ─── Types ───────────────────────────────────────────────────────────────────
export type DatePickerMode = "single" | "range" | "multi" | "autocomplete";

interface BaseProps {
    label?: string;
    variant?: "primary" | "secondary" | "danger" | "success" | "warning";
    size?: "xs" | "sm" | "md" | "lg";
    showTime?: "second" | "minute" | "hour" | "day";
    className?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
    isInvalid?: boolean;
    errorMessage?: string;
    outputFormat?: DateOutputFormat;
    clearable?: boolean;
    onBlur?: () => void;
}

export interface SingleDateProps extends BaseProps {
    mode?: "single";
    value?: any;
    defaultValue?: any;
    onChange?: (value: any) => void;
}

export interface RangeDateProps extends BaseProps {
    mode: "range";
    value?: { start: any; end: any } | null;
    defaultValue?: { start: any; end: any } | null;
    onChange?: (value: { start: any; end: any } | null) => void;
}

export interface MultiDateProps extends BaseProps {
    mode: "multi";
    value?: any[];
    defaultValue?: any[];
    onChange?: (value: any[]) => void;
    maxCount?: number;
}

export interface AutocompleteDateProps extends BaseProps {
    mode: "autocomplete";
    value?: any;
    defaultValue?: any;
    onChange?: (value: any) => void;
}

export type InputDateProps = SingleDateProps | RangeDateProps | MultiDateProps | AutocompleteDateProps;

// ─── Single Mode ─────────────────────────────────────────────────────────────
function SingleDatePicker(props: SingleDateProps) {
    const { label, variant = "primary", size = "md", showTime = "day", className, isDisabled, isInvalid, errorMessage, outputFormat = "CalendarDate", clearable = true, onBlur } = props;
    const [internalValue, setInternalValue] = useState<DateValue | null>(() => fromInputValue(props.defaultValue ?? props.value ?? null, outputFormat, showTime));
    const value = props.value !== undefined ? fromInputValue(props.value, outputFormat, showTime) : internalValue;
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);

    const handleChange = (v: DateValue | null) => {
        let finalVal = v;
        if (v && showTime !== "day" && !("hour" in v)) finalVal = toCalendarDateTime(v as CalendarDate);
        setInternalValue(finalVal);
        props.onChange?.(toOutputValue(finalVal, outputFormat));
        if (showTime === "day" && v) setIsOpen(false);
    };

    const handleNow = () => {
        const isTimeEnabled = showTime && showTime !== "day";
        let current: any = isTimeEnabled ? now(getLocalTimeZone()) : today(getLocalTimeZone());
        if (isTimeEnabled && "timeZone" in current) current = toCalendarDateTime(current);
        handleChange(current);
    };

    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            {label && <Label className="text-sm font-medium text-gray-700 cursor-default">{label}{props.isRequired && <span className="text-danger ml-1">*</span>}</Label>}
            <div className="relative" ref={triggerRef}>
                <DatePicker
                    value={value as any}
                    onChange={handleChange}
                    onBlur={onBlur}
                    granularity={showTime}
                    hourCycle={24}
                    isDisabled={isDisabled}
                    isInvalid={isInvalid}
                    aria-label={label || "Chọn ngày"}
                >
                    <Group className={fieldStyles({ variant, size, isDisabled, isInvalid })}>
                        <div className="flex-1 flex items-center min-w-0 overflow-hidden gap-1 pl-2">
                            <DateInput className="flex-1 flex items-center min-w-0 overflow-x-auto no-scrollbar">
                                {(seg) => <DateSegment segment={seg} className={cn(segmentStyles({ isPlaceholder: seg.isPlaceholder, type: seg.type === "literal" ? "literal" : undefined }), seg.type && "pl-0.5")} />}
                            </DateInput>
                            {clearable && value && <ClearButton onClear={() => handleChange(null)} />}
                        </div>
                        <AriaButton onPress={() => setIsOpen(!isOpen)} className="flex-none p-1 rounded-md text-gray-400 hover:text-gray-600 outline-none transition-colors border-l border-gray-100 ml-1">
                            <Icons.Calendar className={cn(size === "xs" ? "w-3 h-3" : size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6")} />
                        </AriaButton>
                    </Group>
                </DatePicker>
                <CalendarDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} triggerRef={triggerRef}>
                    <Calendar value={value} onChange={handleChange} className="outline-none">
                        <CalendarHeader />
                        <CalendarGridSection variant={variant} />
                    </Calendar>
                    <TimeSection value={value} showTime={showTime} size={size} onChangeSingle={handleChange} onNow={handleNow} />
                </CalendarDropdown>
            </div>
            {isInvalid && errorMessage && <p className="text-xs text-danger flex items-center gap-1"><Icons.TriangleAlert className="w-3 h-3" />{errorMessage}</p>}
        </div>
    );
}

// ─── Range Mode ──────────────────────────────────────────────────────────────
function RangeDatePicker(props: RangeDateProps) {
    const { label, variant = "primary", size = "md", showTime = "day", className, isDisabled, isInvalid, errorMessage, outputFormat = "CalendarDate", clearable = true, onBlur } = props;
    const [internalValue, setInternalValue] = useState<{ start: DateValue | null; end: DateValue | null } | null>(() => {
        const raw = props.defaultValue ?? props.value;
        if (!raw) return null;
        return { start: fromInputValue(raw.start, outputFormat, showTime), end: fromInputValue(raw.end, outputFormat, showTime) };
    });
    const value = props.value !== undefined
        ? (props.value ? { start: fromInputValue(props.value.start, outputFormat, showTime), end: fromInputValue(props.value.end, outputFormat, showTime) } : null)
        : internalValue;
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);

    const handleChange = (v: RangeValue<DateValue> | null) => {
        let newVal = v ? { start: v.start, end: v.end } : null;
        if (newVal && showTime !== "day") {
            if (!("hour" in newVal.start)) newVal.start = toCalendarDateTime(newVal.start as CalendarDate);
            if (!("hour" in newVal.end)) newVal.end = toCalendarDateTime(newVal.end as CalendarDate);
        }
        setInternalValue(newVal);
        props.onChange?.(newVal ? { start: toOutputValue(newVal.start, outputFormat), end: toOutputValue(newVal.end, outputFormat) } : null);
    };

    const handleNow = () => {
        const isTimeEnabled = showTime && showTime !== "day";
        let current: any = isTimeEnabled ? now(getLocalTimeZone()) : today(getLocalTimeZone());
        if (isTimeEnabled && "timeZone" in current) current = toCalendarDateTime(current);
        const newVal = { start: current, end: current };
        setInternalValue(newVal);
        props.onChange?.({ start: toOutputValue(current, outputFormat), end: toOutputValue(current, outputFormat) });
    };

    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            {label && <Label className="text-sm font-medium text-gray-700 cursor-default">{label}{props.isRequired && <span className="text-danger ml-1">*</span>}</Label>}
            <div className="relative" ref={triggerRef}>
                <DateRangePicker
                    value={value as any}
                    onChange={handleChange}
                    onBlur={onBlur}
                    granularity={showTime}
                    hourCycle={24}
                    isDisabled={isDisabled}
                    isInvalid={isInvalid}
                    aria-label={label || "Chọn khoảng ngày"}
                >
                    <Group className={fieldStyles({ variant, size, isDisabled, isInvalid })}>
                        <div className="flex-1 flex items-center min-w-0 overflow-hidden gap-1 pl-2">
                            <DateInput slot="start" className="flex items-center min-w-0 overflow-x-auto no-scrollbar">
                                {(seg) => <DateSegment segment={seg} className={cn(segmentStyles({ isPlaceholder: seg.isPlaceholder, type: seg.type === "literal" ? "literal" : undefined }), seg.type && "pl-0.5")} />}
                            </DateInput>
                            <span className="text-gray-300 flex-none"><Icons.MoveHorizontal size={size === "xs" ? 12 : 14} strokeWidth={2.5} /></span>
                            <DateInput slot="end" className="flex items-center min-w-0 overflow-x-auto no-scrollbar">
                                {(seg) => <DateSegment segment={seg} className={cn(segmentStyles({ isPlaceholder: seg.isPlaceholder, type: seg.type === "literal" ? "literal" : undefined }), seg.type && "pl-0.5")} />}
                            </DateInput>
                            {clearable && value && <ClearButton onClear={() => handleChange(null)} />}
                        </div>
                        <AriaButton onPress={() => setIsOpen(!isOpen)} className="flex-none p-1 rounded-md text-gray-400 hover:text-gray-600 outline-none transition-colors border-l border-gray-100 ml-1">
                            <Icons.CalendarRange className={cn(size === "xs" ? "w-3 h-3" : size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6")} />
                        </AriaButton>
                    </Group>
                </DateRangePicker>
                <CalendarDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} triggerRef={triggerRef}>
                    <RangeCalendar value={value as any} onChange={handleChange} className="outline-none" visibleDuration={{ months: 1 }}>
                        <CalendarHeader icon={<Icons.CalendarRange className="w-3.5 h-3.5 text-gray-400" />} />
                        <CalendarGridSection variant={variant} />
                    </RangeCalendar>
                    <TimeSection
                        rangeValue={value}
                        isRange
                        showTime={showTime}
                        size={size}
                        onChangeRange={(field, v) => {
                            const updated = { ...value, [field]: v };
                            setInternalValue(updated as any);
                            props.onChange?.({ start: toOutputValue(updated.start as any, outputFormat), end: toOutputValue(updated.end as any, outputFormat) });
                        }}
                        onNow={handleNow}
                    />
                </CalendarDropdown>
            </div>
            {isInvalid && errorMessage && <p className="text-xs text-danger flex items-center gap-1"><Icons.TriangleAlert className="w-3 h-3" />{errorMessage}</p>}
        </div>
    );
}

// ─── Multi Mode ──────────────────────────────────────────────────────────────
function MultiDatePicker(props: MultiDateProps) {
    const { label, variant = "primary", size = "md", className, isDisabled, isInvalid, errorMessage, outputFormat = "CalendarDate", clearable = true, maxCount, onBlur } = props;
    const [selectedDates, setSelectedDates] = useState<DateValue[]>(() =>
        (props.defaultValue ?? props.value ?? []).map((v: any) => fromInputValue(v, outputFormat)).filter(Boolean) as DateValue[]
    );
    const [focusedDate, setFocusedDate] = useState<DateValue>(today(getLocalTimeZone()));
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);

    const dates: DateValue[] = props.value !== undefined
        ? (props.value ?? []).map((v: any) => fromInputValue(v, outputFormat)).filter(Boolean) as DateValue[]
        : selectedDates;

    const toggleDate = useCallback((date: DateValue) => {
        setSelectedDates((prev) => {
            const idx = prev.findIndex((d) => d.compare(date) === 0);
            let next: DateValue[];
            if (idx >= 0) {
                next = prev.filter((_, i) => i !== idx);
            } else {
                if (maxCount && prev.length >= maxCount) return prev;
                next = [...prev, date].sort((a, b) => a.compare(b));
            }
            props.onChange?.(next.map((d) => toOutputValue(d, outputFormat)));
            return next;
        });
    }, [maxCount, outputFormat, props.onChange]);

    const isDateSelected = (date: DateValue) => dates.some((d) => d.compare(date) === 0);
    const sizeMap = { xs: "text-[10px]", sm: "text-xs", md: "text-sm", lg: "text-base" } as Record<string, string>;

    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            {label && <Label className="text-sm font-medium text-gray-700 cursor-default">{label}{props.isRequired && <span className="text-danger ml-1">*</span>}</Label>}
            <div className="relative" ref={triggerRef}>
                <div className={fieldStyles({ variant, size: size as any, isDisabled, isInvalid })} onBlur={onBlur}>
                    <div className="flex-1 flex items-center min-w-0 overflow-x-auto no-scrollbar gap-1 flex-wrap py-0.5 ml-2">
                        {dates.length === 0 ? (
                            <span className={cn("text-gray-400", sizeMap[size])}>Chọn một hoặc nhiều ngày...</span>
                        ) : (
                            dates.map((d) => (
                                <span key={d.toString()} className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-medium", sizeMap[size])}>
                                    {d.toString().split("T")[0]}
                                    {clearable && (
                                        <button type="button" onClick={(e) => { e.stopPropagation(); toggleDate(d); }} className="text-primary/60 hover:text-primary outline-none">
                                            <Icons.X className="w-3 h-3" />
                                        </button>
                                    )}
                                </span>
                            ))
                        )}
                    </div>
                    <div className="flex items-center gap-1 flex-none ml-1 border-l border-gray-100 pl-1">
                        {clearable && dates.length > 0 && (
                            <ClearButton onClear={() => { setSelectedDates([]); props.onChange?.([]); }} />
                        )}
                        <AriaButton onPress={() => setIsOpen(!isOpen)} className="p-1 rounded-md text-gray-400 hover:text-gray-600 outline-none transition-colors">
                            <Icons.CalendarDays className={cn(size === "xs" ? "w-3 h-3" : size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6")} />
                        </AriaButton>
                    </div>
                </div>

                <CalendarDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} triggerRef={triggerRef}>
                    <Calendar
                        value={focusedDate}
                        onChange={(date) => { toggleDate(date); setFocusedDate(date); }}
                        className="outline-none"
                    >
                        <CalendarHeader icon={<Icons.CalendarDays className="w-3.5 h-3.5 text-gray-400" />} />
                        <CalendarGridSection variant={variant} />
                        <div className="px-1 pb-1 pt-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 mt-2">
                            <span>{dates.length} ngày đã chọn{maxCount ? ` / ${maxCount}` : ""}</span>
                            <button type="button" onClick={() => setIsOpen(false)} className="text-primary font-semibold hover:underline">Xong</button>
                        </div>
                    </Calendar>
                </CalendarDropdown>
            </div>
            {isInvalid && errorMessage && <p className="text-xs text-danger flex items-center gap-1"><Icons.TriangleAlert className="w-3 h-3" />{errorMessage}</p>}
        </div>
    );
}

// ─── Autocomplete Mode ───────────────────────────────────────────────────────
function AutocompleteDatePicker(props: AutocompleteDateProps) {
    const { label, variant = "primary", size = "md", showTime = "day", className, isDisabled, isInvalid, errorMessage, outputFormat = "CalendarDate", clearable = true, onBlur } = props;
    const [internalValue, setInternalValue] = useState<DateValue | null>(() => fromInputValue(props.defaultValue ?? props.value ?? null, outputFormat, showTime));
    const [textValue, setTextValue] = useState(() => {
        const v = fromInputValue(props.defaultValue ?? props.value ?? null, outputFormat, showTime);
        return v ? v.toString().split("T")[0] : "";
    });
    const [parseError, setParseError] = useState(false);
    const value = props.value !== undefined ? fromInputValue(props.value, outputFormat, showTime) : internalValue;
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);

    const handleCalendarChange = (v: DateValue | null) => {
        let finalVal = v;
        if (v && showTime !== "day" && !("hour" in v)) finalVal = toCalendarDateTime(v as CalendarDate);
        setInternalValue(finalVal);
        setTextValue(finalVal ? finalVal.toString().split("T")[0] : "");
        setParseError(false);
        props.onChange?.(toOutputValue(finalVal, outputFormat));
        if (showTime === "day" && v) setIsOpen(false);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        setTextValue(raw);
        if (!raw) { setInternalValue(null); setParseError(false); props.onChange?.(null); return; }
        try {
            const parsed = parseDate(raw);
            setInternalValue(parsed);
            setParseError(false);
            props.onChange?.(toOutputValue(parsed, outputFormat));
        } catch { setParseError(true); }
    };

    const finalInvalid = isInvalid || parseError;

    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            {label && <Label className="text-sm font-medium text-gray-700 cursor-default">{label}{props.isRequired && <span className="text-danger ml-1">*</span>}</Label>}
            <div className="relative" ref={triggerRef}>
                <DatePicker
                    value={value as any}
                    onChange={handleCalendarChange}
                    onBlur={onBlur}
                    granularity={showTime}
                    hourCycle={24}
                    isDisabled={isDisabled}
                    isInvalid={finalInvalid}
                    aria-label={label || "Gõ ngày"}
                >
                    <Group className={fieldStyles({ variant, size, isDisabled, isInvalid: finalInvalid })}>
                        <div className="flex-1 flex items-center min-w-0 overflow-hidden gap-1 pl-2">
                            <input
                                type="text"
                                value={textValue}
                                onChange={handleTextChange}
                                onBlur={onBlur}
                                placeholder="yyyy-mm-dd"
                                disabled={isDisabled}
                                className={cn(
                                    "flex-1 outline-none bg-transparent min-w-0 tabular-nums",
                                    size === "xs" ? "text-[10px]" : size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base",
                                    !textValue && "text-gray-400"
                                )}
                            />
                            {clearable && (value || textValue) && (
                                <ClearButton onClear={() => { setInternalValue(null); setTextValue(""); setParseError(false); props.onChange?.(null); }} />
                            )}
                        </div>
                        <AriaButton onPress={() => setIsOpen(!isOpen)} className="flex-none p-1 rounded-md text-gray-400 hover:text-gray-600 outline-none transition-colors border-l border-gray-100 ml-1">
                            <Icons.Calendar className={cn(size === "xs" ? "w-3 h-3" : size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6")} />
                        </AriaButton>
                    </Group>
                </DatePicker>
                <CalendarDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} triggerRef={triggerRef}>
                    <Calendar value={value} onChange={handleCalendarChange} className="outline-none">
                        <CalendarHeader />
                        <CalendarGridSection variant={variant} />
                    </Calendar>
                    <TimeSection
                        value={value}
                        showTime={showTime}
                        size={size}
                        onChangeSingle={(v) => {
                            setInternalValue(v);
                            props.onChange?.(toOutputValue(v, outputFormat));
                        }}
                        onNow={() => {
                            const isTimeEnabled = showTime && showTime !== "day";
                            let current: any = isTimeEnabled ? now(getLocalTimeZone()) : today(getLocalTimeZone());
                            if (isTimeEnabled && "timeZone" in current) current = toCalendarDateTime(current);
                            handleCalendarChange(current);
                        }}
                    />
                </CalendarDropdown>
            </div>
            {finalInvalid && (
                <p className="text-xs text-danger flex items-center gap-1">
                    <Icons.TriangleAlert className="w-3 h-3" />
                    {parseError ? "Định dạng không hợp lệ (yyyy-mm-dd)" : errorMessage}
                </p>
            )}
        </div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function InputDate(props: InputDateProps) {
    const mode = props.mode ?? "single";
    if (mode === "range") return <RangeDatePicker {...(props as RangeDateProps)} />;
    if (mode === "multi") return <MultiDatePicker {...(props as MultiDateProps)} />;
    if (mode === "autocomplete") return <AutocompleteDatePicker {...(props as AutocompleteDateProps)} />;
    return <SingleDatePicker {...(props as SingleDateProps)} />;
}
