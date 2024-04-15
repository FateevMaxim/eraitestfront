<script>
  import { navigate } from "svelte-navigator"
  import { onMount } from 'svelte'
  import { ServerHost, ToastText, Comp_User, ConfigInfo } from '../store.js'

  let login = '', password = ''
  async function function_1(){
    const response = await fetch(`${$ServerHost}/api_1/?login=${login}&password=${password}`)
    const data = await response.json()
    if (data.length != 0){
      localStorage.setItem('login', data[0].login)
      localStorage.setItem('password', data[0].password)
      $Comp_User = data
      navigate(`/Route_${data[0].route}`, { replace: true })
    }else{
      $ToastText = 'Логин или пароль неверный'
    }
  }

  onMount(async() => {
    login = localStorage.getItem('login')
    password = localStorage.getItem('password')
  })
</script>

<main>
  <div class="left_col">
    <img src="img/comp_fon.svg" width="80%" alt="">
  </div>
  <div class="right_col">
    <div class="right_container">
      <h1>{$ConfigInfo[0].title_text}</h1>
      <h2 style="text-align: center;">Вход в систему</h2>
      <br><br><br>
      <p class="input_label">Логин</p>
      <input type="text" bind:value={login}>
      <br><br>
      <p class="input_label">Пароль</p>
      <input type="password" bind:value={password}>
      <br><br>
      <div style="text-align: center;">
        <button style="width: 50%;" class="comp_btn" on:click={function_1}>Вход</button>
      </div>
    </div>
  </div>
</main>

<style>
  main{
    display: grid;
    grid-template-columns: 4fr 3fr;
    align-items: center;
  }
  .left_col{
    text-align: right;
    padding-right: 50px;
  }
  .right_col{
    display: grid;
    justify-content: start;
  }
  .right_container{
    position: relative;
    width: 300px;
    height: 350px;
    background-color: white;
    padding: 20px 40px 20px 40px;
  }
  h1{
    width: 100%;
    position: absolute;
    top: -50px;
    left: 0;
    text-align: center;
    font-weight: 400;
    font-family: 'Rubik';
  }
</style>
