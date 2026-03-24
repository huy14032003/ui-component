import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, CheckboxGroup, type CustomCheckboxProps, type CustomCheckboxGroupProps } from '../checkbox/Checkbox';

interface FormCheckboxProps extends Omit<CustomCheckboxProps, 'isSelected' | 'onChange' | 'value'> {
    name: string;
}

export function FormCheckbox({ name, ...props }: FormCheckboxProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <div className="flex flex-col gap-1 w-full">
                    {/* @ts-ignore */}
                    <Checkbox
                        {...props}
                        isSelected={!!value}
                        onChange={onChange}
                        onBlur={onBlur}
                        isInvalid={!!error}
                    />
                    {error && <span className="text-xs text-danger font-medium">{error.message}</span>}
                </div>
            )}
        />
    );
}

interface FormCheckboxGroupProps extends Omit<CustomCheckboxGroupProps, 'value' | 'onChange'> {
    name: string;
}

export function FormCheckboxGroup({ name, ...props }: FormCheckboxGroupProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <div className="flex flex-col gap-1 w-full">
                    {/* @ts-ignore */}
                    <CheckboxGroup
                        {...props}
                        value={Array.isArray(value) ? value : []}
                        onChange={onChange}
                        isInvalid={!!error}
                    />
                    {error && <span className="text-xs text-danger font-medium">{error.message}</span>}
                </div>
            )}
        />
    );
}
