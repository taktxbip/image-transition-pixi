import Highway from '@dogstudio/highway';
import gsap from 'gsap';
import charming from 'charming';

export default class Fade extends Highway.Transition {
    out({ from, done }) {
        console.log('out', from);

        new gsap.timeline({
            onComplete: done
        }).to(from, {
            duration: 0.3,
            opacity: 0
        });
    }

    in({ from, to, done }) {
        const h1 = to.querySelector('h1');
        charming(h1);
        const chars = [...h1.querySelectorAll('span')];
        from.remove();
        console.log('in', from, to);

        new gsap.timeline({ onComplete: done })
            .to(to, {
                duration: 0.3,
                opacity: 1
            })
            .fromTo(chars,
                {
                    opacity: 0,
                    y: 100
                },
                {
                    stagger: 0.05,
                    opacity: 1,
                    y: 0
                }, 0.3);
    }

}