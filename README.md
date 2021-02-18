![everypage Logo](https://www.everypagehq.com/assets/banner.png)

everypage is a website creator built with react. With everypage's **declarative** system, users write in JSON, focussing on their content, and get a gorgeous website built with exceptional SEO and performance.

This powers the [everypage product](https://www.everypagehq.com), but is open source to allow customers to never be "tied in" to our hosted solution.

## Project Structure

This project is a lerna monorepo. If you look in `src/packages/`, you will see the main parts of this project:

- **core** - this contains the main everypage code. It contains all the sections and feature required to build a simple website with react.
- **cli** - this is a wrapper around core that allows the creation of static sites. It's essentially a server side renderer optimized for use with core.
- **test** - this is an example project with everypage. It contains json files that are compiled with the cli (and therefore core) to create a static website.
- **console** - this is the project seen at https://console.everypagehq.com. It is a "hosted version" of everypage where you can use a visual editor to create websites with everypage and will manage the hosting for you.
- **building-api** - this is a private API that makes the current version of the cli available via an API.

## Contribute

1. Ensure you have installed `node` and `npm`.
1. cd into `src/`.
1. Run `npm install` to install lerna (read more about lerna [here](https://github.com/lerna/lerna)).
1. Run `npm run bootstrap` to install all the dependencies used by all the packages.
1. Run `npm run start-console`. This will start the everypage console on your local machine.
1. Run `npm run build-test`. This will build the test project and create a deployable output in `./packages/test/dist`.

everypage heavily leans on [UI-React](https://github.com/kibalabs/ui-react) which is a React component library maintained by [Kiba Labs](https://www.kibalabs.com). If you are considering contributing (please do!) it would be great to read up on some of the principles there as they follow through into this project.

## Support

everypage is mostly written by me ([krishan711](https://twitter.com/krishan711)) at the moment. If you want help with contributing or even if you want help using everypage in your own application just reach out, I'd love to help 🙌.
