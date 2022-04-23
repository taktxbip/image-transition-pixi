'strict';

import * as PIXI from 'pixi.js';
import fragment from './shader/fragment.glsl';
import gsap from 'gsap';

import './scss/main.scss';
import img0 from './assets/alexander-wende.jpg';
import img1 from './assets/jezael-melgoza.jpg';
import img2 from './assets/lucas-gouvea.jpg';
import img3 from './assets/oleg-onchky.jpg';
import img4 from './assets/photo.jpg';

const slides = 5;

(function () {
    window.addEventListener('DOMContentLoaded', (e) => {

        const nav = document.querySelector('.nav');
        const a = document.createElement('a');
        for (let i = 0; i < slides; i++) {
            nav.appendChild(a.cloneNode());
        }

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

            filter.uniforms.uvAspect = getAspectRatio(resources.img4);

            filter.uniforms.uProgress = 0;
            const a = document.querySelectorAll('.nav a');
            let prevSlide = 0;
            a.forEach((el, i) => {
                el.addEventListener('mouseover', () => {
                    gsap.to(filter.uniforms, {
                        uProgress: i,
                        ease: "power3.out",
                        onUpdate: () => {
                            const num = Math.floor(filter.uniforms.uProgress);
                            filter.uniforms.uTextureOne = resources[`img${num}`].texture;

                            const next = num + 1 === slides ? 'img0' : `img${num + 1}`;
                            filter.uniforms.uTextureTwo = resources[next].texture;

                            // const curAspect = getAspectRatio(resources[`img${num}`]);
                            // const nextAspect = getAspectRatio(resources[next]);

                            // const time = filter.uniforms.uProgress - i + 1;
                            // console.log(curAspect, nextAspect);

                            // // filter.uniforms.uProgress
                            // filter.uniforms.uvAspect = {
                            //     x: nextAspect.x + (nextAspect.x - nextAspect.x) * time,
                            //     y: nextAspect.y + (nextAspect.y - nextAspect.y) * time
                            // };
                        }
                    });
                });
            });

            filter.uniforms.uTextureOne = resources[`img0`].texture;
            filter.uniforms.uTextureTwo = resources[`img1`].texture;

            // Add the bunny to the scene we are building
            bunny.filters = [filter];
            app.stage.addChild(bunny);

            // Listen for frame updates
            app.ticker.add(() => {
                // each frame we spin the bunny around a bit
                // bunny.rotation += 0.01;
            });
        });
    });

    function getAspectRatio(img) {
        const wAspect = window.innerWidth / window.innerHeight;
        const iAspect = img.texture.width / img.texture.height;

        if (wAspect > iAspect) {
            return {
                x: 1,
                y: iAspect / wAspect
            };
        } else {
            return {
                y: 1,
                x: wAspect / iAspect
            };
        }
    }
})();
