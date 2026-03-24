import { Controller, useFormContext } from 'react-hook-form';
import InputDate from '../datepicker/InputDate';
import { parseDate, parseDateTime, parseAbsoluteToLocal } from '@internationalized/date';
import type { DateValue } from 'react-aria-components';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

interface FormInputDateProps extends Omit<React.ComponentProps<typeof InputDate>, 'value' | 'onChange'> {
    name: string;
    /**
     * Định dạng lưu giá trị khi submit (Ví dụ: 'DD/MM/YYYY HH:mm:ss', 'YYYY-MM-DD', v.v.)
     */
    valueFormat?: 'ISO' | 'DD/MM/YYYY' | 'DD/MM/YYYY HH:mm:ss' | 'YYYY-MM-DD' | 'YYYY-MM-DD HH:mm:ss' | 'DD/MM/YYYY HH:mm' | 'DD/MM/YYYY HH:mm:ss.SSS' | string;
}

const formatDateValue = (val: any, format?: string): any => {
    if (!val) return null;
    
    if (val.start && val.end) {
        return {
            start: formatDateValue(val.start, format),
            end: formatDateValue(val.end, format)
        };
    }

    if (!val.year) return val;

    if (format === 'ISO' || !format) {
        return dayjs(val.toString()).toISOString(); 
    }

    // dayjs có thể đọc trực tiếp chuỗi ISO trả về từ val.toString() của thư viện DateValue
    return dayjs(val.toString()).format(format);
};

const parseStringDate = (str: string, format?: string) => {
    if (!str || typeof str !== 'string') return null;
    try {
        if (format && format !== 'ISO') {
            // Khai báo true ở tham số t3 để parse strict format
            const parsed = dayjs(str, format, true);
            if (parsed.isValid()) {
                const hasTime = format.toLowerCase().includes('h') || format.includes('m') || format.includes('s');
                if (hasTime) {
                    return parseDateTime(parsed.format('YYYY-MM-DDTHH:mm:ss'));
                } else {
                    return parseDate(parsed.format('YYYY-MM-DD'));
                }
            }
        }
        
        // Xử lý chuẩn ISO mạc định fallback
        if (str.includes('T') && str.endsWith('Z')) {
            return parseAbsoluteToLocal(str);
        }
        if (str.includes('T')) {
            return parseDateTime(str.split('.')[0]); 
        }
        // Fallback
        return parseDate(str.split(' ')[0]);
    } catch {
        return null; 
    }
};

const parseInitialValue = (val: any, format?: string) => {
    if (!val) return null;
    if (typeof val === 'object' && val.year) return val; 
    if (typeof val === 'object' && val.start && val.end) {
        return {
            start: typeof val.start === 'string' ? parseStringDate(val.start, format) : val.start,
            end: typeof val.end === 'string' ? parseStringDate(val.end, format) : val.end
        }
    }
    if (typeof val === 'string') {
        return parseStringDate(val, format);
    }
    return val;
};

export function FormInputDate({ name, valueFormat, ...props }: FormInputDateProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
                
                const handleChange = (val: any) => {
                    if (valueFormat) {
                        onChange(formatDateValue(val, valueFormat));
                    } else {
                        onChange(val);
                    }
                };

                const displayValue = valueFormat ? parseInitialValue(value, valueFormat) : value;

                return (
                    <div className="flex flex-col gap-1 w-full">
                        {/* @ts-ignore */}
                        <InputDate
                            {...props}
                            value={displayValue}
                            onChange={handleChange}
                            onBlur={onBlur}
                        />
                        {error && <span className="text-xs text-danger font-medium">{error.message}</span>}
                    </div>
                );
            }}
        />
    );
}
