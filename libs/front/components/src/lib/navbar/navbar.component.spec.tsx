import { render } from '@testing-library/react';
import { Navbar } from './navbar.component';

describe('Navbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Navbar appName="teste" />);
    expect(baseElement).toBeTruthy();
  });
});
