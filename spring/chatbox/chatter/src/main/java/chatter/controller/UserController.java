package chatter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import chatter.dao.UserDao;
import chatter.entity.User;
import chatter.service.UserService;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
		RequestMethod.DELETE }, allowCredentials = "true", allowedHeaders = "*")
public class UserController {
	@Autowired
	UserService userDao;

	@PutMapping("/login")
	public ResponseEntity<User> login(@RequestBody User user) {
		if ((user.getEmail() != null) && (user.getPassword() != null)) {
			User loggedUser = userDao.userByEmailPass(user.getEmail(), user.getPassword());
			return ResponseEntity.ok(loggedUser);
		}
		return (ResponseEntity) ResponseEntity.notFound();
	}
	
	@GetMapping("/allusers")
	public ResponseEntity<List<User>> allUsers() {
		List<User> users = userDao.allUsers();
		return ResponseEntity.ok(users);
	}
	@GetMapping("/userbyid/{id}")
	public ResponseEntity<User> userById(@PathVariable("id") int id) {
		User users = userDao.userById(id);
		return ResponseEntity.ok(users);
	}
}