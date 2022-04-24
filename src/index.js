'strict';

import Shredder from './js/shredder';

import './scss/main.scss';


(function () {
    window.addEventListener('DOMContentLoaded', (e) => {
        const args = {
            slides: 5,
            currentSlide: 0,
            shreds: 20,
            speed: 0.3
        };
        const sh = new Shredder(args);
        sh.load();
    });
})();
