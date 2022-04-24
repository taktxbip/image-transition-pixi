'strict';

import Shredder from './js/shredder';

import './scss/main.scss';

import img0 from './assets/alexander-wende.jpg';
import img1 from './assets/jezael-melgoza.jpg';
import img2 from './assets/lucas-gouvea.jpg';
import img3 from './assets/oleg-onchky.jpg';

(function () {
    window.addEventListener('DOMContentLoaded', (e) => {
        const args = {
            container: '#container',
            currentSlide: 0,
            shreds: 20,
            speed: 0.3,
            images: [img0, img1, img2, img3]
        };
        const sh = new Shredder(args);
        sh.load();
    });
})();
