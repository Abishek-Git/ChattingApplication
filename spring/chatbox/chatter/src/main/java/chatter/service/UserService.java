package chatter.service;

import java.util.List;

import chatter.entity.User;

public interface UserService {
	public User userByEmailPass(String email, String password);
	public List<User> allUsers();
	public User userById(int id);
}
