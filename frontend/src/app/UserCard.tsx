import { Button } from "@ui/components/Button"
import { FC } from "react"

interface UserCardProps {
  user: User
  onDetail?: () => void
}

const UserCard: FC<UserCardProps> = ({ user, onDetail }) => {
  return (
    <div className="shadow-md p-2 rounded">
      <div className="flex">
        <span className="mr-5">Name</span>
        <span className="font-bold">{user.name}</span>
      </div>
      <div className="flex">
        <span className="mr-5">Contacts</span>
        <span className="font-bold">{user._count.contacts}</span>
      </div>
      <div className="mt-2 flex space-x-1">
        {onDetail ? <Button onClick={onDetail}>Detail</Button> : null}
        {/* <Button variant="blue">Edit</Button>
        <Button variant="red">Delete</Button> */}
      </div>
    </div>
  )
}

export default UserCard
