import Img500 from "@/assets/image/500.svg";
import { ErrorRoute } from "@/components/common/error";

const Error500 = () => {
   return (
      <ErrorRoute
         img={Img500}
         errorCode="500 Internal Server Error"
         title="Ada Gangguan di Server Kami!"
         subtitle="Maaf, ada masalah di server kami. Kami sedang memperbaikinya, silakan coba lagi nanti."
      />
   );
};

export default Error500;
