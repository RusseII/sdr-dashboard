import request from '@/utils/request';

// add cors-anywhere to beginging of URL to get around CROS origin error
// cors-anywhere runs server side, and just mimics the api call you send it
// then returns back to data
const outreachUrl = 'https://cors-anywhere.herokuapp.com/';
// const access_token = localStorage.getItem('outreachKey')


// localStorage.setItem('outreachKey','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJydXNzZWxsQGRlZXBoaXJlLmNvbSIsImlhdCI6MTU5NTEwNjY4NCwiZXhwIjoxNTk1MTEzODg0LCJiZW50byI6ImFwcDJiIiwib3JnX3VzZXJfaWQiOjQsImF1ZCI6IkRlZXBIaXJlIiwic2NvcGVzIjoiQUJBQVFBR0EifQ.8jrpxFD0RE3T4rE_E9fRho_-mw2pL95_XupoPdl_Ye0')

const headers = () => {
  const realToken = localStorage.getItem('outreachKey');

  if (!realToken)
    window.open(
      'https://api.outreach.io/oauth/authorize?client_id=csijgHr1EAq6YIJ2rRne5WGWVnUuL0_t_bRu1HIf2Ho&redirect_uri=https://a.deephire.com/outreach&response_type=code&scope=accounts.all+calls.all+opportunities.all',
      '_self',
    );

  return {
    authorization: `Bearer ${realToken}`,
    'Content-Type': 'application/vnd.api+json',
  };
};

export const getOutreachCalls = async (url) =>
  request(`${outreachUrl}${url}`, { headers: headers() });
export const getOutreachDispositions = async (url) =>
  request(`${outreachUrl}${url}`, { headers: headers() });
export const getOutreachOpportunities = async (url) =>
  request(`${outreachUrl}${url}`, { headers: headers() });
