import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import { appWithTranslation, useTranslation } from "next-i18next";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { DataProvider } from "@refinedev/strapi-v4";
import { ColorModeContext, ColorModeContextProvider } from "@contexts";
import { Header } from "@components/header";
import CustomSlider from "@components/customSlider";
import "@refinedev/antd/dist/reset.css";
import { authProvider, axiosInstance } from "src/authProvider";
import { API_URL } from "src/constants";
import { NextPage } from "next";
import { Layout } from "antd";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  const { mode, setMode } = useContext(ColorModeContext);
  const router = useRouter();
  const { pathname } = router;
  const pathSegments = pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const [selectedKey, setSelectedKey] = useState("1");

  useEffect(() => {
    setSelectedKey(lastSegment);
  }, []);

  const setSelectedKeyHandler = (key: string) => {
    setSelectedKey(key);
  };

  // Determine background color based on mode
  const backgroundColor = mode === "dark" ? "#e3e3e3" : "black";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Layout>
          <CustomSlider
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKeyHandler}
          />

          <Layout.Content
            style={{
              padding: "20px",
              backgroundColor: backgroundColor,
              minHeight: 280,
            }}
          >
            <Header />

            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <CustomLayout>
        <Component {...pageProps} />
      </CustomLayout>
    );
  };

  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <ColorModeContextProvider>
      <Refine
        routerProvider={routerProvider}
        authProvider={authProvider}
        dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
        resources={[
          {
            name: "home",
            list: "/home",
            meta: {
              canDelete: true,
            },
          },
          {
            name: "users",
            list: "/users",
            meta: {
              canDelete: true,
            },
          },
          {
            name: "recipes",
            list: "/recipes",
            meta: {
              canDelete: true,
            },
          },
          {
            name: "categories",
            list: "/categories",
            meta: {
              canDelete: true,
            },
          },
          {
            name: "cuisines",
            list: "/cuisines",
            meta: {
              canDelete: true,
            },
          },
          {
            name: "reports",
            list: "/reports",
            meta: {
              canDelete: true,
            },
          },
        ]}
      >
        {renderComponent()}
      </Refine>
    </ColorModeContextProvider>
  );
}

export default appWithTranslation(MyApp);
