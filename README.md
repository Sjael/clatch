![](https://i.imgur.com/yfp1WP9.png)


## To-Do

### Features
* Click and drag to navigate horizontally with momentum (http://www.smoothdivscroll.com/mixedContentTouch.html) (I got this one)
* Give 'custom' content streams an input box (i.e. to allow adding custom subreddits that all share the same template)
* Categorize different feeds in the 'Add Feed' modal, like a catalog
* Links launch in program instead of launching in default browser
* Sign in handler (modal that brings up the sign-in page for feeds that require user data)
* New supported feeds (Facebook, Techcrunch, Product Hunt, etc.)
* Clicking on the header with class `.webhead` opens up the full page with no injected styling (?)
* Edit / Remove feeds
* Adblock?

### Fixes

* Add feeds function saves feed to `marks.json`
* Disable adding feeds you already have
* Remember window position, dimensions, and if maximized on program start (save to JSON file?) (detect on resize/maximize, then write to file, or wait until BrowserWindow.close() to write?)
* When tab containing `<webview>` is hidden, set `webview` dimensions to 0, might be tricky/hacky due to hidden tab possibly being `display:none` and given to children (http://electron.atom.io/docs/api/web-view-tag/#css-styling-notes)
* Might need to add Flash Pepper to browser to be able to view some content (Twitch player)

### Deployment (not urgent)

* Package as Windows Installer (Electron-packager + Innosetup?)
* Automatic updates (Electron-Accelerator?)
* ASAR to protect code
* Syncing bookmarks from other browsers on users's computer, then checking against whitelisted feeds? (Appdata folder holds bookmarks)

## Signing in before a handler is made

On the trending tab there is a `<webview>` called 'startup'. Use the `.loadURL()` method to navigate to sites that needs to be signed into in order to have their feeds tested, since there is no easy way to sign in yet. Example: `startup.loadURL(https://twitter.com)`

Documentation: http://electron.atom.io/docs/api/web-view-tag/#webviewloadurlurl-options
