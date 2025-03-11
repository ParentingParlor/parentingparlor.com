"use client";

import Link from "next/link";
import { Baby, Mail, X, Facebook, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, FormEvent, ChangeEvent } from "react";
import authClient from "@/lib/auth-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  async function handleMagicLinkLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      await authClient.signIn.magicLink({
        email,
        callbackURL: "/", // redirect after successful login
      });
      setMagicLinkSent(true);
    } catch (error) {
      console.error("Magic link login error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // redirect after successful login
      });
      // Google OAuth flow will handle redirect
    } catch (error) {
      console.error("Google login error:", error);
      setLoading(false);
    }
  }

  return (
    <div className=" flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Login</h2>

          <p className="mt-2 text-sm text-gray-600">
            No need to register first, simply sign in with one of these options
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900 border border-gray-300"
            disabled={loading}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Continue with Google
          </Button>

          {/* Facebook - Coming Soon */}
          <Button
            className="w-full flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white"
            disabled={true}
          >
            <Facebook size={20} />
            Continue with Facebook (Coming Soon)
          </Button>

          {/* Reddit - Coming Soon */}
          <Button
            className="w-full flex items-center justify-center gap-2 bg-[#FF4500] hover:bg-[#E03D00] text-white"
            disabled={true}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.033 16.01c.564-1.789 1.632-3.932 1.821-4.474.273-.787-.211-1.136-1.74.209l-.34-.64c1.744-1.897 5.335-2.326 4.113.613-.763 1.835-1.309 3.074-1.621 4.03-.455 1.393.694.828 1.819-.211.153.25.203.331.356.619-2.498 2.378-5.271 2.588-4.408-.146zm4.742-8.169c-.532.453-1.32.443-1.761-.022-.441-.465-.43-1.195.031-1.642.459-.452 1.195-.438 1.628.019.433.455.434 1.189.102 1.645z" />
            </svg>
            Continue with Reddit (Coming Soon)
          </Button>

          {/* Microsoft - Coming Soon */}
          <Button
            className="w-full flex items-center justify-center gap-2 bg-[#2F2F2F] hover:bg-[#1E1E1E] text-white"
            disabled={true}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.5 0v11.5h-11.5v-11.5h11.5zm11.5 0v11.5h-11.5v-11.5h11.5zm-11.5 11.5v11.5h-11.5v-11.5h11.5zm11.5 0v11.5h-11.5v-11.5h11.5z" />
            </svg>
            Continue with Microsoft (Coming Soon)
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or</span>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <Mail size={20} />
                Continue with Email
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                {!magicLinkSent ? (
                  <>
                    <DialogTitle>Sign in with Magic Link</DialogTitle>
                    <DialogDescription>
                      We'll send a secure link to your email.
                    </DialogDescription>
                  </>
                ) : (
                  <DialogTitle className="sr-only">
                    Check Your Email
                  </DialogTitle>
                )}
              </DialogHeader>

              {magicLinkSent ? (
                <div className="text-center py-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Check your email
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    We've sent a magic link to {email}
                  </p>
                  <div className="mt-6">
                    <DialogClose asChild>
                      <Button type="button">Close</Button>
                    </DialogClose>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleMagicLinkLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="name@example.com"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>

                  <Button className="w-full" type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Magic Link"}
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
