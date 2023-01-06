import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {strings} from '../../constant/strings';

import {baseStyle, colors} from '../../constant/theme';
import {
  convertMsToHM,
  GetLatittudeLongitude,
  openSettingsPopup,
  PermissionRequests,
} from '../../constant/commonFunction';

import Button from '../button';
import Spacer from '../spacer';
import Modal from '../modal';

export default function TimerComp(props) {
  const {initialTime, callBack, startCallBack} = props;

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [timeWhenLastStopped, setTimeWhenLastStopped] = useState(0);

  const [locations, setLocations] = useState({
    startLocation: null,
    endLocation: null,
  });

  const interval = useRef(typeof setInterval);

  useEffect(() => {
    setTime(Number(initialTime));
    setTimeWhenLastStopped(Number(initialTime));
  }, [initialTime]);

  useEffect(() => {
    if (startTime > 0) {
      interval.current = setInterval(() => {
        setTime(() => Date.now() - startTime + timeWhenLastStopped);
      }, 1);
    } else {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = undefined;
      }
    }
  }, [startTime]);

  // set loactions locally
  const locationCallbacks = (type, data) => {
    let copiedData = {...locations};
    switch (type) {
      case 'START':
        copiedData.startLocation = data;
        setLocations(copiedData);
        return;
      case 'PAUSE':
        copiedData.endLocation = data;
        setLocations(copiedData);
        Boolean(callBack) && callBack(time, copiedData);
        return;
      default:
        break;
    }
  };

  const start = () => {
    setIsRunning(true);
    setStartTime(Date.now());
    Boolean(startCallBack) && startCallBack(time);

    // get latlong for start time...
    GetLatittudeLongitude(
      data => {
        locationCallbacks('START', data);
      },
      () => {
        // permission dined
        Modal.alert('Permission Dined! Timer need location access!');
      },
    );
  };

  const stop = () => {
    setIsRunning(false);
    setStartTime(0);
    setTimeWhenLastStopped(time);

    // get latlong for end time...
    GetLatittudeLongitude(
      data => {
        locationCallbacks('PAUSE', data);
      },
      () => {
        // permission dined
        Modal.alert('Permission Dined! Timer need location access!');
      },
    );
  };

  const getPremissoin = type => {
    PermissionRequests(
      'locations',
      () => {
        //permission granted
        type == strings.start ? start() : stop();
      },
      () => {
        //permissoin dined
        // Modal.alert('Permission Dined! Timer need location access!');
        openSettingsPopup(
          'Location Permission Required',
          'Timer needs your location access!',
        );
      },
    );
  };

  return (
    <View style={styles.containerView}>
      <View style={styles.timerView}>
        <Text
          style={baseStyle.txtStyleOutInterMedium(
            hp('1.7%'),
            colors.bitDarkBlue,
          )}>
          {convertMsToHM(time)}
        </Text>
      </View>
      <Spacer height={hp('1%')} />
      <Button
        text={!isRunning ? strings.start : strings.pause}
        onPress={() => {
          !isRunning
            ? getPremissoin(strings.start)
            : getPremissoin(strings.pause);
        }}
        height={hp('4.2%')}
        width={wp('23%')}
        borderRadius={wp('8%')}
        textColor={colors.white}
        textSize={hp('2%')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    width: '100%',
    alignItems: 'center',
  },
  timerView: {
    width: wp('25%'),
    height: wp('25%'),
    backgroundColor: colors.lightBlue,
    borderRadius: wp('12.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
