import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { tv, type VariantProps } from 'tailwind-variants';
import * as Icons from '@components/icons';
import { cn } from '@lib/utils/cn';
import { Button } from '../button';

/**
 * Modal variants using tailwind-variants
 */
const modalVariants = tv({
  slots: {
    overlay: 'fixed inset-0 z-50 bg-black/10 backdrop-blur-xs data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    content: 'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 p-0 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95  rounded-lg ',
    header: 'flex flex-col space-y-1.5 text-center sm:text-left px-6 py-4 border-b border-white/10',
    footer: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 px-6 py-2 border-t border-white/10  rounded-b-lg',
    title: 'text-lg font-semibold leading-none tracking-tight',
    description: 'text-sm text-slate-500 dark:text-slate-400',
    close: 'absolute right-4 top-4 rounded-full p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:bg-white/10',
  },
  variants: {
    variant: {
      solid: {
        content: 'bg-white dark:bg-white/80 border border-slate-200 dark:border-white/80 ',
      },
      glass: {
        content: 'bg-white/70 dark:bg-white/70 backdrop-blur-2xl border border-white/20 dark:border-white/10 ',
        header: 'border-white/10',
        footer: 'border-white/10 bg-white/5',
      },
    },
  },
  defaultVariants: {
    variant: 'glass',
  },
});

export interface ModalProps extends VariantProps<typeof modalVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  okButtonProps?: any; // Partial<ButtonProps>
  cancelButtonProps?: any; // Partial<ButtonProps>
  confirmLoading?: boolean;
  width?: string | number;
  className?: string;
  showCloseButton?: boolean;
  maskClosable?: boolean;
}

export const Modal = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  onOk,
  onCancel,
  okText = 'Xác nhận',
  cancelText = 'Hủy',
  okButtonProps,
  cancelButtonProps,
  confirmLoading = false,
  width = 520,
  variant = 'glass',
  className,
  showCloseButton = true,
  maskClosable = true,
}: ModalProps) => {
  const styles = modalVariants({ variant });

  const handleCancel = () => {
    onCancel?.();
    onOpenChange?.(false);
  };

  const handleOk = async () => {
    if (onOk) {
      await onOk();
    }
  };

  const internalFooter = footer === null ? null : (
    footer || (
      <div className={styles.footer()}>
        <Button
          variant="outline"
          size="md"
          onClick={handleCancel}
          {...cancelButtonProps}
        >
          {cancelText}
        </Button>
        <Button
          variant="solid"
          color="primary"
          size="md"
          onClick={handleOk}
          isLoading={confirmLoading}
          {...okButtonProps}
        >
          {okText}
        </Button>
      </div>
    )
  );

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={styles.overlay()} />
        <DialogPrimitive.Content
          className={cn(styles.content(), className)}
          style={{ width: typeof width === 'number' ? `${width}px` : width, maxWidth: '95vw' }}
          onPointerDownOutside={(e) => {
            if (!maskClosable) e.preventDefault();
          }}
        >
          {(title || description) && (
            <div className={styles.header()}>
              {title && (
                <DialogPrimitive.Title className={styles.title()}>
                  {title}
                </DialogPrimitive.Title>
              )}
              {description && (
                <DialogPrimitive.Description className={styles.description()}>
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>
          )}

          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {children}
          </div>

          {internalFooter}

          {showCloseButton && (
            <DialogPrimitive.Close className={styles.close()}>
              <Icons.Plus className="w-5 h-5 rotate-45" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

// Sub-components for flexible usage
Modal.Header = ({ children, className, variant }: any) => {
  const styles = modalVariants({ variant });
  return <div className={cn(styles.header(), className)}>{children}</div>;
};

Modal.Content = ({ children, className }: any) => {
  return <div className={cn('px-6 py-4', className)}>{children}</div>;
};

Modal.Footer = ({ children, className, variant }: any) => {
  const styles = modalVariants({ variant });
  return <div className={cn(styles.footer(), className)}>{children}</div>;
};

Modal.displayName = 'Modal';