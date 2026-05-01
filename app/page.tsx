'use client'

import { NextPage } from 'next';
import MessagingComponent from "@/server/MessagingComponent";

const Home: NextPage = () => {
  return (
      <div>
        <h1>Instant Messaging App</h1>
        <MessagingComponent />
      </div>
  );
};

export default Home;