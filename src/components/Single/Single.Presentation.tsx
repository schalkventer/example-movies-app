import { Dialog } from "@mui/material";

export type Presentation = {
  title: string;
  onClose: () => void;
};

export const Presentation = (props: Presentation) => (
  <Dialog open>
    <h2>{props.title}</h2>
    <button onClick={props.onClose}>X</button>
  </Dialog>
);
