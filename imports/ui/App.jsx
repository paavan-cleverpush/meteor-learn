import React from "react";
// import { Hello } from "./Hello.jsx";
import { Info } from "./Info.jsx";
import { useTracker } from "meteor/react-meteor-data";
import { LoginForm } from "./LoginForm";

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();
  return (
    <div className="main">
      {user ? (
        <div>
          <h1>Welcome to Meteor!</h1>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-end",
              margin: "8px 16px 0",
              fontWeight: "bold",
            }}
            onClick={logout}
          >
            {user.username} 🚪
          </div>
          {/* <Hello /> */}
          <Info user={user} />
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};
