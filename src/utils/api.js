import axios from "axios";

export const getGoogleoAuthInfo = (accessToken, setUseroAuth2Data) => {
  axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    )
    .then((res) => {
      setUseroAuth2Data(res);
      return;
    })
    .catch((err) => alert(`error occurred in google authentication: ${err}`));
};
