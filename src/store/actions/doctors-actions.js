import axios from "axios";
import { BaseUrl, GETAllDOCTORS } from "../../Api/Api";
import Cookie from "cookie-universal";

export const Get_All_Doctors = "Get-Doctors";

export const getdoctors = () => {
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
        `${BaseUrl}/${GETAllDOCTORS}?sort=-ratingsAverage`,
        {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        }
      );
      dispatch({
        type: Get_All_Doctors,
        payload: res,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
