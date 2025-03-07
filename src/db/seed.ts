import 'dotenv/config';
import { connection, db } from '@/db';
import * as schema from './schema';
import { reset } from 'drizzle-seed'
import data from './seeds/minimal.json'
import { POINTS } from '@/feature/point/pointConstants';
import findUserByEmailOrThrow from '@/feature/user/findUserByEmailOrThrow';
import { incrementPoints } from '@/feature/point/incrementPoints';
import { decrementPoints } from '@/feature/point/decrementPoints';
import findBadgeByNameOrThrow from '@/feature/badge/findBadgeByNameOrThrow';
import findTagByNameOrThrow from '@/feature/tag/findTagByNameOrThrow';

async function seed() {
  await db.transaction(async (tx) => {
    console.log('Resetting database...')
    await reset(tx, schema)
    console.log('Database reset!')
    for (const badgeSeed of data.badges) {
      console.log(`Seeding badge ${badgeSeed.name}...`)
      await tx
        .insert(schema.badge)
        .values([{
          color: badgeSeed.color,
          description: badgeSeed.description,
          icon: badgeSeed.icon,
          name: badgeSeed.name,
        }])
    }
    for (const tagSeed of data.tags) {
      console.log(`Seeding tag ${tagSeed}...`)
      await tx
        .insert(schema.tag)
        .values([{
          name: tagSeed,
        }])
    }
    for (const userSeed of data.users) {
      console.log(`Seeding user ${userSeed.email}...`)
      const [user] = await tx
        .insert(schema.user)
        .values([{
          displayName: userSeed.displayName,
          email: userSeed.email,
        }])
        .returning()

      for (const badgeSeed of userSeed.badges) {
        console.log(`Seeding badge ${badgeSeed} for user ${userSeed.email}...`)
        const badge = await findBadgeByNameOrThrow({ db: tx, name: badgeSeed })
        await tx
          .insert(schema.userBadge)
          .values([{
            badgeId: badge.id,
            userId: user.id,
          }])
      }


      for (const loginSeed of userSeed.loginEvents) {
        console.log(`Seeding login for user ${userSeed.email}...`)
        await tx
          .insert(schema.eventLogin)
          .values([{
            createdAt: loginSeed,
            points: POINTS.login,
            updatedAt: loginSeed,
            userId: user.id,
          }])
        await incrementPoints({ db: tx, userId: user.id, points: POINTS.login })
      }

      for (const inviteSeed of userSeed.invites) {
        console.log(`Seeding invite from user ${userSeed.email} to ${inviteSeed.email}...`)
        await tx
          .insert(schema.invite)
          .values([{
            code: inviteSeed.code,
            email: inviteSeed.email,
            senderId: user.id,
          }])
      }

      for (const listSeed of userSeed.lists) {
        console.log(`Seeding list ${listSeed.title} by user ${userSeed.email}...`)
        const [list] = await tx
          .insert(schema.list)
          .values([{
            description: listSeed.description,
            title: listSeed.title,
            userId: user.id,
          }])
          .returning()

        for (const itemSeed of listSeed.items) {
          console.log(`Seeding listItem ${itemSeed.title} on list ${listSeed.title}...`)
          await tx
            .insert(schema.listItem)
            .values([{
              listId: list.id,
              title: itemSeed.title,
              description: itemSeed.description,
            }])
        }
      }

      for (const postSeed of userSeed.posts) {
        console.log(`Seeding post ${postSeed.slug} by user ${user.email}...`)

        const [post] = await tx
          .insert(schema.post)
          .values([{
            content: postSeed.content,
            slug: postSeed.slug,
            title: postSeed.title,
            userId: user.id,
          }])
          .returning()

        await tx
          .insert(schema.eventPost)
          .values([{
            points: POINTS.post,
            postId: post.id,
            userId: user.id,
          }])
        await incrementPoints({ db: tx, userId: user.id, points: POINTS.post })

        for (const tagSeed of postSeed.tags) {
          console.log(`Seeding postTag ${tagSeed} on post ${postSeed.slug}...`)
          const tag = await findTagByNameOrThrow({ db: tx, name: tagSeed })
          await tx
            .insert(schema.postTag)
            .values([{
              postId: post.id,
              tagId: tag.id,
            }])
        }

        for (const likeSeed of postSeed.likeEvents) {
          console.log(`Seeding postLike from user ${likeSeed} on post ${postSeed.slug}...`)
          const user = await findUserByEmailOrThrow({ db: tx, email: likeSeed })
          const [postLike] = await tx
            .insert(schema.postLike)
            .values([{
              postId: post.id,
              userId: user.id,
            }])
            .returning()
          await tx
            .insert(schema.eventPostLike)
            .values([{
              points: POINTS.postLike,
              postLikeId: postLike.id,
              userId: user.id,
            }])
          await incrementPoints({ db: tx, userId: user.id, points: POINTS.postLike })
        }

        for (const viewSeed of postSeed.viewEvents) {
          console.log(`Seeding postView from user ${viewSeed} on post ${postSeed.slug}...`)
          const user = await findUserByEmailOrThrow({ db: tx, email: viewSeed })
          await tx
            .insert(schema.eventView)
            .values([{
              points: POINTS.view,
              postId: post.id,
              userId: user.id,
            }])
          await incrementPoints({ db: tx, userId: user.id, points: POINTS.view })
        }

        for (const commentSeed of postSeed.comments) {
          console.log(`Seeding comment ${commentSeed.content} on post ${postSeed.slug}...`)
          const user = await findUserByEmailOrThrow({ db: tx, email: commentSeed.userEmail })

          const [comment] = await tx
            .insert(schema.comment)
            .values([{
              content: commentSeed.content,
              postId: post.id,
              userId: user.id,
            }])
            .returning()

          await tx
            .insert(schema.eventComment)
            .values([{
              points: POINTS.comment,
              commentId: comment.id,
              userId: user.id,
            }])
          await incrementPoints({ db: tx, userId: user.id, points: POINTS.comment })

          for (const likeSeed of commentSeed.likeEvents) {
            console.log(`Seeding commentLike on comment ${commentSeed.content}...`)

            const user = await findUserByEmailOrThrow({ db: tx, email: likeSeed })

            const [commentLike] = await tx
              .insert(schema.commentLike)
              .values([{
                commentId: comment.id,
                userId: user.id,
              }])
              .returning()

            await tx
              .insert(schema.eventCommentLike)
              .values([{
                points: POINTS.commentLike,
                commentLikeId: commentLike.id,
                userId: user.id,
              }])
            await incrementPoints({ db: tx, userId: user.id, points: POINTS.commentLike })
          }
        }
      }

      for (const rewardSeed of userSeed.rewards) {
        console.log(`Seeding reward ${rewardSeed.description} for user ${userSeed.email}...`)
        await tx
          .insert(schema.reward)
          .values([{
            description: rewardSeed.description,
            points: rewardSeed.points,
            userId: user.id,
          }])
        await decrementPoints({ db: tx, userId: user.id, points: rewardSeed.points })
      }
    }
  })
  await connection.end();
  console.log('Seed successful')
}

seed()