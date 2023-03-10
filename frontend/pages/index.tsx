import AppLayout from "@/components/AppLayout";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>outstagram</title>
      </Head>
      <AppLayout>
        <div>메인페이지</div>
      </AppLayout>
    </>
  );
};

export default Home;
