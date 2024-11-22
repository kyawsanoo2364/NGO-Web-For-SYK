import AdminNavbar from "../components/Admin/AdminNavbar";

const AdminView = (Component) => () => {
  return (
    <>
      <div className="flex gap-4">
        <AdminNavbar />
        <Component />
      </div>
    </>
  );
};
export default AdminView;
