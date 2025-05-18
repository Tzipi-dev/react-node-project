
import { useParams } from 'react-router'

const UpdateFound = () => {
    const {id}=useParams()
  return (
    <div>Found - {id}</div>
  )
}

export default UpdateFound