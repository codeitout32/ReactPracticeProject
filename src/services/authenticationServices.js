import axios from "axios";

const headers = {
  "Content-type": "application/json",
  Authorization: `Bearer ${process.env.REACT_APP_M3OTOKEN}`,
};

export const registerService = async (user) => {
  console.log("register api", user);

  const res = await axios.post(
    "https://api.m3o.com/v1/user/Create",
    user.payload,
    {
      headers,
    }
  );

  // const res = await axios({ method: "post", headers, url: "https://api.m3o.com/v1/user/Create",
  // data: user});

  console.log(res.data);
  return res.data;
  //   } catch (error) {
  //     console.log(error.response.data);
  //     return error;
  //   }
};
