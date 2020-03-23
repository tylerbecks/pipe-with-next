/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Box, Heading, Text, Button } from "grommet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { formatCurrency } from "../utils/format";

interface Props {
  totalARR: number;
  selectedCount: number;
}

const ARRCard: React.FunctionComponent<Props> = ({ totalARR, selectedCount }) => (
  <Box align="center">
    <Heading level={6} margin="none">
      Total Piped Subscriptions
    </Heading>
    <Heading level={2} margin="small">
      {formatCurrency(totalARR)}
    </Heading>
    <Text size="xsmall">{`${selectedCount} Subscriptions`}</Text>
    <Button
      primary
      css={css`
        padding: 1rem 2rem;
        font-size: 0.8rem;
        font-weight: bold;
        margin-top: 1rem;
      `}
    >
      Pipe Subscriptons <FontAwesomeIcon icon={faArrowRight} />
    </Button>
  </Box>
);

export default ARRCard;
