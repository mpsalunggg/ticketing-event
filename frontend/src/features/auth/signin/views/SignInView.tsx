import { GoogleIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@/features/auth/signin/hooks";
import { Fragment } from "react";

const SignInView = () => {
   const { t, form, handleSubmit, handleSSOLogin, dataSSO } = useSignIn();

   return (
      <Fragment>
         <div className="flex justify-center items-center h-screen">
            <div className="w-full">
               <div className="flex justify-center">
                  <p className="text-foreground mt-4"></p>
               </div>
               <Card className="w-11/12 md:w-3/5 lg:w-2/5 p-10 m-auto">
                  <form
                     className="flex flex-col gap-y-8"
                     onSubmit={form.handleSubmit(handleSubmit)}
                  >
                     <div className="text-center">
                        <p className="text-2xl font-semibold">
                           {t("login:login")}
                        </p>
                        <p
                           className="text-sm font-normal mt-1"
                           style={{ opacity: 0.5 }}
                        >
                           {t("login:lets_enter_email")}
                        </p>
                     </div>

                     <div className="m-auto w-full flex justify-center">
                        <Form {...form}>
                           <div className="w-full space-y-4">
                              <FormField
                                 control={form.control}
                                 name="email"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Email</FormLabel>
                                       <FormControl>
                                          <Input
                                             placeholder={t(
                                                "login:enter_your_email",
                                             )}
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                              <FormField
                                 control={form.control}
                                 name="password"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>
                                          {t("login:password")}
                                       </FormLabel>
                                       <FormControl>
                                          <Input
                                             placeholder={t(
                                                "login:enter_your_password",
                                             )}
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                        </Form>
                     </div>

                     <div className="flex flex-col gap-y-4">
                        <Button variant="default" type="submit">
                           {t("login:login")}
                        </Button>

                        {dataSSO?.data.map((item, i) => (
                           <Button
                              key={i}
                              variant="outline"
                              type="button"
                              onClick={(e) => {
                                 handleSSOLogin(item);
                              }}
                           >
                              {/* <GoogleIcon width={16} height={16} />{" "} */}
                              <img
                                 src={item.icon}
                                 alt=""
                                 width={16}
                                 height={16}
                              />
                              {t("login:with_sso", { sso: item.provider_name })}
                           </Button>
                        ))}

                        <div className="text-center text-sm font-normal">
                           {t("login:dont_have_account")}{" "}
                           <span className="underline font-semibold text-foreground">
                              {t("login:register_here")}
                           </span>
                        </div>
                     </div>
                  </form>
               </Card>
            </div>
         </div>
      </Fragment>
   );
};

export default SignInView;
