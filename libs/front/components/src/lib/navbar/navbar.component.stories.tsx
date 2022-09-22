import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Navbar } from './navbar.component';
import { NavbarPropsMock } from './navbar-props-mock';

export default {
  component: Navbar,
  title: 'Navbar',
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Primary = Template.bind({});
Primary.args = { ...NavbarPropsMock.base };
