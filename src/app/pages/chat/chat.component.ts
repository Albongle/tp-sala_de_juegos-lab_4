import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ChatService } from './services/chat.service';
import { Subscription, map } from 'rxjs';

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

  constructor(
    protected readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly chatService: ChatService,
    private readonly router: Router
  ) {
    this.formChat = this.formBuilder.group({
      message: ['', Validators.required],
    });
    this.listOfMessages = [];
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
      .pipe(
        map((message) => {
          const mapeo = message.reduce((prev: any, curr: any) => {
            prev.push(...curr.messages);
            return prev;
          }, []);
          return mapeo;
        })
      )
      .subscribe((messages) => (this.listOfMessages = [...messages]));
    if (!this.userService.userLogged) {
      this.router.navigateByUrl('');
    }
  }

  private getNewMessage() {
    return {
      email: this.userService.userLogged?.email,
      user:
        this.userService.userLogged?.displayName ??
        this.userService.userLogged?.email,
      message: this.formChat.value.message as string,
      time: new Date().toISOString(),
    };
  }
  protected sendMessage() {
    if (this.formChat.valid) {
      const message = this.getNewMessage();
      this.listOfMessages.push(message);
      this.chatService.setMessageWithId(
        { messages: [...this.listOfMessages] },
        this.userService.userLogged?.uid
      );
      this.formChat.controls['message'].setValue(undefined);

      setTimeout(() => {
        this.scrollLastElement();
      }, 30);
    }
  }

  private scrollLastElement(): void {
    const listMessages: any = document.querySelectorAll('.mensaje');
    let position = listMessages[listMessages.length - 1].offsetTop;

    const containerMsj = document.querySelector('#contendor-msjs');
    if (containerMsj !== null) {
      containerMsj.scrollTop = position;
    }
  }
  protected activatedChat() {
    this.activated = !this.activated;
  }
}
