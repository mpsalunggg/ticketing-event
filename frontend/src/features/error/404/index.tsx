import Img404 from "@/assets/image/404.png";
import { ErrorRoute } from "@/components/common/error";

const Error404 = () => {
   return (
      <ErrorRoute
         img={Img404}
         errorCode="404 Not Found"
         title="Halaman Tidak Ditemukan!"
         subtitle="Sepertinya halaman yang Anda cari tidak ada. Periksa lagi alamat web atau kembali ke beranda."
      />
   );
};

export default Error404;
