package chatter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import chatter.entity.Message;
import chatter.service.MessageService;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
		RequestMethod.DELETE }, allowCredentials = "true", allowedHeaders = "*")
public class MessageController {
	
	@Autowired
	MessageService messageDao;
	
	@GetMapping("msgbysenderid/{userid}/{receiverid}")
	public ResponseEntity<List<Message>> getMessageByUserId(@PathVariable("userid") int userId, @PathVariable("receiverid") int receiverid) {
		List<Message> message = messageDao.getMessageBySenderId(userId, receiverid);
		return ResponseEntity.ok(message);
	}
	
	@GetMapping("msgbyreceiverid/{userid}/{receiverid}")
	public ResponseEntity<List<Message>> getMessageByReceiverId(@PathVariable("userid") int userId, @PathVariable("receiverid") int receiverid) {
		System.out.println(userId);
		List<Message> message = messageDao.getMessageByReceiverId(userId, receiverid);
		return ResponseEntity.ok(message);
	}
	
	@PostMapping("setmessage")
	public void setMessage(@RequestBody Message msg) {
		messageDao.setMessage(msg);
	}
	
	

}
