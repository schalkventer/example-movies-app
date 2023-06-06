import { List } from "./List";
import { mocks } from "../Preview";

const meta = {
  title: "components/List",
};

export default meta;

const list: List["movies"] = new Array(40)
  .fill(undefined)
  .map(mocks.basic)
  .map((item, index) => ({
    ...item,
    id: index + 1,
  }));

export const Basic = () => <List movies={list} />;
