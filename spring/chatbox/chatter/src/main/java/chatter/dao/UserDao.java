package chatter.dao;


import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import chatter.entity.User;



@Repository
public class UserDao {
	@PersistenceContext
	EntityManager entityManager;
	
	protected Session getSession() {
		return entityManager.unwrap(Session.class);
	}

	public User userByEmailPass(String email, String password) {
		Query query = getSession().createQuery("from User where email=:mail and password=:pass").setParameter("pass", password).setParameter("mail", email);
		User user = (User) query.uniqueResult();
		System.out.println(user);
		return user;
	}
	
	public List<User> allUsers(){
		Query query = getSession().createQuery("from User");
		return query.list();
	}
	
	public User userById(int id) {
		Query query = getSession().createQuery("from User where userId=:id").setParameter("id", id);
		return (User) query.uniqueResult();
	}

}
