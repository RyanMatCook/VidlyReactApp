import React from "react";

const Like = props => {
  return (
    <div onClick={props.onClick}>
      <i
        style={{ cursor: "pointer" }}
        className={props.liked ? "fa fa-heart" : "fa fa-heart-o"}
        aria-hidden="true"
      />
    </div>
  );
};

export default Like;
