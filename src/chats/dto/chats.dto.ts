import { IsNotEmpty } from "class-validator";

export class ChatsDto {
  @IsNotEmpty()
  senderId: string;
  @IsNotEmpty()
  reciverId: string;
  message: string;
  seen: boolean
}