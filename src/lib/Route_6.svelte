<script>
// @ts-nocheck

  import Navbar from "../companent/Navbar.svelte";
  import { onMount } from 'svelte'
  import { ServerHost, UserInfo, ConfigInfo, Show_Dialog, ToastText, Insert_Dialog } from '../store.js'
  import InsertWindows from "../companent/Insert_Windows.svelte"

  let loader = true
  let messageObj = []
  let trackObj = []
  let filter = 'all'

  async function function_1(){
    loader = true
    const response = await fetch(`${$ServerHost}/api_8/?status=select`)
    messageObj = await response.json()
    const response_2 = await fetch(`${$ServerHost}/api_9/?telefon=${$UserInfo[0].telefon}&status=${filter}`)
    trackObj = await response_2.json()
    loader = false
  }

  async function function_2(){
    loader = true
    const response = await fetch(`${$ServerHost}/api_6/?login=${$UserInfo[0].telefon}&password=${$UserInfo[0].password}`)
    $UserInfo = await response.json()
    loader = false
  }

  function Delete_Track(id){
    let timer = setInterval(async() => {
      if($Show_Dialog.otvet == 'yes'){
        clearInterval(timer)
        $Show_Dialog.show = false
        $Show_Dialog.otvet = ''
        await fetch(`${$ServerHost}/api_12/?status=delete&id=${id}`)
        $ToastText = 'Успешно удален'
        let findIdx = trackObj.findIndex(data => data.id === id)
        trackObj.splice(findIdx, 1)
        trackObj = trackObj
      }
      if($Show_Dialog.otvet == 'no'){
        clearInterval(timer)
        $Show_Dialog.show = false
        $Show_Dialog.otvet = ''
      }
    }, 300)
  }

  function Archive_IN(id){
    let timer = setInterval(async() => {
      if($Show_Dialog.otvet == 'yes'){
        clearInterval(timer)
        $Show_Dialog.show = false
        $Show_Dialog.otvet = ''
        await fetch(`${$ServerHost}/api_12/?status=archive_in&id=${id}`)
        $ToastText = 'Отправлен в архив'
        let findIdx = trackObj.findIndex(data => data.id === id)
        trackObj.splice(findIdx, 1)
        trackObj = trackObj
      }
      if($Show_Dialog.otvet == 'no'){
        clearInterval(timer)
        $Show_Dialog.show = false
        $Show_Dialog.otvet = ''
      }
    }, 300)
  }

  function Archive_Out(id){
    let timer = setInterval(async() => {
      if($Show_Dialog.otvet == 'yes'){
        clearInterval(timer)
        $Show_Dialog.show = false
        $Show_Dialog.otvet = ''
        await fetch(`${$ServerHost}/api_12/?status=archive_out&id=${id}`)
        $ToastText = 'Трек код разархивирован'
        let findIdx = trackObj.findIndex(data => data.id === id)
        trackObj.splice(findIdx, 1)
        trackObj = trackObj
      }
      if($Show_Dialog.otvet == 'no'){
        clearInterval(timer)
        $Show_Dialog.show = false
        $Show_Dialog.otvet = ''
      }
    }, 300)
  }

  function Insert_Track(){
    let timer = setInterval(async() => {
      if($Insert_Dialog.otvet == 'yes'){
        clearInterval(timer)
        $Insert_Dialog.show = false
        $Insert_Dialog.otvet = ''
        $Insert_Dialog.track_code = $Insert_Dialog.track_code.trim()
        $Insert_Dialog.text = $Insert_Dialog.text.trim()
        if ($Insert_Dialog.track_code == '' || $Insert_Dialog.text == ''){
          $ToastText = 'Некоторые поля пустые'
          return
        }
        await fetch(`${$ServerHost}/api_12/?status=insert&telefon=${$UserInfo[0].telefon}&track=${$Insert_Dialog.track_code}&text=${$Insert_Dialog.text}`)
        $ToastText = 'Трек код добавлен'
        function_1()
      }
      if($Insert_Dialog.otvet == 'no'){
        clearInterval(timer)
        $Insert_Dialog.show = false
        $Insert_Dialog.otvet = ''
      }
    }, 300)
  }

  onMount(() => {
    function_1()
	})

</script>

<Navbar/>
<InsertWindows/>

<main>
  {#if loader == true}
    <div style="display: grid; justify-content: center; padding-top: 200px;">
      <span class="loader"></span>
    </div>    
  {:else}
    {#if $UserInfo[0].moderator == 0}
      <div style="padding: 20px;">
        <h3>Добро пожаловать в систему отслеживания посылок из китая</h3>
        <br>
        <p>Для продолжения пользования сайтом переходите по ссылке <a href="https://wa.me/{$ConfigInfo[0].whats_app}?text=Здравствуйте%2C+Прошу+вас+зарегистрировать+меня+на+сайте"> Перейти</a></p>
        <br>
        <p style="margin-bottom: 10px;">Для более удобного пользования сайтом добавьте на главный экран вашего телефона приложение</p>  
        <pwa-install id="installComponent"></pwa-install>
        <button onclick="install()" id="installButton" class="comp_btn">Android</button>
        <button class="comp_btn" on:click={()=>{location.href='https://youtu.be/0j5jX8ufoFs'}}>iPhone</button>
        <button class="comp_btn" on:click={function_2}>Обновить</button>  
      </div>
    {:else}  
      <div class="container">

        {#if filter == 'all'}
          <div class="btn_panel">
            <button class="archive_btn" style="margin-right: -20px;">&nbsp;</button>
            <button class="add_btn"
              on:click={()=>{
                $Insert_Dialog.title_text = 'Добавить трек код'
                $Insert_Dialog.track_code = ''
                $Insert_Dialog.text = ''
                $Insert_Dialog.show = true
                Insert_Track()
              }}
            ><i class="material-icons" style="font-size: 3rem; margin-top:3px">add</i></button>
            <button class="archive_btn" style="margin-left: -20px;" on:click={()=>{
              filter = 'archive'
              function_1()
            }}>АРХИВ</button>
          </div>

          {#each messageObj as data}
            <div class="message">
              <h3>Сообщение...</h3>
              <p style="color: #272727;">{data.message}</p>
            </div>
          {/each}
        {/if}

        {#if filter == 'archive'}
          <div style="text-align: center; margin-bottom:20px;">
            <h1 style="margin-bottom: 5px;">Архив</h1>
            <button class="archive_btn" style="width: 40%;"
              on:click={()=>{
                filter = 'all'
                function_1()
              }}
            >Назад</button>
          </div>
        {/if}
        
        {#each trackObj as data}
          <div class="card">
            <div class="cart_title" style="background-color: {data.back_color};">
              <div>
                <h4>{data.track_code}</h4>
                <p>{new Date(`${data.datecreate}`).toLocaleTimeString('ru-Ru',{ month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})}</p>
              </div>
              <div>
                {#if data.status != 'archive'}
                  <button on:click={()=> {
                    $Show_Dialog.text = 'Отправить трек код в архив'
                    $Show_Dialog.show = true
                    Archive_IN(data.id)
                  }}>
                    <i class="material-icons" style="font-size: 2rem;">archive</i>
                  </button>
                {:else}
                  <button on:click={()=> {
                    $Show_Dialog.text = 'Разархивировать трек код'
                    $Show_Dialog.show = true
                    Archive_Out(data.id)
                  }}>
                    <i class="material-icons" style="font-size: 2rem;">open_in_new</i>
                  </button>
                {/if}
              </div>
              <div>
                <button on:click={()=> {
                  $Show_Dialog.text = 'Удалить трек код'
                  $Show_Dialog.show = true
                  Delete_Track(data.id)
                }}><i class="material-icons" style="font-size: 2rem;">delete_forever</i>
                </button>
              </div>
            </div>
            <div class="card_center">
              <h2 style="font-weight: 400;">{data.detail}</h2>
              <br>
              <div class="track_put">
                <div>
                  <button style="background-color: rgb(0, 218, 76);"><i style="font-size: 1.2rem; margin-top:5px;" class="material-icons">done</i></button>
                </div>
                <div>
                  <p>Дата регистрации клиентом</p>
                  <h4>{new Date(`${data.datecreate}`).toLocaleTimeString('ru-Ru',{ month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})}</h4>
                </div>
              </div>
              <div class="track_put">
                <div>
                  {#if data.guangzhou != null}
                    <button style="background-color: rgb(0, 218, 76);"><i style="font-size: 1.2rem; margin-top:5px;" class="material-icons">done</i></button>
                  {:else}
                    <button><i class=""></i></button>
                  {/if}
                </div>
                <div>
                  <p>Получено на складе в Китае</p>
                  {#if data.guangzhou != null}
                    <h4>{new Date(`${data.guangzhou}`).toLocaleTimeString('ru-Ru',{ month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})}</h4>
                  {:else}
                    <h4>Нет данных</h4>
                  {/if}
                  
                </div>
              </div>
              <div class="track_put">
                <div>
                  {#if data.almaty != null}
                    <button style="background-color: rgb(0, 218, 76);"><i style="font-size: 1.2rem; margin-top:5px;" class="material-icons">done</i></button>
                  {:else}
                    <button><i class=""></i></button>
                  {/if}
                </div>
                <div>
                  <p>Получено на складе Алматы</p>
                  {#if data.almaty != null}
                    <h4>{new Date(`${data.almaty}`).toLocaleTimeString('ru-Ru',{ month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})}</h4>
                  {:else}
                    <h4>Нет данных</h4>
                  {/if}
                </div>
              </div>
              {#if data.gorod_out != null}
                <div class="track_put">
                  <div>
                    <button style="background-color: rgb(0, 218, 76);"><i style="font-size: 1.2rem; margin-top:5px;" class="material-icons">done</i></button>
                  </div>
                  <div>
                    <p>Отправлено {data.gorod_name}</p>
                    <h4>
                      {new Date(`${data.gorod_out}`).toLocaleTimeString('ru-Ru',{ month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})}
                    </h4>
                  </div>
                </div>
              {/if}
              {#if data.gorod_in != null}
                <div class="track_put">
                  <div>
                    <button style="background-color: rgb(0, 218, 76);"><i style="font-size: 1.2rem; margin-top:5px;" class="material-icons">done</i></button>
                  </div>
                  <div>
                    <p>Получено на складе {data.gorod_in_name}</p>
                    <h4>
                      {new Date(`${data.gorod_in}`).toLocaleTimeString('ru-Ru',{ month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})}
                    </h4>
                  </div>
                </div>
              {/if}
              <div class="track_put">
                <div>
                  {#if data.client_out != null}
                    <button style="background-color: rgb(0, 218, 76);"><i style="font-size: 1.2rem; margin-top:5px;" class="material-icons">done</i></button>
                  {:else}
                    <button><i class=""></i></button>
                  {/if}
                </div>
                <div>
                  <p>Получено клиентом</p>
                  {#if data.client_out != null}
                    <h4>{new Date(`${data.client_out}`).toLocaleTimeString('ru-Ru',{ month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})}</h4>
                  {:else}
                    <h4>Нет данных</h4>
                  {/if}
                  </div>
              </div>
            </div>
          </div>          
        {/each}
        {#if trackObj.length > 0}
          <div class="card" style="padding: 10px; padding-left:20px;">
            <h3 style="font-weight: 400;">Всего: {trackObj.length.toString()}</h3>
          </div>
          
          {#if filter == 'archive'}
            <div style="text-align: center;">
              <button class="archive_btn" style="width: 40%;"
                on:click={()=>{
                  filter = 'all'
                  function_1()
                }}
              >Назад</button>
            </div>
          {/if}
        {/if}
      </div>
    {/if}
  {/if}
</main>

<style>
  main{
    padding-top: 70px;
  }
  .track_put{
    display: grid;
    grid-template-columns: 45px auto;
    align-items: center;
    margin-left: 10px;
    margin-bottom: 20px;
  }
  .track_put button{
    width: 30px;
    height: 30px;
    background-color: rgb(178, 178, 178);
    border: none;
    border-radius: 50%;
    color: white;
    font-weight: 900;
  }
  .container{
    padding: 20px;
    padding-top: 10px;
  }
  .card{
    border-radius: 10px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
    background-color: white;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  .cart_title{
    display: grid;
    grid-template-columns: auto 35px 35px;
    gap: 10px;
    padding: 10px;
    color: white;
    font-size: 1.5rem;
    background-color: rgb(168, 168, 168);
    border-radius: 10px 10px 0 0;
  }
  .cart_title p{
    font-size: 1rem;
    color: white;
  }
  .cart_title button{
    color: white;
    border: none;
    background-color: rgba(0, 0, 0, 0.0);
    height: 100%;
  }
  .cart_title button:active{
    color: rgb(255, 74, 74);
  }
  .card_center{
    padding: 10px;
  }
  p{
    color: gray;
    font-size: 1rem;
  }
  .btn_panel{
    position: relative;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 70px 1fr;
    margin-bottom: 10px;
  }
  .add_btn{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: none;
    background-color: rgb(251, 90, 65);
    box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.3);
    color: rgb(255, 255, 255);
    z-index: 1;
  }
  .add_btn:active{
    background-color: rgb(245, 111, 90);
  }
  .archive_btn{
    height: 40px;
    padding: 7px;
    font-size: 1.2rem;
    color: rgb(255, 255, 255);
    border: none;
    background-color: rgb(125, 125, 125);
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.3);
    border-radius: 20px;
  }
  .archive_btn:active{
    background-color: rgb(183, 183, 183);;
  }
</style>
