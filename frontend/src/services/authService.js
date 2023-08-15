import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000/api/users"
    : "https://panicky-robe-mite.cyclic.app/api/users";

async function login(email, password) {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      {
        email,
        password,
      },
      { withCredentials: true, credentials: "include" }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function registerUser(data) {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  // console.log(Object.fromEntries(formData))
  const configMultiForm = {
    headers: {
      "Accept": "application/json",
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
    credentials: "include",
  };
  try {
    const response = await axios.post(
      `${BASE_URL}/register`,
      formData,
      configMultiForm
    );

    return response;
  } catch (error) {
    return error;
  }
}

async function verifyOTP(data) {
  try {
    const response = await axios.post(`${BASE_URL}/verifyotp`, data, {
      withCredentials: true,
      credentials: "include",
    });

    return response;
  } catch (error) {
    return error;
  }
}

async function logout() {
  try {
    const response = await axios.post(`${BASE_URL}/logout`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function forgotPassword(email) {
  const body = { email };
  try {
    const response = await axios.post(`${BASE_URL}/forgotpassword`, body, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function resetPassword(newPassword, confirmNewPassword, email, otp) {
  const body = { newPassword, confirmNewPassword, email, otp };

  try {
    const response = await axios.post(`${BASE_URL}/resetpassword`, body, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

// async function uploadProfilePloto(formData) {
//   try {
//     const configMultiForm = {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "multipart/form-data",
//       },
//     };

//     const response = await axios.post(
//       `${BASE_URL}/uploadphoto`,
//       formData,
//       configMultiForm
//     );

//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// }

export default {
  login,
  registerUser,
  verifyOTP,
  logout,
  forgotPassword,
  resetPassword,
  // uploadProfilePloto
};
