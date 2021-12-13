package chatter.dao;


import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import chatter.entity.User;



@Repository
public class UserDao {
	@Autowired
	SessionFactory sessionFactory;
	
	protected Session getSession() {
		return sessionFactory.getCurrentSession();
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
