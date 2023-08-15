import { User } from '../../types/User'

interface CardUserProps {
    dataUser: User[] | undefined;
  }
  
  const CardUser: React.FC<CardUserProps> = ({ dataUser }) => {
  return (
    <div>
        {dataUser}
    </div>
  )
}

export default CardUser