import { Box, Heading, RangeInput } from "grommet";
import Badge from "./Badge";

interface Props {
  totalFormattedMRR: string;
  selectedCount: number;
  totalCount: number;
  onSlideSelector: (count: number) => void;
}

const MRRCard: React.FunctionComponent<Props> = ({ totalFormattedMRR, selectedCount, totalCount, onSlideSelector }) => (
  <Box align="center">
    <Heading level={6} margin="none">
      MRR for New Subscriptions
    </Heading>
    <Box direction="row" align="center" gap="small">
      <Heading color="light-4" level={2} margin={{ vertical: "small" }}>
        {totalFormattedMRR}
      </Heading>
      <Badge content={`${selectedCount} Subscriptions`} type="primary" />
    </Box>
    <RangeInput
      value={selectedCount}
      min={0}
      max={totalCount}
      onChange={(event: any) => onSlideSelector(event.target.value - selectedCount)}
    />
  </Box>
);

export default MRRCard;
