import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref, update, remove } from "firebase/database";
import {
  getMetadata,
  getStorage,
  ref as rf,
  uploadBytes,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDcmF4W-0MeQAr5DXl05MUb5CVfZdMvoBw",
  authDomain: "gravitech-hr.firebaseapp.com",
  databaseURL:
    "https://gravitech-hr-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gravitech-hr",
  storageBucket: "gravitech-hr.appspot.com",
  messagingSenderId: "741511187725",
  appId: "1:741511187725:web:49fddba928427d2d5e7444",
  measurementId: "G-HG48F6581H",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

function writeData(valueJson: any) {
  update(ref(database, "member/"), {
    ...valueJson,
  });
}

async function getData(path: string) {
  return get(child(ref(database), path));
}

async function uploadFile(file: any, name: string) {
  return await uploadBytes(rf(storage, name), file);
}

async function readFile(path: string) {
  return getMetadata(rf(storage, path));
}

async function removeKey(path: string) {
  return remove(ref(path))
}

export default {
  write: writeData,
  get: getData,
  upload: uploadFile,
  download: readFile,
  remove: removeKey
};
