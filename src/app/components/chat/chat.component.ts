import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ChatService } from '../../services/chat.service';
import { Subscription, map } from 'rxjs';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  protected formChat: FormGroup;
  protected listOfMessages: Array<any>;
  protected formatMessageReceived: string;
  protected formatMessageSent: string;
  protected activated: boolean;
  private subscribeChat: Subscription;
  private userMessages: Array<any>;

  constructor(
    protected readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly chatService: ChatService
  ) {
    this.formChat = this.formBuilder.group({
      message: ['', Validators.required],
    });
    this.listOfMessages = [];
    this.userMessages = [];
    this.formatMessageSent =
      'mensaje bg-success p-2 fs-5 rounded-pill fw-light enviado';
    this.formatMessageReceived =
      'mensaje bg-secondary p-2 fs-5 rounded-pill fw-light recibido';
  }
  ngOnDestroy(): void {
    if (this.subscribeChat) {
      this.subscribeChat.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.subscribeChat = this.chatService
      .getAllMessages()
      .subscribe((messages: any) => {
        messages.sort(
          (m1: Message, m2: Message) =>
            new Date(m1.date).getTime() < new Date(m2.date).getTime()
        );
        this.listOfMessages = messages;
      });
  }

  private getNewMessage() {
    const date = new Date();
    return new Message({
      date: date,
      email: this.userService.userLogged?.email as string,
      user:
        this.userService.userLogged?.displayName ??
        (this.userService.userLogged?.email as string),
      message: this.formChat.value.message as string,
      dateSent: `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`,
    });
  }
  protected sendMessage() {
    if (this.formChat.valid) {
      const message = this.getNewMessage();

      this.chatService.saveMessage(message);
      this.formChat.reset();

      setTimeout(() => {
        this.scrollLastElement();
      }, 30);
    }
  }

  private scrollLastElement(): void {
    const listMessages: any = document.querySelectorAll('.mensaje');
    if (listMessages.length > 0) {
      let position = listMessages[listMessages.length - 1].offsetTop;

      const containerMsj = document.querySelector('#contendor-msjs');
      if (containerMsj !== null) {
        containerMsj.scrollTop = position;
      }
    }
  }
  protected activatedChat() {
    this.activated = !this.activated;
    if (this.activated) {
      this.scrollLastElement();
    }
  }
}
