This branch is trying to replace react-static with something built for purpose.

Everything in this file is just notes.

Currently the state is I can render a single page (not totally sure how to "inject" the site and theme in yet but confident that can be figured out).

The next steps are:

[x] get head content working
[x] get styled components working
[x] separate out webpack step so code is loaded in and built
[x] reader page and then rehydrate on the frontend
[x] how to manage the routing at runtime
[x] remove warnings during compilation
[x] separate main-new into test-new
[x] reuse webpack configs from build-js
[x] sort out config.js for main-new
[x] test new build-js for multiple places
[x] test on IE
[x] Redesign main-new/bin/package/index.tsx to be compiled and referenced
[x] add 404 page generation
[x] Look into main-new dependencies
[x] implement multiple pages
[x] Use file structure to create multiple pages
[x] remove old main and test
[x] update builder-api
[x] Move history creation to core-react to remove reach router dependency in main-new
[x] Implement serve in main-new
[x] fix error in website console (something about setting everypage-new)
[] retest on IE (check if core-js entry is needed)

Actual documentation:

The steps for generating a static site are:
1. Find the routes that need to be generated and get the "data" required for each
2. Run the project through webpack targeting the web (as if you were actually building the app)
3. Run the project through webpack targeting the node
4. For each route, use the node output from (2) and generate a html page with its content.
