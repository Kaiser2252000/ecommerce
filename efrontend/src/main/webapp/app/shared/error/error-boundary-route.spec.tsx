import React from 'react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

import ErrorBoundaryRoutes from './error-boundary-route';

const ErrorComp = () => {
  throw new Error('test');
};

const NoErrorComp = (): JSX.Element => {
  return <div>No error</div>;
};

describe('error-boundary-route component', () => {
  beforeEach(() => {
    // ignore console and jsdom errors
    jest.spyOn((window as any)._virtualConsole, 'emit').mockImplementation(() => false);
    jest.spyOn((window as any).console, 'error').mockImplementation(() => false);
  });

  // All tests will go here
  it('Should render fallback component when an uncaught error is thrown in route', () => {
    const { container } = render(
      <MemoryRouter>
        <ErrorBoundaryRoutes>
          <Route path="*" element={<ErrorComp />} />
        </ErrorBoundaryRoutes>
      </MemoryRouter>
    );
    expect(container.innerHTML).toEqual('<div><h2 class="error">An unexpected error has occurred.</h2></div>');
  });

  it('Should not render fallback component when route with uncaught error is not matched', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/path']}>
        <ErrorBoundaryRoutes>
          <Route path="/path" element={<NoErrorComp />} />
          <Route path="*" element={<ErrorComp />} />
        </ErrorBoundaryRoutes>
      </MemoryRouter>
    );
    expect(container.innerHTML).toEqual('<div>No error</div>');
  });

  it('Should not render fallback component when no uncaught error is thrown', () => {
    const { container } = render(
      <MemoryRouter>
        <ErrorBoundaryRoutes>
          <Route path="*" element={<NoErrorComp />} />
        </ErrorBoundaryRoutes>
      </MemoryRouter>
    );
    expect(container.innerHTML).toEqual('<div>No error</div>');
  });
});
