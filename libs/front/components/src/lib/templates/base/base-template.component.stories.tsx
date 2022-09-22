import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BaseTemplate } from './base-template.component';
import { baseTemplatePropsMock } from './base-template-props-mock';

export default {
  component: BaseTemplate,
  title: 'templates/BaseTemplate',
} as ComponentMeta<typeof BaseTemplate>;

const Template: ComponentStory<typeof BaseTemplate> = (args) => (
  <BaseTemplate {...args} />
);

export const Primary = Template.bind({});
Primary.args = { ...baseTemplatePropsMock.base };
