"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  ThumbsUp,
  Share2,
  Bookmark,
  Flag,
  CheckCircle,
  Plus,
  X,
  Facebook,
  Instagram,
  Twitter,
  Copy,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Topic } from "@/types";
import CommentForm from "./comments/CommentForm";
import CommentList from "./comments/CommentList";
import AttachedLists from "./lists/AttachedLists";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TopicDetailProps {
  topic: Topic;
}

function formatVerifiedDate(dateString?: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function TopicDetail({ topic }: TopicDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isMobileFabOpen, setIsMobileFabOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [flagReason, setFlagReason] = useState("inappropriate");
  const [isCopied, setIsCopied] = useState(false);

  const commentFormRef = useRef(null);

  // Get highlighted comments (top 2 comments)
  const highlightedComments =
    topic.comments?.filter((c) => c.highlighted)?.slice(0, 2) || [];

  // Toggle FAB menu for mobile
  const toggleFabMenu = () => {
    setIsMobileFabOpen(!isMobileFabOpen);
  };

  // Scroll to comment form
  const scrollToComments = () => {
    if (commentFormRef.current) {
      commentFormRef.current.scrollIntoView({ behavior: "smooth" });

      // If on mobile, close the FAB menu after clicking
      if (isMobileFabOpen) {
        setIsMobileFabOpen(false);
      }
    }
  };

  // Handle share actions
  const handleShare = () => {
    setIsShareModalOpen(true);

    // If on mobile, close the FAB menu after clicking
    if (isMobileFabOpen) {
      setIsMobileFabOpen(false);
    }
  };

  // Handle flag actions
  const handleFlag = () => {
    setIsFlagModalOpen(true);

    // If on mobile, close the FAB menu after clicking
    if (isMobileFabOpen) {
      setIsMobileFabOpen(false);
    }
  };

  // Handle copy link
  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // Handle flag submission
  const submitFlag = () => {
    console.log("Flagged for:", flagReason);
    setIsFlagModalOpen(false);
  };

  // Action button component for reuse
  const ActionButton = ({ icon, isActive = false, label, onClick }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={onClick}
          >
            {icon}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="max-w-8xl mx-auto pb-20">
      {/* Main content with action bar */}
      <div className="flex">
        {/* Main content */}
        <article className="flex-1 md:pr-4">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {topic.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {topic.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            {topic.imageUrl && (
              <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={topic.imageUrl}
                  alt={topic.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="prose max-w-none mb-6">{topic.content}</div>

            {topic.attachedLists && topic.attachedLists.length > 0 && (
              <div className="mb-6">
                <AttachedLists lists={topic.attachedLists} />
              </div>
            )}

            {/* Author section */}
            <div className="mt-8 p-4 sm:p-6 bg-purple-50 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-200 flex items-center justify-center">
                  <span className="text-purple-700 font-semibold text-lg">
                    {topic.author.name.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    <h2 className="font-semibold text-gray-900">
                      {topic.author.name}
                    </h2>
                    {topic.author.isVerified && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="ml-1">
                              <CheckCircle className="h-4 w-4 text-blue-500 inline" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-sm">Verified Human</p>
                            <p className="text-xs text-gray-500">
                              Verified on{" "}
                              {formatVerifiedDate(topic.author.verifiedDate)}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <p className="text-purple-600 text-sm">
                    {topic.author.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Highlighted comments section */}
            {highlightedComments.length > 0 && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Top Insights
                </h3>
                <div className="space-y-4">
                  {highlightedComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-white p-4 rounded-lg border"
                    >
                      <p className="text-gray-700 italic mb-2">
                        "{comment.content}"
                      </p>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-500">
                          — {comment.author}
                        </p>
                        {comment.authorIsVerified && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="ml-1">
                                  <CheckCircle className="h-3 w-3 text-blue-500 inline" />
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-sm">Verified Human</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Comments section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Discussion ({topic.communityResponses})
            </h2>

            <div className="mb-6" ref={commentFormRef}>
              <CommentForm
                onSubmit={(content, attachedLists) => {
                  // Handle comment submission
                  console.log("New comment:", { content, attachedLists });
                }}
              />
            </div>

            {/* Comment threads */}
            {topic.comments && (
              <CommentList
                comments={topic.comments}
                onReply={(parentId) => {
                  // Handle reply
                  console.log("Reply to:", parentId);
                }}
                onAttachList={(commentId) => {
                  // Handle list attachment
                  console.log("Attach list to comment:", commentId);
                }}
              />
            )}
          </div>
        </article>

        {/* Desktop/Tablet: Action buttons - positioned in the right margin */}
        <div className="hidden md:block w-14 ml-2">
          <div className="sticky top-24">
            <div className="flex flex-col items-center space-y-4 bg-white p-3 rounded-lg shadow-sm border">
              <ActionButton
                icon={
                  <ThumbsUp
                    className={`h-6 w-6 ${
                      topic.likes > 0
                        ? "text-purple-600 fill-current"
                        : "text-gray-500"
                    }`}
                  />
                }
                isActive={topic.likes > 0}
                label="Like"
                onClick={() => console.log("Liked")}
              />
              <span className="text-sm font-medium text-gray-700">
                {topic.likes}
              </span>
              <ActionButton
                icon={<MessageCircle className="h-6 w-6 text-gray-500" />}
                label="Comment"
                onClick={scrollToComments}
              />
              <ActionButton
                icon={<Bookmark className="h-6 w-6 text-gray-500" />}
                label="Bookmark"
                onClick={() => console.log("Bookmarked")}
              />
              <ActionButton
                icon={<Share2 className="h-6 w-6 text-gray-500" />}
                label="Share"
                onClick={handleShare}
              />
              <ActionButton
                icon={<Flag className="h-6 w-6 text-gray-500" />}
                label="Report"
                onClick={handleFlag}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Floating Action Button */}
      <div className="md:hidden fixed right-4 bottom-16 z-50">
        {/* FAB Menu - shown when open */}
        {isMobileFabOpen && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 mb-2 flex flex-col items-center space-y-4 border">
            <ActionButton
              icon={
                <ThumbsUp
                  className={`h-6 w-6 ${
                    topic.likes > 0
                      ? "text-purple-600 fill-current"
                      : "text-gray-500"
                  }`}
                />
              }
              isActive={topic.likes > 0}
              label="Like"
              onClick={() => console.log("Liked")}
            />
            <span className="text-sm font-medium text-gray-700">
              {topic.likes}
            </span>
            <ActionButton
              icon={<MessageCircle className="h-6 w-6 text-gray-500" />}
              label="Comment"
              onClick={scrollToComments}
            />
            <ActionButton
              icon={<Bookmark className="h-6 w-6 text-gray-500" />}
              label="Bookmark"
              onClick={() => console.log("Bookmarked")}
            />
            <ActionButton
              icon={<Share2 className="h-6 w-6 text-gray-500" />}
              label="Share"
              onClick={handleShare}
            />
            <ActionButton
              icon={<Flag className="h-6 w-6 text-gray-500" />}
              label="Report"
              onClick={handleFlag}
            />
          </div>
        )}

        {/* Main FAB button */}
        <button
          onClick={toggleFabMenu}
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
          aria-label={
            isMobileFabOpen ? "Close actions menu" : "Open actions menu"
          }
        >
          {isMobileFabOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Plus className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Share Modal */}
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share this post</DialogTitle>
            <DialogDescription>
              Share this post with your friends and family
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mb-4">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                defaultValue={
                  typeof window !== "undefined" ? window.location.href : ""
                }
                readOnly
                className="h-9"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="px-3"
              onClick={copyToClipboard}
            >
              <span className="sr-only">Copy</span>
              {isCopied ? "Copied!" : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex justify-center gap-4 py-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Share on Facebook</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-pink-500 text-white hover:bg-pink-600"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Share on Instagram</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-blue-400 text-white hover:bg-blue-500"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Share on Twitter</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black text-white hover:bg-gray-800"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
              <span className="sr-only">Share on TikTok</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Flag Modal */}
      <Dialog open={isFlagModalOpen} onOpenChange={setIsFlagModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Report this post</DialogTitle>
            <DialogDescription>
              Please select a reason for reporting this content
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <RadioGroup value={flagReason} onValueChange={setFlagReason}>
              <div className="flex items-start space-x-2 mb-3">
                <RadioGroupItem value="inappropriate" id="inappropriate" />
                <Label
                  htmlFor="inappropriate"
                  className="font-normal leading-relaxed cursor-pointer"
                >
                  <span className="font-medium">Inappropriate content</span>
                  <p className="text-sm text-gray-500">
                    This content contains language or imagery that violates
                    community guidelines
                  </p>
                </Label>
              </div>
              <div className="flex items-start space-x-2 mb-3">
                <RadioGroupItem value="misinformation" id="misinformation" />
                <Label
                  htmlFor="misinformation"
                  className="font-normal leading-relaxed cursor-pointer"
                >
                  <span className="font-medium">Misinformation</span>
                  <p className="text-sm text-gray-500">
                    This content contains false or misleading information
                  </p>
                </Label>
              </div>
              <div className="flex items-start space-x-2 mb-3">
                <RadioGroupItem value="spam" id="spam" />
                <Label
                  htmlFor="spam"
                  className="font-normal leading-relaxed cursor-pointer"
                >
                  <span className="font-medium">Spam</span>
                  <p className="text-sm text-gray-500">
                    This content is spam or misleading
                  </p>
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label
                  htmlFor="other"
                  className="font-normal leading-relaxed cursor-pointer"
                >
                  <span className="font-medium">Other</span>
                  <p className="text-sm text-gray-500">
                    This content violates community guidelines in other ways
                  </p>
                </Label>
              </div>
            </RadioGroup>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsFlagModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={submitFlag}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
