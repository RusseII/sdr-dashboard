import { InfoCircleOutlined } from '@ant-design/icons';
import {
  Typography,
  Button,
  Card,
  DatePicker,
  Input,
  Form,
  InputNumber,
  Radio,
  Select,
  Tooltip,
  Row,
  Col,
} from 'antd';
import axios from 'axios';

import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';

const { Title } = Typography;

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const BasicForm = (props) => {
  const [callsMade, setCallsMade] = useState(0);

  const runReport = async () => {
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://api.outreach.io/api/v2/calls?filter[updatedAt]=2020-05-29..inf'
      )
      .then((result) => {
        console.log(result);
      });
    //   setCallsMade(result.data);

    setCallsMade(callsMade + 1);
  };

        
  
  return (
    <PageHeaderWrapper content="Check in on your progress each day to your goal. ">
      <Button type="primary" onClick={runReport}>
        Refresh!!!
      </Button>

      <Row gutter={16}>
        <Col span={8}>
          <Card title="Calls" bordered={false}>
            Calls Made: <Title>{callsMade}</Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Appointments Set" bordered={false}>
            TEST
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Dispositions" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['formAndbasicForm/submitRegularForm'],
}))(BasicForm);
