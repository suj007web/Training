'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner'; 

export default function ToastHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    const success = searchParams.get('success');

    if (error) toast.error(error);
    if (success) toast.success(success);

    if (error || success) {
      const params = new URLSearchParams(window.location.search);
      params.delete('error');
      params.delete('success');

      const newUrl =
        window.location.pathname + (params.toString() ? `?${params}` : '');
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams]);

  return null;
}
