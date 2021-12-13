package chatter.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import chatter.entity.Message;


public interface MessageService {
	public List<Message> getMessageBySenderId(int userId, int receiverid);
	public List<Message> getMessageByReceiverId(int userId, int receiverid);
	public void setMessage(Message msg);
}
