<script>
  import Navbar from "../companent/Navbar.svelte";
  import { onMount } from 'svelte'
  import { navigate } from "svelte-navigator"
  import { ServerHost, UserInfo, ToastText, Show_Dialog, Insert_Dialog } from '../store.js'
  import InsertWindows from "../companent/Insert_Windows.svelte";

  let loader = true
  let messageObj = []
  let AllClientObj = []
  let findTelefon = ''
  let moderator = $UserInfo[0].name

  async function function_1(){
    loader = true
    const response = await fetch(`${$ServerHost}/api_8/?status=select`)
    messageObj = await response.json()
    const response_2 = await fetch(`${$ServerHost}/api_10/?status=all`)
    AllClientObj = await response_2.json()
    findTelefon = ''
    loader = false
  }

  async function function_2(){
    const response = await fetch(`${$ServerHost}/api_10/?status=telefon&telefon=${findTelefon}`)
    AllClientObj = await response.json()
    if(AllClientObj.length == 0){
      $ToastText = 'Не найдено'
    }
  }

  async function Delete_Message(id){
    await fetch(`${$ServerHost}/api_8/?status=delete&id=${id}`)
    $ToastText = 'Успешно удален'
    let findIdx = messageObj.findIndex(data => data.id === id)
    messageObj.splice(findIdx, 1)
    messageObj = messageObj
  }

  async function DostupONClient(id){
    await fetch(`${$ServerHost}/api_11/?status=on&id=${id}&moderator=${moderator}`)
    $ToastText = 'Доступ разрешен'
    let findIdx = AllClientObj.findIndex(data => data.id === id)
    AllClientObj[findIdx].moderator = 1
  }

  async function DostupOFFClient(id){
    await fetch(`${$ServerHost}/api_11/?status=off&id=${id}`)
    $ToastText = 'Доступ отменен'
    let findIdx = AllClientObj.findIndex(data => data.id === id)
    AllClientObj[findIdx].moderator = 0
  }

  function Delete_User(id){
    let timer = setInterval(async() => {
      if($Show_Dialog.otvet == 'yes'){
        clearInterval(timer)
        $Show_Dialog.show = false
        $Show_Dialog.otvet = ''
        await fetch(`${$ServerHost}/api_11/?status=delete&id=${id}`)
        $ToastText = 'Успешно удален'
        let findIdx = AllClientObj.findIndex(data => data.id === id)
        AllClientObj.splice(findIdx, 1)
        AllClientObj = AllClientObj
      }
      if($Show_Dialog.otvet == 'no'){
        clearInterval(timer)
        $Show_Dialog.show = false
        $Show_Dialog.otvet = ''
      }
    }, 300)
  }

  function Block_User(id){
    let timer = setInterval(async() => {
      if($Show_Dialog.otvet == 'yes'){
        clearInterval(timer)
        $Show_Dialog.show = false
        $Show_Dialog.otvet = ''
        await fetch(`${$ServerHost}/api_11/?status=block&id=${id}`)
        $ToastText = 'Пользователь отправлен в черный список'
      }
      if($Show_Dialog.otvet == 'no'){
        clearInterval(timer)
        $Show_Dialog.show = false
        $Show_Dialog.otvet = ''
      }
    }, 300)
  }

  function Insert_Message(){
    let timer = setInterval(async() => {
      if($Insert_Dialog.otvet == 'yes'){
        clearInterval(timer)
        $Insert_Dialog.show = false
        $Insert_Dialog.otvet = ''
        $Insert_Dialog.text = $Insert_Dialog.text.trim()
        await fetch(`${$ServerHost}/api_8/?status=insert&text=${$Insert_Dialog.text}`)
        $ToastText = 'Сообщение добавлен'
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

<InsertWindows/>
<Navbar/>

<main>
  {#if loader == true}
    <div style="display: grid; justify-content: center; padding-top: 200px;">
      <span class="loader"></span>
    </div>    
  {:else}
    <div class="container">  
      {#if $UserInfo[0].status == 'Admin'}

        <div class="btn_panel">
          <button class="archive_btn" style="margin-right: -20px;"
            on:click={()=>{
              navigate("/Route_10", { replace: true })
            }}
          >MODER</button>
          <button class="add_btn"
            on:click={()=>{
              $Insert_Dialog.title_text = 'Добавить сообщение'
              $Insert_Dialog.text = ''
              $Insert_Dialog.show = true
              Insert_Message()
            }}
          ><i class="material-icons" style="font-size: 3rem; margin-top:3px">add</i></button>
          <button class="archive_btn" style="margin-left: -20px;" 
            on:click={()=>{
              navigate("/Route_7", { replace: true })
            }}
          >ИТОГИ</button>
        </div>

        {#each messageObj as data}
          <div class="message" style="padding: 20px;">
            <button class="delete_client" style="top: 15px; right: 20px; color:white;" on:click={()=>{Delete_Message(data.id)}}>
              <i style="font-size: 2rem;" class="material-icons">close</i>
            </button>
            <h3 style="margin-bottom: 5px;">Сообщение...</h3>
            <p style="color: black;">{data.message}</p>
          </div>
        {/each}
      {/if}

      <div class="card">
        <div class="find_class">
          <input type="tel" placeholder="Поиск по номеру телефона" bind:value={findTelefon}>
          <button on:click={function_2}>
            <i style="font-size: 1.8rem;" class="material-icons">search</i>
          </button>
          <button on:click={function_1}>
            <i style="font-size: 1.8rem;" class="material-icons">close</i>
          </button>
        </div>
      </div>     

      {#each AllClientObj as data}
        <div class="card">
          <button class="delete_client" style="right: 60px;" on:click={()=>{
            $Show_Dialog.text = 'Отправить пользователя в черный список'
            $Show_Dialog.show = true
            Block_User(data.id)
          }}>
            <i style="font-size: 2rem;" class="material-icons">error</i>
          </button>
          <button class="delete_client" style="right: 20px;" on:click={()=>{
            $Show_Dialog.text = 'Удалить пользователя'
            $Show_Dialog.show = true
            Delete_User(data.id)
          }}>
            <i style="font-size: 2rem;" class="material-icons">delete_forever</i>
          </button>
          <p>Телефон</p>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <h2 style="font-weight: 600;" on:click={()=>{alert(data.password)}}>{data.telefon}</h2>
          <p style="margin-top: 5px;">Имя Фамилия</p>
          <h3>{data.name} {data.family}</h3>
          <p style="margin-top: 5px;">Город</p>
          <h3>{data.gorod}</h3>
          <p style="margin-top: 5px;">Дата и время регистрации</p>
          <p style="color: black; font-weight: 400;">{new Date(`${data.datecreate}`).toLocaleTimeString('ru-Ru',{ month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})}</p>
          {#if data.moderator == 0}
            <button class="dostup_btn" on:click={()=>DostupONClient(data.id)}>Разрешить доступ</button>
          {:else}
            <button class="dostup_btn" style="background-color: rgb(194, 194, 194);" on:click={()=>DostupOFFClient(data.id)}>Отменить доступ</button>
          {/if}
        </div>          
      {/each}
    </div>
  {/if}
</main>

<style>
  main{
    position: relative;
    height: 100vh;
    background-color: rgb(237, 237, 237);
    padding-top: 70px;
  }
  p{
    color: gray;
    font-size: 1rem;
  }
  .container{
    padding: 20px;
    padding-top: 10px;
    background-color: rgb(237, 237, 237);
  }
  .card{
    position: relative;
    border-radius: 10px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
  }
  .find_class{
    display: grid;
    grid-template-columns: auto 30px 30px;
    gap: 10px;
  }
  .find_class input{
    width: 95%;
    font-size: 1.5rem;
    outline: none;
    border: none;
    border-bottom: solid 1.5px gray;
  }
  .find_class button{
    width: 100%;
    border: none;
    outline: none;
    color: rgb(116, 116, 116);
    background-color: rgba(0, 0, 0, 0.0);
    font-size: 1.5rem;
    padding-top: 5px;
  }
  .find_class button:active{
    color: rgb(86, 195, 13);
  }
  .delete_client{
    position: absolute;
    top: 20px;
    color: rgb(116, 116, 116);
    border: none;
    background-color: rgba(0, 0, 0, 0.0);
  }
  .delete_client:active{
    color: rgb(255, 74, 74);
  }
  .dostup_btn{
    margin-top: 20px;
    padding: 10px;
    border: none;
    font-size: 1rem;
    background-color: #7fcd2b;
    box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    color: rgb(255, 255, 255);
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
