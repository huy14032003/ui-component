import { Controller, useFormContext } from 'react-hook-form';
import { CustomSelect, MultiSelect, AutocompleteSelect } from '../select/Select';
import type { Key } from 'react-aria-components';

interface BaseFormSelectProps {
    name: string;
    options: any[];
    label?: string;
    placeholder?: string;
    className?: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
}

type FormSelectProps = BaseFormSelectProps & (
    | { selectType?: 'default' | 'autocomplete' }
    | { selectType: 'multi' }
);

export function FormSelect({ name, selectType = 'default', ...props }: FormSelectProps) {
    const { control } = useFormContext();

    const Component = selectType === 'multi' ? MultiSelect : selectType === 'autocomplete' ? AutocompleteSelect : CustomSelect;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
                // Determine value prop names based on select type
                const valueProps = selectType === 'multi' 
                    ? { selectedKeys: Array.isArray(value) ? value : (value ? [value] : []) }
                    : { selectedKey: value as Key | null };

                return (
                    <div className="flex flex-col gap-1 w-full">
                        {/* @ts-ignore */}
                        <Component
                            {...props}
                            {...valueProps}
                            onChange={onChange}
                            isInvalid={!!error}
                        />
                        {error && <span className="text-xs text-danger font-medium">{error.message}</span>}
                    </div>
                );
            }}
        />
    );
}
