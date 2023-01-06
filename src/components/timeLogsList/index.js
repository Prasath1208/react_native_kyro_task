import React from 'react';
import {View, Text, FlatList} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment';

import styles from './styles';
import Spacer from '../spacer';

import {strings} from '../../constant/strings';
import {baseStyle, colors} from '../../constant/theme';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AddTaskActions from '../../redux/actions/addTaskActions';

function TaskTimeLogsListComponent(props) {
  const {reducerTaskDatas, actions, id} = props;

  const renderTimeLogList = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View
          style={[
            baseStyle.flexDirection('row'),
            baseStyle.justifyContent('space-between'),
          ]}>
          <Text
            style={[
              baseStyle.txtStyleOutInterMedium(hp('1.8%'), colors.black),
            ]}>
            {strings.date}
          </Text>
          <Text
            style={[
              baseStyle.txtStyleOutInterMedium(hp('1.8%'), colors.black),
            ]}>
            {strings.hours}
          </Text>
        </View>
        <View
          style={[
            baseStyle.flexDirection('row'),
            baseStyle.justifyContent('space-between'),
          ]}>
          <Text
            style={[baseStyle.txtStyleOutInterBold(hp('2%'), colors.black)]}>
            {item?.date}
          </Text>
          <Text style={[baseStyle.txtStyleOutInterBold(hp('2%'), colors.blue)]}>
            {item?.hours}
          </Text>
        </View>
        {Boolean(item?.timerLoactions?.startLocation) && ( // locations view
          <>
            <Spacer height={hp('1%')} />
            <View
              style={[
                baseStyle.flexDirection('row'),
                baseStyle.justifyContent('space-between'),
              ]}>
              <Text
                style={[
                  baseStyle.txtStyleOutInterRegular(
                    hp('1.5%'),
                    colors.greyBorder,
                  ),
                ]}>
                {`${strings.startLocation}\n${item?.timerLoactions?.startLocation?.lat}\n${item?.timerLoactions?.startLocation?.long}`}
              </Text>
              <Text
                style={[
                  baseStyle.txtStyleOutInterRegular(
                    hp('1.5%'),
                    colors.greyBorder,
                  ),
                ]}>
                {`${strings.endLocation}\n${item?.timerLoactions?.endLocation?.lat}\n${item?.timerLoactions?.endLocation?.long}`}
              </Text>
            </View>
          </>
        )}
      </View>
    );
  };

  const renderListEmptyData = () => {
    return (
      <Text
        style={[
          baseStyle.txtStyleOutInterBold(hp('2%'), colors.black),
          baseStyle.alignSelf('center'),
        ]}>
        {strings.noData}
      </Text>
    );
  };
  const renderSeprator = () => {
    return <Spacer height={hp('1%')} />;
  };

  return (
    <View style={styles.cardView}>
      <View
        style={[
          baseStyle.flexDirection('row'),
          baseStyle.justifyContent('space-between'),
        ]}>
        <Text
          style={[baseStyle.txtStyleOutInterBold(hp('2%'), colors.darkblue)]}>
          {strings.taskTimeLogs}
        </Text>
        <Text
          style={[
            baseStyle.txtStyleOutInterRegular(
              hp('1.8%'),
              colors.textInputPlaceholder,
            ),
          ]}>
          {strings.lastWeekLogs}
        </Text>
      </View>

      <Spacer height={hp('1%')} />
      <FlatList
        data={reducerTaskDatas?.taskList
          ?.filter(item => item?.id == id)[0]
          ?.taskTimeLogs?.sort(function (a, b) {
            const date1 = moment(a?.date, 'DD-MM-YYYY').format(
              'YYYY-MM-DD[T]HH:mm:ss[Z]',
            );
            const date2 = moment(b?.date, 'DD-MM-YYYY').format(
              'YYYY-MM-DD[T]HH:mm:ss[Z]',
            );
            return Date.parse(date2) - Date.parse(date1);
          })
          ?.slice(0, 7)}
        renderItem={renderTimeLogList}
        ListEmptyComponent={renderListEmptyData}
        ItemSeparatorComponent={renderSeprator}
        keyExtractor={item => `${item?.id}logKey`}
        listKey={item => `${item?.id}logListkey`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
const mapStateToProps = state => ({
  reducerTaskDatas: state.addTaskReducer,
});

const Actions = {
  ...AddTaskActions,
};

const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators(Actions, dispatch)};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskTimeLogsListComponent);
