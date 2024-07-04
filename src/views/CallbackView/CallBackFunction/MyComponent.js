import React from "react";

const MyComponent = ({ row }) => {
  console.log("MyComponent:", row);
  return <div>{row()}</div>;
};

export default MyComponent;
