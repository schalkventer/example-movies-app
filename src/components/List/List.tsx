import styled from "@emotion/styled";

import { Global, css } from "@emotion/react";
import { Preview } from "../Preview";
import { CssBaseline, Button, Typography } from "@mui/material";

const global = css`
  body {
    background: #eee;
  }
`;

const InnerList = styled.ul`
  padding: 0;
  list-style: none;
`;

export type List = {
  movies: (Preview & { id: number })[];
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

export const List = (props: List) => {
  const { movies } = props;

  return (
    <Wrapper>
      <CssBaseline />
      <Global styles={global} />

      <Row>
        <Typography>
          <strong>Movies App</strong>
        </Typography>

        <Button variant="contained">Filter List</Button>
      </Row>

      <InnerList>
        {movies.map(({ id, release: releaseAsString, ...innerProps }) => {
          const release = new Date(releaseAsString);
          return <Preview {...innerProps} key={id} release={release} />;
        })}
      </InnerList>
    </Wrapper>
  );
};
