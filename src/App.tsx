import "./App.css";
import NFT from "./NFT";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

import {
  Container,
  Box,
  HStack,
  Flex,
  ButtonGroup,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

function App() {
  const bnbChain = {
    id: 97,
    name: "BSc Testnet",
    network: "bsc-test",
    nativeCurrency: {
      decimals: 18,
      name: "Tbnb",
      symbol: "Tbnb",
    },
    rpcUrls: {
      default: "https://bsc-testnet-rpc.publicnode.com/",
    },
    blockExplorers: {
      default: {
        name: "BcsScan",
        url: "https://testnet.bscscan.com/",
      },
    },
    testnet: true,
  };

  const { chains, provider } = configureChains(
    [bnbChain],
    [
      jsonRpcProvider({
        rpc: (chain) => {
          if (chain.id !== bnbChain.id) return null;
          return { http: chain.rpcUrls.default };
        },
      }),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "Bnb NFT Marketplace",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  const onMint = async () => {};

  return (
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider modalSize="compact" chains={chains}>
          <div>
            <ConnectButton />
          </div>
          {/* <NFT /> */}
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default App;
