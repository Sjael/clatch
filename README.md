![](https://i.imgur.com/yfp1WP9.png)


## To-Do

### Features
* Click and drag to navigate horizontally (http://www.smoothdivscroll.com/mixedContentTouch.html) (I got this one)
* New feeds (Facebook, Techcrunch, Product Hunt, etc.)
* Categorize different feeds in the 'Add Feed' modal, like a catalog
* Sign in handler (modal that brings up the sign-in page for feeds that require user data)
* Make links launch in program instead of launching in default browser
* Adblock?

### Fixes

* Might need to add Flash Pepper to browser to be able to run some content (Twitch player)
* Remember window position, dimensions, and if maximized on program start
* When tab containing `<webview>` is hidden, set `webview` dimensions to 0, might be tricky due to hidden tab possibly being `display:none` (http://electron.atom.io/docs/api/web-view-tag/#css-styling-notes)


## Signing in before a handler is made

On the trending tab there is a `<webview>` called 'startup'. Use the `.loadURL()` method to navigate to sites that needs to be signed into in order to have their feeds tested. Example: `startup.loadURL(https://twitter.com)`

Documentation: http://electron.atom.io/docs/api/web-view-tag/#webviewloadurlurl-options
