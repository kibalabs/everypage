This branch is trying to replace react-static with something built for purpose.

Everything in this file is just notes.

Currently the state is I can render a single page (not totally sure how to "inject" the site and theme in yet but confident that can be figured out).

The next steps are:

[x] get head content working
[x] get styled components working
[] separate out webpack step so code is loaded in and built
[] reader page and then rehydrate on the frontend
[] how to manage the routing at runtime e.g.
```
  <Router>
    <Route path='/' page={Home} />
    <Route default={true} page={NotFound} />
  </Router>
```
[] How to have more than one page
