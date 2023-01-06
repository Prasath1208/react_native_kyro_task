import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomModal from 'react-native-modal';

import styles from './styles';

import {iconpathurl} from '../../constant/iconpath';
import {SCREENS} from '../../constant';
import {baseStyle, colors} from '../../constant/theme';
import {strings} from '../../constant/strings';
import {TagData} from '../../utils/constants';

import Spacer from '../../components/spacer';
import CustomSafeArea from '../../components/customSafeArea';
import Button from '../../components/button';
import HeaderComponent from '../../components/header';
import Modal from '../../components/modal';
import TextInputComponent from '../../components/textInput';
import TaskListComponent from '../../components/taskList';
import OverSingleSelectDropdown from '../../components/overlaySingleSelectDropdown';

import NavigationService from '../../navigation/NavigationService';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AddTaskActions from '../../redux/actions/addTaskActions';

function HomeScreen(props) {
  const [showModal, setShowModal] = useState(false);
  const [taskDatas, setTaskDatas] = useState({
    taskTitle: '',
    selectedTag: {
      label: '',
      value: '',
    },
  });

  const {reducerTaskDatas, actions} = props;
  useEffect(() => {}, []);

  const openDrawerTab = () => {
    props.navigation.openDrawer();
  };

  const callBacks = (type, item) => {
    let copiedData = {...taskDatas};
    switch (type) {
      case 'TASK_TITLE':
        copiedData.taskTitle = item;
        setTaskDatas(copiedData);
        return; //
      case 'TASK_TAG':
        copiedData.selectedTag = item;
        setTaskDatas(copiedData);
        return;
      case 'RESET':
        setTaskDatas({
          taskTitle: '',
          selectedTag: {
            label: '',
            value: '',
          },
        });
        return;
      default:
        break;
    }
  };

  // close modal
  const closeModal = () => {
    setShowModal(false);
  };

  //validtion to add task
  const validateTask = () => {
    switch (true) {
      case !taskDatas.taskTitle.trim():
        closeModal();
        Modal.alert(strings.taskTitleRequired);
        return false;
      case taskDatas.taskTitle.length < 4:
        closeModal();
        Modal.alert(strings.taskTitleMinCharac);
        return false;
      //check alredy exist task
      case reducerTaskDatas.taskList.filter(
        x => x.taskTitle.toLowerCase() == taskDatas.taskTitle.toLowerCase(),
      ).length > 0:
        closeModal();
        callBacks('RESET');
        Modal.alert(strings.taskAlredyExists);
        return false;
      default:
        return true;
    }
  };

  // add task to task list
  const addTask = () => {
    if (validateTask()) {
      closeModal();
      let data = {
        id: `id${Date.now()}`,
        taskTitle: taskDatas.taskTitle.trim(),
        taskTag: taskDatas?.selectedTag?.value,
      };
      !Boolean(taskDatas?.selectedTag?.value) && delete data.taskTag;

      // store data in redux
      actions.addTask(data);
      //reset local datas
      callBacks('RESET');
    }
  };

  // view task detail
  const viewTaskDetail = item => {
    NavigationService.navigate(SCREENS.TASKDETAIL, {
      taskId: item?.id,
    });
  };

  return (
    <CustomSafeArea backgroundColor={colors.blue} style={styles.container}>
      <HeaderComponent
        headerText={strings.taskSummary}
        icon={iconpathurl.menuIcon}
        onPress={openDrawerTab}
      />
      <View style={styles.bodyView}>
        <Button //add task button
          text={strings.addTask}
          onPress={() => {
            setShowModal(true);
          }}
          flex={0.1}
          width={'90%'}
          textColor={colors.white}
          textSize={hp('2%')}
        />
        <View style={styles.listView}>
          <TaskListComponent
            type={strings.all}
            viewTaskOnpress={item => {
              viewTaskDetail(item);
            }}
          />
        </View>
      </View>
      <CustomModal isVisible={showModal}>
        <View style={styles.modalBase}>
          <Button
            icon={iconpathurl.cancelIcon}
            onPress={() => {
              closeModal();
            }}
            height={wp('5%')}
            width={wp('5%')}
            backgroundColor={'transparent'}
            alignSelf={'flex-end'}
          />
          <Text
            style={[baseStyle.txtStyleOutInterBold(hp('2%'), colors.black)]}>
            {strings.addTask}
          </Text>

          <Spacer height={hp('2%')} />
          <TextInputComponent
            label={`* ${strings.taskTitle}`}
            value={taskDatas?.taskTitle}
            onChangeText={txt => {
              callBacks('TASK_TITLE', txt);
            }}
          />
          <Spacer height={hp('1.5%')} />
          <OverSingleSelectDropdown // tag dropdown
            label={strings.taskTag}
            datas={TagData}
            selectedData={taskDatas.selectedTag}
            callBack={data => {
              callBacks('TASK_TAG', data);
            }}
          />

          <Spacer height={hp('2.5%')} />
          <Button
            text={strings.addTask}
            onPress={() => {
              addTask();
            }}
            height={hp('5%')}
            width={'100%'}
            textColor={colors.white}
            textSize={hp('2%')}
          />
        </View>
      </CustomModal>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
