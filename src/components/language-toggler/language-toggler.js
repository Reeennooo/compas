const LANGUAGE_KEY = 'language';

i18next.init({
    fallbackLng: localStorage.getItem(LANGUAGE_KEY) ? localStorage.getItem(LANGUAGE_KEY) : 'en',
    resources: {
        en: {
            translation: {
                title: 'Find your trip companion<br> in Cyprus',
                subtitle: `Create your own trips or join other drivers.
                Compas lets you easily send a package or find trip companions,
                so you could travel around comfortly based on people’s rates and feedback!`,
                termsLink: 'Terms of Service',
                privacyLink: 'Privacy Policy',
                messageOne: 'Larnaca - Limassol, 28.09, at 6am, chip in for petrol',
                messageTwo: 'Anybody goes from Paphos to Larnaca any time soon?',
                messageThree: 'Going in 40 minutes to Limassol <br>- Paphos. Petrol chip in',
                messageFour: 'At 7pm going from Limassol to Larnaca',
            },
        },
        ru: {
            translation: {
                title: 'Приложение для поиска<br> попутчиков на Кипре',
                subtitle: `Публикуйте свои поездки или присоединяйтесь к другим водителям. С нами легко отправить посылку, забронировать места в машине, и ездить с комфортом на основе отзывов и предпочтений`,
                termsLink: 'Пользовательское соглашение',
                privacyLink: 'Политика конфиденциальности',
                messageOne: 'Ларнака — Лимассол, 28.09, в 6 утра, на бензин',
                messageTwo: 'Кто нибудь едет из Пафоса в Ларнаку в ближайшее время? Нужно передать посылку',
                messageThree: 'Через 40 минут еду в Лимассол <br>— Пафос. На бензин',
                messageFour: 'В 19:00 еду из Лимассола в Ларнаку',
            },
        },
    },
});

const langToggler = document.querySelector('.language-toggler');
if (langToggler) {
    langToggler.addEventListener('click', changeLanguage);
}
const termsServiceLink = document.querySelector('.term-service-link');
const privacyPolicyLink = document.querySelector('.privacy-policy-link');

// console.log(localStorage.getItem(LANGUAGE_KEY));
if (localStorage.getItem(LANGUAGE_KEY)) {
    const currentLang = localStorage.getItem(LANGUAGE_KEY);
    if (currentLang === 'ru') {
        langToggler.innerText = 'EN';
    }
    if (currentLang === 'en') {
        langToggler.innerText = 'RU';
    }
    langToggler.dataset.language = currentLang;
    translate();
    setLinks(currentLang);
}

function changeLanguage() {
    const languageValue = langToggler.dataset.language;
    if (languageValue === 'en') {
        i18next.changeLanguage('ru');
        langToggler.innerText = 'EN';
        langToggler.dataset.language = 'ru';
        localStorage.setItem(LANGUAGE_KEY, 'ru');
        setLinks('ru');
        translate();
    } else if (languageValue === 'ru') {
        i18next.changeLanguage('en');
        langToggler.innerText = 'RU';
        langToggler.dataset.language = 'en';
        localStorage.setItem(LANGUAGE_KEY, 'en');
        setLinks('en');
        translate();
    }
}

function translate() {
    const translateElements = document.querySelectorAll('[data-translate-key]');
    translateElements.forEach((element) => {
        element.innerHTML = i18next.t(element.dataset.translateKey);
    });
}

function setLinks(language) {
    if (language === 'ru') {
        termsServiceLink.setAttribute('href', '/privacy-policy-ru.html');
        privacyPolicyLink.setAttribute('href', '/user-agreement-ru.html');
    } else {
        termsServiceLink.setAttribute('href', '/privacy-policy.html');
        privacyPolicyLink.setAttribute('href', '/user-agreement.html');
    }
}
