import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";
import { useForm, FormProvider } from "react-hook-form";
import AuthProvider from "../provider/AuthProvider";
import { useRouter } from "next/router";
import { LoginUser } from "../components/templates/LoginUser";
import { NotLoginUser } from "../components/templates/NotLoginUser";

export default function App({ Component, pageProps }: AppProps) {
  const methods = useForm();
  const router = useRouter();

  if (router.pathname === "/Login" || router.pathname === "/signUp") {
    return (
      <AuthProvider>
        <LoginUser>
          <FormProvider {...methods}>
            <ChakraProvider theme={theme}>
              <Component {...pageProps} />
            </ChakraProvider>
          </FormProvider>
        </LoginUser>
      </AuthProvider>
    );
  } else {
    return (
      <AuthProvider>
        <NotLoginUser>
          <FormProvider {...methods}>
            <ChakraProvider theme={theme}>
              <Component {...pageProps} />
            </ChakraProvider>
          </FormProvider>
        </NotLoginUser>
      </AuthProvider>
    );
  }
}
