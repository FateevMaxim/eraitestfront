<script>
  import { navigate } from "svelte-navigator"
  import { onMount } from 'svelte'
  import { ServerHost, ToastText, ConfigInfo, UserInfo, GorodInfo, Scaner } from '../store.js'

  if (window.innerWidth > window.innerHeight){
    navigate("/Route_1", { replace: true })
  }
  let login = '', password = ''

  async function function_1(){
    if (login.length == 0 || password.length == 0) {
      $ToastText = 'Некоторые поля заполнены неверно'
      return
    }
    try {
      const response = await fetch(`${$ServerHost}/api_6/?login=${login}&password=${password}`)
      const data = await response.json()
      if (data.length == 0){
        $ToastText = 'Логин или пароль неверный'
        return
      }
      $UserInfo = data
      localStorage.setItem('login', login)
      localStorage.setItem('password', password)
      if (data[0].status == 'Moderator' || data[0].status == 'Admin'){
        navigate("/Route_5", { replace: true })
      }
      if (data[0].status == 'Client'){
        navigate("/Route_6", { replace: true })
      }
    }catch (e) {
      $ToastText = 'Ошибка подключения'
    }
  }

  onMount(async() => {
    login = localStorage.getItem('login')
    password = localStorage.getItem('password')
    const response = await fetch(`${$ServerHost}/api_0`)
    $ConfigInfo = await response.json()
    const response_2 = await fetch(`${$ServerHost}/api_0_2`)
    $GorodInfo = await response_2.json()
    const response_3 = await fetch(`${$ServerHost}/api_0_5`)
    $Scaner = await response_3.json()
  })
</script>

<main>
  <div class="row_1">
    <div>
      <img src="img/logo.png" width="50%" alt="">
      <h1 style="margin-top:10px; font-weight: 600; color:#181818;">{$ConfigInfo[0].title_text}</h1>
      <p>{$ConfigInfo[0].title_text_2}</p>
    </div>
  </div>
  <div class="row_2">
    <h2 style="color: gray; margin-bottom:20px;">Вход в систему</h2>
    <input class="input_phone" type="tel" placeholder="Телефон" bind:value={login}>
    <input class="input_phone" type="password" placeholder="Пароль" bind:value={password}>
    <button style="width: 50%;" class="phone_btn_dark" on:click={function_1}>Вход</button><br>
    <button class="href_btn" on:click={()=>{navigate("/Route_4", { replace: true })}}>&nbsp;Регистрация&nbsp;</button>
  </div>
</main>

<style>
  main{
    display: grid;
    grid-template-rows: 300px auto;
  }
  .row_1{
    display: grid;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .row_2{
    padding-left: 50px;
    padding-right: 50px;
    text-align: center;
  }
</style>
