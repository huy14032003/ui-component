import React, { useState } from 'react';
import { Button, FileTrigger } from 'react-aria-components';
import { cn } from '@lib/utils/cn';
import { UploadCloud, X, File as FileIcon } from 'lucide-react';

export interface UploadProps {
    value?: File[];
    onChange?: (files: File[]) => void;
    multiple?: boolean;
    accept?: string;
    maxSize?: number; // in bytes
    maxFiles?: number;
    disabled?: boolean;
    className?: string;
}

export function Upload({
    value = [],
    onChange,
    multiple = false,
    accept,
    maxSize,
    maxFiles,
    disabled = false,
    className
}: UploadProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleSelectFiles = (e: any) => {
        if (!e) return;
        const selectedFiles = Array.from(e) as File[];
        processFiles(selectedFiles);
    };

    const processFiles = (newFiles: File[]) => {
        let files = [...newFiles];
        
        if (maxSize) {
            files = files.filter(f => f.size <= maxSize);
        }

        let nextValue = multiple ? [...value, ...files] : [files[0]];
        nextValue = nextValue.filter(Boolean); // remove undefined

        if (multiple && maxFiles) {
            nextValue = nextValue.slice(0, maxFiles);
        }

        onChange?.(nextValue);
    };

    const removeFile = (index: number) => {
        const nextValue = [...value];
        nextValue.splice(index, 1);
        onChange?.(nextValue);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (disabled) return;
        
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const files = Array.from(e.dataTransfer.files);
            processFiles(files);
        }
    };

    return (
        <div className={cn("w-full flex flex-col gap-2", className)}>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "flex flex-col items-center justify-center w-full min-h-[140px] p-6 border-2 border-dashed rounded-xl transition-colors text-center relative",
                    isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50 bg-gray-50",
                    disabled ? "opacity-50 cursor-not-allowed bg-gray-100/50 hover:border-gray-300" : "cursor-pointer"
                )}
            >
                <div className="flex flex-col items-center gap-2 pointer-events-none">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                        <UploadCloud className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-700">Nhấn để tải lên hoặc kéo thả tệp</p>
                        <p className="text-xs text-gray-500 mt-1">Hỗ trợ các định dạng tệp chuẩn</p>
                    </div>
                </div>
                
                <div className="absolute inset-0 w-full h-full opacity-0">
                    <FileTrigger
                        allowsMultiple={multiple}
                        acceptedFileTypes={accept ? accept.split(',') : undefined}
                        onSelect={handleSelectFiles}
                    >
                        <Button aria-label="Tải lên" isDisabled={disabled} className="w-full h-full cursor-pointer outline-none" />
                    </FileTrigger>
                </div>
            </div>

            {value.length > 0 && (
                <div className="flex flex-col gap-2 mt-2">
                    {value.map((file, i) => (
                        <div key={`${file.name}-${i}`} className="flex items-center justify-between p-2.5 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <FileIcon className="shrink-0 w-5 h-5 text-gray-400" />
                                <div className="flex flex-col min-w-0 text-left">
                                    <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
                                    <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                </div>
                            </div>
                            <button
                                aria-label="Xóa file"
                                type="button"
                                disabled={disabled}
                                onClick={() => removeFile(i)}
                                className={cn("p-1.5 shrink-0 rounded-md text-gray-400 hover:text-danger hover:bg-danger/10 transition-colors outline-none cursor-pointer z-10")}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Upload;
