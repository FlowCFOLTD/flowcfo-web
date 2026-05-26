'use client';

import { useMutation } from '@tanstack/react-query';
import { accountsApi } from '@/lib/api/users';

export function useUploadCsv() {
  return useMutation({
    mutationFn: (args: FormData | { formData: FormData; override?: boolean }) => {
      if (args instanceof FormData) {
        return accountsApi.uploadCsv(args);
      }
      return accountsApi.uploadCsv(args.formData, args.override);
    },
  });
}
