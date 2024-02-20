import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
function LogoutBtn() {
  const { logOut, loading } = useLogout();
  return (
    <div className=" mt-auto">
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logOut}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
}

export default LogoutBtn;

{
  /* <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
<span className="loading loading-spinner"></span> */
}
