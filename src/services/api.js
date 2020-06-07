import request from '@/utils/request';

// add cors-anywhere to beginging of URL to get around CROS origin error
// cors-anywhere runs server side, and just mimics the api call you send it
// then returns back to data
const outreachUrl = 'https://cors-anywhere.herokuapp.com/';
const access_token =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdGV2ZW5AZGVlcGhpcmUuY29tIiwiaWF0IjoxNTkxNTU0Mzc3LCJleHAiOjE1OTE1NjE1NzcsImJlbnRvIjoiYXBwMmIiLCJvcmdfdXNlcl9pZCI6MSwiYXVkIjoiRGVlcEhpcmUiLCJzY29wZXMiOiJBQkFBUUFBZ0FZQT0ifQ.8RInDkX3d7FBLp8Vh1lu5UWXQ4c_nDHoz5eoHmzFnD8';
const token = `Bearer ${access_token}`;

const headers = {
  authorization: token,
  'Content-Type': 'application/vnd.api+json',
};

export const getOutreachCalls = async (url) => request(`${outreachUrl}${url}`, { headers });
export const getOutreachDispositions = async (url) => request(`${outreachUrl}${url}`, { headers });
export const getOutreachOpportunities = async (url) => request(`${outreachUrl}${url}`, { headers });
