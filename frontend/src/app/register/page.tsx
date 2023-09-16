"use client"
import { FC, FormEvent, useState } from "react"
import request from "graphql-request"
import { useQuery, useMutation } from "@tanstack/react-query"

const index: FC = () => {
  const { data, mutate, isLoading } = useMutation({
    mutationFn: async ({ name, username, password }) =>
      request(
        "http://localhost:3000/graphql",
        /* GraphQL */ `
          mutation Register($register: RegisterInput!) {
            register(register: $register) {
              access_token
              user {
                id
                name
                username
              }
            }
          }
        `,
        {
          register: {
            name,
            username,
            password,
          },
        }
      ),
    onSuccess(data, variable, ctx) {
      console.log(data)
    },
  })

  // const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<string[]>([])

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    mutate({ name, username, password })
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register
        </h2>
        {message ? (
          <h3 className="text-green-500 text-xl font-bold">{message}</h3>
        ) : null}

        <ul>
          {errors.map((error, i) => (
            <li key={i} className="text-red-600">
              {error}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleRegister}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type={isLoading ? "button" : "submit"}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? "Loading" : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default index
