import { FormEvent, useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import styled from "@emotion/styled";
import z from "zod";

import {
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogTitle,
  DialogContent,
  Alert,
} from "@mui/material";

const response = z.object({
  search: z
    .string()
    .min(3, {
      message: "Search needs to be empty or atleast three characters",
    })
    .optional()
    .or(z.literal("")),
});

type Response = z.infer<typeof response>;

export type Presentation = {
  filter: string;
  onSubmit: (response: Response) => void;
  onToggleConfigure: () => void;
};

const StyledAlert = styled(Alert)<{ error: string | null }>`
  margin-top: 1rem;
  height: ${(props) => (props.error ? "auto" : "0.25rem")};
`;

const useFilters = (props: Presentation) => {
  const { onSubmit } = props;
  const [error, setError] = useState<string | null>(null);

  const isStarting = useRef(true);

  const style = useSpring({
    from: { opacity: isStarting || error ? 0 : 1 },
    to: { opacity: error ? 1 : 0 },
  });

  useEffect(() => {
    isStarting.current = false;
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const entries = new FormData(event.target as any);
    const transformed = Object.fromEntries(entries);
    const validation = response.safeParse(transformed);

    if (!validation.success) {
      const { error } = validation;
      return setError(error.issues[0].message);
    }

    setError(null);
    const { data } = validation;
    onSubmit(data);
  };

  return {
    error,
    style,
    handleSubmit,
  };
};

const Content = styled.div`
  width: 100%;
  width: 20rem;
  max-width: 20rem;
`;

export const Presentation = (props: Presentation) => {
  const { onToggleConfigure } = props;
  const { error, handleSubmit, style } = useFilters(props);

  return (
    <Dialog open>
      <Content>
        <DialogTitle>Filters</DialogTitle>

        <DialogContent>
          <form id="filters" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="search"
              label="Search"
              placeholder="Any"
              variant="filled"
            />
          </form>

          <animated.div style={style}>
            <StyledAlert error={error} severity="warning">
              {error}
            </StyledAlert>
          </animated.div>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onToggleConfigure}>
            Cancel
          </Button>

          <Button variant="contained" type="submit" form="filters">
            Apply
          </Button>
        </DialogActions>
      </Content>
    </Dialog>
  );
};
