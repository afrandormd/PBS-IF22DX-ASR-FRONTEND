'use client'
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useSWR from "swr";
import styles from './styles.module.css'
import axios from "axios";
import { useEffect, useRef, useState } from "react";

// buat variable fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  // buat hook "useRef"
  const modalRef = useRef<HTMLDialogElement>(null)
  const modalContentRef = useRef<HTMLParagraphElement>(null)
  
  // buat hook "useState"
  const [idUser, setIdUser] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  // buat hook "useEffect"
  useEffect(() => {
  // setting toast tampil selama 3 detik
  const timer = setInterval(() => {
      setToastVisible(false)
    }, 10000) 

    // kembalikan nilai interval ke awal (reset)
    return () => clearInterval(timer)

  }, [toastVisible])
    


  // buat variable untuk SWR
  const { data, error, isLoading, mutate } = useSWR(
      "http://localhost:3001/api/user",
      fetcher
    );

  // buat fungsi untuk buka "modal"
  const openModal = (id: string, nama: string) => {
    modalRef.current?.showModal()
    modalContentRef.current!.innerHTML = `Data User <strong>${nama}</strong> Ingin Dihapus ?`;

  // simpan state "setIdUser"
  setIdUser(id)
  };

  // buat fungsi untuk "hapus data"
  const setDelete = async(id: string) => {
    const response = await axios.delete(`http://localhost:3001/api/user/${id}`)
    mutate(data)
    // return alert(response.data.metaData.message)
    setToastVisible(true)
    setToastMessage(response.data.metaData.message)
  };

  return (
    <div>
      {/* buat tombol Tambah Data */}
      <section className="text-right">
        <button className="btn btn-soft btn-success"><FontAwesomeIcon icon={faPlus}/> Tambah Data</button>
      </section>

      {/* buat tabel */}
      <section className="overflow-x-auto mt-5">
        <table className="table">
          {/* head */}
          <thead> 
            <tr className={styles["background-tr"]}>
              <th className="text-center w-1/5">Aksi</th>
              <th className="text-center w-2/5">Nama</th>
              <th className="text-center w-1/5">Username</th>
              <th className="text-center w-1/5">Password</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {/* mulai looping "map" */}
            {data?.metaData.error === 1 ? 
            <tr>
              <td colSpan={4} className="text-center">
                {data?.metaData.message}
              </td>
            </tr>
            :
            data?.data_user.map((item: any) => (
            <tr className="hover:bg-gray-100" key={item.id}>
              <td className="text-center">
                <Link href={"/"}>
                  <FontAwesomeIcon icon={faPencil} title="Ubah Data" className={styles["frame-button-edit"]} />
                </Link>

                {/* Tombol Hapus Data */}
                <Link href={"/"}>
                  <FontAwesomeIcon icon={faTrash} title="Hapus Data" className={styles["frame-button-delete"]} onClick={() => openModal(item.id, item.nama)}/>
                </Link>
              </td>
              <td className="text-left">{item.nama}</td>
              <td className="text-center">{item.username}</td>
              <td className="text-center">
                  <div className={styles["text-ellipsis"]}>
                  {item.password}
                  </div>
              </td>
            </tr>
            ))}


          {/* akhir looping "map" */}
          </tbody>
        </table>
      </section>

      {/* buat toast */}
      {toastVisible && // implementasi dari if tunggal di jsx
      <div className="toast toast-top toast-end">
        <div className="alert alert-info">
          <span>{toastMessage}</span>
        </div>
      </div>
      }

      {/* buat modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Informasi</h3>
          <p className="py-4" ref={modalContentRef}></p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal  */}
              <button className="btn mr-1.5 w-25 btn-error text-white" onClick={() => {setDelete(idUser)}}>Ya</button>
              <button className="btn ml-1.5 w-25">Tidak</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
