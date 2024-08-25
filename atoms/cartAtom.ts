import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const localStorage: any = typeof window !== `undefined` ? window.localStorage : null

const { persistAtom } = recoilPersist({
  key: 'recoil-persist', // this key is using to store data in local storage
  storage: localStorage, // configure which storage will be used to store the data
  converter: JSON // configure how values will be serialized/deserialized in storage
})


export const cartState = atom({
  key: 'cartState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});