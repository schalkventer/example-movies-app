import { Presentation } from "./Single.Presentation";

const meta = {
  title: "components/Single",
};

export default meta;

export const Basic = () => (
  <Presentation title="asdasdasd" onClose={() => console.log("close")} />
);
