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
      <CircleButton color="white" background="black" content={integration} onClick={handleClick} />
    ))}
    <CircleButton color="blue" background="white" content="+" onClick={handleClick} />
  </div>
);

export default IntegrationButtons;

const CircleButton: React.FunctionComponent<{
  background: string;
  color: string;
  content: string;
  onClick: () => void;
}> = ({ background, color, content, onClick }) => (
  <button
    css={css`
      background: ${background};
      color: ${color};
      border-radius: 100%;
      box-shadow: 16px 17px 20px -22px rgba(140, 140, 140, 1);
      width: 40px;
      height: 40px;
    `}
    onClick={onClick}
  >
    {content}
  </button>
);
