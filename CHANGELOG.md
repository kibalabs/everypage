# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) with some additions:
- For all changes include one of [PATCH | MINOR | MAJOR] with the scope of the change being made.

## [Unreleased]

### Added
- [MINOR] Created `FeatureIcons1` section

### Changed

### Removed

## [0.8.2] - 2021-01-20

### Added
- [MINOR] Created `ImagesGallery1` section
- [MINOR] Created `Contact1` section

### Changed
- [MINOR] [Console] Optimized the Canvas experience

### Removed

## [0.8.1] - 2021-01-07

### Added
- [MINOR] Created `GithubCorner` plugin

### Changed
- [MINOR] Updated all code to pass linting check
- [MINOR] Updated all code to pass typing check

### Removed

## [0.8.0] - 2021-01-03

### Added

### Changed
- [MAJOR] Updated main repo to be published at @kibalabs/everypage-cli
- [MAJOR] Updated core repo to be published at @kibalabs/everypage

### Remove

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
