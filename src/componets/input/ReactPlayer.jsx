import React from "react";
import ReactPlayer from "react-player";

const ReactPlayers = ({ url }) => {
  return (
    <>
      <ReactPlayer width={"100%"} height={"100%"} controls={true} url={url} />
    </>
  );
};

export default ReactPlayers;
