import { axiosInstance } from './axios';
export const getTodos = async () => {
  try {
    const res = await axiosInstance.get('Todo', {
      params: {
        select: '*',
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    // TODO hanldeError
  }
};
