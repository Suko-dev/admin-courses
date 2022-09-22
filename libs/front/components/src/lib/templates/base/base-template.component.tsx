import React from 'react';

export interface BaseTemplateProps {
  exampleProps: string;
}

export const BaseTemplate: React.FC<BaseTemplateProps> = ({ exampleProps }) => {
  return <div>{exampleProps}</div>;
};
