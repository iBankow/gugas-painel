import io from "socket.io-client";
export const baseUrl = process.env.REACT_APP_API;
const socket = io(`${baseUrl}`)

export { socket };
