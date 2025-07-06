import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: string | null) => {
  try {
    if (!token) return null;

    // Remove "Bearer " if present
    const extractedToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    // Basic JWT format validation
    if (extractedToken.split(".").length !== 3) {
      return null;
    }

    return jwtDecode(extractedToken);
  } catch {
    return null;
  }
};
