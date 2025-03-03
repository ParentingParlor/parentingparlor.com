CREATE TABLE "commentLikes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "commentLikes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" date DEFAULT 'now()' NOT NULL,
	"updatedAt" date DEFAULT 'now()' NOT NULL,
	"userId" integer NOT NULL,
	"commentId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "comments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" date DEFAULT 'now()' NOT NULL,
	"updatedAt" date DEFAULT 'now()' NOT NULL,
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invites" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "invites_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" date DEFAULT 'now()' NOT NULL,
	"updatedAt" date DEFAULT 'now()' NOT NULL,
	"accepted" boolean DEFAULT false NOT NULL,
	"acceptorId" integer,
	"code" text NOT NULL,
	"email" text NOT NULL,
	"senderId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "list_items" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "list_items_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" date DEFAULT 'now()' NOT NULL,
	"updatedAt" date DEFAULT 'now()' NOT NULL,
	"listId" integer NOT NULL,
	"title" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "lists" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "lists_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" date DEFAULT 'now()' NOT NULL,
	"updatedAt" date DEFAULT 'now()' NOT NULL,
	"userId" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"public" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pointRewards" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "pointRewards_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" date DEFAULT 'now()' NOT NULL,
	"updatedAt" date DEFAULT 'now()' NOT NULL,
	"userId" integer NOT NULL,
	"amount" integer NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "postLikes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "postLikes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" date DEFAULT 'now()' NOT NULL,
	"updatedAt" date DEFAULT 'now()' NOT NULL,
	"userId" integer NOT NULL,
	"postId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "posts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" date DEFAULT 'now()' NOT NULL,
	"updatedAt" date DEFAULT 'now()' NOT NULL,
	"userId" integer NOT NULL,
	"content" text NOT NULL,
	"slug" text NOT NULL,
	"topicId" integer NOT NULL,
	"title" text NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "topics" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "topics_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" date DEFAULT 'now()' NOT NULL,
	"updatedAt" date DEFAULT 'now()' NOT NULL,
	"label" text NOT NULL,
	"slug" text NOT NULL,
	CONSTRAINT "topics_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "userCommentLikes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "userCommentLikes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" date DEFAULT 'now()' NOT NULL,
	"updatedAt" date DEFAULT 'now()' NOT NULL,
	"userId" integer NOT NULL,
	"points" integer NOT NULL,
	"pointsDisabled" boolean DEFAULT false NOT NULL,
	"commentLikeId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userComments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "userComments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" date DEFAULT 'now()' NOT NULL,
	"updatedAt" date DEFAULT 'now()' NOT NULL,
	"userId" integer NOT NULL,
	"points" integer NOT NULL,
	"pointsDisabled" boolean DEFAULT false NOT NULL,
	"commentId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userInvites" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "userInvites_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" date DEFAULT 'now()' NOT NULL,
	"updatedAt" date DEFAULT 'now()' NOT NULL,
	"userId" integer NOT NULL,
	"points" integer NOT NULL,
	"pointsDisabled" boolean DEFAULT false NOT NULL,
	"inviteId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userLogins" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "userLogins_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" date DEFAULT 'now()' NOT NULL,
	"updatedAt" date DEFAULT 'now()' NOT NULL,
	"userId" integer NOT NULL,
	"points" integer NOT NULL,
	"pointsDisabled" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userPostLikes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "userPostLikes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" date DEFAULT 'now()' NOT NULL,
	"updatedAt" date DEFAULT 'now()' NOT NULL,
	"userId" integer NOT NULL,
	"points" integer NOT NULL,
	"pointsDisabled" boolean DEFAULT false NOT NULL,
	"postLikeId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userPosts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "userPosts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" date DEFAULT 'now()' NOT NULL,
	"updatedAt" date DEFAULT 'now()' NOT NULL,
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	"points" integer NOT NULL,
	"pointsDisabled" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userViews" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "userViews_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" date DEFAULT 'now()' NOT NULL,
	"updatedAt" date DEFAULT 'now()' NOT NULL,
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	"points" integer NOT NULL,
	"pointsDisabled" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"createdAt" date DEFAULT 'now()' NOT NULL,
	"updatedAt" date DEFAULT 'now()' NOT NULL,
	"email" text NOT NULL,
	"displayName" text NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"total_points" integer DEFAULT 0 NOT NULL,
	"monthly_points" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
