import request from '@/utils/request';

// add cors-anywhere to beginging of URL to get around CROS origin error
// cors-anywhere runs server side, and just mimics the api call you send it
// then returns back to data
const outreachUrl = 'https://cors-anywhere.herokuapp.com/';
const access_token =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdGV2ZW5AZGVlcGhpcmUuY29tIiwiaWF0IjoxNTkxMDIxOTQ1LCJleHAiOjE1OTEwMjkxNDUsImJlbnRvIjoiYXBwMmIiLCJvcmdfdXNlcl9pZCI6MSwiYXVkIjoiRGVlcEhpcmUiLCJzY29wZXMiOiJBQkFBUUE9PSJ9.KPEADvPCVamUdCTde5I2_v321Sg3Ur-YbaNfGedC8DE';
const token = `Bearer ${access_token}`;

const headers = {
  authorization: token,
  'Content-Type': 'application/vnd.api+json',
};

export const getOutreachCalls = async (url) => request(`${outreachUrl}${url}`, { headers });
