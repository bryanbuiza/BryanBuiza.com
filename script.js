particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#a78bfa"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.6,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#8b5cf6",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

document.addEventListener('DOMContentLoaded', () => {
    const changingSubtitleElement = document.getElementById('changing-subtitle');
    if (changingSubtitleElement) {
        const texts = ["Desarrollador de software", "Consultor TI"];
        let currentIndex = 0;
        const glitchAnimationDuration = 500;
        const displayDuration = 3000;

        function cycleText() {
            changingSubtitleElement.classList.add('active');

            currentIndex = (currentIndex + 1) % texts.length;
            const newText = texts[currentIndex];

            changingSubtitleElement.textContent = newText;
            changingSubtitleElement.setAttribute('data-text', newText);

            setTimeout(() => {
                changingSubtitleElement.classList.remove('active');
                setTimeout(cycleText, displayDuration);
            }, glitchAnimationDuration);
        }

        changingSubtitleElement.textContent = texts[currentIndex];
        changingSubtitleElement.setAttribute('data-text', texts[currentIndex]);

        setTimeout(cycleText, displayDuration);
    }

    const staticSubtitleGlitchElement = document.getElementById('static-subtitle-glitch');
    if (staticSubtitleGlitchElement) {
        const glitchAnimationDuration = 500;
        const intervalDuration = 5000;

        function triggerGlitch() {
            staticSubtitleGlitchElement.classList.add('active');
            staticSubtitleGlitchElement.setAttribute('data-text', staticSubtitleGlitchElement.textContent);

            setTimeout(() => {
                staticSubtitleGlitchElement.classList.remove('active');
            }, glitchAnimationDuration);
        }

        triggerGlitch();
        setInterval(triggerGlitch, intervalDuration);
    }
});
