import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCalendarTranslation from "./locales/en/enCalendarTranslation.json";
import frCalendarTranslation from "./locales/fr/frCalendarTranslation.json";

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: enCalendarTranslation,
		},
		fr: {
			translation: frCalendarTranslation,
		},
	},
	lng: "fr",
	fallbackLng: "fr",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
