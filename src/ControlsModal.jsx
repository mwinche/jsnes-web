import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table
} from "reactstrap";

import { Controller } from "jsnes";

import mappings, { KEYBOARD, gamepad } from './Mappings';

const getGamepadButtonPress = () => new Promise(ok => {
  let interval;
  const checkForButton = () => Array.from(navigator.getGamepads())
    .forEach((controller, gamepadIndex) => {
      if(!controller){ return; }

      const pressedIndex = controller.buttons.findIndex(({ pressed }) => pressed);

      if(pressedIndex >= 0){
        ok([gamepad(gamepadIndex), pressedIndex]);

        if(typeof interval !== 'undefined'){
          clearInterval(interval);
        }
      }
    });

  interval = setInterval(checkForButton, 16);
});

const getKeyPress = () => new Promise(ok => {
  const preventDefault = event => event.preventDefault();

  const handleKeyDown = event => {
    ok([KEYBOARD, event.keyCode]);

    event.preventDefault();

    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keypress', preventDefault);
  };

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keypress', preventDefault);
});

const handleClick = (player, button) => Promise.race([
  getKeyPress(),
  getGamepadButtonPress(),
])
  .then(data => { console.log(data); return data; })
  .then(([source, key]) => mappings.addMapping(source, key, player, button));


class Cell extends Component {
  render(){
    const { player, button } = this.props;

    return <td
      style={{ cursor: 'pointer' }}
      onClick={() => handleClick(player, button).then(() => {
        this.forceUpdate();
      })}>
      {mappings.getKeyFromButton(player, button)}
    </td>;
  }
}

class ControlsModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className="ControlsModal"
      >
        <ModalHeader toggle={this.props.toggle}>Controls</ModalHeader>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th>Button</th>
                <th>Player 1</th>
                <th>Player 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Left</td>
                <Cell player={1} button={Controller.BUTTON_LEFT} />
                <Cell player={2} button={Controller.BUTTON_LEFT} />
              </tr>
              <tr>
                <td>Right</td>
                <Cell player={1} button={Controller.BUTTON_RIGHT} />
                <Cell player={2} button={Controller.BUTTON_RIGHT} />
              </tr>
              <tr>
                <td>Up</td>
                <Cell player={1} button={Controller.BUTTON_UP} />
                <Cell player={2} button={Controller.BUTTON_UP} />
              </tr>
              <tr>
                <td>Down</td>
                <Cell player={1} button={Controller.BUTTON_DOWN} />
                <Cell player={2} button={Controller.BUTTON_DOWN} />
              </tr>
              <tr>
                <td>A</td>
                <Cell player={1} button={Controller.BUTTON_A} />
                <Cell player={2} button={Controller.BUTTON_A} />
              </tr>
              <tr>
                <td>B</td>
                <Cell player={1} button={Controller.BUTTON_B} />
                <Cell player={2} button={Controller.BUTTON_B} />
              </tr>
              <tr>
                <td>Start</td>
                <Cell player={1} button={Controller.BUTTON_START} />
                <Cell player={2} button={Controller.BUTTON_START} />
              </tr>
              <tr>
                <td>Select</td>
                <Cell player={1} button={Controller.BUTTON_SELECT} />
                <Cell player={2} button={Controller.BUTTON_SELECT} />
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button outline color="primary" onClick={this.props.toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ControlsModal;
