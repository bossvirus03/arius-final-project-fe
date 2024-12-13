import { useMutation } from "@tanstack/react-query";
import { onUploadFile } from "../modules/admin/services/api";

export const useUploadFile = () => {
  return useMutation({
    mutationFn: ({ file, folder }: { file: File; folder: string }) =>
      onUploadFile(file, folder),
  });
};
