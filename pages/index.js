import Head from 'next/head'
import LayoutHeader from "../components/LayoutHeader";
import LayoutSide from "../components/LayoutSide";
import BasicBoard from "../components/BasicBoard";

export default function Home() {
  return (
      <>

        <LayoutSide />
          <BasicBoard />
      </>

  )
}

