import React, {useState, useEffect} from 'react';
import {View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from './styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {capitalizeFirstLetter} from '../../utils/capitalizeFirstLetter';
import {iconpathurl} from '../../constant/iconpath';
import {strings} from '../../constant/strings';
import {baseStyle, colors} from '../../constant/theme';

import Spacer from '../spacer';

function OverSingleSelectDropdown(props) {
  const {
    datas,
    selectedData,
    label,
    labelColor = colors.black,
    labelTextSize = '1.8%',
    placeholder = strings.select,
    callBack,
  } = props;

  const [showDropDown, setShowDropDown] = useState(false);
  const [selected, setSelected] = useState(selectedData);

  useEffect(() => {
    setSelected(selectedData);
  }, [selectedData]);

  const togellSelect = () => setShowDropDown(!showDropDown);

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
      <TouchableOpacity
        style={styles.dropDownBoxView}
        activeOpacity={0.5}
        onPress={() => {
          togellSelect();
        }}>
        <Text
          style={[
            baseStyle.txtStyleOutInterMedium(
              hp('1.6%'),
              Boolean(selected.value)
                ? colors.black
                : colors.textInputPlaceholder,
            ),
          ]}>
          {Boolean(selected.value)
            ? capitalizeFirstLetter(selected?.label)
            : placeholder}
        </Text>

        <Image source={iconpathurl.downArrow} style={[styles.downArrowIcon]} />
      </TouchableOpacity>
      <View>
        {showDropDown && (
          <ScrollView
            nestedScrollEnabled={true}
            style={[
              styles.dropDownContentview,
              {
                height: datas?.length == 3 ? hp('10%') : hp('15%'),
              },
            ]}>
            {datas.map(item => {
              return (
                <TouchableOpacity
                  key={`${item?.value}key`}
                  style={styles.dropdownTextView}
                  activeOpacity={0.5}
                  onPress={() => {
                    togellSelect();
                    setSelected(item);
                    Boolean(callBack) && callBack(item);
                  }}>
                  <Text
                    style={[
                      baseStyle.txtStyleOutInterMedium(
                        hp('1.8%'),
                        colors.black,
                      ),
                      styles.dropValueText,
                    ]}>
                    {capitalizeFirstLetter(item?.label?.toUpperCase())}
                  </Text>
                  {selected.value == item?.value && (
                    <Image source={iconpathurl.tick} style={styles.tcikIcon} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
    </>
  );
}

export default OverSingleSelectDropdown;
