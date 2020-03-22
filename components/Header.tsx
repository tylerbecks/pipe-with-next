/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as React from "react";
import Link from "next/link";

const PIPE_LOGO_URL = "https://assets.website-files.com/5e4356a26cd54f45a392c6de/5e4356a26cd54ff05192c76e_logo.svg";
const headerStyle = css`
  background: white;
  box-shadow: 3px 0 5px rgb(225, 229, 237);
  display: flex;
  align-items: center;
  padding: 15px;
`;

const Header: React.FunctionComponent<{}> = () => (
  <header css={headerStyle}>
    <nav>
      <Link href="/">
        <img src={PIPE_LOGO_URL} alt="Pipe's Logo" />
      </Link>
    </nav>
  </header>
);

export default Header;
