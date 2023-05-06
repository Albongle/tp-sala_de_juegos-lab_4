import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  protected formChat: FormGroup;
  protected listOfMessages: Array<any>;
  protected formatMessageReceived: string;
  protected formatMessageSent: string;
  protected activated: boolean;

  constructor(
    protected readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
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
  ngOnInit(): void {
    if (!this.userService.userLogged) {
      this.router.navigateByUrl('');
    }
  }

  protected sendMessage() {
    if (this.formChat.valid) {
      this.listOfMessages.push({
        id: this.userService.userLogged?.uid,
        message: this.formChat.value.message as string,
        time: new Date().toLocaleDateString(),
      });
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
