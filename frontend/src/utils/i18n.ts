import i18n from "i18next";
import loginEn from "./translation/login/en.json";
import loginId from "./translation/login/id.json";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
   debug: true,
   resources: {
      en: {
         translation: {
            login: loginEn,
         },
      },
      id: {
         translation: {
            login: loginId,
         },
      },
   },
   keySeparator: ":",
   lng: "en",
   fallbackLng: "en",
});
