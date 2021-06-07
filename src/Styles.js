import {StyleSheet, Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");

const SHAZAM_BUTTON_SIZE = width * 0.5;
const LISTENING_SHAZAM_BUTTON_SIZE = SHAZAM_BUTTON_SIZE * 0.6;
const SEARCH_BUTTON_SIZE = width * 0.13;
const TAB_INDICATOR_SIZE = 8;

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
    scroll_container: {
        flexGrow: 1,
    },
    home_gradient: {
        justifyContent: "center",
        alignItems: "center"
    },
    home_text: {
        color: "white"
    },
    action_text: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 75
    },
    shazam_button_background: {
        position: "absolute",
        top: 1,
        width: SHAZAM_BUTTON_SIZE,
        height: SHAZAM_BUTTON_SIZE,
        borderRadius: SHAZAM_BUTTON_SIZE,
        backgroundColor: "white",
    },
    listening_shazam_button_background: {
        width: LISTENING_SHAZAM_BUTTON_SIZE,
        height: LISTENING_SHAZAM_BUTTON_SIZE,
        borderRadius: LISTENING_SHAZAM_BUTTON_SIZE,
    },
    shazam_button_container: {
        position: "relative",
        marginBottom: 100
    },
    search_button_background: {
        position: "absolute",
        transform: [{translateY: -1}],
        width: SEARCH_BUTTON_SIZE,
        height: SEARCH_BUTTON_SIZE,
        borderRadius: SEARCH_BUTTON_SIZE,
        backgroundColor: "white"
    },
    shazam_button_hole: {
        position: "absolute",
        width: SHAZAM_BUTTON_SIZE * 0.9,
        height: SHAZAM_BUTTON_SIZE * 0.9,
        borderRadius: SHAZAM_BUTTON_SIZE * 0.9,
        backgroundColor: "rgba(0,0,0,0)"
    },
    search_button_container: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center"
    },
    tab_indicator_container: {
        position: "absolute",
        zIndex: 2,
        justifyContent: "center",
        width: "100%",
        marginTop: 80,
        flexDirection: "row"
    },
    tab_indicator: {
        width: TAB_INDICATOR_SIZE,
        height: TAB_INDICATOR_SIZE,
        borderRadius: TAB_INDICATOR_SIZE,
        marginHorizontal: 5
    },
    home_tab_indicator: {
        backgroundColor: "rgba(255,255,255,0.7)"
    },
    basic_header_container: {
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 10
    },
    basic_header_text: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
    },
    charts_image_background: {
        position: "absolute",
        backgroundColor: "rgba(110, 85, 155, 1)",
        width,
        height: 240
    },
    chart_button_container: {
        justifyContent: "center",
        alignItems: "center",
        width,
        height: 240,
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 10
    },
    chart_button: {
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 45,
        borderRadius: 8,
        marginBottom: 10
    },
    chart_button_text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "rgba(110, 85, 155, 1)",
    }
});