import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/common/table";
import { ColumnsHome } from "@/features/home/components";
import { useHome } from "@/features/home/hooks";

const HomeView = () => {
   const { dataEventActivity } = useHome();

   return (
      <div className="flex flex-col gap-y-6">
         <Card className="p-0">
            <div className="flex flex-col gap-y-6 py-6 px-8">
               <div>
                  <DataTable
                     columns={ColumnsHome}
                     data={dataEventActivity}
                     isToolbar={false}
                  />
               </div>
            </div>
         </Card>
      </div>
   );
};

export default HomeView;
