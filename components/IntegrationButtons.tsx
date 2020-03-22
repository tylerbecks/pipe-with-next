/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as React from "react";
import { Box, Text } from "grommet";

const handleClick = () => {
  console.log("Hey! You clicked me.");
};

const IntegrationButtons: React.FunctionComponent<{ integrations: Array<string> }> = ({ integrations }) => (
  <Box direction="row" align="center" gap="small">
    <Text size="small" color="gray">
      Integrations
    </Text>
    {integrations.map(integration => (
      <CircleButton styles={{ background: "black", color: "white" }} content={integration} onClick={handleClick} />
    ))}
    <CircleButton styles={{ background: "white", color: "blue" }} content="+" onClick={handleClick} />
  </Box>
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
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.2) perspective(1px);
      }
    `}
    onClick={onClick}
  >
    {content}
  </button>
);
