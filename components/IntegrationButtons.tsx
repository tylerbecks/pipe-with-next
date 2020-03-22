/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as React from "react";

const handleClick = () => {
  console.log("Hey! You clicked me.");
};

const IntegrationButtons: React.FunctionComponent<{ integrations: Array<string> }> = ({ integrations }) => (
  <div
    css={css`
      & button {
        margin-right: 10px;
      }
    `}
  >
    <span>Integrations</span>
    {integrations.map(integration => (
      <CircleButton styles={{ background: "black", color: "white" }} content={integration} onClick={handleClick} />
    ))}
    <CircleButton styles={{ background: "white", color: "blue" }} content="+" onClick={handleClick} />
  </div>
);

export default IntegrationButtons;

const CircleButton: React.FunctionComponent<{
  styles: {};
  content: string;
  onClick: () => void;
}> = ({ styles, content, onClick }) => (
  <button
    css={css`
      ${styles}
      border-radius: 100%;
      width: 40px;
      height: 40px;
      font-size: 0.6rem;
      text-align: center;
      font-weight: bold;
      cursor: pointer;
    `}
    onClick={onClick}
  >
    {content}
  </button>
);
