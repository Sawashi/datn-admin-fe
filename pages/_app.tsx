import {
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import { GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { AppProps } from "next/app";

import { Header } from "@components/header";
import { ColorModeContextProvider } from "@contexts";
import "@refinedev/antd/dist/reset.css";
import { DataProvider } from "@refinedev/strapi-v4";
import { App as AntdApp } from "antd";
import { appWithTranslation, useTranslation } from "next-i18next";
import { authProvider, axiosInstance } from "src/authProvider";
import { API_URL } from "src/constants";
import CustomSlider from "@components/customSlider";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const router = useRouter();
  const { pathname } = router;

  // Split the pathname by '/' and get the last segment
  const pathSegments = pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const [selectedKey, setSelectedKey] = useState("1");
  const setSelectedKeyHandler = (key: string) => {
    setSelectedKey(key);
  };
  const renderComponent = () => {
    console.log(Component.noLayout);
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2
        Header={() => <Header sticky />}
        Sider={() => (
          <CustomSlider
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKeyHandler}
          />
        )}
      >
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  useEffect(() => {
    setSelectedKey(lastSegment);
  }, []);
  return (
    <>
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
    </>
  );
}

export default appWithTranslation(MyApp);
