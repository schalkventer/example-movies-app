import { StoryObj, Meta } from "@storybook/react";
import { Presentation } from "./Filters.Presentation";

const meta: Meta<Presentation> = {
  title: "components/Filters",
  component: Presentation,
};

export default meta;

export const Basic: StoryObj<Presentation> = {
  args: {},
};
