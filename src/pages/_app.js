//react
//third party
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//context
import { AuthProvider } from "@/contexts/authContext";
//services
//enums
import AclGuard from "@/configs/AclGuard";
//components
import CustomSpinner from "@/components/functional/CustomSpinner";
import "@/styles/globals.css";
import Layout from "./layout";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const defaultAcl = {
    action: "manage",
    subject: "all",
  };

  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <AuthProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
          <div className="mytheme text-foreground bg-secondary-background">
            <AclGuard acl={Component.acl ?? defaultAcl}>
              <>
                <CustomSpinner /> {getLayout(<Component {...pageProps} />)}
              </>
            </AclGuard>
          </div>
        </AuthProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
