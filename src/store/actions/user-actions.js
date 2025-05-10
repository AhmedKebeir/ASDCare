import axios from "axios";
import Cookie from "cookie-universal";
import { BaseUrl, CREATEPARENT, GETCHILDFORUSER } from "../../Api/Api";

export const GETUSERCHILDS = "GET-CHILDS";

export const GET_CHILDS_FOR_USER = "GET_CHILDS_FOR_USER";
export const SET_CHILDS_FOR_USER = "SET_CHILDS_FOR_USER";

export const Log_Out = "LogOut";

export const getuser = () => {
  return async (dispatch) => {
    try {
      const cookie = Cookie();

      const user = cookie.get("userDetails");

      // تحقق مما إذا كانت البيانات نصًا قبل محاولة JSON.parse
      let parsedUser = {};

      if (typeof user === "string") {
        try {
          parsedUser = JSON.parse(user);
        } catch (error) {
          console.error("❌ خطأ في تحويل JSON:", error);
        }
      } else if (typeof user === "object" && user !== null) {
        parsedUser = user; // إذا كان بالفعل كائن، استخدمه كما هو
      }
      const res = await axios.get(
        `${BaseUrl}/${CREATEPARENT}/${parsedUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        }
      );
      dispatch({
        type: SET_CHILDS_FOR_USER,
        payload: res,
      });
    } catch (err) {}
  };
};

export const logOut = () => {
  return {
    type: Log_Out,
  };
};
