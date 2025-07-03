import IFriendshipService, { Friend } from "../../domain/services/IFriendshipService";
import prisma from "../libs/prisma/PrismaClient";






class FriendshipService implements IFriendshipService {
  async acceptFriendRequest(friendshipId: number): Promise<void> {
    await prisma.friendship.update({
      where: {
        id: friendshipId,
      },
      data: {
        accepted: true,
      },
    })
  }
  async addFriend(userId: number, friendId: number): Promise<void> {
    await prisma.friendship.create({
      data: {
        user_id: userId,
        friend_id: friendId,
      },
    });
  }
  async getAcceptedFriendships(user_id: number): Promise<Friend[]>{

    await prisma.friendship.findMany({
      where: {
        user_id,
        accepted: true,
      },
      include: {
        friend: true,
      },
    })
  }
  async rejectFriendRequest(friendshipId: number): Promise<void> {
    await prisma.friendship.delete({
      where: {
        id: friendshipId,
      },
    })
    
  }
  async removeFriendship(userId: number, friendId: number): Promise<void> {
     await prisma.friendship.delete({
        where: {
          user_id_friend_id: {
            user_id: userId,
            friend_id: friendId,
          },
        },
      }),
  }
}

export default FriendshipService;
