import Img401 from "@/assets/image/401.svg";
import { ErrorRoute } from "@/components/common/error";

const Error401 = () => {
   return (
      <ErrorRoute
         img={Img401}
         errorCode="401 Unauthorized"
         title="Akses Terbatas!"
         subtitle="Untuk melanjutkan, Anda perlu masuk dulu. Harap login dengan akun Anda."
      />
   );
};

export default Error401;
