import axios from "axios";

export const post = async (url: string, params = {}) => {
  return await axios({
    method: "post",
    url,
    data: params,
  });
};
