import React from "react";
  
const login = () => {
  return (
    <div>
     <form>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <div>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
  
export default login;