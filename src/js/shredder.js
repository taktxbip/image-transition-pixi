import * as PIXI from 'pixi.js';
import fragment from '../shader/fragment.glsl';
import vertex from '../shader/vertex.glsl';
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
        this.shreds = args.shreds;
        this.speed = args.speed;
        this.resources = null;

        this.filter = new PIXI.Filter(vertex, fragment);

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
            console.log('res');
            this.filter.uniforms.uvAspectOne = this.getAspectRatio(this.resources[`img${this.currentSlide}`]);
            this.filter.uniforms.uvAspectTwo = this.filter.uniforms.uvAspectOne;
        });
    }

    load() {
        this.loader.load((loader, resources) => {
            this.resources = resources;

            this.events();

            const sprite = new PIXI.Sprite(resources.img0.texture);

            this.filter.uniforms.uvAspectOne = this.getAspectRatio(resources[`img${this.currentSlide}`]);
            this.filter.uniforms.uvAspectTwo = this.filter.uniforms.uvAspectOne;
            this.filter.uniforms.uShreds = this.shreds;
            this.filter.uniforms.uTextureOne = resources[`img${this.currentSlide}`].texture;
            this.filter.uniforms.uTextureTwo = this.filter.uniforms.uTextureOne;
            this.filter.uniforms.uProgress = 0;
            this.filter.uniforms.uDirection = 1;

            const a = document.querySelectorAll('.nav a');
            a.forEach((el, i) => {
                el.addEventListener('mouseover', () => {
                    if (this.currentSlide === i) {
                        return;
                    }
                    gsap.to(this.filter.uniforms, {
                        duration: this.speed,
                        uProgress: i,
                        ease: "power3.out",
                        onComplete: () => {
                            this.currentSlide = i;
                            console.log(`Current: ${this.currentSlide}`);
                        },
                        onUpdate: () => {
                            let from = this.currentSlide;
                            let to = i;

                            // console.log(`from: ${from} | to: ${to}`);

                            this.filter.uniforms.uDirection = from < to ? 1 : -1;

                            this.filter.uniforms.uTextureOne = resources[`img${from}`].texture;
                            this.filter.uniforms.uvAspectOne = this.getAspectRatio(resources[`img${from}`]);

                            this.filter.uniforms.uTextureTwo = resources[`img${to}`].texture;
                            this.filter.uniforms.uvAspectTwo = this.getAspectRatio(resources[`img${to}`]);
                        }
                    });
                });
            });

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
                x: wAspect / iAspect,
                y: 1
            };
        }
    }
}