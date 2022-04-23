'strict';

import * as PIXI from 'pixi.js';
import fragment from './shader/fragment.glsl';

import './scss/main.scss';
import img0 from './assets/alexander-wende.jpg';
import img1 from './assets/jezael-melgoza.jpg';
import img2 from './assets/lucas-gouvea.jpg';
import img3 from './assets/oleg-onchky.jpg';
import img4 from './assets/photo.jpg';

(function () {
    window.addEventListener('DOMContentLoaded', (e) => {


        const app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            autoResize: true
        });
        document.body.appendChild(app.view);

        const loader = app.loader;
        loader.add('img0', img0);
        loader.add('img1', img1);
        loader.add('img2', img2);
        loader.add('img3', img3);
        loader.add('img4', img4);

        const filter = new PIXI.Filter(null, fragment);

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

        loader.load((loader, resources) => {

            const bunny = new PIXI.Sprite(resources.img0.texture);

            // Setup the position of the bunny
            bunny.x = app.renderer.width / 2;
            bunny.y = app.renderer.height / 2;

            // Rotate around the center
            bunny.anchor.x = 0.5;
            bunny.anchor.y = 0.5;

            bunny.filters = [filter];

            const wAspect = window.innerWidth / window.innerHeight;
            const iAspect = resources.img4.texture.width / resources.img4.texture.height;

            if (wAspect > iAspect) {
                filter.uniforms.uvAspect = {
                    x: 1,
                    y: iAspect / wAspect
                };
            } else {
                filter.uniforms.uvAspect = {
                    y: 1,
                    x: wAspect / iAspect
                };
            }

            console.log(wAspect, iAspect);

            filter.uniforms.uTextureOne = resources.img0.texture;
            filter.uniforms.uTextureTwo = resources.img1.texture;
            filter.uniforms.uTextureFour = resources.img4.texture;

            // Add the bunny to the scene we are building
            app.stage.addChild(bunny);

            filter.uniforms.uTime = 0;
            // Listen for frame updates
            app.ticker.add(() => {
                filter.uniforms.uTime += 0.02;
                // each frame we spin the bunny around a bit
                // bunny.rotation += 0.01;
            });
        });
    });
})();
