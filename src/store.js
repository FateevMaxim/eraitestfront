import { writable, readable } from 'svelte/store';

export const ServerHost = readable('https://erai-cargo.kz/api');
// export const ServerHost = readable('http://192.168.0.99:3000/api')
export const ToastText = writable('')
export const Comp_User = writable([])
export const UserInfo = writable([])
export const GorodInfo = writable([])
export const QRCode_Text = writable('')
export const ConfigInfo = writable([{
  name_company: 'Cargo',
  title_text: '',
  title_text_2: ''
}])
export const Show_Dialog = writable({
  show: false,
  text: 'Удалить',
  otvet: ''
})
export const Insert_Dialog = writable({
  show: false,
  title_text: '',
  track_code: '',
  text: '',
  otvet: ''
})
export const Scaner = writable([])
export const Scaner_Default = writable({})

