import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Posts } from "./Posts";
import { Users } from "./Users";

@Index("UserId", ["userId"], {})
@Entity("like", { schema: "react-nodebird" })
export class Like {
  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @Column("datetime", { name: "updatedAt" })
  updatedAt: Date;

  @Column("int", { primary: true, name: "PostId" })
  postId: number;

  @Column("int", { primary: true, name: "UserId" })
  userId: number;

  @ManyToOne(() => Posts, (posts) => posts.likes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "PostId", referencedColumnName: "id" }])
  post: Posts;

  @ManyToOne(() => Users, (users) => users.likes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: Users;
}
