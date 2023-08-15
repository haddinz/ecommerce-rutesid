import React from "react";
import Header from "./header";
import Footer from "./footer";
import { Helmet } from "react-helmet-async";

function Layout({
  children,
  title,
  description
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <>
      <Helmet>
        <title>
          {title ? title + " | Vite-Ecommerce" : "Vite-Ecommerce"}
        </title>
        <meta name="description" content={description ? description : 'Created by Routes.ID'}/>
        <meta name="author" content="Hajrul Ahmad Harudin" />
        <meta property="Social: Linkendin" content="https://www.linkedin.com/in/hajrul-ahmad-harudin/" />
        <meta property="Social: Youtube please watch wkwkwkwk, canda" content="https://www.youtube.com/@rutes5872/videos"/>
      </Helmet>

      <div className="min-h-screen flex flex-col justify-between bg-gray-100 dark:bg-gray-900 font-poppins">
        <Header />
        <section className="mt-28">{children}</section>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
