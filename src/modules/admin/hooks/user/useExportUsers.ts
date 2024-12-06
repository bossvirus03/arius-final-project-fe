import { useMutation } from "@tanstack/react-query";
import { onExportUsers } from "../../services/api";
import { message } from "antd";
import dayjs from "dayjs";

function useExportUsers() {
  const mutation = useMutation({
    mutationFn: onExportUsers,
    onSuccess: (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${dayjs().format("YYYY-MM-DD")}_users-export.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    onError: (error) => {
      console.error("Export error:", error);
      message.error("Failed to export users");
    },
  });

  const { mutate, isPending, isError, isSuccess, error } = mutation;
  return {
    exportUsers: mutate,
    isExporting: isPending,
    isExportUsersError: isError,
    isExportUsersSuccess: isSuccess,
    ExportUsersError: error,
  };
}

export default useExportUsers;
