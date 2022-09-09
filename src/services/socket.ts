import io from "socket.io-client";
import { baseUrl } from "./axios";

export const socket = io(`${baseUrl}`);
