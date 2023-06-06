import { StoryObj, Meta } from "@storybook/react";
import { Filters } from "./Filters";

const meta: Meta<Filters> = {
  title: "components/Filters",
  component: Filters,
};

export default meta;

export const Basic: StoryObj<Filters> = {
  args: {},
};
