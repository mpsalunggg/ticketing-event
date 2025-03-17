import Img504 from "@/assets/image/504.svg";
import { ErrorRoute } from "@/components/common/error";

const Error504 = () => {
   return (
      <ErrorRoute
         img={Img504}
         errorCode="504 Gateway Timeout"
         title="Waktu Koneksi Habis!"
         subtitle="Maaf, ada masalah di server kami. Kami sedang memperbaikinya, silakan coba lagi nanti."
      />
   );
};

export default Error504;
