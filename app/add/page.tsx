'use client'
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function AddUser() {
  // buat hook "useState" untuk show/hide pesan error
  const [errorNamaVisible, setErrorNamaVisible] = useState(false);
  const [errorUsernameVisible, setErrorUsernameVisible] = useState(false);
  const [errorPasswordVisible, setErrorPasswordVisible] = useState(false);

  // buat hook "useRef" untuk isi pesan error
  const errorMessageNama = useRef<HTMLParagraphElement>(null)
  const errorMessageUsername = useRef<HTMLParagraphElement>(null)
  const errorMessagePassword = useRef<HTMLParagraphElement>(null)
  const dataNama = useRef<HTMLInputElement>(null)
  const dataUsername = useRef<HTMLInputElement>(null)
  const dataPassword = useRef<HTMLInputElement>(null)

  // buat hook "useEffect" untuk respon pesan error
  useEffect(() => {
  if (errorMessageNama.current) {
    errorMessageNama.current.innerHTML = "Nama User Harus Diisi!"
    }
  if (errorMessageUsername.current) {
    errorMessageUsername.current.innerHTML = "Username User Harus Diisi!"
    }
  if (errorMessagePassword.current) {
    errorMessagePassword.current.innerHTML = "Password User Harus Diisi!"
    }
  }, [errorNamaVisible, errorUsernameVisible, errorPasswordVisible])

  // buat fungsi untuk reload
  const setReload = () => {
    location.href = "/add"
  }

  // buat fungsi untuk simpan data
  const setSave = () => {
    // jika "txt_nama" tidak diisi
    dataNama.current!.value == ""   
    ? setErrorNamaVisible(true)
    // jika "txt_nama" diisi
    : setErrorNamaVisible(false)

    // jika "txt_username" tidak diisi
    dataUsername.current!.value == "" 
    ? setErrorUsernameVisible(true)
    // jika "txt_username" diisi
    : setErrorUsernameVisible(false)

    // jika "txt_password" tidak diisi
    dataPassword.current!.value == ""
    ? setErrorPasswordVisible(true)
    // jika "txt_password" diisi
    : setErrorPasswordVisible(false)

    // jika seluruh data terisi
    if(dataNama.current!.value != "" &&
      dataUsername.current!.value != "" &&
      dataPassword.current!.value != ""
    )
    {
    // simpan data (kirim ke service POST)
    axios.post("http://localhost:3001/api/user", {
        nama_value: dataNama.current!.value,
        username_value: dataUsername.current!.value,
        password_value: dataPassword.current!.value,
      })
      .then((response) => {
        alert(response.data.metaData.message);
        setReload();
      })
      .catch((error) => {
        // if (error.response?.status === 409) {
          alert(error.message);
        // }
      });
    }
  }

  return (
    <div>
      {/* judul halaman  */}
      <title>Tambah Data User</title>

      <section>
      {/* field nama user */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Nama User</legend>
        <input ref={dataNama} type="text" className="input" placeholder="Isi Nama User" />
        {errorNamaVisible && (
          <p ref={errorMessageNama} className="label text-red-600"></p>
        )}
      </fieldset>

      {/* field username */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Username User</legend>
        <input ref={dataUsername} type="text" className="input" placeholder="Isi Username User" />
        {errorUsernameVisible && (
          <p ref={errorMessageUsername} className="label text-red-600"></p>
        )}
      </fieldset>

      {/* field password */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Password User</legend>
        <input ref={dataPassword} type="password" className="input" placeholder="Isi Password User" />
        {errorPasswordVisible && (
          <p ref={errorMessagePassword} className="label text-red-600"></p>
        )}
      </fieldset>
      </section>

      <section className='mt-5'>
      {/* tombol simpan data */}
      <button onClick={setSave} className="btn btn-success text-white mr-2 w-30">Simpan Data</button>

      {/* tombol simpan data */}
      <button onClick={setReload} className="btn btn-default ml-2 w-30">Batal</button>
      </section>
    </div>
  )
}
