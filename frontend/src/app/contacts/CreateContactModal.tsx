import { QueryClient, useMutation } from "@tanstack/react-query"
import { Button } from "@ui/components/Button"
import Modal from "@ui/components/Modal"
import request from "graphql-request"
import { FC, FormEvent, useState } from "react"
import { useAuthHeader } from "react-auth-kit"

interface CreateUserModalProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  onSuccess: () => void
}

const queryClient = new QueryClient()

const CreateContactModal: FC<CreateUserModalProps> = ({
  show,
  setShow,
  onSuccess,
}) => {
  const authHeader = useAuthHeader()
  const { data, mutate, isLoading } = useMutation({
    mutationFn: async () =>
      request(
        "http://localhost:3000/graphql",
        /* GraphQL */ `
          mutation createContact($createContactInput: CreateContactInput!) {
            createContact(createContactInput: $createContactInput) {
              first_name
              last_name
              email
              phone
              user {
                id
                name
                username
              }
            }
          }
        `,
        {
          createContactInput: {
            first_name,
            last_name,
            email,
            phone,
          },
        },
        {
          Authorization: authHeader(),
        }
      ),
    onSuccess() {
      onSuccess()
    },
  })

  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    mutate()
  }

  return (
    <Modal show={show}>
      <form
        className="bg-white w-[700px] m-auto p-5 rounded-md"
        onSubmit={handleSubmit}
      >
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-xl font-semibold leading-7 text-gray-900 mb-5">
                Create Contact
              </h2>

              <Input
                label="First Name"
                name="first_name"
                onChange={(v) => setFirstName(v)}
              />
              <Input
                label="Last Name"
                name="last_name"
                onChange={(v) => setLastName(v)}
              />
              <Input label="email" name="email" onChange={(v) => setEmail(v)} />
              <Input label="phone" name="phone" onChange={(v) => setPhone(v)} />
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-2">
              <Button type="reset" variant="red" onClick={() => setShow(false)}>
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </>
        )}
      </form>
    </Modal>
  )
}

interface InputProps {
  label: string
  name: string
  onChange: (v: string) => void
}

const Input: FC<InputProps> = ({ label, name, onChange }) => {
  return (
    <div className="col-span-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type="text"
          name={name}
          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}

export default CreateContactModal
