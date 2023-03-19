import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  private posts = [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'kim',
      },
      content: '첫 게시물 #Next #Nest',
      Images: [
        {
          src: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
        },
        {
          src: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg',
        },
        {
          src: 'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__340.jpg',
        },
      ],
      Comments: [
        {
          id: 1,
          content: '첫 댓글',
          User: {
            id: 2,
            nickname: 'park',
          },
        },
      ],
    },
  ];

  getAllPosts() {
    return this.posts;
  }
}
