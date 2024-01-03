import CanvasBoard from "./components/CanvasBoard";
import Counter from "./components/counter";
import "./globals.css";
import { ReduxProvider } from "./redux/provider";
import { ChakraProvider, Container, Heading } from "@chakra-ui/react";

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body>
          <ChakraProvider>
            <Container maxW="container.lg" centerContent>
              <CanvasBoard height={600} width={1000}/>
              <main>{props.children}</main>
            </Container>
          </ChakraProvider>
        
        </body>
      </html>
    </ReduxProvider>
  );
}
