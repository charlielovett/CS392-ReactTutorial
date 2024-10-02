import { useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import Banner from './components/Banner';
import TermPage from './components/TermPage';

const queryClient = new QueryClient();

const App = () => {
  const [data, isLoading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");

  if (error) return <h1>Error loading class data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading class data...</h1>;
  if (!data) return <h1>No class data found</h1>;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container my-5">
        <Banner title={data.title}></Banner>
        <TermPage courses={data.courses}></TermPage>
      </div>
    </QueryClientProvider>
  );
};

export default App;
