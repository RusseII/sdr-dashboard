const AuthScreen = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    fetch(`/api/get-token?code=${code}`)
      .then((r) => r.json())
      .then((r) => {
        localStorage.setItem('outreachKey', r.access_token);
        window.location.href = window.location.origin;
      });
    return 'Authorizing with Outreach...';
  }

  return 'Missing Auth Token';
};

export default AuthScreen;
