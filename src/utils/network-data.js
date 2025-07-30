const BASE_URL = 'https://stuffnudgebe-production.up.railway.app/api/v1';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login({ username, password }) {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const responseJson = await response.json();
  console.log("ini responsenya dari utlis/login", responseJson)

  if (responseJson.message !== 'success') {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function register({ username, email, password }) {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.message !== 'success') {
    return { error: true };
  }

  return { error: false };
}

async function updateUser({username,email,password,newPassword}) {
    console.log("fungsi ini ketrigger kok",password,newPassword)
    const response = await fetchWithToken(`${BASE_URL}/users/updateUser`,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username,email, password,newPassword})
    })

    const responseJson = await response.json();

    if(responseJson.message != 'success'){
        return { error:true, data:null};
    }

    return {error:false, data:responseJson.data}
}


function logout() {
  localStorage.removeItem('accessToken');
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/user`);
  const responseJson = await response.json();
  console.log("fungsi getUser ke trigger")

  if (responseJson.message !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function addActivity({ activity_name, activity_date,description, items }) {
  const response = await fetchWithToken(`${BASE_URL}/acts/addActivity`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ activity_name,activity_date,description,items }),
  });

  const responseJson = await response.json();

  if (responseJson.message !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getAllActivity(){
  const response = await fetchWithToken(`${BASE_URL}/acts/Activities`)
  const responseJson = await response.json();
  console.log("fungsi ini ketrigger")

  if(responseJson.message!= 'success') {
    return { error: true, data:null}
  }

  return { error: false, data: responseJson.data };
}

async function updateActivity({ id_activity, activity_name, activity_date, description, items}){
  const response = await fetch(`${BASE_URL}/acts/updateAct/${id_activity}`,{
    method:'PUT',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({activity_name,activity_date,items,description})
  })
  const responseJson = await response.json();

  if(responseJson.message!= 'success') {
    return { error: true, data:null}
  }

  return { error: false, data: responseJson.data };
}

async function deleteActivity(id_activity) {
  const response = await fetch(`${BASE_URL}/acts/deleteAct/${id_activity}`, {
    method: 'DELETE',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  updateUser,
  addActivity,
  getAllActivity,
  updateActivity,
  deleteActivity,
  logout
};