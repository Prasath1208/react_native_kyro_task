import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";




class OptionsComponent {

   constructor(header,component, ...buttons) {
      this.header = header ? header : this.getHeader();
      this.buttons = buttons
      this.component = component
   }

   getHeader = () => {
      return this.header
   };

   createHeader = () => {
      let { header } = this;
      if (!header) {
         return null;
      }
      return (
         <View style={[styles.header]}>
            <Text style={[styles.headerText,header.styles]}>
               {header.text}
            </Text>
         </View>
      );
   };

   createBody = () => {
      return (
         <View style={styles.body}>
            {this.component}
         </View>
      )
   };

   createFooter = () => {

      let { buttons } = this;

      if (!buttons) {
         return null;
      }

      return (
         <View style={{ paddingHorizontal:10, marginBottom:15}}>
            {buttons.map((button) => {
               return button.map((buttonComponent) => {
                  if (buttonComponent) {
                     return buttonComponent.getComponent();
                  }
               });
            })}
         </View>
      );
   };

   getComponent = () => {
      return (
         // <Animatable.View animation={'bounceIn'} duration={300}>
            <View style={styles.container}>
               {this.createHeader()}
               {this.createBody()}
               {this.createFooter()}
            </View>
         // </Animatable.View>
      );
   };

}

const styles = StyleSheet.create({
   container: {
      minWidth: "75%",
      maxWidth: "85%",
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: 'grey',
      shadowOffset: {
         width: 5,
         height: 5
      },
      shadowOpacity: 2,
      shadowRadius: 5,
      elevation: 2
   },
   radio: {
      margin: 0,
      padding: 0,
      marginTop: 15,
      marginBottom: 10,
      //flexDirection: 'column-reverse'
   },
   header: {
      paddingLeft: 15,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 0,
   },
   headerText: {
      fontSize: 18,
      fontWeight: '500',
      fontFamily:'DINRoundPro-Bold',
      lineHeight:30,
      marginLeft: 10,
      marginTop:15,
      //textAlign: 'left'
   },
   body: {
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 10,
      marginBottom:10
   },
   bodyText: {
      textAlign: 'center',
      fontSize: 14
   },
   footerButton: {
      padding: 12,
      borderTopWidth: 0.5,
      borderTopColor: '#ddd',
      overflow: 'hidden'
   },
   footerButtonText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
   }
});

export default OptionsComponent;
