import { Button, Card, Row, Col, Statistic, Select } from 'antd';

import { connect } from 'umi';
import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { getOutreachCalls } from '@/services/api';
import allTeamData1 from './data.json';

const { Option } = Select;

const BasicForm = () => {
  const [repData, setRepData] = useState({ calls: 0, dispositions: 0, appointments: 0 });
  const [selectedUser, setSelectedUser] = useState(2);
  const [allTeamData, setAllTeamData] = useState(allTeamData1);

  const updateDashboard = (userId) => {
    console.log(userId);
    console.log(allTeamData);

    const selectedRepData = allTeamData.data.filter(
      (val) => val.relationships.user.data.id === parseInt(userId),
    );
    const selectedRepDispositionData = allTeamData.data.filter(
      (val) => val.relationships.callDisposition.data.id === 3,
    );
    console.log(selectedRepDispositionData);

    setRepData({ ...repData, calls: selectedRepData.length });
    setRepData({ ...repData, appointments: selectedRepDispositionData.length });
    // i'm not really sure what the logic below this does
    // you should put the logic in this function that figures out calls, dispositions, and appointmens
    // then set it with `setRepData({calls: 5, dispositions: 5, appointments, 5})`
    // to set just one value, do `setRepData({...repData, calls: 6})`
  };

  // function handleChange(value) {
  //   console.log(`selected ${value}`);
  //   setSelectedUser(value);
  //   updateDashboard(value);
  // }

  const runReport = async () => {
    const initial_url = `https://api.outreach.io/api/v2/calls?filter[updatedAt]=2020-06-02..inf`;
    // const initial_url = `https://api.outreach.io/api/v2/calls?filter%5BupdatedAt%5D=2020-05-29..inf&page%5Boffset%5D=300`;
    const outreachCalls = await getOutreachCalls(initial_url);

    const data = outreachCalls;
    console.log(data);

    // start paginating
    let url = data.links.next;
    let pageData = '';
    console.log('checking');
    if (url) {
      do {
        pageData = await getOutreachCalls(url);
        // data.data.push(pageData.data);
        // data.data.concat(pageData.data);
        data.data = [...data.data, ...pageData.data];
        url = pageData.links.next;
        console.log(pageData);
      } while (pageData.links.next);
    }
    // console.log(data);

    setAllTeamData(data);

    // updateDashboard(2);

    //   setRepData(result.data);

    // setRepData(data.meta.count);
  };

  // this runs the first time the page loads and runs the report
  useEffect(() => {
    // runReport();
  }, []);

  useEffect(() => {
    if (allTeamData) {
      updateDashboard(selectedUser);
    }
  }, [selectedUser, allTeamData]);

  return (
    <PageHeaderWrapper
      extraContent={
        <Button type="primary" onClick={runReport}>
          Refresh!!!
        </Button>
      }
      content="Check in on your progress each day to your goal. "
    >
      <Select
        defaultValue="Cameron"
        style={{ width: 120, marginBottom: 24 }}
        onChange={setSelectedUser}
      >
        <Option value="2">Cameron</Option>
        <Option value="3">Mikey</Option>
      </Select>
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="Calls Made" value={repData.calls} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="Appointments Set" value={repData.appointments} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="Dispositions" value={repData.dispositions} />
          </Card>
        </Col>
      </Row>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['formAndbasicForm/submitRegularForm'],
}))(BasicForm);
