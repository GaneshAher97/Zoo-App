import React from "react";

export default React.createContext({
  userDetails: null,
  setUserData: (data) => {},
  unsetUserData: () => {},
});
