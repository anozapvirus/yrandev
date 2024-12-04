import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import lightBackground from '../src/assets/wa-background-light.png';
import darkBackground from '../src/assets/wa-background-dark.jpg';
import { ptBR } from "@material-ui/core/locale";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import ColorModeContext from "./layout/themeContext";
import { SocketContext, SocketManager } from './context/Socket/SocketContext';
import OfflineDetector from "./components/OfflineDetector";
import Routes from "./routes";


const queryClient = new QueryClient();

const App = () => {
    const [locale, setLocale] = useState();

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    const [mode, setMode] = useState(preferredTheme ? preferredTheme : prefersDarkMode ? "dark" : "light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = createTheme(
        {
            scrollbarStyles: {
                "&::-webkit-scrollbar": {
                    width: '8px',
                    height: '8px',
					borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
                    backgroundColor: "#4A90E2",
					borderRadius: "8px",
                },
            },
            scrollbarStylesSoft: {
                "&::-webkit-scrollbar": {
                    width: "8px",
					borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: mode === "light" ? "#4A90E2" : "#003366",
					borderRadius: "8px",
                },
            },
            palette: {
                type: mode,
                // Cor primária: azul claro no modo claro, azul escuro no modo escuro
                primary: { main: mode === "light" ? "#4A90E2" : "#003366" }, // Azul claro e escuro
                // Cor para o botão de sair: azul claro no modo claro, azul escuro no modo escuro
                sair: { main: mode === "light" ? "#4A90E2" : "#003366" },
                // Cor do cartão de visita: azul claro no modo claro, azul escuro no modo escuro
                vcard: { main: mode === "light" ? "#4A90E2" : "#003366" },
                // Cor do texto principal: azul claro no modo claro, branco no modo escuro
                textPrimary: mode === "light" ? "#4A90E2" : "#FFFFFF",
                // Cor da borda principal: azul claro no modo claro, branco no modo escuro
                borderPrimary: mode === "light" ? "#4A90E2" : "#FFFFFF",
                // Cor escura: cinza escuro no modo claro, cinza claro no modo escuro
                dark: { main: mode === "light" ? "#333333" : "#F3F3F3" },
                // Cor clara: cinza claro no modo claro, cinza escuro no modo escuro
                light: { main: mode === "light" ? "#F3F3F3" : "#333333" },
                // Cor do fundo do cabeçalho da aba: cinza claro no modo claro, cinza escuro no modo escuro
                tabHeaderBackground: mode === "light" ? "#EEE" : "#666",
                // Cor do fundo das opções: cinza muito claro no modo claro, cinza escuro no modo escuro
                optionsBackground: mode === "light" ? "#fafafa" : "#333",
                // Cor das opções: cinza muito claro no modo claro, cinza escuro no modo escuro
                options: mode === "light" ? "#fafafa" : "#666",
                // Cor da fonte: verde-água no modo claro, branco no modo escuro
                fontecor: mode === "light" ? "#007ACC" : "#fff", // Azul
                // Cor do fundo elegante: cinza muito claro no modo claro, cinza escuro no modo escuro
                fancyBackground: mode === "light" ? "#fafafa" : "#333",
                // Cor da borda da caixa: cinza claro no modo claro, cinza escuro no modo escuro
                bordabox: mode === "light" ? "#eee" : "#333",
                // Cor da caixa de nova mensagem: cinza claro no modo claro, cinza escuro no modo escuro
                newmessagebox: mode === "light" ? "#eee" : "#333",
                // Cor do fundo do input: branco no modo claro, cinza escuro no modo escuro
                inputdigita: mode === "light" ? "#fff" : "#666",
                // Cor do drawer de contatos: branco no modo claro, cinza escuro no modo escuro
                contactdrawer: mode === "light" ? "#fff" : "#666",
                // Cor dos anúncios: cinza claro no modo claro, cinza escuro no modo escuro
                announcements: mode === "light" ? "#ededed" : "#333",
                // Cor do login: branco no modo claro, quase preto no modo escuro
                login: mode === "light" ? "#fff" : "#1C1C1C",
                // Cor do popover de anúncios: branco no modo claro, cinza escuro no modo escuro
                announcementspopover: mode === "light" ? "#fff" : "#666",
                // Cor da lista de chats: cinza claro no modo claro, cinza escuro no modo escuro
                chatlist: mode === "light" ? "#eee" : "#666",
                // Cor da lista de caixas: cinza claro no modo claro, cinza escuro no modo escuro
                boxlist: mode === "light" ? "#ededed" : "#666",
                // Cor da lista de caixas de chat: cinza claro no modo claro, cinza escuro no modo escuro
                boxchatlist: mode === "light" ? "#ededed" : "#333",
                // Cor total: branco no modo claro, quase preto no modo escuro
                total: mode === "light" ? "#fff" : "#222",
               
            },
            mode,
        },
        locale
    );

    useEffect(() => {
        const i18nlocale = localStorage.getItem("i18nextLng");
        const browserLocale =
            i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

        if (browserLocale === "ptBR") {
            setLocale(ptBR);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("preferredTheme", mode);
    }, [mode]);



 



return (
    <ColorModeContext.Provider value={{ colorMode }}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SocketContext.Provider value={SocketManager}>
            {/* Detector de Conexão Offline */}
            <OfflineDetector />
            {/* Suas Rotas */}
            <Routes />
          </SocketContext.Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};


export default App;
