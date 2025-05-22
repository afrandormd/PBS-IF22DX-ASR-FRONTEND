"use client"
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

export default function EditUser({params}: {params: {id: string}}) {
  // buat variabel untuk response "slug"
  // const params = await props.params;
  params = useParams()

  // buat hook "useState" untuk id
  // const [idValue, setIdValue] = useState("")
  
  // buat variabel router
  const router = useRouter() 

  // buat hook "useRef" untuk detail data
  const dataNama = useRef<HTMLInputElement>(null)
  const dataUsername = useRef<HTMLInputElement>(null)
  const dataPassword = useRef<HTMLInputElement>(null)

  // buat fungsi untuk ambil data
  const getDetailData = async (id: string) => {
    // ambil service "detail"
    await axios.get(`http://localhost:3001/api/user/${id}`)
    .then((response) => {
      // kondisi jika status 404
      if(response.data.metaData.status == 404){
        // alihkan ke halaman 404
        router.push("/404")
      // kondisi jika status 400
      } else if(response.data.metaData.status == 400){
        //alihkan ke halaman 400
        router.push("/400")
      // kondisi jika status 200
      } else {
        dataNama.current!.value = response.data.data_user.nama
        dataUsername.current!.value = response.data.data_user.username
        dataPassword.current!.value = response.data.data_user.password
        }
    })


  }

  // panggil fungsi "getDetailData"
  // getDetailData()
  useEffect(() => {
    getDetailData(params.id)
    // alert(idValue)
  }, [])
  


  return (
    <div>
      {/* judul halaman  */}
      <title>Ubah Data User</title>

      <section>
      {/* field nama user */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Nama User</legend>
        <input ref={dataNama} type="text" className="input" placeholder="Isi Nama User" />
      </fieldset>

      {/* field username */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Username User</legend>
        <input ref={dataUsername} type="text" className="input" placeholder="Isi Username User" />
      </fieldset>

      {/* field password */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Password User</legend>
        <input ref={dataPassword} type="password" className="input" placeholder="Isi Password User" />
      </fieldset>
      </section>

      <section className='mt-5'>
      {/* tombol simpan data */}
      <button className="btn btn-success text-white mr-2 w-30">Ubah</button>

      {/* tombol simpan data */}
      <button className="btn btn-default ml-2 w-30">Batal</button>
      </section>
    </div>
  )
}

