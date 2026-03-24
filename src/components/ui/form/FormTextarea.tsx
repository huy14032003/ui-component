import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@lib/utils/cn';
import { TextField, TextArea, Label } from 'react-aria-components';

interface FormTextareaProps extends Omit<React.ComponentProps<typeof TextArea>, 'className'> {
    name: string;
    label?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    placeholder?: string;
}

const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
};

export function FormTextarea({ name, label, className, placeholder, size = 'md', ...props }: FormTextareaProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
                <TextField className={cn('flex flex-col gap-1 w-full', className)} isInvalid={!!error}>
                    {label && (
                        <Label className={cn("font-medium text-gray-700 cursor-default", size === 'lg' ? 'text-base' : 'text-sm')}>
                            {label}
                        </Label>
                    )}
                    <TextArea
                        {...props}
                        ref={ref}
                        value={value ?? ''}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        className={cn(
                            'border border-gray-300 rounded-md outline-none transition-colors focus:ring-2 focus:ring-primary w-full min-h-[80px]', 
                            sizeClasses[size],
                            error ? 'border-danger focus:ring-danger/50' : 'hover:border-gray-400'
                        )}
                    />
                    {error && <span className="text-xs text-danger font-medium">{error.message}</span>}
                </TextField>
            )}
        />
    );
}
