'strict';

import Shredder from './js/shredder';

import './scss/main.scss';


const slides = 5;

(function () {
    window.addEventListener('DOMContentLoaded', (e) => {
        const args = {
            slides: 5,
            currentSlide: 0,
            shreds: 50
        };
        const sh = new Shredder(args);
        sh.load();

        // filter.apply = function (filterManager, input, output, clear) {
        //     const matrix = new PIXI.Matrix();
        //     this.uniforms.mappedMatrix = filterManager.calculateNormalizedScreenSpaceMatrix(matrix);
        //     PIXI.Filter.prototype.apply.call(
        //         this,
        //         filterManager,
        //         input,
        //         output,
        //         clear
        //     );
        // };

    });
})();
