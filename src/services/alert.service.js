import { Alert } from "react-native";

class AlertsService {
    confirm(message, okText, cancelText) {
        return new Promise((resolve, rject) => {
            Alert.alert(
                "",
                message,
                [
                    {
                        text: cancelText || "cancel",
                        style: "cancel",
                    },
                    { text: okText, onPress: () => resolve(true) },
                ],
                { cancelable: false }
            );
        });
    }

    show(message, title) {
        Alert.alert("Rent a Car", message);
    }
}

const alertService = new AlertsService();

export default alertService;