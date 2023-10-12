document.addEventListener('DOMContentLoaded', () => {
    const bg = document.querySelector('.template__bg');
    // mediaqueries
    const desktopWidthQuery = window.matchMedia('(min-width: 1200px)');
    const tabletWidthQuery = window.matchMedia('(min-width: 991px)');

    if (tabletWidthQuery.matches) {
        if (bg) {
            window.addEventListener('mousemove', (e) => {
                let x = e.clientX / window.innerWidth;
                let y = e.clientY / window.innerHeight;
                bg.style.transform = `translate(-${x * 90}px, -${y * 90}px)`;
            });
        }
    }

    // message animation
    const messages = document.querySelectorAll('.message');
    const messagesArr = [...messages];
    let currentNumber = 1;
    const ANIMTAION_SPEED = 5000;
    let animationInterval;

    desktopWidthQuery.addEventListener('change', (event) => {
        if (event.matches) {
            animationInterval = setInterval(() => {
                messageAnimate();
            }, ANIMTAION_SPEED);
        } else {
            clearInterval(animationInterval);
        }
    });

    if (desktopWidthQuery.matches) {
        animationInterval = setInterval(() => {
            messageAnimate();
        }, ANIMTAION_SPEED);
    }

    function messageAnimate() {
        while (currentNumber <= 5) {
            let currentMessage = messagesArr.find((element) => element.dataset.number === String(currentNumber));
            currentMessage.classList.remove('is-hidden');
            currentMessage.classList.add('is-show');

            if (currentNumber > 2) {
                let previousMessage = messagesArr.find((element) => element.dataset.number === String(currentNumber - 2));
                previousMessage.classList.remove('is-show');
                previousMessage.classList.add('is-hidden');
            }
            if (currentNumber === 5) {
                let previousMessage = messagesArr.find((element) => element.dataset.number === String(currentNumber - 1));
                setTimeout(() => {
                    previousMessage.classList.remove('is-show');
                    previousMessage.classList.add('is-hidden');
                    currentMessage.classList.remove('is-show');
                    currentMessage.classList.add('is-hidden');
                }, ANIMTAION_SPEED);
                currentNumber = 0;
            }
            currentNumber++;
            break;
        }
    }
});
