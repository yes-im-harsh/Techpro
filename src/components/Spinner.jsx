import React from "react";
import { Triangle } from "react-loader-spinner";

const Spinner = () => {
  return (
    <Triangle
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClassName="spinnerNew"
      visible={true}
    />
  );
};

export default Spinner;
