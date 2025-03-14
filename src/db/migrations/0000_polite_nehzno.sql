CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "badge" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"icon" text NOT NULL,
	"color" text NOT NULL,
	CONSTRAINT "badge_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "comment" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL,
	"postId" text NOT NULL,
	"content" text NOT NULL,
	"parentCommentId" text
);
--> statement-breakpoint
CREATE TABLE "commentLike" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL,
	"commentId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eventComment" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL,
	"points" integer NOT NULL,
	"pointsDisabled" boolean DEFAULT false NOT NULL,
	"commentId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eventCommentLike" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL,
	"points" integer NOT NULL,
	"pointsDisabled" boolean DEFAULT false NOT NULL,
	"commentLikeId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eventInvite" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL,
	"points" integer NOT NULL,
	"pointsDisabled" boolean DEFAULT false NOT NULL,
	"inviteId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eventLogin" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL,
	"points" integer NOT NULL,
	"pointsDisabled" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eventPost" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL,
	"postId" text NOT NULL,
	"points" integer NOT NULL,
	"pointsDisabled" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eventPostLike" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL,
	"points" integer NOT NULL,
	"pointsDisabled" boolean DEFAULT false NOT NULL,
	"postLikeId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eventView" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL,
	"postId" text NOT NULL,
	"points" integer NOT NULL,
	"pointsDisabled" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invite" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"accepted" boolean DEFAULT false NOT NULL,
	"acceptorId" text,
	"code" text NOT NULL,
	"email" text NOT NULL,
	"senderId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "list" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"public" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "listItem" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"listId" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL,
	"content" text NOT NULL,
	"publishedAt" timestamp DEFAULT now() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	CONSTRAINT "post_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "postLike" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL,
	"postId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "postList" (
	"listId" text NOT NULL,
	"postId" text NOT NULL,
	CONSTRAINT "postList_listId_postId_pk" PRIMARY KEY("listId","postId")
);
--> statement-breakpoint
CREATE TABLE "postTag" (
	"postId" text NOT NULL,
	"tagId" text NOT NULL,
	CONSTRAINT "postTag_postId_tagId_pk" PRIMARY KEY("postId","tagId")
);
--> statement-breakpoint
CREATE TABLE "reward" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL,
	"description" text NOT NULL,
	"points" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"impersonated_by" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "tag" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"color" text DEFAULT '#000000' NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "tag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"banned" boolean,
	"ban_reason" text,
	"ban_expires" timestamp,
	"city" text,
	"display_name" text,
	"dkbaVerified" boolean DEFAULT false NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"monthly_points" integer DEFAULT 0 NOT NULL,
	"name" text NOT NULL,
	"points" integer DEFAULT 0 NOT NULL,
	"role" text,
	"state" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "userBadge" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL,
	"badgeId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_postId_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_parentCommentId_comment_id_fk" FOREIGN KEY ("parentCommentId") REFERENCES "public"."comment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commentLike" ADD CONSTRAINT "commentLike_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commentLike" ADD CONSTRAINT "commentLike_commentId_comment_id_fk" FOREIGN KEY ("commentId") REFERENCES "public"."comment"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventComment" ADD CONSTRAINT "eventComment_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventComment" ADD CONSTRAINT "eventComment_commentId_comment_id_fk" FOREIGN KEY ("commentId") REFERENCES "public"."comment"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventCommentLike" ADD CONSTRAINT "eventCommentLike_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventCommentLike" ADD CONSTRAINT "eventCommentLike_commentLikeId_commentLike_id_fk" FOREIGN KEY ("commentLikeId") REFERENCES "public"."commentLike"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventInvite" ADD CONSTRAINT "eventInvite_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventInvite" ADD CONSTRAINT "eventInvite_inviteId_invite_id_fk" FOREIGN KEY ("inviteId") REFERENCES "public"."invite"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventLogin" ADD CONSTRAINT "eventLogin_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventPost" ADD CONSTRAINT "eventPost_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventPost" ADD CONSTRAINT "eventPost_postId_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventPostLike" ADD CONSTRAINT "eventPostLike_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventPostLike" ADD CONSTRAINT "eventPostLike_postLikeId_postLike_id_fk" FOREIGN KEY ("postLikeId") REFERENCES "public"."postLike"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventView" ADD CONSTRAINT "eventView_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventView" ADD CONSTRAINT "eventView_postId_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invite" ADD CONSTRAINT "invite_acceptorId_user_id_fk" FOREIGN KEY ("acceptorId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invite" ADD CONSTRAINT "invite_senderId_user_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "list" ADD CONSTRAINT "list_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listItem" ADD CONSTRAINT "listItem_listId_list_id_fk" FOREIGN KEY ("listId") REFERENCES "public"."list"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postLike" ADD CONSTRAINT "postLike_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postLike" ADD CONSTRAINT "postLike_postId_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postList" ADD CONSTRAINT "postList_listId_list_id_fk" FOREIGN KEY ("listId") REFERENCES "public"."list"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postList" ADD CONSTRAINT "postList_postId_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postTag" ADD CONSTRAINT "postTag_postId_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postTag" ADD CONSTRAINT "postTag_tagId_tag_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."tag"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reward" ADD CONSTRAINT "reward_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userBadge" ADD CONSTRAINT "userBadge_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userBadge" ADD CONSTRAINT "userBadge_badgeId_badge_id_fk" FOREIGN KEY ("badgeId") REFERENCES "public"."badge"("id") ON DELETE cascade ON UPDATE no action;