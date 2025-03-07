import { createAuthClient } from "better-auth/client"
import { magicLinkClient } from "better-auth/client/plugins"

const authClient = createAuthClient({
  plugins: [
    magicLinkClient()
  ]
});

export default authClient;