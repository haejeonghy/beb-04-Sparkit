import type { AppProps } from "next/app";
import GlobalStyle from "../styles/global-styles";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { RecoilRoot } from "recoil";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathName = router.pathname;

  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <GlobalStyle />
        {pathName === "/SignUp" ||
        pathName.includes("/detail") ||
        pathName.includes("/WritePost") ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ApolloProvider>
    </RecoilRoot>
  );
}

export default MyApp;
