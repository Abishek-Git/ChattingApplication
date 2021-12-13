package chatter.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@Entity
public class Message {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int messageId;
	
	@ManyToOne
	@JoinColumn(name="senderId")
	private User senderId;
	
	@ManyToOne
	@JoinColumn(name="receiverId")
	private User receiverId;

	@GeneratedValue(strategy = GenerationType.AUTO)
	private int roomId;

	private String message;

	@Temporal(TemporalType.TIMESTAMP)
	private Date time;

	public Message() {
		super();
	}

	public int getMessageId() {
		return messageId;
	}

	public void setMessageId(int messageId) {
		this.messageId = messageId;
	}

	public User getSenderId() {
		return senderId;
	}

	public void setSenderId(User senderId) {
		this.senderId = senderId;
	}

	public User getReceiverId() {
		return receiverId;
	}

	public void setReceiverId(User receiverId) {
		this.receiverId = receiverId;
	}

	public int getRoomId() {
		return roomId;
	}

	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	@Override
	public String toString() {
		return "Message [messageId=" + messageId + ", senderId=" + senderId + ", receiverId=" + receiverId + ", roomId="
				+ roomId + ", message=" + message + ", time="  + "]";
	}

}
