[![Codefresh build status]( https://g.codefresh.io/api/badges/pipeline/omaze/Omaze%2Fshopify-theme%2Fshopify-theme_PROD?branch=master&key=eyJhbGciOiJIUzI1NiJ9.NWM1YTMxODcxZTQ0MGQxMmZhZWIzNGE1.XyHGq8mBKVRsau8OFokmtTA8ES18PoLkin3ivZf_pu4&type=cf-1)]( https://g.codefresh.io/pipelines/shopify-theme_PROD/builds?repoOwner=Omaze&repoName=shopify-theme&serviceName=Omaze%2Fshopify-theme&filter=trigger:build~Build;branch:master;pipeline:5c8ad9c2b3d43d69c7fa0dfe~shopify-theme_PROD)

Last updated: 7/28/2021

# I. Shopify Store Setup
This guide will help you get setup and ready for Shopify theme development. It will assist you in
getting all of your dependencies installed, setting up and connecting you to your Shopify environment,
and explain the process of adding and editing styles (SCSS), scripts (JS), and sprites (SVG).

## Store Owners
* Currently, only Engineering Managers have access to the Store Owner email (`eng-leads@omaze.com`).
Please contact your direct manager if you need something that only a Store Owner can do.
  * Laura Serafine
  * Zephirin Broussard
  * Jordan Acosta
  * Pablo Perez
  * Ava Jarden

## Prerequisites
Ensure you have the following packages installed globally:
* [node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [themekit](https://shopify.dev/themes/tools/theme-kit/getting-started#step-1-install-theme-kit)

## Setup Shopify Store
### Step 1: Create and Configure a Shopify Dev Store
1. Ask a Store Owner to:
   1. Create a dev USER in Shopify Partner Account
   1. Create a dev SHOP - make sure the dev shop is added as a Shopify Plus account.
1. Contact Shopify support to enable `checkout.liquid`
   1. This is only necessary if you want to test checking out in your dev store.
   1. Go to your Shopify Admin page (`yourstore.myshopify.com/admin`), at bottom left, hit `Settings > Plan`
        1. Email your `Merchant Success Manager` (eg, Dale) and ask them to enable
           [checkout.liquid](https://help.shopify.com/en/themes/development/layouts/checkout). This
           is required in order to enable custom checkout. It is a feature of Shopify Plus.
        1. __NOTE__: Don't bother asking `Priority Support`, you will reach a dead end. Dale is much faster.
1. Manually copy some `Settings` from Stage Shopify (https://omaze-stg.myshopify.com/admin/settings):
   1. `Settings > General`
   1. `Settings > Checkout`
1. Disable Notifications
   1. Go to your Shopify Admin page.
      1. Hit hit `Settings > Notifications` (bottom-left).
      1. Go to `Staff Order Notifications` (bottom) and disable notifications to Engineering Leads (eng-leads@omaze.com).
1. Setup Payments in your Shopify Admin page
   1. This is only necessary if you want to test checking out in your dev store.
   1. Go to `Settings > Payments`
      1. For `Shopify Payments` the `Manage` button is likely disabled (if not, then you have owner rights, which you
         probably shouldn't have).
      1. Ask your manager (see list of Store Owners above) to enable `Test Mode` for Shopify Payments in your
         dev store. Provide them with a phone number to use.
      1. Once enabled you should be able to checkout using a test Visa credit card.
         1. Enter in `4242 4242 4242 4242` and any text for the other credit card inputs.

1. Clone Shopify theme repo locally
   `git clone https://github.com/Omaze/shopify-theme`


### Step 2: Install Theme Kit Access app for your store
Install the [Theme Kit Access app](https://shopify.dev/themes/tools/theme-kit/access).

### Step 3: Get your Theme Kit Access password
1. Go to your Admin page (`your-store.myshopify.com/admin`) and click `Apps` in left navbar
1. Click on `Theme Kit Access` under the `Apps > Installed Apps` section

#### To Create a Private App (Optional)
1. At the bottom of the page, click the link `Manage private apps`.
1. Enable Private App development.
   1. Note: Only the Store Owner can enable private app development.
1. Click 'Create new private app'
1. In the App details section, fill out the app name and your email address.
1. In the Admin API section, click Show inactive Admin API permissions.
1. Scroll to the Themes section and select Read and write from the dropdown.
  Click Save.
1. Read the Private App confirmation dialog, then click 'Create app'.


### Step 4: Create and Configure a Theme
Must copy the current theme from Stage Shopify to your store.
1. Copy the Stage theme to your store:
   1. Go to https://omaze-stg.myshopify.com/admin/themes to download the current theme zip.
   1. Go to https://your-store.myshopify.com/admin/themes to upload the zip and Publish it.
   1. __NOTE:__ If multiple developers are working on a single Shopify site, each developer should
      duplicate the main theme and rename it to make it their own.
1. Copy your Theme Kit Access password that was emailed to you in Step 3 above.
1. Setup the `shopify-theme/config.yml` file:
   1. In a terminal, navigate to your project's root folder and run the following:
      ```bash
      cd shopify-theme
      // This will give you the list of theme ID's in your shopify store
      theme get --list -p=[themekit password] -s=[your-store.myshopify.com]
       // This will generate the `config.yml` file
      theme get -p=[your-password] -s=[you-store.myshopify.com] -t=[your-theme-id]
      ```
1. Verify that `shopify-theme/config.yml` looks like:
   ```
   development:
     password: {themekit_app_password}
     theme_id: {theme_id}
     store: {shop}.myshopify.com
   ```
1. Run the following in a terminal:
   ```bash
   theme update
   // Copies your Omaze theme (.liquid files) into your store.
   theme deploy
   npm install
   ```


## Step 5: Setup Static Content
__Unfortunately this is currently done manually (attempting to find ways to automate this process)__
1. Go to https://omaze-stg.myshopify.com/admin
1. Import Products
   1. Export products from Stage Shopify (OMAZE - STAGE)
      1. Go to https://omaze-stg.myshopify.com/admin/products, click `Export` in upper right:
         1. Export: All Products
         1. Export as: Plain CSV File
      1. Import unzipped CSV into your dev account:  Under `Products`, top right corner, click `Import`
1. Once products are imported (will email you when finished, takes hours), then sync the product metafields:
   1. Clone the git repo: https://github.com/Omaze/shopify-cmds
   1. Must edit https://github.com/Omaze/shopify-cmds/blob/main/shopify-metafields-sync/main.py, line 14 - remove ‘_old’
   1. Then follow README to do the sync
1. Manually create `Products > Collections`
   1. This can be done while waiting for the product imports to finish. The products will automatically be added to
      the Collections based on the conditions defined for it.
   1. Go to your Admin page, https://yourstore.myshopify.com/admin, click on `Products > Collections`, and hit `Create collection`
   1. Copy the `Title, Description, Conditions (select “Automated”), Collection image, Theme template` from OMAZE - STAGE
   1. Copy whatever collections from Stage that you need. The title of the collection is what’s used in the `shopify-theme`
      code as the key to the `collections` object.
1. Manually import static content
   1. Go to your Admin page, click on `Online Store` to expand, and copy over content from `Pages` and `Navigation`
      1. `Pages`: (must do this before `Navigation`)
         1. Pages to copy over:
            * Navigation Links
            * account-services-error
            * auth0
            * DO NOT SELL MY PERSONAL INFORMATION
            * winners
            * Disclosure
            * Terms of Use
            * Official Rules
            * About Us
            * Unavailable
            * Create Account Message
            * Privacy Policy
            * Impact
              * Click on the page entry, manually copy `Title, Content, Select Theme template` eg, “privacy”
              * Hit `Save`
      1. `Navigation` (must wait for `Products` to finish importing, `Collections` must be defined)
         * Just copy over what you think you’ll need
         * Add menu item
           * Pages > select page


# II. NPM Tasks
## Config
There is a directory in the root called `sdg-build`. Except for `paths.json` (do not modify this file),
these are the config files to modify in order to add or remove stylesheets, scripts, and sprites.

If any of these config files are modified while `npm start` is running, please note that you will
need to re-run `npm start`
* **paths.json**: List of paths used for the build process. No need to modify this file.
* **scripts.json**: List of scripts. These will be the bundle entry points for Webpack.
* **sprites.json**: List of sprites.
* **stylesheets.json**: List of stylesheets.

## Build, Deploy, Watch
* Before deploying anything on `master` (feature, fix, etc.), be sure to run `npm run build`. This will build both development and production assets.
* Running `npm start` will watch a variety of directories for changes, perform the necessary Webpack
or Gulp tasks, and will upload all changed liquid files and assets (compiled code, not src code)
to your Shopify theme.
```bash
npm run build
npm start
```

## Build, Deploy
* If you only change .liquid files/assets outside of `./src`, then you should be able to just re-deploy:
```bash
theme deploy --allow-live
```
* If you change any compiled code (`./src`), then you need to re-build and re-deploy:
```bash
npm run build
theme deploy --allow-live
```

## Testing
To run javascript tests, run `npm test`. We write tests using the standards described in <https://github.com/Omaze/js/blob/master/README.md>.
```bash
npm test
```


# III. Stylesheets
## Configuring Stylesheets
In `sdg-build/stylesheets.json` is a `list` (array) of stylesheets.

* Each item in the array represents a new stylesheet and should correlate with an `.scss` file in `src/scss/`. E.g. if there's an item in the stylesheets array called `"index"`, you'll need a file at `src/scss/index.scss` in order for that to generate a CSS file.
* All sub SCSS modules should be placed within its respective directory.
  * Global/shared components should go within the `src/scss/style/` directory.
  * Page-specific component should go within its unique directory. E.g. a `_hero.scss` partial that only applies to the homepage should be called from the `src/scss/index.scss` and be placed in the `src/scss/index/` directory.

```
@import 'index/hero';
```

## Loading Stylesheets
Include the stylesheet in `snippets/stylesheets.liquid`.
```
{% comment %} Global styles {% endcomment %}
{{ 'style.scss.css' | asset_url | stylesheet_tag }}

{% comment %} Only load index styles on the homepage {% endcomment %}
{% if template == 'index' %}
	{{ 'index.scss.css' | asset_url | stylesheet_tag }}
{% endif %}
```

# IV. JavaScript
## Configuring JavaScript
In `sdg-build/scripts.json` is an object of all JS build (bundle) entry points.

* A key/value represents a new build file where the key equals the filename (e.g. `"index"`), and the value equals the path (e.g. `"./src/js/build/index.js"`).
* Typically there's one build file per page.

## Build Files
* Build files are located in `src/js/build/`, and serve as the main entry point for a chunk of code.
* Imports should be done at the top of the file.
* Only minimal scripting should be done in a build file, as all lib functions/modules should be written in the `src/js/lib/` directory.

## Loading JavaScript
In `snippets/js.liquid`, ensure the following:
* A `cpage` liquid variable is set to the appropriate template.
* A matching key and value is present in the JS `path` variable.

  Example:
  ```javascript
  {% if template contains 'index' %}
  	{% assign cpage = 'index' %}
  {% endif %}

  var path = {
  	index: '{{ 'index' | append: extension | asset_url }}',
  };
  ```

# V. Sprites/SVG Icons
## Configuring Sprites
In `sdg-build/sprites.json` is an array of sprites.
* Each item in the array represents an individual sprite.
* Each new/added item in the array *must* be prefixed with `icon-`.
* By default there is only one sprite called `icon`. This is the global sprite that is included in
  the main stylesheet `src/scss/style.scss`.

## Building Sprites
1. Add SVGs into the appropriate `src/svg/...` directory.
   1. E.g. to add icons to the main `icon` sprite, add the individual SVGs to the `src/svg/icon/` directory.
1. While `npm start` is running in one terminal session, be sure to open another terminal session,
   navigate to the project's directory, and run `gulp`. This will build out all sprites and styles.
1. Having 2 terminal sessions running in this case ensures that all files are being watched and will
   be uploaded to Shopify once the files have been built.

## Loading Sprites
1. After build, the sprite SCSS is generated and placed `src/scss/style/icons/`
1. To load a particular sprite on a page, `@import` the appropriate partial into its stylesheet.
  ```scss
  @import 'style/icons/icon';
  ```
1. To access an individual icon in HTML or SCSS, use the classes or mixins that are generated and
  placed into the `_icon.scss` partial.
  ```scss
  // HTML
  <span class="icon icon--cart">

  // SCSS
  @include icon-svg; // Base mixin styles
  @include icon--cart; // Icon-specific styles
  ```
1. To change the SCSS that is output into the `_icon.scss` partial, edit the SVG template
  `src/scss/globals/mixins/_svg-template.scss`. It's built with mustache templating. Note that
  editing this file will affect all `src/scss/style/icons/_icon-*.scss` files.


# VI. Setup the JS and Go repos
## To add test campaign data
See this [document](https://omazing.atlassian.net/wiki/spaces/SCIDOCS/pages/531824641/Shopify+Onboarding)
(see steps 9 through 12)
Now you can create a custom campaign and see it on your shopify dev site.


# VII. React Apps
## Creating a New App
1. In webpack.config.js` create a new build with the name of your app and add it to the list of builds:
   ```javascript
   module.exports = [
       config,
       createBuild('ClosedExperienceApp'),
   ];
   ```
1. Find the liquid file you want to import your app into, and add an empty div for your app to render
   into, and a liquid include for your app.

   This liquid include will be generated based on the name of your app. It doesn't exist now, but will
   after your first build.
   > Note: You can only have a single react app running on a page. Be very careful where you inject
   > your app to make sure you're not messing up another existing app.
   ```html
   <div id="js-closed-experience-app__root"></div>
   {% include "ClosedExperienceApp" %}
   ```
1. Create your app's directory and base files in `src/js/apps`:
   ```bash
   ClosedExperienceApp
    - index.css
    - index.tsx
   ```
1. Add the boilerplate code to your index.tsx file. Make sure you update the target div id to the
   one you created previously.
   ```tsx
   import { getFeatureFlagModule } from '@omaze/feature';
   import '@omaze/omaze-ui/dist/omaze-ui.cjs.development.css';
   import React from 'react';
   import ReactDOM from 'react-dom';
   import { Provider } from 'react-redux';
   import { createStore } from 'redux-dynamic-modules';
   import { IModuleStore } from 'redux-dynamic-modules-core/src/Contracts';
   import { getSagaExtension } from 'redux-dynamic-modules-saga';

   import './index.css';

   const store: IModuleStore<any> = createStore(
       {
           extensions: [getSagaExtension()],
       },
       getFeatureFlagModule(),
   );

   function bootstrapApp (): void {
       ReactDOM.render((
           <Provider store={store}>
           </Provider>
       ), document.getElementById('js-closed-experience-app__root'));
   }

   bootstrapApp();
   ```
1. After you have this boilerplate code in place, targeting the correct div, your basic build is
finished and you can start development as though it was a normal react app.

# VIII. Standards
## Git commit messages
#### Commit messages have a standardized format
1. It can be seen as a `Semantic Pull Request` check in the repo
1. It is enforced locally via a `husky` and a `pre-commit` hook
1. uses [commitlint](https://github.com/conventional-changelog/commitlint)
1. list of possible rules at [@commitlint/config-conventiona](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
1. Configurtion inside `.commitlintrc.json`
#### Skipping validation
1. local check can be skipped by using: `git commit -m "your message" --no-verify`
#### Valid commit message examples:
```
feat(homepage): ABC-123 added a feature for homepage
chore(tests): added some tests
fix: fixed a bug
```
* Valid types listed inside `semantic.yml`
#### Invalid commit message examples:
```
feat no colon
fix(bug) but still no colon
random: words
```
