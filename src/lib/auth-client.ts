import { createAuthClient } from "better-auth/client"
import { adminClient } from "better-auth/client/plugins"
import { magicLinkClient } from "better-auth/client/plugins"

const authClient = createAuthClient({
  plugins: [
    adminClient(),
    magicLinkClient()
  ]
});

export default authClient;