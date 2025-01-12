import httpServices from "./httpServices";

export const loginService = async (payload) => {
  const response = await httpServices.post("/login", payload);
  if (
    response.data?.email === payload.email &&
    response.data?.password === payload.password
  ) {
    // Generate a mock JWT token (in real scenarios, backend does this)
    const token = btoa(`${payload.email}:${payload.password}`);
    return { token, user: response.data };
  } else {
    throw new Error("Invalid email or password");
  }
};

// export const loginService = (payload) => {
//   return httpServices.post("/login", payload);
// };
