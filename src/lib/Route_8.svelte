<script>
// @ts-nocheck

  import { onMount } from 'svelte'
  import { ServerHost, ToastText, Comp_User, GorodInfo } from '../store.js'
  import RightPanel from "../companent/Right_Panel.svelte";

  let keyL = 0
  let loader = false
  let loader2 = false
  let gorod_name = ''
  let AllQuantityToDay = 0
  let ClientInfo = [{
      track_code: '',
      almaty: '',
      client_out: '',
      guangzhou: ''
    },
    {
      telefon: '',
      name: '',
      family:'',
      gorod:''
    }]

  async function Select_CountTrack() {
    loader = true
    const response = await fetch(`${$ServerHost}/api_2/?status=${$Comp_User[0].status}&user=${$Comp_User[0].user}`)
    const data = await response.json()
    AllQuantityToDay = data.count
    loader = false
  }

  async function Find_CountTrack() {
    let track_code = document.getElementById('TrackCode')
    if (track_code.value.length < 4){
      $ToastText = 'Трек код'
      return
    }
    if (track_code.value.length == 0){
      $ToastText = 'Трек код'
      return
    }
    loader = true
    ClientInfo = []
    const response = await fetch(`${$ServerHost}/api_4/?track=${track_code.value}`)
    ClientInfo = await response.json()
    track_code.focus()
    track_code.value = ''
    loader = false
  }

  async function TrackCodeOut() {
    if (ClientInfo[0].track_code.length == 0){
      $ToastText = 'Трек код'
      return
    }
    if (ClientInfo[0].client_out != '' && ClientInfo[0].client_out != null){
      $ToastText = 'Посылка уже выдана'
      return
    }
    if (gorod_name == ''){
      $ToastText = 'Выберите город'
      return
    }
    loader2 = true
    await fetch(`${$ServerHost}/api_5_2/?track=${ClientInfo[0].track_code}&gorod_name=${gorod_name}&user=${$Comp_User[0].user}`)
    const response = await fetch(`${$ServerHost}/api_4/?track=${ClientInfo[0].track_code}`)
    ClientInfo = await response.json()
    loader2 = false
    $ToastText = 'Посылка успешно отправлено'
    Select_CountTrack()
    document.getElementById("TrackCode").focus()
  }

  function keyDown(e){
    let x = e.key
    x = x.charCodeAt()
    if (x > 122) {
      keyL = 1
    }
    if (e.keyCode == 13){
      if(keyL == 1){
        $ToastText = 'Переключите язык на англиский'
        document.getElementById("TrackCode").value = ''
        keyL = 0
        return
      }else{
        Find_CountTrack()
      }
    }
  }

  onMount(() => {
    Select_CountTrack()
  })
</script>

<main>
  <div class="container">
    <div class="left_col box">
      <p class="p_gray">Пункт выдачи</p>
      <h1>Almaty</h1>
      <br>
      <p class="p_gray">Оператор</p>
      <h3 style="font-weight: 600;">{$Comp_User[0].user}</h3>
      <br>
      <p class="p_gray input_label">Трек код</p>
      <input type="text" id="TrackCode" autocomplete="off" on:keydown={keyDown}>
      <!-- <button style="width: 50%;" class="load_btn color_btn" on:click={Find_CountTrack}>Поиск</button> -->
      <br><br>
      <p class="p_gray">Выберите город</p>
      <select bind:value={gorod_name}>
        {#each $GorodInfo as data}
          <option>{data.name}</option>
        {/each}
      </select>
      <br>
      <div class="right_bottom">
        {#if loader2}
          <div style="height: 100px; text-align:center; margin-top: 20px;">
            <span class="loader"></span>
          </div>
        {:else}
          <button class="load_btn color_btn" on:click={TrackCodeOut}>Отправить дальше</button>
        {/if}
      </div>
      <div style="position:absolute; bottom:20px; width: 85%;">
        <p class="p_gray">
          Количество выданных посылок на сегодня
        </p>
        <hr style="width: 97%;">
        <h2 style="font-weight: 600;">{Number(AllQuantityToDay).toLocaleString('en-US')}</h2>
      </div>
    </div>
    <div class="right_col box">
      {#if loader}
        <div style="text-align: center; padding-top:200px;">
          <span class="loader"></span>
        </div>
      {:else}
        <div style="text-align: right;">
          <p class="p_gray">Данные клиента</p>
          <h2 style="font-weight: 600;">{ClientInfo[1].telefon}</h2>
          <h3>{ClientInfo[1].name} {ClientInfo[1].family}</h3>
          <h3>{ClientInfo[1].gorod}</h3>
          {#if ClientInfo[1].block}
            <p style="color: red; font-size:0.9rem;">Клиент в черном списке</p>
          {/if}
        </div>
        <br>

        <p class="p_gray">Трек код</p>
        <h2 style="font-weight: 400;">{ClientInfo[0].track_code}</h2>
        <p class="p_gray" style="margin-top: 10px;">Дата регистрации в Китае</p>
        <h4>
          {new Date(`${ClientInfo[0].guangzhou}`).toLocaleTimeString('ru-Ru',{ month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})}
        </h4>
        <p class="p_gray" style="margin-top: 10px;">Дата регистрации в Алмате</p>
        <h4>
          {new Date(`${ClientInfo[0].almaty}`).toLocaleTimeString('ru-Ru',{ month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})}
        </h4>
        <p class="p_gray" style="margin-top: 10px;">Отправлено {ClientInfo[0].gorod_name}</p>
        <h4>
          {new Date(`${ClientInfo[0].gorod_out}`).toLocaleTimeString('ru-Ru',{ month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})}
        </h4>
        <p style="font-size:0.9rem; color:#088ffd;">{ClientInfo[0].user}</p>
        <p class="p_gray" style="margin-top: 10px;">Дата выдачи</p>
        <h4>
          {new Date(`${ClientInfo[0].client_out}`).toLocaleTimeString('ru-Ru',{ month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric"})}
        </h4>
      {/if}
    </div>
    <RightPanel/>
  </div>
</main>

<style>
  main{
    display: grid;
    justify-content: center;
    align-items: center;
  }
  h1{
    font-weight: 600;
  }
  .container{
    height: 500px;  
    display: grid;
    grid-template-columns: 300px 300px;
    gap: 20px;
    position: relative;
  }
  .left_col{
    position: relative;
    padding: 25px;
  }
  .right_col{
    padding: 25px;
  }
  .right_bottom{
    padding-left: 30px;
    padding-right: 30px;
  }
</style>  
