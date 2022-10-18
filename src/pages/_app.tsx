// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import Layer from "../components/Layer/Layer";
import { MutationProvider } from "../context/mutation";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MutationProvider>
      <Component {...pageProps} />
    </MutationProvider>
  );
};

export default trpc.withTRPC(MyApp);
