import { extendTheme, type StyleFunctionProps, type ThemeConfig } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false
};

const styles = {
    global: (props: StyleFunctionProps) => ({
        body: {
            bg: mode("#ffffff", "#1f1d1d")(props),
            color: mode("#111111", "#eeeeee")(props)
        }
    })
};

const theme = extendTheme({ config, styles });

export default theme;