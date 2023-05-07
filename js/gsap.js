if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function() {
        window.scrollTo(0, 0);
    }
}

gsap.registerPlugin(ScrollTrigger);
gsap.set(["#buildings", "#mountainBack", "#mountainFront", "#hero h1", "#woods-wrap", "#sec-using .u-wrap"], { opacity: 1 });
gsap.from("#woods-wrap", { y: 100, opacity: 0, duration: 1, ease: "power4", delay: 2 });
gsap.to("#curtain", { xPercent: 100, duration: 2, ease: "power2" });
gsap.to("#curtain-2", { xPercent: -100, duration: 2, ease: "power2" });

gsap.from(".wind", {
    duration: 2.5,
    stagger: {
        each: 0.5,
        repeat: -1,
        yoyo: true
    },
    x: 150,
    y: 20,
    opacity: 0,
    scaleY: -1,
    scaleX: .5
});

/************************************************************************************************/

/* Hero */

const buildingTL = gsap.timeline({
    scrollTrigger: {
        trigger: "#hero",
        scrub: 1.5,
        start: "top top",
        pin: true,
        toggleActions: "restart none reverse none",
        anticipatePin: 2
    },
    defaults: { duration: .5, opacity: 0 },
});

buildingTL.to("#arrow-down", { y: -10, height: 0, duration: .5 })
    .from("#hero h1", { y: -100 })
    .from("#b-bg", { duration: 1, y: 200 }, "<.5")
    .from("#b-1", { y: 40 }, "<")
    .from("#b-2", { duration: .75, y: 50 }, "<")
    .from("#b-5", { duration: .75, y: 80 }, "<")
    .from("#b-8", { duration: .75, y: 110 }, "<")
    .from("#b-10", { duration: .75, y: 70 }, "<")
    .from("#b-12", { duration: .75, y: 80 }, "<")
    .from("#b-14", { duration: .75, y: 120 }, "<")
    .from("#b-3", { y: 60 }, "<-.2")
    .from("#b-4", { y: 70 }, "<")
    .from("#b-7", { y: 100 }, "<")
    .from("#b-9", { y: 120 }, "<")
    .from("#b-11", { y: 30 }, "<")
    .from("#b-15", { y: 50 }, "<")
    .from("#b-6", { y: 40 }, "<")
    .from("#b-13", { y: 40 }, "<")
    .from("#b-16", { y: 40 }, "<")
    .from("#mountainBack", { y: 80 }, "<.5")
    .from("#mountainFront", { y: 150 }, "<")
    .to("#hero-h2", { x: 50, opacity: 0, duration: 2 })
    .to("#dollar", { x: -50, opacity: 0, rotation: -60, duration: 2 }, "<")
    .to("#hero h1", { duration: 2, x: 50 }, "<-.1")
    .to("#logo", { duration: 2, x: -50 }, "<.2")
    .to("#header", { opacity: 1, duration: 2 }, "<.3");

const starsTL = gsap.timeline({
    scrollTrigger: {
        trigger: "#hero",
        scrub: 1,
        start: "top top",
        toggleActions: "restart none reverse none",
        anticipatePin: 2
    },
    defaults: { duration: 1 },
});

starsTL.to("#particles-js", { y: -100 });

/************************************************************************************************/

/* Sec 1 */

const heroTL = gsap.timeline({
    scrollTrigger: {
        trigger: "#sec-1",
        start: "top bottom",
        scrub: 1,
        toggleActions: "restart pause reverse pause",
        anticipatePin: 3
    },
    defaults: { duration: 1 }
});

heroTL.to("#b-bg", { y: 210 }, "<")
    .to("#mountainBack", { y: 250 }, "<")
    .to("#mountainFront", { y: 150 }, "<")
    .to("#b-1", { y: 50 }, "<")
    .to("#b-2", { y: 65 }, "<")
    .to("#b-5", { y: 100 }, "<")
    .to("#b-8", { y: 130 }, "<")
    .to("#b-10", { y: 80 }, "<")
    .to("#b-12", { y: 90 }, "<")
    .to("#b-14", { y: 140 }, "<")
    .to("#b-3", { y: 70 }, "<")
    .to("#b-4", { y: 80 }, "<")
    .to("#b-7", { y: 120 }, "<")
    .to("#b-9", { y: 130 }, "<")
    .to("#b-11", { y: 85 }, "<")
    .to("#b-15", { y: 55 }, "<")
    .to("#b-6", { y: 45 }, "<")
    .to("#b-13", { y: 45 }, "<")
    .to("#b-16", { y: 45 }, "<")
    .to("#trees", { y: 35 }, "<")
    .to("body", { backgroundColor: "#030C28", duration: .2 }, "<");

const gsideTL = gsap.timeline({
    scrollTrigger: {
        trigger: "#sec-1",
        start: "top 80%",
        scrub: 1,
        toggleActions: "restart pause reverse pause",
        anticipatePin: 3
    },
    defaults: { duration: 2 }
});

gsideTL.to("#trees", { scale: 1.2 })
    .from("#office-space", { scale: 1.2 }, "<")
    .to("#ground", { scale: 2.5 }, "<")
    .from("#ppl-off", { x: 150 }, "<")
    .from("#windows", { y: 50 }, "<")
    .to("#lights-1", { x: 9, y: 2, scale: 1.1 }, "<")
    .to("#lights-2", { x: 12, y: 5, scale: 1.1 }, "<");

const seconeTL = gsap.timeline({
    scrollTrigger: {
        trigger: "#sec-1",
        start: "top top",
        scrub: 1,
        pin: true,
        toggleActions: "restart pause reverse pause",
        anticipatePin: 1
    },
    defaults: { duration: 1 }
});

seconeTL.from("#small-biz", { x: 50, opacity: 0, skewX: "10deg" }, "sb")
    .from("#with-capital", { x: 50, opacity: 0 }, "<.3")
    .to("#small-biz", { x: 50, opacity: 0, skewX: "10deg", delay: 10 })
    .to("#with-capital", { x: 50, opacity: 0 }, "<.3")
    .from("#types-title", { x: 50, opacity: 0, skewX: "10deg" })
    .from("#types li", { x: 100, stagger: .15, opacity: 0 }, "<")
    .from("#types-text", { x: 50, opacity: 0, skewX: "10deg" }, "<.3")
    .to("#types-text", { opacity: 1, duration: 3, delay: 10 })
    .to("#types li", {
        x: 100,
        stagger: {
            each: 0.2,
            from: "end",
        },
        opacity: 0,
        delay: 2
    }, "<")
    .to("#types-f", { opacity: 0, duration: 2 });

/************************************************************************************************/

/* Sec Using */

const usingoffTL = gsap.timeline({
    scrollTrigger: {
        trigger: "#sec-using",
        scrub: 1,
        start: "top bottom",
        toggleActions: "restart none reverse none"
    },
    defaults: { duration: 2 },
});

usingoffTL.to("#ppl-off", { x: 150 }, "<")
    .to("#windows", { y: 50 }, "<")
    .to("#plant", { x: 350 }, "<")
    .to("#tray", { x: -200, y: 50 }, "<");

const usingTL2 = gsap.timeline({
    scrollTrigger: {
        trigger: "#sec-using",
        scrub: 1.5,
        start: "top top",
        pin: true,
        toggleActions: "restart none reverse none",
        anticipatePin: 4
    },
    defaults: { duration: 2 },
});

usingTL2.to(".u-1", { opacity: 0, delay: 10 })
    .from(".u-2", { opacity: 0 })
    .to(".u-2", { opacity: 0, delay: 10 })
    .from(".u-3", { opacity: 0 })
    .to(".u-3", { opacity: 0, delay: 10 })
    .from(".u-4", { opacity: 0 })
    .to(".u-4", { opacity: 1, delay: 10 });

/************************************************************************************************/

/* Hiw */

const qTL1 = gsap.timeline({
    scrollTrigger: {
        trigger: "#hiw",
        scrub: 1,
        start: "top bottom",
        toggleActions: "restart none reverse none",
    },
    defaults: { duration: 2, }
});

qTL1.from("#points-1", { y: 10 }, "<")
    .from("#points-2", { y: 7 }, "<")
    .from("#points-3", { y: 20 }, "<")
    .from("#unda-1", { scale: .5, y: 70 }, "<")
    .from("#unda-2", { scale: .6, x: 50, y: 90 }, "<")
    .from("#curve-1", { x: "5%" }, "<")
    .from("#curve-2", { x: "20%" }, "<")
    .to("#unda-3", { scale: .7 }, "<")
    .from("#unda-4", { scale: .5, y: 50 }, "<")
    .from("#circ-1", { scale: 1.5, y: 50 }, "<")
    .from("#circ-2", { scale: 1.5, y: -20 }, "<");

const qTL2 = gsap.timeline({
    scrollTrigger: {
        trigger: "#hiw",
        scrub: 1,
        start: "top center",
        toggleActions: "restart none reverse none",
    },
    defaults: { duration: 2 }
});

qTL2.from(".txt1", { opacity: 0, x: -50 }, "ts")
    .from(".txt2", { opacity: 0, x: 50 }, "ts")
    .from(".hiwimg", { opacity: 0, scale: .6 }, "ts")
    .to(".hiwimg", { opacity: 1, duration: 6, delay: 15 })
    .to(".txt1", { opacity: 0, x: -50 })
    .to(".txt2", { opacity: 0, x: 50 }, "<")
    .to(".hiwimg", { opacity: 0, scale: 1.6 }, "<")
    .to("#shades", { x: "-50%", scale: 1.4 }, "<")
    .to("#curve-1", { x: "-10%", scale: 1.2 }, "<")
    .to("#curve-2", { x: "5%", scale: 1.1 }, "<")
    .to("#fold-1", { x: "-10%", scale: 1.2 }, "<")
    .to("#fold-2", { x: "5%", scale: 1.3 }, "<", )
    .from("#t-boxes", { opacity: 0 })
    .from("#t-boxes .u", { y: -80, opacity: 0, stagger: .75 }, "<")
    .from(".apply p", { y: -40, opacity: 0 }, "<.5")
    .from(".apply .btn", { y: -40, opacity: 0, delay: 5 }, "<.5")
    .to("#fold-2", { duration: 6, delay: 15 })
    .to("#t-boxes .q-1", { y: -40, x: "-20%", opacity: 0, rotation: "-20deg", duration: 4 })
    .to("#t-boxes .q-2", { y: -40, opacity: 0, duration: 4 }, "<")
    .to("#t-boxes .q-3", { y: -40, x: "20%", opacity: 0, rotation: "20deg", duration: 4 }, "<")
    .to("#signup-title", { y: -80, opacity: 0 }, "<.3")
    .to("#bg", { scale: 1.2, duration: 3 }, "<")
    .to("#unda-1", { x: 50, y: -90 }, "<")
    .to("#unda-2", { x: 60 }, "<")
    .to("#unda-3", { x: 70, y: 70 }, "<")
    .to("#curve-2", { x: 100, y: -20 }, "<")
    .to(".apply p", { y: -130 }, "<.2")
    .to(".apply .btn", { y: -100, scale: 1.5 }, "<.2")
    .to(".apply .btn", { delay: 6 });

const qTL3 = gsap.timeline({
    scrollTrigger: {
        trigger: "#hiw",
        scrub: 1,
        start: "top 80px",
        pin: true,
        toggleActions: "restart none reverse none",
    },
    defaults: { duration: 2 },
});