import { Button, Card, Row, Col, Statistic, Select } from 'antd';

import { connect } from 'umi';
import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { getOutreachCalls } from '@/services/api';

const { Option } = Select;

const BasicForm = () => {
  const [callsMade, setCallsMade] = useState(0);
  const [selectedUser, setSelectedUser] = useState(2);
  const [teamData, setTeamData] = useState();
  const updateDashboard = (userId) => {
    console.log(teamData);
    // const myData = teamData.data.filter((val) => val.relationships.user.data === userId);
    /* let displayedData = [];
	let newData = teamData.data.relationships.data.user.data.id;
	teamData.data.forEach(function(newData){
		if(newData === userId){
			displayedData.push()
		}
	};
	setCallsMade(teamData.meta.count);
	

	}
	setCallsMade(teamData.data) */
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
    setSelectedUser(value);
    updateDashboard(value);
  }

  const runReport = async () => {
    const initial_url = `https://api.outreach.io/api/v2/calls?filter[updatedAt]=2020-05-29..inf`;
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
    useEffect(() => {
      console.log(teamData);
    }, [teamData]);
    setTeamData(data);

    // updateDashboard(2);

    // do things with the outreach data here
    // outreachCallsD
    //   setCallsMade(result.data);

    // setCallsMade(data.meta.count);
  };

  // this runs the first time the page loads and runs the report
  useEffect(() => {
    runReport();
  }, []);

  return (
    <PageHeaderWrapper
      extraContent={
        <Button type="primary" onClick={runReport}>
          Refresh!!!
        </Button>
      }
      content="Check in on your progress each day to your goal. "
    >
      <Select defaultValue="Cameron" style={{ width: 120 }} onChange={handleChange}>
        <Option value="2">Cameron</Option>
        <Option value="3">Mikey</Option>
      </Select>
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="Calls Made" value={callsMade} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="Appointments Set" value={333} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="Dispositions" value={2} />
          </Card>
        </Col>
      </Row>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['formAndbasicForm/submitRegularForm'],
}))(BasicForm);
