import { useParams } from 'react-router-dom';
import Profile from './Profile';

function ProfileWrapper({ currentUser }) {
  const { id } = useParams();
  const key = `profile-${id}`;
  return <Profile currentUser={currentUser} key={key} />;
}

export default ProfileWrapper;
