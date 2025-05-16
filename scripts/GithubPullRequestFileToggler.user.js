// ==UserScript==
// @name         Pull request file view toggler
// @version      0.3
// @description  Mark first visible file as viewed easily
// @author       You
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    const findFileCheckboxes = (filterFn) => {
        return [...document.querySelectorAll('.js-reviewed-checkbox')].filter(isInViewport).filter(filterFn);
    }

    const clickCheckbox = (checkbox) => {
        if (checkbox !== undefined) {
            checkbox.click();
        }
    }

    const markFirstViewedFileAsUnviewed = () => {
        clickCheckbox(findFileCheckboxes((e) => !!e.checked).pop())
    }

    const markFirstUnviewedFileAsViewed = () => {
        clickCheckbox(findFileCheckboxes((e) => !e.checked).shift())
    }

    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;

        if (e.altKey) {
            if (['v', '√'].includes(e.key)) {
            markFirstUnviewedFileAsViewed();
            }

            if (['b', 'ß'].includes(e.key)) {
                markFirstViewedFileAsUnviewed();
            }
        }
    })
})();
