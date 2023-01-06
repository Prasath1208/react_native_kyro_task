import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/core';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import styles from './styles';
import Spacer from '../spacer';
import Button from '../button';
import Modal from '../modal';

import {strings} from '../../constant/strings';
import {baseStyle, colors} from '../../constant/theme';
import {iconpathurl} from '../../constant/iconpath';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AddTaskActions from '../../redux/actions/addTaskActions';

function TaskListComponent(props) {
  const {reducerTaskDatas, actions, type, viewTaskOnpress} = props;

  const [listData, setListData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      let filteredData = reducerTaskDatas?.taskList.filter(
        item => item.taskTag == type,
      );
      setListData(filteredData || []);
      return () => {
        setListData([]);
      };
    }, [reducerTaskDatas?.taskList]),
  );

  const deletTask = item => {
    actions.deleteTask(item?.taskTitle);
    Modal.hideAll();
  };

  const renderTask = ({item}) => {
    return (
      <View style={styles.cardView}>
        <Text
          style={[baseStyle.txtStyleOutInterMedium(hp('1.7%'), colors.black)]}>
          {item?.taskTitle}
        </Text>

        <Spacer height={hp('1.5%')} />
        <View
          style={[
            baseStyle.flexDirection('row'),
            baseStyle.justifyContent('space-between'),
          ]}>
          {/* ----------view task button------- */}
          <Button
            text={strings.viewTask}
            onPress={() => {
              Boolean(viewTaskOnpress) && viewTaskOnpress(item);
            }}
            width={'30%'}
            textSize={hp('1.5%')}
            textColor={colors.white}
          />

          {/* ----------delete button------- */}
          <Button
            icon={iconpathurl.trash}
            onPress={() => {
              let modal = Modal.createModal(
                {
                  text: strings.delete,
                  style: baseStyle.txtStyleOutInterBold(hp('2%'), colors.black),
                },
                {
                  text: strings.deleteConfimationText,
                  style: baseStyle.txtStyleOutInterRegular(
                    hp('1.8%'),
                    colors.black,
                  ),
                },
                true,
                Modal.createPrimaryButton(strings.delete, () => {
                  deletTask(item);
                }),
                Modal.createSecondaryButton(strings.cancel, () => {
                  Modal.hideAll();
                }),
              );

              Modal.show(modal);
            }}
            height={wp('5%')}
            width={wp('5%')}
            backgroundColor={'transparent'}
            alignSelf={'flex-end'}
          />
        </View>
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
    return <Spacer height={hp('1.5%')} />;
  };

  return (
    <>
      <Spacer height={hp('1.5%')} />
      <FlatList
        data={type == strings.all ? reducerTaskDatas?.taskList : listData}
        renderItem={renderTask}
        ListEmptyComponent={renderListEmptyData}
        ItemSeparatorComponent={renderSeprator}
        keyExtractor={item => `${item?.taskTitle}taskKey`}
        listKey={item => `${item?.taskTitle}taskListkey`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(TaskListComponent);
