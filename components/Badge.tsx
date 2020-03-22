/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as React from "react";

const style = css`
  background: rgb(221, 233, 246);
  color: rgb(0, 96, 254);
  padding: 10px;
  border-radius: 20px;
  font-size: 0.8rem;
`;

type Props = {
  content: string;
};

const Header: React.FunctionComponent<Props> = ({ content }) => <span css={style}>{content}</span>;

export default Header;
