export const handleError = (error: any) => {
  switch (error?.response?.request?.status) {
    case 400:
      console.log(
        error?.response?.data?.message ||
          error?.data?.message ||
          "Verified code is invalid",
      );
      break;
    case 401:
      console.log("User is not verified");
      break;
    case 403:
      console.log(error?.response?.data?.message || error?.data?.message);
      break;
    case 404:
      console.log("Not Found");
      break;
    case 500:
      console.log("Sever Error");
      break;
    case 503:
      console.log("Service Unavailable");
      break;
  }
};
