"use client";

import { useState } from "react";
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

  // Get highlighted comments (top 2 comments)
  const highlightedComments =
    topic.comments?.filter((c) => c.highlighted)?.slice(0, 2) || [];

  // Toggle FAB menu for mobile
  const toggleFabMenu = () => {
    setIsMobileFabOpen(!isMobileFabOpen);
  };

  // Action button component for reuse
  const ActionButton = ({ icon, isActive = false, label }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-2 rounded-full hover:bg-gray-100">{icon}</button>
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
        <article className="flex-1 md:pr-16">
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

            <div className="mb-6">
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
        <div className="hidden md:block w-16 ml-4">
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
              />
              <span className="text-sm font-medium text-gray-700">
                {topic.likes}
              </span>
              <ActionButton
                icon={<MessageCircle className="h-6 w-6 text-gray-500" />}
                label="Comment"
              />
              <ActionButton
                icon={<Bookmark className="h-6 w-6 text-gray-500" />}
                label="Bookmark"
              />
              <ActionButton
                icon={<Share2 className="h-6 w-6 text-gray-500" />}
                label="Share"
              />
              <ActionButton
                icon={<Flag className="h-6 w-6 text-gray-500" />}
                label="Report"
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
            />
            <span className="text-sm font-medium text-gray-700">
              {topic.likes}
            </span>
            <ActionButton
              icon={<MessageCircle className="h-6 w-6 text-gray-500" />}
              label="Comment"
            />
            <ActionButton
              icon={<Bookmark className="h-6 w-6 text-gray-500" />}
              label="Bookmark"
            />
            <ActionButton
              icon={<Share2 className="h-6 w-6 text-gray-500" />}
              label="Share"
            />
            <ActionButton
              icon={<Flag className="h-6 w-6 text-gray-500" />}
              label="Report"
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
    </div>
  );
}
