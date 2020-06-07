import { Button, Card, Row, Col, Statistic, Select } from 'antd';

import { connect } from 'umi';
import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import {
  getOutreachCalls,
  getOutreachDispositions,
  getOutreachOpportunities,
} from '@/services/api';
import allTeamData1 from './data.json';

const { Option } = Select;

const BasicForm = () => {
  const [repData, setRepData] = useState({ calls: 0, appointments: 0 });
  const [selectedUser, setSelectedUser] = useState(2);
  const [allTeamData, setAllTeamData] = useState(allTeamData1);
  const [allTeamOpportunities, setAllTeamOpportunities] = useState(null);

  const updateDashboard = (userId) => {
    let selectedRepData = []
    let selectedRepDataOpportunities = []
    console.log(`${userId}HELLO`);

    if (allTeamData?.data) {
      selectedRepData = allTeamData.data.filter(
        (val) => val.relationships.user.data.id === parseInt(userId, 10),
      );
    }

    // the error you were getting was due to allTeamOpportunities.data sometimes being undefined. Then you would get error (can't use .filter on undefined)
    // this would happen the first time updateDashboard got ran
    if (allTeamOpportunities?.data) {
        selectedRepDataOpportunities = allTeamOpportunities.data.filter(
        (val) => val.relationships.creator.data.id === parseInt(userId, 10),
      )
    }

    const calls = selectedRepData.length
    const appointments = selectedRepDataOpportunities.length
    setRepData({ ...repData, calls, appointments });
  };

  const runReport = async () => {
    console.log('HELLO');
    const initialCallsUrl = `https://api.outreach.io/api/v2/calls?filter[updatedAt]=2020-06-02..inf`;
    const outreachCalls = await getOutreachCalls(initialCallsUrl);
    // const initialDispositionsUrl = `https://api.outreach.io/api/v2/callDispositions`;
    // const outreachDispositions = await getOutreachDispositions(initialDispositionsUrl);
    const initialOpportunitiesUrl = `https://api.outreach.io/api/v2/opportunities?filter[createdAt]=2020-06-02..inf`;
    const outreachOpportunities = await getOutreachOpportunities(initialOpportunitiesUrl);

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

    // get all opportunities
    const dataOpps = outreachOpportunities;
    console.log(dataOpps);
    /*
    // start paginating
    let urlOpps = dataOpps.links.next;
    let pageDataOpps = '';
    console.log('checking opportunities');
    if (urlOpps) {
      do {
        pageDataOpps = await getOutreachOpportunities(urlOps);
        // data.data.push(pageData.data);
        // data.data.concat(pageData.data);
        dataOpps.data = [...dataOpps.data, ...pageDataOpps.data];
        urlOpps = pageDataOpps.links.next;
        console.log(pageDataOpps);
      } while (pageDataOpps.links.next);
    }
    console.log(dataOpps); */
    setAllTeamData(data);
    setAllTeamOpportunities(dataOpps);

    // updateDashboard(2);

    //   setRepData(result.data);

    // setRepData(data.meta.count);
  };

  // this runs the first time the page loads and runs the report
  useEffect(() => {
    runReport();
  }, []);

  useEffect(() => {
    if (allTeamData && allTeamOpportunities) {
      updateDashboard(selectedUser);
    }
  }, [selectedUser, allTeamData, allTeamOpportunities]);

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
