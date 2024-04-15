<script>
// @ts-nocheck

  import { ConfigInfo, UserInfo, ToastText } from '../store.js'
  import { fly } from 'svelte/transition'
  import { navigate } from "svelte-navigator"

  let menu_show = false
  async function copyText(){
    let adresText = document.getElementById('copy_adress')
    try{
      await navigator.clipboard.writeText(adresText.textContent)
      $ToastText = 'Текст успешно скопирован'
    }catch(e){
      $ToastText = 'Ошибка ' + e
    }
  }

</script>

<div class="container">
  <div style="display: grid; grid-template-columns: 50px auto; align-items: center;">
    <button on:click={()=>{
      if($UserInfo[0].moderator == 1)
        {menu_show = !menu_show}
    }}>
      {#if menu_show}
        <i class="material-icons">close</i>
      {:else}
        <i class="material-icons">menu</i>
      {/if}
    </button>
    <h2>{$ConfigInfo[0].name_company}</h2>
  </div>
  <div style="text-align: right; padding-right:10px;">
    <h3>{$UserInfo[0].telefon}</h3>
    <p>{$UserInfo[0].name} {$UserInfo[0].family}</p>
  </div>
</div>



{#if menu_show}
  <div class="menu" in:fly="{{ x: -300, duration: 500 }}" out:fly="{{ x: -300, duration: 500 }}">
    <div class="card" style="background-color: rgb(200, 255, 156);">
      <h3 style="margin-bottom: 5px;">Адрес склада в Китае...</h3>
      <p id="copy_adress" style="color: black;">
        {$ConfigInfo[0].adres_1}<strong>({$UserInfo[0].telefon}){$UserInfo[0].name}</strong><br>
        {$ConfigInfo[0].adres_2}<strong>{$ConfigInfo[0].name_company}-{$UserInfo[0].gorod}</strong><br>
        {$ConfigInfo[0].adres_3}
      </p>
      <br>
      <button on:click={copyText} class="green_btn">Копировать</button>
    </div>
    <br>
    <div class="card" style="background-color: rgb(255, 187, 187);">
      <img src="img/adres.jpeg" width="100%" alt="">
    </div>
    <br>
    <div class="card" style="background-color: rgb(232, 232, 232);">
      <p>Для более удобного пользования сайтом добавьте на главный экран вашего телефона приложение</p>
      <br>
      <button class="gray_btn" onclick="install()">Android</button>
      <button class="gray_btn" on:click={()=>{location.href='https://youtu.be/0j5jX8ufoFs'}}>iPhone</button>
    </div>
    <br>
    <div class="card" style="text-align: center;">
      <button style="padding: 5px 10px 5px 10px; font-size:1.1rem;" id="out_btn" 
        on:click={()=>{
          localStorage.setItem('login', '')
          localStorage.setItem('password', '')
          navigate("/", { replace: true })
        }}>
          Выход из системы
      </button>
    </div>
  </div>
{/if}

<style>
  .container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: #313131;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    z-index: 3;
  }
  .container button{
    height: 70px;
    padding-top: 3px;
    color: #ffffff;
    background-color: #313131;
    border: none;
  }
  .container button:active{
    background-color: #424242;
  }
  .container button i{
    font-size: 2.2rem;
  }
  .container h2{
    font-weight: 600;
    color: white;
    padding-left: 5px;
  }
  .container h3{
    font-size: 1.4rem;
    color: gray;
    font-weight: 400;
  }
  .container p{
    font-size: 1rem;
    color: gray;
  }
  strong{
    font-weight: 600;
  }
  .menu{
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    padding: 80px 10px 10px 10px;
    background-color: white;
    z-index: 2;
    overflow-y: scroll;
  }
  .menu p{
    font-size: 1rem;
    font-weight: 400;
  }
  .card{
    padding: 10px;
  }
  .green_btn{
    border: none;
    font-size: 1.2rem;
    padding: 5px 20px 5px 20px;
    background-color: rgb(133, 194, 38);
    box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    color: rgb(255, 255, 255);
  }
  .gray_btn{
    border: none;
    font-size: 1.2rem;
    padding: 5px 20px 5px 20px;
    background-color: rgb(164, 164, 164);
    box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    color: rgb(255, 255, 255);
  }
</style>
