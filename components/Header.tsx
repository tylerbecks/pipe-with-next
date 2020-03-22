/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { Box } from "grommet";
import Link from "next/link";

const PIPE_LOGO_URL = "https://assets.website-files.com/5e4356a26cd54f45a392c6de/5e4356a26cd54ff05192c76e_logo.svg";

const Header: React.FunctionComponent<{}> = () => (
  <Box
    tag="header"
    direction="row"
    align="center"
    background="white"
    pad={{ vertical: "small", horizontal: "medium" }}
    elevation="small"
  >
    <nav>
      <Link href="/">
        <img src={PIPE_LOGO_URL} alt="Pipe's Logo" />
      </Link>
    </nav>
  </Box>
);

export default Header;
