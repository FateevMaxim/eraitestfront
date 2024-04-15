<script>
  import { navigate } from "svelte-navigator"
  import { ServerHost, ToastText, ConfigInfo, UserInfo } from '../store.js'
  import { fade } from 'svelte/transition'

  let login = '', password = '', name = '', family = '', gorod = '', dogovor = false
  let dogovorShow = false

// funcRegistry
  async function function_1(){
    login = login.trim()
    password = password.trim()
    name = name.trim()
    family = family.trim()
    gorod = gorod.trim()
    if (login.length == 0 || password.length == 0 || name.length == 0 || gorod.length == 0) {
      $ToastText = 'Некоторые поля заполнены неверно'
      return
    }
    if (dogovor == false) {
      $ToastText = 'Условия договора'
      return
    }

    const response = await fetch(`${$ServerHost}/api_7/?login=${login}&password=${password}&name=${name}&family=${family}&gorod=${gorod}`)
    const data = await response.json();
    $ToastText = data[0].st
    if (data[0].st == 'Пользователь успешно добавлен'){
      const response = await fetch(`${$ServerHost}/api_6/?login=${login}&password=${password}`)
      $UserInfo = await response.json()
      localStorage.setItem('login', login)
      localStorage.setItem('password', password)
      navigate("/Route_6", { replace: true })
    }
  }
</script>

<main>
  <h1 style="font-weight: 600; color:#181818;">{$ConfigInfo[0].name_company}</h1>
  <h2 style="color: gray;">Регистрация</h2>
  <br>
  <input class="input_phone" autocomplete="off" type="tel" placeholder="Телефон через 8" bind:value={login}>
  <input class="input_phone" autocomplete="off" type="password" placeholder="Придумайте пароль" bind:value={password}>
  <input class="input_phone" autocomplete="off" type="text" placeholder="Имя на английском" bind:value={name}>
  <input class="input_phone" autocomplete="off" type="text" placeholder="Фамилия на английском" bind:value={family}>
  <input class="input_phone" autocomplete="off" type="text" placeholder="Город на английском" bind:value={gorod}>
  <div class="checkBox">
    <input type="checkbox" id="cek1" bind:checked={dogovor}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <p style="text-decoration: underline; text-align: left;" on:click={()=>{dogovorShow = true}}>Принимаю условия и сроки доставки</p>
  </div>
  <button style="width: 60%;" class="phone_btn_dark" on:click={function_1}>Регистрация</button><br>
  <button class="href_btn" on:click={()=>{navigate("/", { replace: true })}}>&nbsp;Назад&nbsp;</button>
</main>

{#if dogovorShow}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="dogovor" transition:fade on:click={()=>{dogovorShow = false}}>
  <h4>Условия и сроки доставки</h4><br>
  Нет минимального веса и суммы заказа<br>
  ✔️ Склад в г.Фошань<br>
  ✔️ Автодоставка:<br>
  - 5$/кг, <br>
  - 15-25 дней, не включая праздники или комиссии на таможне<br>
  ✔️ отчетность по трекам<br>
  ✔️ сайт для отслеживания товара<br>
  ◾️ Возврат денег за неполученный товар осуществляется клиенту только в случае утери на одном из складов или при досмотре на таможне.<br>
  🆘 Компания не несет ответственности за возможные изменения в сроках доставки по причинам, признанным форс-мажором на государственном и мировом уровне( катастрофы, стихийные бедствия, пандемии, военные действия, и т.д.)<br>
  ❗️ Товар уже поступивший на китайский склад, необходимо будет ожидать до получения независимо от сроков!<br>
  <br><br>
  Хрупкий товар
  Наша работа заключается в доставке ваших посылок в том виде, в каком они поступили на китайский склад. Если вы получили товар с недостачей или несоответствием- все вопросы по внутреннему вложению посылок к продавцу. 
  При поступлений посылки, если посылка недостаточно упаковано, китайский склад сделает деревянную обрешетку автоматически(без спроса клиента) за дополнительную оплату ( начинается с 15$+)
  За сохранность хрупких и ломких предметов ответственности не несем!
  При покупке хрупкого товара попросите продавца упаковать его с защитой( обрешетка, защита края, пузырчатая пленка)<br><br>

  Отправка из Алматы по регионам<br><br>

  Отправка по городам с Алматы:<br>
  ✔️Отгрузка на Камаз( или частный автобус на барахолке) и рейсовый автобус(при наличии рейса в ваш город)- *доплата 500тг грузчику<br>
  - +за место при получении оплачиваете сами <br>
  - Заявки на отправку принимаются по полной оплате долга <br>
  - Выдача или самовывоз для Алматы 10:00-16:00<br>
  - Западное направление (Актау, Атырау, Уральск, Актобе, Жанаозен) возможна отправка ж/д или авиа.<br>
  - В день отправки вам скинут квитанцию или визитку с данными фирмы грузоперевозок.<br>
</div>
{/if}

<style>
  main{
    padding: 50px;
    text-align: center;
  }
  .dogovor{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    padding: 20px;
  }
  .checkBox{
    display: grid;
    grid-template-columns:50px auto;
    justify-items: start;
    align-items: center;
    color: gray;
    margin-bottom: 30px;
  }
  #cek1{
    margin: 0;
    width: 30px;
    height: 30px;
  }
</style>
