export interface Message{
	message: string,
	messageId: 0,
	receiverId: {
	email: string,
	name: string,
	password: string,
	userId: 0
	},
	roomId: 0,
	senderId: {
	email: string,
	name: string,
	password: string,
	userId: 0
	},
	time: any;

}