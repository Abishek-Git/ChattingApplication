package chatter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import chatter.dao.MessageDao;
import chatter.dao.UserDao;
import chatter.entity.Message;
import chatter.entity.User;


 
@Service
@Transactional
public class Servicelass implements MessageService, UserService {
	@Autowired
	UserDao userdao;
	@Autowired
	MessageDao messageDao;

	@Override
	public User userByEmailPass(String email, String password) {
		// TODO Auto-generated method stub
		return userdao.userByEmailPass(email, password);
	}

	@Override
	public List<Message> getMessageBySenderId(int userId,int receiverid) {
		// TODO Auto-generated method stub
		return messageDao.getMessageBySenderId(userId, receiverid);
	}

	@Override
	public List<Message> getMessageByReceiverId(int userId, int receiverid) {
		// TODO Auto-generated method stub
		return messageDao.getMessageByReceiverId(userId, receiverid);
	}

	@Override
	public List<User> allUsers() {
		return userdao.allUsers();
	}

	@Override
	public void setMessage(Message msg) {
		messageDao.setMessage(msg);
	}

	@Override
	public User userById(int id) {
		return userdao.userById(id);
	}

}
