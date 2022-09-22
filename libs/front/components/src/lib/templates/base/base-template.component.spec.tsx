import { render } from '@testing-library/react';
import { BaseTemplate } from './base-template.component';

describe('BaseTemplate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BaseTemplate exampleProps="teste" />);
    expect(baseElement).toBeTruthy();
  });
});
