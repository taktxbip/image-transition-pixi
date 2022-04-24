import * as PIXI from 'pixi.js';
import fragment from '../shader/fragment.glsl';
import gsap from 'gsap';

import img0 from '../assets/alexander-wende.jpg';
import img1 from '../assets/jezael-melgoza.jpg';
import img2 from '../assets/lucas-gouvea.jpg';
import img3 from '../assets/oleg-onchky.jpg';
import img4 from '../assets/photo.jpg';

export default class Shredder {
    constructor(args) {

        this.slides = args.slides;
        this.currentSlide = args.currentSlide;
        this.prevSlide = args.currentSlide;
        this.shreds = args.shreds;
        this.resources = null;

        this.filter = new PIXI.Filter(null, fragment);

        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            resizeTo: window
        });
        this.loader = this.app.loader;

        document.body.appendChild(this.app.view);

        this.init();
    }

    init() {
        // Prepare DOM
        const nav = document.querySelector('.nav');
        const a = document.createElement('a');
        for (let i = 0; i < this.slides; i++) {
            nav.appendChild(a.cloneNode());
        }

        // Load images
        this.loader.add('img0', img0);
        this.loader.add('img1', img1);
        this.loader.add('img2', img2);
        this.loader.add('img3', img3);
        this.loader.add('img4', img4);
    }

    events() {
        window.addEventListener('resize', () => {
            console.log('resize');
            console.log(this.currentSlide);
            this.filter.uniforms.uvAspect = this.getAspectRatio(this.resources[`img${this.currentSlide}`]);
        });
    }

    load() {
        this.loader.load((loader, resources) => {
            this.resources = resources;

            this.events();

            const sprite = new PIXI.Sprite(resources.img0.texture);

            this.filter.uniforms.uvAspect = this.getAspectRatio(resources.img4);
            this.filter.uniforms.uProgress = 0;

            const a = document.querySelectorAll('.nav a');
            a.forEach((el, i) => {
                el.addEventListener('mouseover', () => {
                    gsap.to(this.filter.uniforms, {
                        uProgress: i,
                        ease: "power3.out",
                        onUpdate: () => {
                            const num = Math.floor(this.filter.uniforms.uProgress);
                            this.filter.uniforms.uTextureOne = resources[`img${num}`].texture;

                            const next = num + 1 === this.slides ? 0 : num + 1;
                            this.filter.uniforms.uTextureTwo = resources[`img${next}`].texture;

                            this.currentSlide = num;

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

            this.filter.uniforms.uShreds = this.shreds;
            this.filter.uniforms.uTextureOne = resources[`img0`].texture;
            this.filter.uniforms.uTextureTwo = resources[`img1`].texture;

            // Add the sprite to the scene we are building
            sprite.filters = [this.filter];

            this.app.stage.addChild(sprite);

            this.render();
        });
    }

    render() {
        this.app.ticker.add(() => {
            // each frame we spin the sprite around a bit
            // sprite.rotation += 0.01;
        });
    }

    getAspectRatio(img) {
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
}