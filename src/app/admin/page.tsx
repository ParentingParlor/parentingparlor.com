import { db } from "@/db";
import getRequiredAuthState from "@/feature/auth/getRequiredAuthState";
import UserTable from "@/feature/user/UserTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default async function AdminPage () {
  const session = await getRequiredAuthState()
  if (session.user.role !== 'admin') {
    return <div>Access denied</div>
  }
  const users = await db.query.user.findMany()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin page</CardTitle>
      </CardHeader>
      <CardContent>
        <UserTable rows={users} />
      </CardContent>
    </Card>
  )
}