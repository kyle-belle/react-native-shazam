import {StyleSheet, Dimensions, StatusBar} from "react-native";

const {width, height} = Dimensions.get("window");

const SHAZAM_BUTTON_SIZE = width * 0.5;
const LISTENING_SHAZAM_BUTTON_SIZE = SHAZAM_BUTTON_SIZE * 0.6;

const SEARCH_BUTTON_SIZE = width * 0.13;

const TAB_INDICATOR_SIZE = 8;

const LIBRARY_CARD_SPACING = 10;
const LIBRARY_CARD_WIDTH = (width / 2) - (LIBRARY_CARD_SPACING * 2);
const LIBRARY_CARD_HEIGHT = LIBRARY_CARD_WIDTH * 1.6;

const CHART_ENTRY_SPACING = 5;
const CHART_ENTRY_SIZE = (width / 3) - (CHART_ENTRY_SPACING * 2);

const EQUALIZER_SIZE = 60;

const SONG_DETAIL_TAB_HORIZONTAL_SPACING = 16;
const SONG_DETAIL_TAB_VERTICAL_SPACING = 10;
const SONG_DETAIL_TAB_INDICATOR_BORDER_RADIUS = 20;

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.2)"
    },
    scroll_container: {
        flexGrow: 1,
    },
    home_gradient: {
        // justifyContent: "center",
        alignItems: "center"
    },
    home_text: {
        color: "white",
        marginTop: StatusBar.currentHeight + 100
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
        top: 45 + StatusBar.currentHeight,
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
        paddingVertical: 10,
        elevation: 5
    },
    basic_header_text: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
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
    },
    chart_list_container: {
        padding: 12,
        paddingBottom: 25,
        backgroundColor: "white",
        marginBottom: 10
    },
    chart_entry: {
        width: CHART_ENTRY_SIZE,
        margin: CHART_ENTRY_SPACING,
        fontSize: 14,
        color: "rgba(80,80,80,1)",
        fontWeight: "normal"
    },
    chart_entry_song_name: {
        width: CHART_ENTRY_SIZE,
        fontSize: 16,
        fontWeight: "bold",
        // marginVertical: 4
    },
    library_label: {
        position: "relative",
        justifyContent: "center",
        // flexDirection: "row",
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 15,
        color: "black",
        fontSize: 18,
        fontWeight: "bold"
    },
    library_card: {
        elevation: 5,
        overflow: "hidden",
        backgroundColor: "white",
        width: LIBRARY_CARD_WIDTH,
        height: LIBRARY_CARD_HEIGHT,
        margin: LIBRARY_CARD_SPACING,
        borderRadius: 5,
        shadowColor: "black",
        // shadowColor: "rgba(0,150,255,1)",
        shadowOpacity: 0.6,
        shadowRadius: 5,
        shadowOffset: {height: 0, width: 0}
    },
    library_card_shazam_song_name: {
        fontSize: 20,
        fontWeight: "bold"
    },
    apple_music_pill: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        color: "white",
        borderRadius: 15,
        fontSize: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },
    library_card_save_text: {
        fontSize: 22,
        fontWeight: "bold",
        color: "rgba(0,150,255,1)"
    },
    library_card_login_text: {
        width: "90%",
        fontSize: 16,
        color: "white",
        borderRadius: 8,
        fontWeight: "bold",
        paddingVertical: 5,
        textAlign: "center",
        alignSelf: "center",
        backgroundColor: "rgba(0,150,255,1)"
    },
    hr_thin: {
        position: "absolute",
        bottom: 0,
        height: 0,
        width: "90%",
        borderBottomWidth: 0.5,
        borderColor: "rgba(235, 235, 235, 1)",
        marginLeft: "15%"
    },
    equalizer_overlay: {
        right: 25,
        bottom: 25,
        elevation: 5,
        overflow: "hidden",
        position: "absolute",
        width: EQUALIZER_SIZE,
        height: EQUALIZER_SIZE,
        borderRadius: EQUALIZER_SIZE
    },
    equalizer_line: {
        width: 5,
        borderRadius: 5,
        marginHorizontal: 2,
        alignSelf: "flex-end",
        height: EQUALIZER_SIZE * 0.4,
        marginBottom: EQUALIZER_SIZE * 0.3,
        backgroundColor: "rgba(0, 150, 255, 1)",
    },
    song_details_tab_bar_container: {
        top: 50,
        zIndex: 2,
        position: "absolute"
    },
    song_details_tab_indicators_container: {
        width: width * 0.75,
        marginHorizontal: width * 0.125,
        borderRadius: SONG_DETAIL_TAB_INDICATOR_BORDER_RADIUS,
        overflow: "hidden"
    },
    song_details_tab: {
        fontSize: 12,
        color: "white",
        marginVertical: SONG_DETAIL_TAB_VERTICAL_SPACING,
        marginHorizontal: SONG_DETAIL_TAB_HORIZONTAL_SPACING,
    },
    song_details_tab_indicator_background: {
        backgroundColor: "rgba(0, 150, 255, 1)",
        borderRadius: SONG_DETAIL_TAB_INDICATOR_BORDER_RADIUS,
        marginVertical: SONG_DETAIL_TAB_VERTICAL_SPACING,
        position: "absolute"
    },
    song_details_tab_bar_side_button_container: {
        position: "absolute",
        alignItems: "center",
        width: "12.5%",
        top: 3
    }
});