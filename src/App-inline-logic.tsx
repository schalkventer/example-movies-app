import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Preview } from "./components";
import { Global, css } from "@emotion/react";

import { CssBaseline, Button, Typography, Skeleton } from "@mui/material";

const global = css`
  body {
    background: #eee;
  }
`;

const InnerList = styled.ul`
  padding: 0;
  list-style: none;
`;

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
  background: red;
`;

const URL = "https://movies-example-api.netlify.app/";

const getMoviesList = () => {
  const result = fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong. Try again later.");
      }
      return response;
    })
    .then((response) => response.json())
    .then((data) => {
      const result = data.map((item: any) => ({
        ...item,
        release: new Date(item.release),
      }));

      return result;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });

  return result;
};

export const App = () => {
  const [list, setList] = useState<any>([]);
  const filterString = "";

  useEffect(() => {
    const init = async () => {
      const data = await getMoviesList();
      setList(data);
    };

    init();
  }, []);

  return (
    <Wrapper>
      <CssBaseline />
      <Global styles={global} />

      <Row>
        <Typography>
          <strong>Movies App</strong>
        </Typography>

        <Button disabled={list.length < 1} variant="contained">
          Filter List
        </Button>
      </Row>

      <InnerList>
        {list.length > 0 &&
          list
            .filter((item: any) => {
              if (filterString.trim() === "") return true;

              return item.title
                .toLowerCase()
                .includes(filterString.toLowerCase());
            })
            .map(({ id, release: releaseAsString, ...innerProps }: any) => {
              const release = new Date(releaseAsString);

              return <Preview {...innerProps} key={id} release={release} />;
            })}

        {list.length < 1 && (
          <>
            {new Array(20).fill(null).map((_, index) => (
              <StyledSkeleton key={index} variant="rectangular" />
            ))}
          </>
        )}
      </InnerList>
    </Wrapper>
  );
};
