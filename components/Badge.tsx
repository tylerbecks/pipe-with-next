/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { BRAND } from "../styles/colors";
import * as React from "react";

const base = css`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.6rem;
  line-height: 0.8rem;
  font-weight: 600;
  height: 100%;
`;

const primary = css`
  background: ${BRAND};
  color: white;
`;

const secondary = css`
  background: rgb(221, 233, 246);
  color: rgb(0, 96, 254);
`;

type Props = {
  content: React.ReactNode;
  type?: "primary" | "secondary";
};

const Header: React.FunctionComponent<Props> = ({ content, type = "secondary" }) => (
  <span
    css={css`
      ${base};
      ${type === "primary" ? primary : secondary};
    `}
  >
    {content}
  </span>
);

export default Header;
