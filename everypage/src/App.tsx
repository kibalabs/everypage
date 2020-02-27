import React from 'react';
import styled from 'styled-components';

import { Root, Routes, addPrefetchExcludes } from 'react-static';
import { Link, Router } from '@reach/router';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic']);

const FancyDiv = styled.div`
  background-color: lightpink;
`;

const App: React.FunctionComponent = (): React.ReactElement => {
  return (
    <Root>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <div className="content">
        <FancyDiv>
          <React.Suspense fallback={<em>Loading...</em>}>
            <Router>
              <Routes path="*" />
            </Router>
          </React.Suspense>
        </FancyDiv>
      </div>
    </Root>
  )
}

export default App;
