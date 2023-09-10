import React, { FC } from "react";
import ReactPlayer from "react-player";

type ReactPlayerProps = {
  url: string;
};

const ReactPlayers: FC<ReactPlayerProps> = ({ url }) => {
  return (
    <>
      <ReactPlayer width={"100%"} height={"100%"} controls={true} url={url} />
    </>
  );
};

export default ReactPlayers;
