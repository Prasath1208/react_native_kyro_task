import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, Image, View} from 'react-native';

import moment from 'moment';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import styles from './styles';

import {iconpathurl} from '../../constant/iconpath';
import {baseStyle, colors} from '../../constant/theme';

import Spacer from '../spacer';

function Calender(props) {
  //props
  const {
    label,
    labelColor = colors.black,
    labelTextSize = '1.8%',
    dateValueCallback,
    minDate,
    maxDate,
    disabled = false,
    onDateChange,
  } = props;

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(props?.date);

  useEffect(() => {
    setDate(props?.date);
  }, [props?.date]);

  return (
    <>
      {Boolean(label) && (
        <>
          <Text
            style={[
              baseStyle.txtStyleOutInterMedium(hp(labelTextSize), labelColor),
              styles.fieldText,
            ]}>
            {label}
          </Text>
          <Spacer height={hp('1%')} />
        </>
      )}
      <>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => {
            setShow(!show);
          }}>
          <Text
            style={[
              baseStyle.txtStyleOutInterRegular(hp('1.8%'), colors.black),
              styles.dateText,
            ]}>
            {Boolean(date) ? moment(date).format('DD/MM/YYYY') : 'DD/MM/YYYY'}
          </Text>
          <View style={styles.iconView}>
            <Image source={iconpathurl.calender} style={styles.calenderIcon} />
          </View>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={show}
          mode="date"
          onConfirm={date => {
            // console.log('confirmedDate', date);
            setDate(date);
            setShow(false);
            Boolean(dateValueCallback) && dateValueCallback(date);
          }}
          onCancel={() => {
            setShow(false);
          }}
          onChange={date => {
            Boolean(onDateChange) && onDateChange(date);
          }}
          minimumDate={minDate}
          maximumDate={maxDate}
          date={Boolean(date && date != '') ? new Date(date) : new Date()}
          disabled={disabled}
        />
      </>
    </>
  );
}

export default Calender;
