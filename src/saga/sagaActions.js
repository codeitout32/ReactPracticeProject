import axios from "axios";

const headers = {
  "Content-type": "application/json",
  Authorization: `Bearer ${process.env.REACT_APP_M3OTOKEN}`,
};

export const strUpdate = (user) => {
  console.log("hello from update saga action");
  try {
    axios
      .post("https://api.m3o.com/v1/user/Update", user, {
        headers,
      })
      .then((res) => {
        const data = res.data;
        return data;
      })
      .then((data) => console.log("action strUpdate", data))
      .then(() => {
        console.log("going to fetching");
        return true;
      });
  } catch (error) {
    if (error.response) console.log(error.response.data);
    else console.log(error.message);
    return false;
  }

  // console.log("action strUpdate", data);
};

export const fetchApiList = async () => {
  //   const qckDispatch = useDispatch();

  console.log("hello fetching list");
  const limits = {
    limit: 100,
    offset: 0,
  };

  try {
    const res = await axios.post("https://api.m3o.com/v1/user/List", limits, {
      headers,
    });
    const data = res.data.users;

    console.log("dispatching list");
    //   qckDispatch(setList(data));
    return data;
  } catch (error) {
    if (error.response) console.log(error.response.data);
    else console.log(error.message);
  }
};
