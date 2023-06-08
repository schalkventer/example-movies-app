import { Presentation } from "./List.Presentation";
import { mocks } from "../Preview";

const meta = {
  title: "components/List",
};

export default meta;

const list: Presentation["movies"] = new Array(40)
  .fill(undefined)
  .map(mocks.basic)
  .map((item, index) => ({
    ...item,
    id: index + 1,
    title: index === 3 ? "Lord of the Rings" : item.title,
  }));

const props: Pick<
  Presentation,
  "onToggleConfigure" | "filter" | "configuration" | "onSelect"
> = {
  filter: "",
  onToggleConfigure: () => console.log("onToggleConfigure"),
  configuration: <div>Configuration placeholder</div>,
  onSelect: (value) => console.log(value),
};

export const Loading = () => (
  <Presentation {...props} movies={[]} phase="LOADING" />
);
export const Listing = () => (
  <Presentation {...props} movies={list} phase="LISTING" />
);
export const Error = () => (
  <Presentation {...props} movies={[]} phase="ERROR" />
);

export const Filter = () => (
  <Presentation {...props} movies={list} phase="LISTING" filter="ring" />
);

export const Configuring = () => (
  <Presentation {...props} movies={list} phase="CONFIGURING" />
);
