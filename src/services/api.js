import request from '@/utils/request';

// add cors-anywhere to beginging of URL to get around CROS origin error
// cors-anywhere runs server side, and just mimics the api call you send it
// then returns back to data
const outreachUrl = 'https://cors-anywhere.herokuapp.com/';
// const access_token = localStorage.getItem('outreachKey')

const headers = () => {
  const testToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJydXNzZWxsQGRlZXBoaXJlLmNvbSIsImlhdCI6MTU5NTA5MjMwMiwiZXhwIjoxNTk1MDk5NTAyLCJiZW50byI6ImFwcDJiIiwib3JnX3VzZXJfaWQiOjQsImF1ZCI6IkRlZXBIaXJlIiwic2NvcGVzIjoiQUJBQVFBPT0ifQ.RRJINR91eHy_V2d1J-A_FzcBtYk5s4HPYXHnn1o00Cg';
  const realToken = localStorage.getItem('outreachKey');
  return {
    authorization: `Bearer ${realToken || testToken}`,
    'Content-Type': 'application/vnd.api+json',
  };
};

export const getOutreachCalls = async (url) =>
  request(`${outreachUrl}${url}`, { headers: headers() });
export const getOutreachDispositions = async (url) =>
  request(`${outreachUrl}${url}`, { headers: headers() });
export const getOutreachOpportunities = async (url) =>
  request(`${outreachUrl}${url}`, { headers: headers() });
