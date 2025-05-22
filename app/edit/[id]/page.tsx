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
  
  // buat hook "useState" untuk show/hide pesan error
  const [errorNamaVisible, setErrorNamaVisible] = useState(false);
  const [errorUsernameVisible, setErrorUsernameVisible] = useState(false);
  const [errorPasswordVisible, setErrorPasswordVisible] = useState(false);

  // buat hook "useRef" untuk isi pesan error
  const errorMessageNama = useRef<HTMLParagraphElement>(null)
  const errorMessageUsername = useRef<HTMLParagraphElement>(null)
  const errorMessagePassword = useRef<HTMLParagraphElement>(null)


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

  // buat fungsi untuk ubah data
  const setUpdateData = () => {
    // jika "txt_nama" tidak diisi
    dataNama.current!.value == ""   
    ? [setErrorNamaVisible(true), dataNama.current!.value = ""]
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
    ) {
    axios.put(`http://localhost:3001/api/user/${params.id}`, {
        nama_value: dataNama.current!.value,
        username_value: dataUsername.current!.value,
        password_value: dataPassword.current!.value,
      })
      .then((response) => {
        alert(response.data.metaData.message);
        // setReload();
      });
    }
  };

  // panggil fungsi "getDetailData"
  // getDetailData()

  // buat hook "useEffect" untuk respon pesan error
  useEffect(() => {
    getDetailData(params.id)

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
  


  return (
    <div>
      {/* judul halaman  */}
      <title>Ubah Data User</title>

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
      <button className="btn btn-success text-white mr-2 w-30" onClick={setUpdateData}>Ubah</button>

      {/* tombol simpan data */}
      <button className="btn btn-default ml-2 w-30">Batal</button>
      </section>
    </div>
  )
}

