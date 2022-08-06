import React, { createContext, useContext, useReducer } from "react";

const SET_USER = "user/set";
const REMOVE_USER = "user/remove";

const initialValues = {};

export const UserContext = createContext(null);

export const setUser = (user: any) => ({
  type: SET_USER,
  user: user,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

const reducer = (state: any, action: { type: any; user: any }) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case REMOVE_USER:
      return {};
  }
};

function UserProvider({ children }: { children: React.ReactElement }) {
  const [state, dispatch] = useReducer(reducer, initialValues);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
