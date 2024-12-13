import { useMutation } from "@tanstack/react-query";
import { onUploadFiles } from "../modules/admin/services/api";

export const useUploadMultifile = () => {
  return useMutation({
    mutationFn: ({ files, folder }: { files: File[]; folder: string }) =>
      onUploadFiles(files, folder),
  });
};
