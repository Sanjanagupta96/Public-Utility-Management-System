let currentLang = 'en';
let translations = {};

function loadLanguage(lang) {
  fetch(`${lang}.json`)
    .then(res => res.json())
    .then(data => {
      translations = data;
      updateTexts();
    });
}

function updateTexts() {
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    const translation = translations[key];

    if (translation) {
      // Footer ke liye innerHTML use karo (because of &copy;)
      if (elem.tagName === 'FOOTER') {
        elem.innerHTML = translation;
      } else if (['H1','H2','H3','P','A','SPAN','BUTTON','LABEL'].includes(elem.tagName)) {
        elem.textContent = translation;
      }
    }
  });
}




document.getElementById("language-selector").addEventListener("change", e => {
  currentLang = e.target.value;
  loadLanguage(currentLang);
});

// Load default language
loadLanguage(currentLang);
