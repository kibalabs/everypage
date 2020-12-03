This branch is trying to replace react-static with something built for purpose.

Everything in this file is just notes.

Currently the state is I can render a single page (not totally sure how to "inject" the site and theme in yet but confident that can be figured out).

The next steps are:

0. check if styled components are working

1. reader page and then rehydrate on the frontend

2. how to manage the routing e.g.
```
  <Router>
    <Route path='/' page={Home} />
    <Route default={true} page={NotFound} />
  </Router>
```

3. How to have more than one page
