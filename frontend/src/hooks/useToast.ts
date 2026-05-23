import { useToastStore } from '@/stores/toastStore';

export function useToast() {
  const { addToast, removeToast, toasts } = useToastStore();

  const toast = (message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) => {
    addToast({ message, variant: type, duration });
  };

  return { toast, toasts, removeToast };
}
