![](https://i.imgur.com/yfp1WP9.png)


## To-Do

### Features
* Click and drag to navigate horizontally with momentum (http://www.smoothdivscroll.com/mixedContentTouch.html) (I got this one)
* Give 'custom' content streams an input box (i.e. to allow adding custom subreddits that all share the same template)
* Categorize different feeds in the 'Add Feed' modal, like a catalog
* Links launch in program instead of launching in default browser (animate the page to slide from the right side, with a dismiss, maybe 'minimize' button to replace the top tab bar) (tweets may get modal functionality back one day)
* Sign in handler (modal that brings up the sign-in page for feeds that require user data)
* New supported feeds (Facebook, Techcrunch, Product Hunt, Email, etc.)
* Clicking on the header with class `.webhead` opens up the full page with no injected styling (Useful for getting to secondary links not in the page's main feed)
* Edit position or Remove feeds
* Unhiding portions of the page outside of the main feed that are likely to have demand (like Twitter's tweet button, toggleable in settings)
* Oh yeah, an actual Settings modal
* Adblock?


### Fixes

* ~~Add feeds function saves feed to `marks.json`~~ (done, but doesn't pretty print it)
* Disable adding feeds you already have
* Use `require("../path/jsonfile.json");` for reading bookmarks in `dash.js` instead of `readFile`
* Certain subreddits are scrolling too far, find how to set height to set in CSS for #siteTable
* Occasionally dock buttons don't function (minimize, maximize, close)
* Remember window position, dimensions, and if maximized on program start (save to JSON file? or .txt?) (detect on resize/maximize, then write to file, or wait until BrowserWindow.close() to write?)
* When tab containing `<webview>` is hidden, set `webview` dimensions to 0 (might be tricky/hacky due to hidden tab possibly being `display:none` and given to children) (http://electron.atom.io/docs/api/web-view-tag/#css-styling-notes)
* Might need to add Flash Pepper to browser to be able to view some video content (Twitch player, though twitch switching to html5 soon, could also use player.twitch.tv/?channel=channel&html5)


### Deployment (not urgent)

* Package as Windows Installer (Electron-packager + Innosetup?)
* Automatic updates (Electron-Accelerator?)
* ASAR to protect code
* On startup: small "loading..." window + splash screen (?) (Might not be fitting for a web browser, but perhaps if it has enough of a 'native app' feel it could be justified)
* Syncing bookmarks from other browsers on users' computer, then checking against whitelisted feeds (?) (Appdata folder holds bookmarks)


## How to sign in before a handler is made

On the Trending tab there is a `<webview>` called 'startup'. Use the `.loadURL()` method to navigate to sites that needs to be signed into in order to have their feeds tested, since there is no easy way to sign in yet. Use the DevTools that opens on the right side on program startup. If closed, hit Ctrl-Shift-I. Example: `startup.loadURL(https://twitter.com)`
Documentation: http://electron.atom.io/docs/api/web-view-tag/#webviewloadurlurl-options

Then, go to the Dashboard tab and add the corresponding feed with the big button (Twitch isn't working yet) (Also you can't navigate sideways yet, so only about 3 feeds will fit)
