import { Controller } from "jsnes";

export const KEYBOARD = 'KEYBOARD';
export const gamepad = index => `gamepad${index}`;
export default (() => {
    const keyToButton = {};
    const buttonToKey = {};

    const index = (a, b) =>
        `${a}-${b}`;

    const api = {
        addMapping(source, key, player, button){
            keyToButton[index(source, key)] = [player, button];
            buttonToKey[index(player, button)] = [source, key];
        },

        getButtonFromKey(source, key){
            return keyToButton[index(source, key)];
        },
        
        getKeyFromButton(player, button){
            return buttonToKey[index(player, button)];
        }
    };

    api.addMapping(KEYBOARD, 88, 1, Controller.BUTTON_A);
    api.addMapping(KEYBOARD, 90, 1, Controller.BUTTON_B);
    api.addMapping(KEYBOARD, 17, 1, Controller.BUTTON_SELECT);
    api.addMapping(KEYBOARD, 13, 1, Controller.BUTTON_START);
    api.addMapping(KEYBOARD, 38, 1, Controller.BUTTON_UP);
    api.addMapping(KEYBOARD, 40, 1, Controller.BUTTON_DOWN);
    api.addMapping(KEYBOARD, 37, 1, Controller.BUTTON_LEFT);
    api.addMapping(KEYBOARD, 39, 1, Controller.BUTTON_RIGHT);
    api.addMapping(KEYBOARD, 103, 2, Controller.BUTTON_A);
    api.addMapping(KEYBOARD, 105, 2, Controller.BUTTON_B);
    api.addMapping(KEYBOARD, 99, 2, Controller.BUTTON_SELECT);
    api.addMapping(KEYBOARD, 97, 2, Controller.BUTTON_START);
    api.addMapping(KEYBOARD, 104, 2, Controller.BUTTON_UP);
    api.addMapping(KEYBOARD, 98, 2, Controller.BUTTON_DOWN);
    api.addMapping(KEYBOARD, 100, 2, Controller.BUTTON_LEFT);
    api.addMapping(KEYBOARD, 102, 2, Controller.BUTTON_RIGHT);

    return api;
})();