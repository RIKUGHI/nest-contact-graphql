import { Button } from "@ui/components/Button"
import UserCard from "./UserCard"
import useUsers from "@ui/hooks/useUsers"
import axios from "@ui/lib/axios"

async function getUsers() {
  const res = await axios.get<ApiResponse<WithPagination<User[]>>>("/users")
  return res.data.data.data
}

export default async function Home() {
  // const { users: x } = useUsers()
  console.log(await getUsers())

  const users = [
    {
      id: 1,
      name: "string",
      username: "string",
      _count: {
        contacts: 1,
      },
    },
  ]

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
