import { useMutation } from "@tanstack/react-query"
import { Button } from "@ui/components/Button"
import Modal from "@ui/components/Modal"
import request from "graphql-request"
import { FC } from "react"
import { useAuthHeader } from "react-auth-kit"

interface CreateUserModalProps {
  contactId: number
  onClose: () => void
  onSuccess: () => void
}

const DeleteContactModal: FC<CreateUserModalProps> = ({
  contactId,
  onClose,
  onSuccess,
}) => {
  const authHeader = useAuthHeader()
  const { data, mutate, isLoading } = useMutation({
    mutationFn: async () =>
      request(
        "http://localhost:3000/graphql",
        /* GraphQL */ `
          mutation RemoveContact($id: Int!) {
            removeContact(id: $id) {
              id
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
          id: contactId,
        },
        {
          Authorization: authHeader(),
        }
      ),
    onSuccess() {
      onSuccess()
    },
  })

  const onYes = async () => {
    mutate()
  }

  return (
    <Modal show={true}>
      <form className="bg-white w-[700px] m-auto p-5 rounded-md">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="text-lg flex justify-center items-center flex-col">
            <h1>Apakah ingin menghapus</h1>
            <h1 className="font-bold">data ini?</h1>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-2">
          <Button type="reset" variant="blue" onClick={onClose}>
            Close
          </Button>
          <Button type="reset" variant="red" onClick={onYes}>
            Iya
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default DeleteContactModal
