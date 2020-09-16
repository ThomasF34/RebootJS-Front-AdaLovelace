
async function loadJson(url) {
  const response = await fetch(url)
  if (response.status == 200) {
    return 1;
  } else {
    throw new Error(response.status);
  }
}

// loadJson('no-such-user.json').catch(alert);
// loadJson('https://murmuring-brook-56095.herokuapp.com/profiles').then(json => console.log(json)).catch(err => alert(err));

(async () => {
  try {
    const json = await loadJson('https://murmuring-brook-56095.herokuapp.com/profiles');
    console.log(json)
  } catch(err) {
    alert(err);
  }
})()