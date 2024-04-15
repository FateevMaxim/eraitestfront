<script>
// @ts-nocheck

  import { onMount } from 'svelte'
  import { ServerHost, ToastText, Comp_User, Scaner, Scaner_Default } from '../store.js'
  import QrCode_1 from 'svelte-qrcode'
  import QR_Code from "../companent/QR_Code.svelte"
  import RightPanel from "../companent/Right_Panel.svelte"

  let loader = false
  let barcode = '', PressKey = ''
  let ii = 0
  let AllQuantityToDay = 0
  let TrackObj = []
  let scaner_indx

  function onKeyPress(e){
    if (e.keyCode === 13){
      barcode = PressKey
      ii++
      let left_rigth = document.querySelector('div.track_list')
      let elem = document.createElement('h4')
      elem.textContent = ii + '. ' + barcode
      left_rigth.appendChild(elem)
      TrackObj.push(barcode)
      PressKey = ''
      return
    }
    switch (e.keyCode){
      case 8: PressKey = PressKey + ' '; break
      case 186: PressKey = PressKey + ';'; break
      case 187: PressKey = PressKey + '='; break
      case 188: PressKey = PressKey + ','; break
      case 189: PressKey = PressKey + '-'; break
      case 190: PressKey = PressKey + '.'; break
      case 191: PressKey = PressKey + '/'; break

      case 48: PressKey = PressKey + '0'; break
      case 49: PressKey = PressKey + '1'; break
      case 50: PressKey = PressKey + '2'; break
      case 51: PressKey = PressKey + '3'; break
      case 52: PressKey = PressKey + '4'; break
      case 53: PressKey = PressKey + '5'; break
      case 54: PressKey = PressKey + '6'; break
      case 55: PressKey = PressKey + '7'; break
      case 56: PressKey = PressKey + '8'; break
      case 57: PressKey = PressKey + '9'; break

      case 65: PressKey = PressKey + 'A'; break
      case 66: PressKey = PressKey + 'B'; break
      case 67: PressKey = PressKey + 'C'; break
      case 68: PressKey = PressKey + 'D'; break
      case 69: PressKey = PressKey + 'E'; break
      case 70: PressKey = PressKey + 'F'; break
      case 71: PressKey = PressKey + 'G'; break
      case 72: PressKey = PressKey + 'H'; break
      case 73: PressKey = PressKey + 'I'; break
      case 74: PressKey = PressKey + 'J'; break
      case 75: PressKey = PressKey + 'K'; break
      case 76: PressKey = PressKey + 'L'; break
      case 77: PressKey = PressKey + 'M'; break
      case 78: PressKey = PressKey + 'N'; break
      case 79: PressKey = PressKey + 'O'; break
      case 80: PressKey = PressKey + 'P'; break
      case 81: PressKey = PressKey + 'Q'; break
      case 82: PressKey = PressKey + 'R'; break
      case 83: PressKey = PressKey + 'S'; break
      case 84: PressKey = PressKey + 'T'; break
      case 85: PressKey = PressKey + 'U'; break
      case 86: PressKey = PressKey + 'V'; break
      case 87: PressKey = PressKey + 'W'; break
      case 88: PressKey = PressKey + 'X'; break
      case 89: PressKey = PressKey + 'Y'; break
      case 90: PressKey = PressKey + 'Z'; break
    }
  }

  async function loadTrack() {
    if (document.activeElement) {
      document.activeElement.blur()
    }
    if (TrackObj.length == 0) {
      $ToastText = 'Список треков пуст'
      return
    }
    loader = true
    let filteredStrings = []
    let sendTrackObj = []
    filteredStrings = TrackObj.filter((item, index) => {
      return TrackObj.indexOf(item) === index;
    })
    filteredStrings.forEach(element => {
      sendTrackObj.push({track : element})
    })
    await fetch(`${$ServerHost}/api_3/?status=${$Comp_User[0].status}&gorod_name=${$Comp_User[0].name}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendTrackObj)
    }) 
    setTimeout(Select_CountTrack, 3000)
    setTimeout(ClearForm, 3000)
  }

  async function Select_CountTrack() {
    loader = true
    const response = await fetch(`${$ServerHost}/api_2/?status=${$Comp_User[0].status}&gorod_name=${$Comp_User[0].name}`)
    const data = await response.json()
    AllQuantityToDay = data.count
    loader = false
  }

  function ClearForm(){
    ii = 0
    TrackObj = []
    barcode = ''
    const div_track_list = document.querySelector('div.track_list')
    div_track_list.innerHTML = ''
  }

  function Scaner_select(){
    scaner_indx = localStorage.getItem('scaner')
    if (scaner_indx != null){
      let i = Number(scaner_indx)
      $Scaner_Default = {
        name : $Scaner[i].name,
        upload_data: $Scaner[i].upload_data,
        clear_data: $Scaner[i].clear_data,
        inventory_mode: $Scaner[i].inventory_mode,
        real_time_mode: $Scaner[i].real_time_mode
      }
    }
  }

  onMount(() => {
    Scaner_select()
    Select_CountTrack()
  })
</script>
<svelte:window on:keydown={onKeyPress} />

<main>
  <div class="container">
    <div class="left_col box">
      <div class="left_left">
        <p class="p_gray">Пункт приема</p>
        <h1>{$Comp_User[0].name}</h1>
        <div style="position:absolute; bottom:20px;">
          <p class="p_gray">
            Количество зарегистрированных трек кодов на сегодня
          </p>
          <hr style="width: 92%;">
          <h2 style="font-weight: 600;">{Number(AllQuantityToDay).toLocaleString('en-US')}</h2>
        </div>
      </div>
      <div class="left_right">
        <div class="track_list" style="overflow-y: scroll; max-height: 440px;">
          <!-- List Track -->
        </div>
      </div>
    </div>
    <div class="right_col box">
      <div>
        {#if Object.keys($Scaner_Default).length }
          <QR_Code/>
          <QrCode_1 value="{$Scaner_Default.upload_data}" size=150 />
          <p class="p_600" style="margin-top: 5px; margin-bottom:50px;">Upload Data</p>
        {:else}
          <p style="font-size: 0.9rem;">Выберите сканер</p>
          {#each $Scaner as  data, i}
            <button class="comp_btn" style="width: 100%; margin-top:10px;"
              on:click={()=>{
                localStorage.setItem('scaner', i)
                Scaner_select()
              }}
            >{data.name}</button>
          {/each}
        {/if}
      </div>
      <div>
        <h4 style="font-weight: 400; margin-top:30px;">{barcode}</h4>
        <hr>
        <p class="p_gray">Счетчик</p>
        <h1>{ii.toLocaleString('en-US')}</h1>
      </div>
      <div>
        {#if loader == true}
          <div style="height: 100px;">
            <span class="loader"></span>
          </div>
        {:else}
          <button class="load_btn color_btn" on:click={loadTrack}>Загрузить</button>
          <button class="load_btn gray_btn" on:click={ClearForm}>Отчистить</button>
        {/if}
      </div>
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
    grid-template-columns: 500px 200px;
    gap: 20px;
    position: relative;
  }
  .left_col{
    display: grid;
    grid-template-columns: 300px auto;
  }
  .left_left{
    position: relative;
    padding: 20px;
  }
  .left_right{
    background-color: #f7f7f7;
    padding: 10px;
  }
  .right_col{
    display: grid;
    grid-template-rows: 200px auto 100px;
    padding: 25px;
    text-align: center;
  }
</style>
