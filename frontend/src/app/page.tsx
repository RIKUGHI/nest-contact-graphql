"use client"
import { Button } from "@ui/components/Button"
import axios from "@ui/lib/axios"
import UserCard from "./UserCard"
import request from "graphql-request"
import { useQuery } from "@tanstack/react-query"

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

export default function Home() {
  // const users = await getUsers()
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () =>
      request(
        "http://localhost:3000/graphql",
        /* GraphQL */ `
          query Users($page: Int!, $q: String) {
            users(page: $page, q: $q) {
              total
              per_page
              current_page
              last_page
              result {
                id
                name
                username
                _count {
                  contacts
                }
              }
            }
          }
        `,
        {
          page: 1,
        }
      ),
  })

  return (
    <>
      <div className="p-5 flex justify-end">
        <Button variant="blue">Tambah</Button>
      </div>
      <div className="p-5 flex flex-wrap gap-3">
        {data?.users.result.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </>
  )
}
