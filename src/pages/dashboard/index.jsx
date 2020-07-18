import { Button, Card, Row, Col, Statistic, Select, Skeleton, DatePicker, Avatar, Space } from 'antd';

import { CrownTwoTone } from '@ant-design/icons';
import { connect } from 'umi';
import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';

import {
  getOutreachCalls,
  getOutreachDispositions,
  getOutreachOpportunities,
} from '@/services/api';

import russell from '@/assets/russell_photo.jpg';
import will from '@/assets/will.jpeg';
import steve from '@/assets/steve.jpeg';
import mike from '@/assets/mike.jpeg';


import allTeamData1 from './data.json';



const photos = {
  'russell@deephire.com': russell,
  'steven@deephire.com': steve,
  'will@deephire.com': will,
  'mike@deephire.com': mike,

}
// format('YYYY-MM-DD')

const { Option } = Select;

const BasicForm = () => {
  const [users, setUsers] = useState([{},{},{},{}])
  const [loading, setLoading] = useState(false)
  // const [selectedUser, setSelectedUser] = useState(2);
  const [allTeamData, setAllTeamData] = useState({});
  const [allTeamOpportunities, setAllTeamOpportunities] = useState(null);
  const [selectedDates, setSelectedDates] = useState([moment().startOf('week'), moment()]);


  const filterUser = (userId) => {
    let selectedRepData = [];
    let selectedRepDataOpportunities = [];

    if (allTeamData?.data) {
      selectedRepData = allTeamData.data.filter(
        (val) => val.relationships.user?.data.id === parseInt(userId, 10),
      );
    }

    // the error you were getting was due to allTeamOpportunities.data sometimes being undefined. Then you would get error (can't use .filter on undefined)
    // this would happen the first time updateDashboard got ran
    if (allTeamOpportunities?.data) {
      selectedRepDataOpportunities = allTeamOpportunities.data.filter(
        (val) => val.relationships.creator.data.id === parseInt(userId, 10),
      );
    }

    const calls = selectedRepData.length;
    const appointments = selectedRepDataOpportunities.length;
    // setRepData({ ...repData, calls, appointments, dispositions: 0 });

    return {calls, appointments, dispositions: 0 }
  };

  const filteredData = users.map(r => ({...r, repData: filterUser(r.id)})).sort((a,b) => b.repData.calls - a.repData.calls)


  const runReport = async () => {
    setLoading(true)
    console.log('HELLO');
    const initialCallsUrl = `https://api.outreach.io/api/v2/calls?filter[updatedAt]=${selectedDates[0].format(
      'YYYY-MM-DD',
    )}..${selectedDates[1].format('YYYY-MM-DD')}&page[limit]=1000`;
    const outreachCalls = await getOutreachCalls(initialCallsUrl);
    // const initialDispositionsUrl = `https://api.outreach.io/api/v2/callDispositions`;
    // const outreachDispositions = await getOutreachDispositions(initialDispositionsUrl);
    const initialOpportunitiesUrl = `https://api.outreach.io/api/v2/opportunities?filter[createdAt]=${selectedDates[0].format(
      'YYYY-MM-DD',
    )}..${selectedDates[1].format('YYYY-MM-DD')}&page[limit]=1000`;
    const outreachOpportunities = await getOutreachOpportunities(initialOpportunitiesUrl);


    const data = outreachCalls;
    console.log(data);

    // start paginating
    let url = data?.links?.next;
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
    setLoading(false)

    // updateDashboard(2);

    //   setRepData(result.data);

    // setRepData(data.meta.count);
  };


  useEffect(() => {
    const getUsers = async () => {
      // haha this function name is so dumb
      const allUsers = await getOutreachOpportunities('https://api.outreach.io/api/v2/users')
      setUsers(allUsers.data)
    }
  getUsers()
  }, []);


  // this runs the first time the page loads and runs the report
  useEffect(() => {
    if (users[0]) {
    
    runReport();
    }
  }, [selectedDates]);


  return (
    <PageHeaderWrapper
      extraContent={
        <DatePicker.RangePicker
        allowClear={false}
        disabledDate={(current) => current && current > moment().endOf('day')}
        ranges={{
          Today: [moment(), moment()],
          'This Week': [moment().startOf('week'), moment().endOf('week')],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
        }}
        defaultValue={selectedDates}
        onChange={(dates) => {
          setSelectedDates(dates);
        }}
      />
      }
      content="Check in on your progress each day to your goal. "
    >

     

      {filteredData.map((user, index) =>  <Card style={{marginBottom: 24}} title={<Space><Avatar style={{marginRight: 8}}  src={photos[user?.attributes?.email]} /> <>{user?.attributes?.name}</> {index === 0 ? <CrownTwoTone twoToneColor='gold' /> : null}</Space>}>
        <Row gutter={[24,24]}>
        <Col span={8}>
          
            <Skeleton active loading={loading}>
              <Statistic title="Calls Made" value={user?.repData?.calls} />
            </Skeleton>
         
        </Col>
        <Col span={8}>
          
            <Skeleton active loading={loading}>
              <Statistic title="Appointments Set" value={user?.repData?.appointments} />
            </Skeleton>
         
        </Col>
        <Col span={8}>
          
            <Skeleton active loading={loading}>
              <Statistic title="Dispositions" value={user?.repData?.dispositions} />
            </Skeleton>
           
          
        </Col>
      </Row>
      </Card>)}
     

      
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['formAndbasicForm/submitRegularForm'],
}))(BasicForm);
