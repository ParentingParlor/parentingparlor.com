import { db } from "@/db";
import getRequiredAuthState from "@/feature/auth/getRequiredAuthSession";
import UserTable from "@/feature/user/UserTable";

export default async function AdminPage () {
  const session = await getRequiredAuthState()
  if (session.user.role !== 'admin') {
    return <div>Access denied</div>
  }
  const users = await db.query.user.findMany()
  return (
    <>
      <div>Admin page</div>
      <UserTable rows={users} />
    </>
  )
}