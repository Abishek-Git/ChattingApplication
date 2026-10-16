export interface Message{
	message: string,
	messageId: number,
	receiverId: {
	email: string,
	name: string,
	password: string,
	userId: number
	},
	roomId: number,
	senderId: {
	email: string,
	name: string,
	password: string,
	userId: number
	},
	time: any;

}