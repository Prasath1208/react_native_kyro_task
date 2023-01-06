import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import moment from 'moment/moment';

import styles from './styles';

import {SCREENS} from '../../constant';
import {iconpathurl} from '../../constant/iconpath';
import {baseStyle, colors, fontfamily} from '../../constant/theme';
import {strings} from '../../constant/strings';
import {TagData} from '../../utils/constants';
import {convertMsToHM, padTo2Digits} from '../../constant/commonFunction';

import CustomSafeArea from '../../components/customSafeArea';
import Button from '../../components/button';
import HeaderComponent from '../../components/header';
import Spacer from '../../components/spacer';
import OverSingleSelectDropdown from '../../components/overlaySingleSelectDropdown';
import Modal from '../../components/modal';
import Calender from '../../components/calender';
import TimerComp from '../../components/timer';
import TimeLogsList from '../../components/timeLogsList';
import TextInputComponent from '../../components/textInput';

import NavigationService from '../../navigation/NavigationService';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AddTaskActions from '../../redux/actions/addTaskActions';

function TaskDetailScreen(props) {
  const {reducerTaskDatas, actions} = props;
  const {taskId} = props.route.params;
  const [task, setTask] = useState({});

  useEffect(() => {
    //locally get the task details from store....
    setTask(reducerTaskDatas?.taskList.filter(({id}) => id == taskId)[0]);
  }, [reducerTaskDatas?.taskList]);

  const goBack = () => {
    NavigationService.goBack();
  };

  // callBacks
  const callBacks = (type, item, datas) => {
    let copiedData = {...task};
    switch (type) {
      case 'TASK_TITLE':
        copiedData.taskTitle = item;
        setTask(copiedData);
        return;
      case 'TASK_TAG':
        copiedData.taskTag = item.value;
        setTask(copiedData);
        return;
      case 'TIMER':
        copiedData.taskPreviousStopedTimer = item;
        copiedData.taskPreviousLocation = datas;
        setTask(copiedData);
        return;
      case 'ADD_TIME_LOGS':
        if (datas == 'TIMER_LOG') {
          copiedData.taskPreviousStopedTimer = 0;
          copiedData.taskPreviousLocation = {};
          copiedData.taskTimeLogs = [...item];
          setTask(copiedData);
        } else {
          copiedData.taskPreviousLogDate = '';
          copiedData.taskPreviousLogHours = '';
          copiedData.taskPreviousLogMinutes = '';
          copiedData.taskTimeLogs = [...item];
          setTask(copiedData);
        }
        return;
      case 'DATE':
        copiedData.taskPreviousLogDate = item;
        setTask(copiedData);
        return;
      case 'TIME_SPENT_HOURS':
        copiedData.taskPreviousLogHours = item.replace(/[^0-9]/g, '');
        setTask(copiedData);
        return;
      case 'TIME_SPENT_MINUTES':
        copiedData.taskPreviousLogMinutes = item.replace(/[^0-9]/g, '');
        setTask(copiedData);
        return;
      default:
        break;
    }
  };

  //validtion to upadte task
  const validateTask = () => {
    switch (true) {
      case !task?.taskTitle.trim():
        Modal.alert(strings.taskTitleRequired);
        return false;
      case task?.taskTitle?.length < 4:
        Modal.alert(strings.taskTitleMinCharac);
        return false;
      case !Boolean(isDataModified()):
        Modal.alert(strings.notModified);
        return false;
      default:
        return true;
    }
  };

  //validatio for ManuelLog
  const validateManuelLog = () => {
    switch (true) {
      case !Boolean(task?.taskPreviousLogDate):
        Modal.alert(strings.chooseDate);
        return false;
      case !Boolean(task?.taskPreviousLogHours) &&
        !Boolean(task?.taskPreviousLogMinutes):
        Modal.alert(strings.chooseHours);
        return false;
      default:
        return true;
    }
  };

  // add time to logs
  const addTimeLogs = (date, time, type) => {
    let newHours = time;
    let timelogsList = [...(task?.taskTimeLogs || [])];
    let indexOfLog = timelogsList.findIndex(i => i.date === String(date));

    if (indexOfLog != -1) {
      // adding log to existing date
      let copiedTimeLog = {...timelogsList[indexOfLog]};
      let addedHours = moment(copiedTimeLog.hours, 'HH:mm:ss').add(
        newHours,
        'hours',
      );
      let updatedHours = moment(addedHours).format('HH:mm:ss');
      copiedTimeLog.hours = updatedHours;
      copiedTimeLog.updatedAt = Date.now();
      Boolean(task?.taskPreviousLocation?.startLocation) &&
        type == 'TIMER_LOG' &&
        (copiedTimeLog.timerLoactions = task?.taskPreviousLocation);

      timelogsList.splice(indexOfLog, 1, copiedTimeLog);

      // update timelogs to local
      callBacks('ADD_TIME_LOGS', timelogsList, type);
    } else {
      // adding log to new date
      let obj = new Object();
      obj.id = `id${Date.now()}`;
      obj.date = date;
      obj.hours = newHours;
      obj.createdAt = Date.now();
      Boolean(task?.taskPreviousLocation?.startLocation) &&
        type == 'TIMER_LOG' &&
        (obj.timerLoactions = task?.taskPreviousLocation);

      timelogsList.push(obj);

      // update timelogs to local
      callBacks('ADD_TIME_LOGS', timelogsList, type);
    }
  };

  // update task
  const updateTask = type => {
    if (validateTask()) {
      actions.updateTask(task?.id, task);
      Modal.createProgressModal(strings.modalLoading, false);
      setTimeout(() => {
        Modal.hideAll();
        if (type == strings.goBack) {
          goBack();
        } else {
          let modal = Modal.createModal(
            {
              text: strings.updatedSuccessfully,
              style: baseStyle.txtStyleOutInterBold(hp('2%'), colors.black),
            },
            {
              text: strings.wantTo,
              style: [
                baseStyle.txtStyleOutInterMedium(hp('1.8%'), colors.black),
                {top: hp('1%')},
              ],
            },
            true,
            Modal.createPrimaryButton(strings.continueUpdates, () => {
              Modal.hideAll();
            }),
            Modal.createSecondaryButton(strings.goBack, () => {
              Modal.hideAll();
              goBack();
            }),
          );
          Modal.show(modal);
        }
      }, 1500);
    }
  };

  //is user modified any datas or not
  const isDataModified = () => {
    return Boolean(
      JSON.stringify(
        reducerTaskDatas?.taskList.filter(({id}) => id == taskId)[0],
        null,
        2,
      ) !== JSON.stringify(task, null, 2),
    );
  };

  //is log modified
  const isLogModified = () => {
    return Boolean(
      JSON.stringify(
        reducerTaskDatas?.taskList.filter(({id}) => id == taskId)[0]
          ?.taskTimeLogs,
        null,
        2,
      ) !== JSON.stringify(task?.taskTimeLogs, null, 2),
    );
  };

  //is tag moadified
  const isTagModified = () => {
    return Boolean(
      JSON.stringify(
        reducerTaskDatas?.taskList.filter(({id}) => id == taskId)[0]?.taskTag,
        null,
        2,
      ) !== JSON.stringify(task?.taskTag, null, 2),
    );
  };

  //edited changes  would be lost
  const changesNeedOrNot = () => {
    if (isDataModified()) {
      let modal = Modal.createModal(
        {
          text: strings.alert,
          style: [baseStyle.txtStyleOutInterBold(hp('2%'), colors.black)],
        },
        {
          text: strings.changesWouldBeLost,
          style: [baseStyle.txtStyleOutInterBold(hp('1.8%'), colors.black)],
        },
        true,
        Modal.createPrimaryButton(strings.saveAndGoback, () => {
          Modal.hideAll();
          updateTask(strings.goBack);
        }),
        Modal.createSecondaryButton(strings.goBack, () => {
          Modal.hideAll();
          goBack();
        }),
      );

      return Modal.show(modal);
    } else {
      goBack();
    }
  };

  //add manuel logs
  const manuelLog = () => {
    if (validateManuelLog()) {
      let date = moment(task?.taskPreviousLogDate).format('DD-MM-YYYY');
      let addHourandMin = `${padTo2Digits(
        task?.taskPreviousLogHours || '00',
      )}:${padTo2Digits(task?.taskPreviousLogMinutes || '00')}:00`;

      addTimeLogs(date, addHourandMin, 'MANUEL_LOG');
    }
  };

  const renderBodyContainer = () => {
    return (
      <View>
        <TimeLogsList //Time log list
          id={task?.id}
        />

        <Spacer height={hp('1.5%')} />
        <View // timer container
          style={[styles.cardView, baseStyle.flexDirection('row')]}>
          <View style={styles.timerView}>
            <TimerComp
              initialTime={task?.taskPreviousStopedTimer || 0}
              startCallBack={() => {
                // timer start callback
              }}
              callBack={(time, locations) => {
                // timer pause callback
                callBacks('TIMER', time, locations);
              }}
            />
          </View>
          <Spacer width={wp('2%')} />
          <View style={[baseStyle.width('67%')]}>
            <Spacer height={hp('4%')} />
            {Number(task?.taskPreviousStopedTimer || 0) === 0 ? (
              <Text
                style={[
                  baseStyle.txtStyleOutInterMedium(hp('1.5%'), colors.blue),
                ]}>
                {strings.canAddTime}
              </Text>
            ) : (
              <Button //add to timelogs
                text={strings.addtoLog}
                onPress={() => {
                  let currentDate = moment(new Date()).format('DD-MM-YYYY');
                  addTimeLogs(
                    currentDate,
                    convertMsToHM(task?.taskPreviousStopedTimer),
                    'TIMER_LOG',
                  );
                }}
                height={hp('4%')}
                width={'100%'}
                textColor={colors.bitDarkBlue}
                backgroundColor={colors.lightBlue}
                textSize={hp('1.5%')}
              />
            )}
          </View>
        </View>

        <Spacer height={hp('1.5%')} />
        <View //clander container
          style={styles.cardView}>
          <Calender //Log calender
            maxDate={new Date()}
            dateValueCallback={date => {
              callBacks('DATE', date);
            }}
            label={strings.addtoLog}
            date={task?.taskPreviousLogDate}
          />

          <Spacer height={hp('1.5%')} />
          <View
            style={[
              baseStyle.flexDirection('row'),
              baseStyle.justifyContent('space-between'),
            ]}>
            <View style={[baseStyle.width('47%')]}>
              <TextInputComponent
                label={strings.hours}
                value={task?.taskPreviousLogHours}
                onChangeText={txt => {
                  callBacks('TIME_SPENT_HOURS', txt);
                }}
                maxLength={2}
                keyboardType={'numeric'}
              />
            </View>
            <View style={[baseStyle.width('47%')]}>
              <TextInputComponent
                label={strings.minutes}
                value={task?.taskPreviousLogMinutes}
                onChangeText={txt => {
                  callBacks('TIME_SPENT_MINUTES', txt);
                }}
                maxLength={2}
                keyboardType={'numeric'}
              />
            </View>
          </View>

          <Spacer height={hp('1.5%')} />
          <Button //add to timelogs
            text={strings.addtoLog}
            onPress={() => {
              manuelLog();
            }}
            height={hp('4%')}
            width={'100%'}
            textColor={colors.bitDarkBlue}
            backgroundColor={colors.lightBlue}
            textSize={hp('1.5%')}
          />
        </View>

        <Spacer height={hp('1.5%')} />
        <View //dropdown container
          style={styles.cardView}>
          <OverSingleSelectDropdown // tag dropdown
            label={strings.upadteTag}
            datas={TagData}
            selectedData={{
              label: task?.taskTag,
              value: task?.taskTag,
            }}
            callBack={data => {
              callBacks('TASK_TAG', data);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <CustomSafeArea backgroundColor={colors.blue} style={styles.container}>
      <HeaderComponent
        headerText={task?.taskTitle}
        icon={iconpathurl.arrow}
        onPress={() => {
          changesNeedOrNot();
        }}
      />
      <View style={styles.bodyView}>
        {Boolean(isTagModified() || isLogModified()) && ( // updated datas hint
          <>
            <Spacer height={hp('1.5%')} />
            <View style={styles.cardView}>
              {isTagModified() && (
                <>
                  <Spacer height={hp('1%')} />
                  <Text
                    style={[
                      baseStyle.txtStyleOutInterMedium(hp('1.5%'), colors.blue),
                    ]}>
                    {strings.noteTag}
                  </Text>
                </>
              )}
              {isLogModified() && (
                <>
                  <Spacer height={hp('1%')} />
                  <Text
                    style={[
                      baseStyle.txtStyleOutInterMedium(hp('1.5%'), colors.blue),
                    ]}>
                    {strings.noteTimeLogs}
                  </Text>
                </>
              )}
            </View>
          </>
        )}

        <Spacer height={hp('1.5%')} />
        <FlatList
          data={['1']}
          renderItem={renderBodyContainer}
          keyExtractor={item => 'taskDetailBodyKey'}
          listKey={item => 'taskDetailBodyListKey'}
          showsVerticalScrollIndicator={false}
        />
        <Spacer height={hp('1.5%')} />
      </View>
      <Button //update task button
        text={strings.updateTask}
        onPress={() => {
          updateTask(strings.updateTask);
        }}
        // height={hp('7%')}
        flex={0.09}
        width={'90%'}
        textColor={colors.white}
        textSize={hp('2%')}
      />
    </CustomSafeArea>
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
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailScreen);
