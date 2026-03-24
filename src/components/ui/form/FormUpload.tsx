import { Controller, useFormContext } from 'react-hook-form';
import { Upload } from '../upload/Upload';

interface FormUploadProps extends Omit<React.ComponentProps<typeof Upload>, 'value' | 'onChange'> {
    name: string;
    label?: string;
}

export function FormUpload({ name, label, ...props }: FormUploadProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <div className="flex flex-col gap-1 w-full">
                    {label && <label className="font-medium text-gray-700 text-sm">{label}</label>}
                    <Upload
                        {...props}
                        value={value || []}
                        onChange={onChange}
                    />
                    {error && <span className="text-xs text-danger font-medium">{error.message}</span>}
                </div>
            )}
        />
    );
}
