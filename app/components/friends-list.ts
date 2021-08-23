import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface FriendsListArgs {}

export default class FriendsList extends Component<FriendsListArgs> {
    @tracked showAddFriend = false;

   toggleFriendFrame= (event:Event)=> {
event.preventDefault();
this.showAddFriend = !this.showAddFriend;
    }
}
