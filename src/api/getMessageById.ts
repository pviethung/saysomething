import { axiosInstance } from "@/api/axios";
import { tryCatch } from "@/utils";

const getMessageById = (id: string) => {
  return tryCatch(async () => {
    const res = await axiosInstance.get(`messages/${id}`);
  });
};
export { getMessageById };
