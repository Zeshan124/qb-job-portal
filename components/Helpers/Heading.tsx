import React from "react";

interface Props {
  mainHeading: string;
  subHeading: string;
}
export const Heading = (props: Props) => {
  return (
    <div className="text-center p-3">
      <h1 className="text-[#858484]  text-[30px] font-bold">
        {props.mainHeading}
      </h1>
      <p className="mt-[1rem] text-[15px] text-gray-800 text-opacity-80 font-medium">
        {props.subHeading}
      </p>
    </div>
  );
};
