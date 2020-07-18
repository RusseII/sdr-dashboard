const fetch = require('node-fetch');

export default async (req, res) => {
  const client_id = 'csijgHr1EAq6YIJ2rRne5WGWVnUuL0_t_bRu1HIf2Ho';
  const client_secret = process.env.OUTREACH_CLIENT_SECRET;
  const redirect_uri = 'https://a.deephire.com/outreach';
  const grant_type = 'authorization_code';
  const { code } = req.query;
  const data = { client_id, client_secret, redirect_uri, grant_type, code };
  const response = await fetch('https://api.outreach.io/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const resultData = await response.json();
  res.json(resultData);
};
