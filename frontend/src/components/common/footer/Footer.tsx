import CompanyLogo from "@/assets/image/tan-logo.svg";
import { useTranslation } from "react-i18next";

const Footer = () => {
   const { t } = useTranslation();
   return (
      <div className="w-full bg-background border-t flex justify-center items-center gap-x-2 h-[60px] absolute z-50">
         <img src={CompanyLogo} alt="" />
         <p className="text-sm font-medium">{t("login:powered_by_tan")}</p>
      </div>
   );
};

export default Footer;
