import { ResultGraph } from "@/components/calculator/result-graph";
import { Meta, StoryObj } from "@storybook/react";
import { data } from "./data";

const meta: Meta<typeof ResultGraph> = {
  title: "Components/Calculator/Result Graph",
  component: ResultGraph,
  parameters: {
    layout: "centered",
  },
  args: {
    result: data,
  },
  decorators: [
    (Story) => (
      <div className="w-4xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Plus: Story = {};
