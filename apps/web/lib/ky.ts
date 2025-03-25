import ky from "ky";

const baseURL = process.env.API_URL || "http://localhost:3000";

export const apiInstance = ky.create({
  prefixUrl: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
