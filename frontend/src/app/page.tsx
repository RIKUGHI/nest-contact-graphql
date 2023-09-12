import { Button } from "@ui/components/Button"
import axios from "@ui/lib/axios"
import UserCard from "./UserCard"

async function getUsers() {
  const res = await axios.get<ApiResponse<WithPagination<User[]>>>("/users", {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  })
  return res.data.data.data

  // const res = await fetch("http://localhost:3000/users", {
  //   next: { revalidate: 1 },
  // })
  // const data = res.json()

  // return data
}

export default async function Home() {
  const users = await getUsers()

  return (
    <>
      <div className="p-5 flex justify-end">
        <Button variant="blue">Tambah</Button>
      </div>
      <div className="p-5 flex flex-wrap gap-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </>
  )
}
