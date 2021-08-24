import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service'; 
import UserService from 'front/services/user';

interface FriendsListArgs {}

export default class FriendsList extends Component<FriendsListArgs> {
    @service declare user:UserService;

    @tracked showAddFriend = false;
    @tracked showNotifications = false;
    @tracked showNewConv = false;
    @tracked addFriendInput:string ='';

//     get isSent(){
//         return this.requestSent();
//     }
    
//    requestSent(){
//        const status = this.user.foundUsers.map((user:any) => user.friendRequest.map((request:any) => request.fromUserId == this.user.currentUserId ? true : false));
//        console.log("STATUS :", status)
//        if(status.length > 0){
//            return true;
//        }
//        else{ return false}
//    }
   toggleFriendFrame= (event:Event)=> {
        event.preventDefault();
        this.showAddFriend = !this.showAddFriend;
    }
    toggleNotifications= (event:Event)=> {
        event.preventDefault();
        this.showNotifications = !this.showNotifications;
        if(this.showNotifications){
            this.listRequest();
        }
    }
    toggleNewConversation= (user:User) => {
        document.getElementById(user.id.toString())?.classList.toggle('hidden')
        console.log(document.getElementById(user.id.toString()));
    }
    @action
    listRequest(){
        this.user.getRequestUsers();
    }
    @action
    showRequest(user:User[] | null){
        console.log(user)
    }
    @action
     updateInputField(event:Event){
        this.addFriendInput = (<HTMLInputElement>event.target).value;
        this.user.findUser(this.addFriendInput); 
    }

    @action
    createConversation( withUserId:number){

        console.log( (<HTMLInputElement>document.getElementById(withUserId.toString())?.childNodes[3]).value)
    }

    @action
    sendRequest(userId:number){
        this.user.sendFriendRequest(userId);
    }
    @action
    acceptRequest(requestId:number){
        this.user.treatFriendRequest(requestId, 'POST')
    }
    @action
    refuseRequest(requestId:number){
        this.user.treatFriendRequest(requestId, 'DELETE')
    }
    
}
