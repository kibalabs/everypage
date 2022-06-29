# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) with some additions:
- For all changes include one of [PATCH | MINOR | MAJOR] with the scope of the change being made.

## [Unreleased]

### Added
- [MINOR] Added `TeamBoxes1`

### Changed

### Removed

## [0.9.5] - 2022-06-22

### Added
- [MINOR] Added `isPhoneNumberOptional` to `Contact1` and `Contact2`
- [MINOR] Added `shouldUseGeneratedFavicons` to `IWebsite` to allow direct favicon usage
- [MINOR] Added `bodyText` to `Buttons1`

### Changed
- [MINOR] Updated `Calendly1` to hide cookie banner

## [0.9.4] - 2022-06-01

### Added
- [MINOR] Added `buttons` to `FeatureMediaHalf1`
- [MINOR] Added `Footer3`
- [MINOR] Added `HeroButtonsMediaHalf1`

## [0.9.3] - 2021-12-26

### Changed
- [MINOR] Changed to use npm workspaces
- [MINOR] Updated lots of dependencies

## [0.9.2] - 2021-07-09

### Changed
- [MINOR] Small changes to console only

## [0.9.1] - 2021-07-15

### Changed
- [MINOR] Updated everyview-tracker to re-enable anonymous tracking

## [0.9.0] - 2021-07-09

### Changed
- [MINOR] Console changes only

## [0.8.5] - 2021-03-10

### Changed
- [MINOR] Update `Navbar1` to close when an item is clicked
- [MINOR] Added `shouldShowImageCaptions` to `ImageGallery1` to allow showing captions below images

## [0.8.4] - 2021-03-08

### Changed
- [MINOR] Console changes only

## [0.8.3] - 2021-02-08

### Added
- [MINOR] Created `FeatureIcons1` section
- [MINOR] Created `FeatureIcons2` section
- [MINOR] Created `Contact2` section
- [MINOR] Created `Footer2` section

### Changed
- [MINOR] Update to use react v17 for all packages
- [MINOR] Update card boxes to be full height wherever used
- [MINOR] Created `Dialog` component for console

## [0.8.2] - 2021-01-20

### Added
- [MINOR] Created `ImagesGallery1` section
- [MINOR] Created `Contact1` section

### Changed
- [MINOR] [Console] Optimized the Canvas experience

## [0.8.1] - 2021-01-07

### Added
- [MINOR] Created `GithubCorner` plugin

### Changed
- [MINOR] Updated all code to pass linting check
- [MINOR] Updated all code to pass typing check

## [0.8.0] - 2021-01-03

### Changed
- [MAJOR] Updated main repo to be published at @kibalabs/everypage-cli
- [MAJOR] Updated core repo to be published at @kibalabs/everypage

## [0.7.6] - 2021-01-02

### Changed
- [PATCH] Update renderer to use calculated node_modules

## [0.7.5] - 2020-12-31

### Changed
- [PATCH] Update to latest libraries to fix small issues

## [0.7.4] - 2020-12-25

### Changed
- [PATCH] Update to make `WebView` lazy-loadable

## [0.7.3] - 2020-12-25

### Changed
- [PATCH] Update new renderer to use build-hash prefixed assets for caching

## [0.7.2] - 2020-12-24

### Changed
- [PATCH] Fix everypage-cli to find node_modules correctly when used in builder

## [0.7.1] - 2020-12-24

### Changed
- [PATCH] Fix everypage-cli to find node_modules correctly when used in builder

## [0.7.0] - 2020-12-24

### Added
- [MAJOR] replace react-static with own SSR implementation for everypage-cli

## [0.6.9] - 2020-12-24

### Added
- [MINOR] Preserve state of "show meta" with local storage in `SiteVersionPreviewPage`

### Changed
- [PATCH] Small changes in preparation for custom SSR
- [PATCH] Remove styled-components plugin (use manually in react-static config)

## [0.6.8] - 2020-12-01

### Changed
- [PATCH] Update calendly to also work in console

## [0.6.7] - 2020-12-01

### Changed
- [PATCH] Update calendly to force initialization and work with nojs

## [0.6.6] - 2020-12-01

### Changed
- [PATCH] Add LazyImage, LazyVideo, LazyMedia and replace uses of ui-react

## [0.6.5] - 2020-11-12

### Changed
- [MINOR] Added boxSizes option to feature-boxes-1

## [0.6.4] - 2020-11-12

### Added
- [MINOR] Created `PanelbearAnalytics` plugin

## [0.6.3] - 2020-10-29

### Changed
- [PATCH] Updated console to use ui-react
- [PATCH] Updated console to have nicer editor view

## [0.6.2] - 2020-10-23

### Added
- [PATCH] Added buttons to feature-boxes-1

## [0.6.1] - 2020-10-23

### Changed
- [PATCH] Updated dependencies for extracted ui-react

## [0.6.0] - 2020-10-23

Initial commit (for open-source) with core-js, core-react, build-js and ui-react extracted into their own repositories (see https://gitlab.com/kibalabs/everypage/everypage-app for any previous history).
