import type { NextPage } from 'next'
import Homepage from '../components/public/homepage/Homepage';
import Layout from '../components/public/layout/Layout';

const Home: NextPage = () => {
  return (
    <Layout children={<Homepage />} />  
  );
}

export default Home
