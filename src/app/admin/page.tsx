import { db } from "@/db";
import getRequiredAuthSession from "@/feature/auth/getRequiredAuthSession";
import UserTable from "@/feature/user/UserTable";

export default async function AdminPage () {
  const session = await getRequiredAuthSession()
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