import React, { Component } from 'react';
import { BackHandler, Keyboard, SafeAreaView, StyleSheet, TouchableOpacity, View, } from "react-native";
import AlertComponent from './alert';
import OptionsModal from './optionsModal';
import ModalComponent from './modal';
import {Button} from "react-native-elements";
import { LoadingIndicator } from "../../components/LoadingIndicator";

let $this;

class Modal extends Component {



    constructor(props) {
        super(props);
        $this = this;

        this.modals = [];
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress() {
        if ($this.modals.length) {
            let topModal = $this.modals[$this.modals.length - 1];
            if (topModal) {
                if (topModal.onBackClose()) {
                    Modal.hide(topModal);
                }
                return true;
            }
        }

        return false;
    }

    static hideModal(){
        if ($this.modals.length) {
            let topModal = $this.modals[$this.modals.length - 1];
            if (topModal) {
                if (topModal.onBackClose()) {
                    Modal.hide(topModal);
                }
                return true;
            }
        }

        return false;
    }

    static alert = (message, type = "alert", header = "", onBackClose = true) => {
        let alertComponent = new AlertComponent(message, type, header);
        return Modal.show(alertComponent, onBackClose, false);
    };

    static error = (message) => {
        if (message) {
            if (message.trim()) {
                let alertComponent = new AlertComponent(message, 'error', '');
                return Modal.show(alertComponent, true, false);
            }
        }
    };

    static createModal = (header, body, onBackClose = true, ...buttons) => {
        const modalComponent = new ModalComponent(header, body, buttons);
        return Modal.show(modalComponent, onBackClose, false);
    };

    static createOptionModal = (header, component, onBackClose = true, ...buttons) => {
        const optionsModal = new OptionsModal(header, component, buttons);
        return Modal.show(optionsModal, onBackClose, false)
    }

    static createProgressModal = (message, onBackClose = true) => {

        class ProgressComponent {

            getComponent = () => {
                return (
                    <View style={styles.progressModalContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <LoadingIndicator loading={true} message={message} />
                        </View>
                    </View>
                )
            };

            sendAnalytics = (action) => {

            }
        }

        const progressComponent = new ProgressComponent();

        return Modal.show(progressComponent, onBackClose, false);
    };

    static createPrimaryButton = (title, onPress, style) => {

        let actionBack;

        class ButtonComponent extends Component {

            setOnPress = (callback) => {
                actionBack = callback;
            };

            getComponent = () => {
                return <Button
                    title={title}
                    onPress={() => {
                        onPress();
                    }}
                    TouchableComponent={TouchableOpacity}
                    activeOpacity={0.5}
                    titleStyle={{
                    }}
                    buttonStyle={[styles.primaryButton, style]}
                />
            }
        }

        return new ButtonComponent();
    };

    static createSecondaryButton = (title, onPress, style) => {

        let actionBack;

        class ButtonComponent extends Component {

            setOnPress = (callback) => {
                actionBack = callback;
            };

            getComponent = () => {
                return <Button
                    title={title}
                    type={'outline'}
                    onPress={() => {
                        onPress();
                        // actionBack(title);
                    }}
                    TouchableComponent={TouchableOpacity}
                    titleStyle={{
                    }}
                    buttonStyle={[styles.secondaryButton, style]}
                />
            }
        }

        return new ButtonComponent();
    };

    static createLinkButton = (title, onPress, style) => {

        let actionBack;

        class ButtonComponent extends Component {

            setOnPress = (callback) => {
                actionBack = callback;
            };

            getComponent = () => {
                return <Button
                    title={title}
                    type={'clear'}
                    TouchableComponent={TouchableOpacity}
                    onPress={() => {
                        onPress();
                    }}
                    titleStyle={{
                        textDecorationLine: 'underline'
                    }}
                    buttonStyle={[styles.linkButton, style]}
                />
            }
        }

        return new ButtonComponent();
    };

    static show = (component, onBackClose = true, nestedModalsAllowed) => {

        class ModalComponent {

            onBackClose = () => {
                return onBackClose;
            };

            nestedModalsAllowed = () => {
                return nestedModalsAllowed;
            };

            getComponent = () => {
                return (
                    <View style={styles.wrapper}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.backTouch}
                            onPress={() => {
                                if (onBackClose) {
                             
                                    $this.modals.pop();
                                    $this.forceUpdate();
                                }
                            }} />
                        {component.getComponent()}
                    </View>
                );
            };
        }

        let comp = new ModalComponent();

        Keyboard.dismiss();
        $this.modals.push(comp);
        $this.forceUpdate();

        return comp;
    };

    static hide(comp) {
        if (comp) {
            let index = $this.modals.indexOf(comp);
            if (index > -1) {
                $this.modals.splice(index, 1);
                $this.forceUpdate();
            }
        } else {
            $this.modals.pop();
            $this.forceUpdate();
        }
    }

    static hideAll() {
        $this.modals = [];
        $this.forceUpdate();
    }

    render() {
        if (!this.modals.length) {
            if (this.props.onLayout) {
                this.props.onLayout();
            }
            return null;
        }

        return (
            <SafeAreaView style={styles.wrapper} onLayout={this.props.onLayout}>
                <View style={styles.modalContainer}>

                    {
                        this.modals.map((modal) => {
                            if (modal.nestedModalsAllowed()) {
                                return modal.getComponent();
                            }
                        })
                    }

                    {
                        this.modals[this.modals.length - 1].getComponent()
                    }

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backTouch: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    wrapper: {
        paddingVertical: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryButton: {
        marginBottom: 15,
        borderRadius: 20,
        paddingVertical: 10,
    },
    secondaryButton: {
        marginBottom: 15,
        borderRadius: 20,
        borderWidth: 0.5,
        paddingVertical: 10,
    },
    linkButton: {
        marginBottom: 15,
        paddingVertical: 10,
    },
    progressModalContainer: {
        minWidth: "75%",
        maxWidth: "85%",
        borderRadius: 10,
        padding: 15,
        backgroundColor: 'white',
        shadowColor: 'grey',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 2,
        shadowRadius: 5,
        elevation: 2
    }
});

export default Modal;
