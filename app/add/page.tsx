'use client'
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



  return (
    <div>
      {/* judul halaman  */}
      <title>Tambah Data User</title>
      <section>
      {/* field nama user */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Nama User</legend>
        <input type="text" className="input" placeholder="Isi Nama User" />
        {errorNamaVisible &&
          <p ref={errorMessageNama} className="label text-red-600"></p>
        }
      </fieldset>

      {/* field username */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Username User</legend>
        <input type="text" className="input" placeholder="Isi Username User" />
        {errorUsernameVisible &&
          <p ref={errorMessageUsername} className="label text-red-600"></p>
        }
      </fieldset>

      {/* field password */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Password User</legend>
        <input type="password" className="input" placeholder="Isi Password User" />
        {errorPasswordVisible &&
          <p ref={errorMessagePassword} className="label text-red-600"></p>
        }
      </fieldset>
      </section>

      <section className='mt-5'>
      {/* tombol simpan data */}
      <button className="btn btn-success text-white mr-2 w-30">Simpan Data</button>
      {/* tombol simpan data */}
      <button className="btn btn-default ml-2 w-30">Batal</button>
      </section>
    </div>
  )
}
