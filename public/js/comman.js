
const headers = () => {
  return { "content-type": "application/json" }
}
const apiPost = async (url, value = null) => await fetch(url, { method: "POST", body: value ? JSON.stringify(value) : {}, headers: headers() }).then(res => res.json());
const apiGet = async(url) => await fetch(url).then(res=> res.json());

const AuthGuard = () => {
  if (localStorage.getItem('token')) {
    GetAllUsers()
  } else {
    window.location.href = 'auth/login'
  }
}

const register = async () => {
  try {
    const formData = new FormData(document.querySelector('form'));
    const value = Object.fromEntries(formData.entries());
    const res = await apiPost('/auth/register', value);
    if (!res.error) {
      window.location.href = './login';
    } else {
      alert(JSON.stringify(res.message));
    }
  } catch (error) {
    alert(error);
  }
}

const login = async () => {
  try {
    const formData = new FormData(document.querySelector('form'));
    const value = Object.fromEntries(formData.entries());
    const res = await apiPost('/auth/login', value);
    if (!res.error) {
      localStorage.setItem('token', res?.access_token);
      window.location.href = '../home';
    } else {
      alert(JSON.stringify(res.message));
    }
  } catch (error) {
    alert(res.error);
  }
}

const GetAllUsers = async () => {
  try {
    const res = await apiGet('/users/all');
    if (!res.error) {
      prePareView(res);
    } else {
      alert(JSON.stringify(res.message));
    }
  } catch (error) {
    alert(res.error);
  }
}


const prePareView = async (data) => {
  let view = ''
  for (let i = 0; i < data.length; i++) {
    const e = data[i];
    view+= `<div class="userEmail"> <a href="chat/${e._id}">${e.email}</a>  </div>`
  }
  document.getElementById('list').innerHTML = view;
}