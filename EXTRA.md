# Extra tips : 

On Firefox / Zen Browser here are the required extra steps to install the extension.

- First make sure that the app is built in a zip file (as just passing the build folder won't work)
- Go in about:config and set `xpinstall.signatures.required` to false
- In the settings set the "new tab" page to the extension's page (should appear as an option)
- If you want to get the extension's page URL, go on the page and type in the console : `console.log(window.location.href);`
- On Zen browser, maybe you cannot open a new tab because the url search bar is overwriting the new tab page behavior. To fix this go in the about:config and set `zen.urlbar.replace-newtab` to false (once you are done, put it back to true)