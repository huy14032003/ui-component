import { Controller, useFormContext } from 'react-hook-form';
import { RadioGroup, type CustomRadioGroupProps } from '../radio/Radio';
export { Radio } from '../radio/Radio';

interface FormRadioGroupProps extends Omit<CustomRadioGroupProps, 'value' | 'onChange'> {
    name: string;
}

export function FormRadioGroup({ name, ...props }: FormRadioGroupProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <div className="flex flex-col gap-1 w-full">
                    {/* @ts-ignore */}
                    <RadioGroup
                        {...props}
                        value={value ?? ''}
                        onChange={onChange}
                        isInvalid={!!error}
                    />
                    {error && <span className="text-xs text-danger font-medium">{error.message}</span>}
                </div>
            )}
        />
    );
}
