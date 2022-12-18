import React from "react";

function Loading({text}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="m-auto flex flex-col gap-3">
      <p className="text-text m-auto">{text}</p>
    <div className=" m-auto w-12 h-12 border-4 animate-spin border-text border-t-text/25 rounded-full"></div>
    </div></div>
  );
}

export default Loading;
