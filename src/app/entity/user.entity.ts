import { News } from './news.entity';
/**
avator: "32133333333333333333333"
email: "eqweqe"
last_data: "31231231"
motto: "iiiiiiiiiiii"
nick_name: "iwen"
phone_number: "123123123"
pwd: null
register_data: "2131231"
u_id: "123"

 */

export class User {
  public userId?: string;
  public username ?: string;
  public avatar ?: string;
  public motto ?: string;
  public email ?: string;
}

export function getUser(): User{
  let user = new User();
  user.userId = "17231503152";
  user.username = 'iwen';
  user.avatar = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  user.motto = '关注iwen获得最新最好玩的资讯';
  return user;
}