import React from "react";

const Like = ({ liked, onClick }) => {
  return (
    <div onClick={onClick}>
      <i
        style={{ cursor: "pointer" }}
        className={liked ? "fa fa-heart" : "fa fa-heart-o"}
        aria-hidden="true"
      />
    </div>
  );
};

export default Like;
