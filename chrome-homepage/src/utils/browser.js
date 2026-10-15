/* global chrome, browser */

export const getBrowserHistory = () => {
    if (typeof chrome !== 'undefined' && chrome.history) {
        return chrome.history;
    } else if (typeof browser !== 'undefined' && browser.history) {
        return browser.history;
    }
    return null;
}