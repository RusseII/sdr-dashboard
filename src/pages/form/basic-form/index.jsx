import {
  Button,
  Card,
  Row,
  Col,
  Statistic
} from 'antd';

import { connect } from 'umi';
import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { getOutreachCalls } from '@/services/api';


const BasicForm = () => {
  const [callsMade, setCallsMade] = useState(0);

  const runReport = async () => {
    const outreachCalls = await getOutreachCalls()
    const data = outreachCalls
    // do things with the outreach data here 
    // outreachCallsD

    //   setCallsMade(result.data);
    setCallsMade(callsMade + 1);
  };

  // this runs the first time the page loads and runs the report
  useEffect(() => {
    runReport()
  }, [])

  return (
    <PageHeaderWrapper extraContent={<Button type="primary" onClick={runReport}>
      Refresh!!!
  </Button>} content="Check in on your progress each day to your goal. ">


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