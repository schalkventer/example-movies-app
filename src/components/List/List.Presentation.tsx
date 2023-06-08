import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { Preview } from "../Preview";

import {
  CssBaseline,
  Button,
  Typography,
  Skeleton,
  Alert,
} from "@mui/material";

const global = css`
  body {
    background: #eee;
  }
`;

const InnerList = styled.ul`
  padding: 0;
  list-style: none;
`;

export type Presentation = {
  phase: "LISTING" | "LOADING" | "ERROR" | "CONFIGURING";
  movies: (Preview & { id: number })[];
  filter: string;
  onToggleConfigure: () => void;
  configuration: JSX.Element;
  onSelect: (id: number) => void;
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled.div`
  max-width: 30rem;
  margin: 0 auto;
  padding: 1rem;
`;

const StyledSkeleton = styled(Skeleton)`
  margin: 1rem 0;
  height: 8rem;
  width: 100%;
  border-radius: 4px;
`;

export const Presentation = (props: Presentation) => {
  const {
    movies,
    phase,
    filter: filterString,
    configuration,
    onToggleConfigure,
    onSelect,
  } = props;

  return (
    <Wrapper>
      <CssBaseline />
      <Global styles={global} />
      {phase === "CONFIGURING" && configuration}

      <Row>
        <Typography>
          <strong>Movies App</strong>
        </Typography>

        <Button
          disabled={phase !== "LISTING"}
          variant="contained"
          onClick={onToggleConfigure}
        >
          Filter List
        </Button>
      </Row>

      <InnerList>
        {phase === "LISTING" &&
          movies
            .filter((item) => {
              if (filterString.trim() === "") return true;

              return item.title
                .toLowerCase()
                .includes(filterString.toLowerCase());
            })
            .map(({ id, release: releaseAsString, ...innerProps }) => {
              const release = new Date(releaseAsString);
              const clickHandler = () => onSelect(id);

              return (
                <div onClick={clickHandler}>
                  <Preview {...innerProps} key={id} release={release} />
                </div>
              );
            })}

        {phase === "LOADING" && (
          <>
            {new Array(20).fill(null).map((_, index) => (
              <StyledSkeleton key={index} variant="rectangular" />
            ))}
          </>
        )}

        {phase === "ERROR" && (
          <Alert severity="error">
            Something went wrong! Please try again later.
          </Alert>
        )}
      </InnerList>
    </Wrapper>
  );
};
