import { useContext } from 'react';
import { UserContext } from '~/components/context/UserContext';

const useMutateUser = () => {
  const { setUser } = useContext(UserContext);

  const fetchUser = async (id: string) => {
    try {
      const response = await fetch(`https://mintyplex-api.onrender.com/api/v1/user/profile/${id}`);
      const data = await response.json();

      if (response.ok) {
        setUser(data);
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return { fetchUser };
};

export default useMutateUser;