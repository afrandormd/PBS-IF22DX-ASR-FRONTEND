'use client'
import useSWR from "swr";

// buat variable fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  // buat variable untuk SWR
const { data, error, isLoading } = useSWR(
    "http://localhost:3001/api/user",
    fetcher
  );

  return (
    <div>
      {/* buat tombol Tambah Data */}
      <section className="text-right">
        <button className="btn btn-soft btn-success">Tambah Data</button>
      </section>

      {/* buat tabel */}
      <section className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center">Aksi</th>
              <th className="text-center">Nama</th>
              <th className="text-center">Username</th>
              <th className="text-center">Password</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {/* mulai looping "map" */}
            {data?.data_user.map((item: any) => (
            <tr className="hover:bg-teal-100">
              <td className="text-center">-</td>
              <td className="text-left">{item.nama}</td>
              <td className="text-center">{item.username}</td>
              <td className="text-center">{item.password}</td>
            </tr>
            ))}


          {/* akhir looping "map" */}
          </tbody>
        </table>
      </section>
    </div>
  );
}
