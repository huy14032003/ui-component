import { Controller, useFormContext } from 'react-hook-form';
import { Input, InputPassword } from '../input/Input';

interface FormInputProps extends Omit<React.ComponentProps<typeof Input>, 'value' | 'onChange' | 'defaultValue'> {
    name: string;
    isPassword?: boolean;
}

export function FormInput({ name, isPassword, ...props }: FormInputProps) {
    const { control } = useFormContext();
    const InputComponent = isPassword ? InputPassword : Input;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className="flex flex-col gap-1 w-full ">
                    <InputComponent
                        {...props}
                        {...field}
                        value={field.value ?? ''}
                        aria-invalid={!!error}
                    />
                    {error && <span className="text-xs text-danger font-medium">{error.message}</span>}
                </div>
            )}
        />
    );
}
