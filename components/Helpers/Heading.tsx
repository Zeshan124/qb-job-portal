import React from "react";

interface Props {
  mainHeading: string;
  subHeading: string;
}
export const Heading = (props: Props) => {
  return (
    <div className="text-center p-3">
     <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          {props.mainHeading} 
            </h2>
      <p className="mt-[1rem] text-[15px] text-gray-800 text-opacity-80 font-medium">
        {props.subHeading}
      </p>
    </div>
  );
};
