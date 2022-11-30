import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Loading from "./loading";
import Toast from "./toast";

const Alert = () => {
  // const state = useSelector(state => state)
  const { alert } = useSelector((state) => state);
  // console.log({alert})
  const dispatch = useDispatch()
  return (
    <div>
      {/* <Loading /> */}
      {alert.loading && <Loading />}

      {alert.error && (
        <Toast
          msg={{ title: "Error", body: alert.error }}
          handleShow={() => dispatch({type: GLOBALTYPES.ALERT , payload: {}})}
          bgColor="bg-danger"
        />
      )}
      {alert.success && (
        <Toast
          msg={{ title: "Success", body: alert.success }}
          handleShow={() => dispatch({type: GLOBALTYPES.ALERT , payload: {}})}
          bgColor="bg-success"
        />
      )}
    </div>
  );
};

export default Alert;
