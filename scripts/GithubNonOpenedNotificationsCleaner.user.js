// ==UserScript==
// @name         Github - Clean non opened notifications
// @namespace    https://github.com/notifications
// @version      0.1
// @description  Clean all notifications from issues that are already merged, closed...
// @author       You
// @match        https://github.com/notifications*
// @icon         https://img.genial.ly/5d70b3e34d10ad0fd1c12662/98b453fd-3d5a-4f59-8094-a9dc1033dd15.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    try {
        const cleanIssues = () => {
            let confirmation;

            const findAndClose = () => {
                const icons = [...document.querySelectorAll('.octicon-git-merge'), ...document.querySelectorAll('.octicon-git-pull-request-closed'), ...document.querySelectorAll('.octicon-issue-closed')];

                if (icons.length === 0) return;

                const rows = icons.map(svg => svg.closest('.notifications-list-item'))
                const checkboxes = rows.map(checkbox => checkbox.querySelector('input'))

                if (confirmation === undefined) {
                    confirmation = confirm(`You will marked as done all notifications that I will find, are you sure?`)
                }

                if (confirmation) {
                    checkboxes.forEach(checkbox => checkbox.click());

                    setTimeout(() => {
                        const topActions = document.querySelector('.js-notifications-mark-selected-actions');

                        if (topActions) {
                            topActions.querySelector('button[title="Done"]').click()

                            setTimeout(() => {
                                findAndClose();
                            }, 3500)
                        }
                    }, 1500);
                }
            }

            findAndClose();
        }

        const b = document.createElement('button');
        b.textContent = 'Clean issues';
        b.classList.add('clean-notifications-custom-script-button');

        const container = document.querySelector('.js-check-all-container').firstElementChild

        container.appendChild(b);

        b.addEventListener('click', cleanIssues);

        console.log('Notification cleaner initialized');


    } catch(e) {
        console.error('Notification cleaner was not initialized');
        console.error(e);
    }
})();
