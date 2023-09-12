import { FC } from "react"

interface Props {
  params: {
    id: string
  }
}

const pages: FC<Props> = (props) => {
  return <main>about id: {props.params.id}</main>
}

export default pages
