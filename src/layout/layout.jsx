import Header from "./header";

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <div className="h-[calc(100vh-64px)] overflow-auto">{children}</div>
    </>
  );
};

export default Layout;
