'strict';

import Highway from '@dogstudio/highway';
import Fade from './js/modules/fade';

import './scss/main.scss';
import './js/assets';

(function () {
    window.addEventListener('DOMContentLoaded', (e) => {
        const H = new Highway.Core({
            transitions: {
                default: Fade
            }
        });
    });
})();
