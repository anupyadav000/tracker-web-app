export const isCookieExpired = (cookieName) => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(cookieName));

  if (!cookie) {
    // Cookie not found
    return true;
  }

  const [, value] = cookie.split("="); // Get the value of the cookie
  const expirationDate = new Date(value); // Convert the value to a Date object

  // Check if the expiration date is in the past
  return expirationDate < new Date();
};

export const ValidateFields = (object) => {
  for (const key in object) {
    const value = object[key];
    switch (key) {
      case "email":
        if (typeof value !== "string") {
          return false; // Invalid email
        }
        break;
      case "password":
        if (typeof value !== "string" || value.trim() === "") {
          return false; // Invalid password
        }
        break;
      default:
        if (typeof value !== "string" || value.trim() === "") {
          return false; // Invalid string field
        }
    }
  }
  return true; // All fields are valid
};

export const getCookieToken = () => {
  // Retrieve the cookie string
  const cookieString = document.cookie;

  // Parse the cookie string to get the token
  const token = cookieString
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  return token;
};
