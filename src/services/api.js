import request from '@/utils/request';


// add cors-anywhere to beginging of URL to get around CROS origin error
// cors-anywhere runs server side, and just mimics the api call you send it
// then returns back to data
const outreachUrl = 'https://cors-anywhere.herokuapp.com/https://api.outreach.io/api/v2/'
const token = 'Bearer example_token_haha!'

const headers = {
    authorization: token,
    'Content-Type': 'application/vnd.api+json',
}


export const getOutreachCalls = async () => request(`${outreachUrl}calls?filter[updatedAt]=2020-05-29..inf`, { headers })


