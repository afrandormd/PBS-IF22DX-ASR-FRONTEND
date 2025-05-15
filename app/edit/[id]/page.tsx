"use client"
import React, { useEffect, useState } from 'react'

export default async function EditUser({params}: {params: {id: string}}) {
  // buat variabel untuk response "slug"
  // const params = await props.params;

  // buat hook "useState" untuk id
  const [idValue, setIdValue] = useState("")
  
  // buat fungsi untuk ambil data
  const getDetailData = async () => {
    // alert(await params.id)
    // const id = await params.id
    setIdValue(await params.id)

    // return idValue

  }

  // panggil fungsi "getDetailData"
  // getDetailData()
  useEffect(() => {
    getDetailData()
    alert(idValue)
  }, [])
  


  return (
    <div>
      {/* judul halaman  */}
      <title>Ubah Data User</title>

      <section>
      {/* field nama user */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Nama User</legend>
        <input type="text" className="input" placeholder="Isi Nama User" />
      </fieldset>

      {/* field username */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Username User</legend>
        <input type="text" className="input" placeholder="Isi Username User" />
      </fieldset>

      {/* field password */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Password User</legend>
        <input type="password" className="input" placeholder="Isi Password User" />
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

