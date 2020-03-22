/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { LIGHT_GRAY } from "../styles/colors";
import * as React from "react";
import { Anchor, Button, Box, Grid, Header, Nav } from "grommet";
import Link from "next/link";

const PIPE_LOGO_URL = "https://assets.website-files.com/5e4356a26cd54f45a392c6de/5e4356a26cd54ff05192c76e_logo.svg";

const MyHeader: React.FunctionComponent<{}> = () => (
  <Header background="white" pad={{ vertical: "small", horizontal: "medium" }} elevation="small">
    <Grid
      align="center"
      gap="small"
      columns={["15%", "70%", "15%"]}
      rows={["auto"]}
      areas={[
        { name: "left", start: [0, 0], end: [0, 0] },
        { name: "middle", start: [1, 0], end: [1, 0] },
        { name: "right", start: [2, 0], end: [2, 0] }
      ]}
      fill="horizontal"
    >
      <Box direction="row" gridArea="left" justify="end" gap="medium">
        <Link href="/">
          <img src={PIPE_LOGO_URL} alt="Pipe's Logo" />
        </Link>
        <Divider />
      </Box>

      <Box direction="row" justify="between" gridArea="middle" align="center" gap="small">
        <Nav direction="row">
          <Anchor href="#">Sync Subscriptions</Anchor>
          <Anchor href="#">All Subscriptions</Anchor>
        </Nav>

        <FontAwesomeIcon
          css={css`
            margin-left: auto;
          `}
          icon={faSearch}
        />

        <Divider />
      </Box>

      <Box direction="row" gridArea="right">
        <Button size="medium" alignSelf="center">
          <Box direction="row">
            <img
              css={css`
                width: 20px;
                margin-right: 5px;
              `}
              src="https://image.flaticon.com/icons/png/512/889/889159.png"
              alt="Yammer logo"
            />
            Yammer
          </Box>
        </Button>
      </Box>
    </Grid>
  </Header>
);

const Divider = () => (
  <div
    css={css`
      border-left: 2px solid ${LIGHT_GRAY};
      border-radius: 1px;
      height: 30px;
    `}
  />
);

export default MyHeader;
