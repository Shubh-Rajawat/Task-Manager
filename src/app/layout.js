import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers'
import Script from "next/script";
import StoreProvider from "./StoreProvider";
const inter = Inter( { subsets: [ "latin" ] } );

export const metadata = {
  title: "HaveToDo",
  description: "The Only Task Manager You would need",
};

export default function RootLayout( { children } ) {
  return (
    <html lang="en"  >
      <body className={ inter.className }>
        <Script>
          localStorage.setItem( 'chakra-ui-color-mode', 'dark' )
        </Script>
        <StoreProvider>
          <Providers>
            { children }
          </Providers>
        </StoreProvider>
      </body>
    </html>
  );
}
