package chatter.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import chatter.entity.Message;
import chatter.entity.User;

@Repository
public class MessageDao  {
	@PersistenceContext
	EntityManager entityManager;
	
	@Autowired
	UserDao userDao;
	
	protected Session getSession() {
		return entityManager.unwrap(Session.class);
	}
	
	public List<Message> getMessageBySenderId(int userId, int receiverid) {
		Query query = getSession().createQuery("from Message where senderId.userId=:id and receiverId.userId=:rid").setParameter("id", userId).setParameter("rid", receiverid);
		List<Message> messages = query.list();
		System.out.println(messages);

		return messages;
	}
	
	public List<Message> getMessageByReceiverId(int userId, int receiverid) {
		System.out.println(userId);
		Query query = getSession().createQuery("from Message where receiverId.userId=:id and senderId.userId=:rid").setParameter("id", userId).setParameter("rid", receiverid);
		List<Message> messages = query.list();
		return messages;
	}
	
	public void setMessage(Message msg) {
		System.out.println("====================================");

		msg.setTime(new java.util.Date(System.currentTimeMillis()));
		User sender = userDao.userById(msg.getSenderId().getUserId());
		User receiver = userDao.userById(msg.getReceiverId().getUserId());
		msg.setSenderId(sender);
		msg.setReceiverId(receiver);
		System.out.println(msg);
		System.out.println("====================================");
		getSession().save(msg);
	}
}
