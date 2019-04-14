import { News } from './news.entity';


export class User {
  public username : string;
  public avatar : string;
  public motto : string;
  public subscribeList : User[];
  public ownerNews: News[]; 
}

export function getUser(): User{
  let user = new User();
  user.username = 'iwen';
  user.avatar = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  user.motto = '关注iwen获得最新最好玩的资讯';
  user.ownerNews = [];
  user.subscribeList = [];
  return user;
}