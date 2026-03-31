import * as React from 'react';
import { Popover as BasePopover } from '@base-ui/react';
import { DayPicker, type DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronDown, Clock } from 'lucide-react';
import { tv } from 'tailwind-variants';
import * as locales from "react-day-picker/locale";

import 'react-day-picker/dist/style.css';
import { Button } from '../button/Button';
import { Select } from '../select/Select';
import { Input } from '../input/Input';

const popoverContent = tv({
    base: 'text-center z-50 min-w-[var(--anchor-width)] rounded-md border border-border bg-background p-0 text-foreground shadow-md outline-none data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-side-bottom:slide-in-from-top-2 data-side-left:slide-in-from-right-2 data-side-right:slide-in-from-left-2 data-side-top:slide-in-from-bottom-2'
});

export interface DatePickerProps {
    mode?: 'single' | 'range';
    date?: Date | DateRange;
    onDateChange?: (date: any) => void;
    label?: string;
    placeholder?: string;
    disablePastDates?: boolean;
    showTime?: boolean;
    timePickerStyle?: 'input' | 'select'; // Cả 2 cách
    className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    mode = 'single',
    date,
    onDateChange,
    label,
    placeholder = 'Chọn ngày...',
    disablePastDates = false,
    showTime = false,
    timePickerStyle = 'select',
    className
}) => {
    const [open, setOpen] = React.useState(false);
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    // State for Time
    const [timeStr, setTimeStr] = React.useState<string>("12:00:00");

    React.useEffect(() => {
        if (date && mode === 'single' && date instanceof Date) {
            const h = date.getHours().toString().padStart(2, '0');
            const m = date.getMinutes().toString().padStart(2, '0');
            const s = date.getSeconds().toString().padStart(2, '0');
            setTimeStr(`${h}:${m}:${s}`);
        }
    }, [date, mode]);

    const handleTimeChange = (newTime: string) => {
        setTimeStr(newTime);
        if (date && mode === 'single' && date instanceof Date) {
            const [h, m] = newTime.split(':').map(Number);
            const newDate = new Date(date);
            newDate.setHours(h);
            newDate.setMinutes(m);
            onDateChange?.(newDate);
        }
    };

    const handleDateSelect = (selectedDate: any) => {
        if (!selectedDate) {
            onDateChange?.(selectedDate);
            return;
        }

        if (mode === 'single' && showTime) {
            const [h, m] = timeStr.split(':').map(Number);
            const newDate = new Date(selectedDate);
            newDate.setHours(h || 0);
            newDate.setMinutes(m || 0);
            onDateChange?.(newDate);
            // Don't auto close when time is needed
        } else {
            onDateChange?.(selectedDate);
            if (mode === 'single') setOpen(false);
        }
    };

    const parseDisplayValue = () => {
        if (!date) return <span>{placeholder}</span>;

        if (mode === 'single' && date instanceof Date) {
            return format(date, showTime ? "PPP HH:mm" : "PPP");
        }
        if (mode === 'range') {
            const range = date as DateRange;
            if (range.from && range.to) {
                return <>{format(range.from, "PP")} - {format(range.to, "PP")}</>;
            }
            if (range.from) {
                return format(range.from, "PP");
            }
        }
        return <span>{placeholder}</span>;
    };

    const hoursOptions = Array.from({ length: 24 }, (_, i) => ({ label: i.toString().padStart(2, '0'), value: i.toString().padStart(2, '0') }));
    const minutesOptions = Array.from({ length: 60 }, (_, i) => ({ label: i.toString().padStart(2, '0'), value: i.toString().padStart(2, '0') }));
    const secondsOptions = Array.from({ length: 60 }, (_, i) => ({ label: i.toString().padStart(2, '0'), value: i.toString().padStart(2, '0') }));

    return (
        <div className={`flex flex-col gap-1.5 w-full ${className || ''}`}>
            {label && <label className="text-sm font-medium text-foreground">{label}</label>}
            <BasePopover.Root open={open} onOpenChange={setOpen}>
                <BasePopover.Trigger render={
                    <Button
                        ref={triggerRef}
                        variant="outline"
                        className={`w-full justify-start text-left font-normal group ${!date ? "text-muted-foreground" : ""}`}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                        <div className="flex-1 truncate">{parseDisplayValue()}</div>
                        <ChevronDown className="h-4 w-4 opacity-50 shrink-0 transition-transform duration-200 group-data-open:rotate-180 ml-2" />
                    </Button>
                } />
                <BasePopover.Portal>
                    <BasePopover.Positioner anchor={triggerRef} sideOffset={4} className="z-50">
                        <BasePopover.Popup className={popoverContent()}>
                            <div className="p-3 pb-0 flex justify-center w-full">
                                <DayPicker
                                    locale={locales.vi}
                                    mode={mode as any}
                                    selected={date as any}
                                    onSelect={handleDateSelect}
                                    disabled={disablePastDates ? [{ before: new Date() }] : undefined}
                                />
                            </div>

                            {showTime && mode === 'single' && (
                                <div className="border-t border-border p-3 flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                        <Clock className="w-4 h-4" /> Chọn giờ
                                    </div>
                                    {timePickerStyle === 'input' ? (
                                        <Input
                                            type="time"
                                            value={timeStr}
                                            onChange={(e) => handleTimeChange(e.target.value)}
                                            className="h-8 w-full"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-2 w-full">
                                            <Select
                                                options={hoursOptions}
                                                value={timeStr.split(':')[0]}
                                                onValueChange={(val) => handleTimeChange(`${val}:${timeStr.split(':')[2]}`)}
                                            />
                                            <span className="font-bold">:</span>
                                            <Select
                                                options={minutesOptions}
                                                value={timeStr.split(':')[1]}
                                                onValueChange={(val) => handleTimeChange(`${timeStr.split(':')[0]}:${val}`)}
                                            />

                                            <Select
                                                options={secondsOptions}
                                                value={timeStr.split(':')[2]}
                                                onValueChange={(val) => handleTimeChange(`${timeStr.split(':')[0]}:${timeStr.split(':')[1]}:${val}`)}
                                            />

                                        </div>
                                    )}
                                </div>
                            )}

                            {showTime && mode === 'single' && (
                                <div className="p-3 border-t border-border flex justify-end">
                                    <Button size="sm" onClick={() => setOpen(false)}>Xác nhận</Button>
                                </div>
                            )}
                        </BasePopover.Popup>
                    </BasePopover.Positioner>
                </BasePopover.Portal>
            </BasePopover.Root>
        </div>
    )
}
