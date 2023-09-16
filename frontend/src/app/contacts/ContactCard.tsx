import { Button } from "@ui/components/Button"
import { FC } from "react"

interface ContactCardProps {
  contact: Contact
  onUpdate?: () => void
  onDelete?: () => void
}

const ContactCard: FC<ContactCardProps> = ({ contact, onUpdate, onDelete }) => {
  return (
    <div className="shadow-md p-2 rounded">
      <div className="flex">
        <span className="mr-5">First Name</span>
        <span className="font-bold">{contact.first_name}</span>
      </div>
      <div className="flex">
        <span className="mr-5">Last Name</span>
        <span className="font-bold">{contact.last_name}</span>
      </div>
      <div className="flex">
        <span className="mr-5">Email</span>
        <span className="font-bold">{contact.email}</span>
      </div>
      <div className="flex">
        <span className="mr-5">Phone</span>
        <span className="font-bold">{contact.phone}</span>
      </div>
      <div className="mt-2 flex space-x-1">
        {onUpdate ? <Button onClick={onUpdate}>Update</Button> : null}
        {onDelete ? <Button onClick={onDelete}>Delete</Button> : null}
      </div>
    </div>
  )
}

export default ContactCard
