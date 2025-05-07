'use client'
import React, { useEffect, useState } from "react";

export default function AddUser() {
  // buat hook "useState" untuk show/hide pesan error

  const [errorNamaVisible, setErrorNamaVisible] = useState(false);
  const [errorUsernameVisible, setErrorUsernameVisible] = useState(false);
  const [errorPasswordVisible, setErrorPasswordVisible] = useState(false);

  // buat hook "useEffect" untuk respon pesan error
  useEffect(() => {

  }, [errorNamaVisible, errorUsernameVisible, errorPasswordVisible])
  

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
          <p className="label text-red-600">Optional</p>
        }
      </fieldset>

      {/* field username */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Username User</legend>
        <input type="text" className="input" placeholder="Isi Username User" />
        {errorUsernameVisible &&
          <p className="label text-red-600">Optional</p>
        }
      </fieldset>

      {/* field password */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Password User</legend>
        <input type="password" className="input" placeholder="Isi Password User" />
        {errorPasswordVisible &&
          <p className="label text-red-600">Optional</p>
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

