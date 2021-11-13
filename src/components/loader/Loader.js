import React from "react";
import ReactLoading from "react-loading";

export default function Loader() {
  return (
    <div class="loader">
      <ReactLoading type={"bars"} color={"white"} />
    </div>
  );
}
