import { type CSSProperties, type JSX } from 'react';
import {
  UNSTABLE_ToastRegion as ToastRegion,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastContent as ToastContent,
  type ToastProps,
  Button,
  Text
} from 'react-aria-components';
import { flushSync } from 'react-dom';
import { cn } from '@lib/utils/cn';
import * as Icon from '@components/icons';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error' | 'default';
export type ToastPlacement =
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface ToastContent {
  title: string;
  description?: string;
  variant?: ToastVariant;
}

const variantConfig: Record<ToastVariant, { bg: string; icon: JSX.Element }> = {
  info:    { bg: 'bg-blue-600',   icon: <Icon.Bell className="w-4 h-4 text-white shrink-0" /> },
  success: { bg: 'bg-emerald-600', icon: <Icon.Check className="w-4 h-4 text-white shrink-0" /> },
  warning: { bg: 'bg-amber-500',  icon: <Icon.TriangleAlert className="w-4 h-4 text-white shrink-0" /> },
  error:   { bg: 'bg-red-600',    icon: <Icon.X className="w-4 h-4 text-white shrink-0" /> },
  default: { bg: 'bg-neutral-800', icon: <Icon.Bell className="w-4 h-4 text-white shrink-0" /> },
};

const placementClass: Record<ToastPlacement, string> = {
  'top-left':      'fixed top-4 left-4    flex flex-col     gap-2',
  'top-center':    'fixed top-4 left-1/2 -translate-x-1/2  flex flex-col     gap-2',
  'top-right':     'fixed top-4 right-4   flex flex-col     gap-2',
  'bottom-left':   'fixed bottom-4 left-4  flex flex-col-reverse gap-2',
  'bottom-center': 'fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col-reverse gap-2',
  'bottom-right':  'fixed bottom-4 right-4 flex flex-col-reverse gap-2',
};

export const toastQueue = new ToastQueue<ToastContent>({
  wrapUpdate(fn) {
    if ('startViewTransition' in document) {
      document.startViewTransition(() => { flushSync(fn); });
    } else {
      fn();
    }
  }
});

/** Hàm tiện ích gọi toast nhanh */
export const toast = {
  show: (content: ToastContent, timeout = 4000) => toastQueue.add(content, { timeout }),
  info:    (title: string, description?: string, timeout = 4000) => toastQueue.add({ title, description, variant: 'info' }, { timeout }),
  success: (title: string, description?: string, timeout = 4000) => toastQueue.add({ title, description, variant: 'success' }, { timeout }),
  warning: (title: string, description?: string, timeout = 4000) => toastQueue.add({ title, description, variant: 'warning' }, { timeout }),
  error:   (title: string, description?: string, timeout = 4000) => toastQueue.add({ title, description, variant: 'error' }, { timeout }),
};

export interface ToastRegionProps {
  placement?: ToastPlacement;
}

export function MyToastRegion({ placement = 'bottom-right' }: ToastRegionProps) {
  return (
    <ToastRegion
      queue={toastQueue}
      className={cn(
        placementClass[placement],
        'z-9999 outline-none w-[300px]'
      )}
    >
      {({ toast: t }) => {
        const variant = t.content.variant ?? 'default';
        const { bg, icon } = variantConfig[variant];
        return (
          <Toast
            toast={t}
            style={{ viewTransitionName: t.key } as CSSProperties}
            className={cn(
              'flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg outline-none',
              '[view-transition-class:toast]',
              'entering:animate-in entering:slide-in-from-right-4 entering:fade-in entering:duration-200',
              'exiting:animate-out exiting:slide-out-to-right-4 exiting:fade-out exiting:duration-150',
              bg
            )}
          >
            <div className="pt-0.5">{icon}</div>
            <ToastContent className="flex flex-col flex-1 min-w-0">
              <Text slot="title" className="font-semibold text-white text-sm leading-snug">{t.content.title}</Text>
              {t.content.description && (
                <Text slot="description" className="text-xs text-white/80 mt-0.5 leading-snug">{t.content.description}</Text>
              )}
            </ToastContent>
            <Button
              slot="close"
              aria-label="Đóng"
              className="shrink-0 w-6 h-6 flex items-center justify-center rounded-md bg-transparent text-white/70 hover:text-white hover:bg-white/15 outline-none transition-colors"
            >
              <Icon.X className="w-3.5 h-3.5" />
            </Button>
          </Toast>
        );
      }}
    </ToastRegion>
  );
}

/** @deprecated Dùng toastQueue hoặc toast.* thay thế */
export const queue = toastQueue;
/** @deprecated Dùng MyToastRegion thay thế */
export function MyToast(props: ToastProps<ToastContent>) {
  return null;
}
