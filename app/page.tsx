export default function Home() {
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
            <tr className="hover:bg-teal-100">
              <td className="text-center">2</td>
              <td className="text-left">Hart Hagerty</td>
              <td className="text-center">Desktop Support Technician</td>
              <td className="text-center">Purple</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
