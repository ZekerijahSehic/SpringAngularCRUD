import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';

export class User {
  constructor(
    public id: number,
    public username: string,
    public firstname: string,
    public lastname: string,
    public email: string
  ) {
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userList: User[];
  closeResult: string;
  editForm: FormGroup;
  deleteId: number;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getUser();

    this.editForm = this.fb.group({
      id: [''],
      username: [''],
      firstname: [''],
      lastname: [''],
      email: ['']
    });
  }

  // tslint:disable-next-line:typedef
  getUser() {
    this.httpClient.get<any>('http://localhost:9002/user').subscribe(
      response => {
        console.log(response);
        this.userList = response;
      }
    );
  }

  // tslint:disable-next-line:typedef
  create(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismReas(reason)}`;
    });
  }

  private getDismReas(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // tslint:disable-next-line:typedef
  onSubmit(f: NgForm){
    const addNewUrl = 'http://localhost:9002/user/addnew';
    this.httpClient.post(addNewUrl, f.value).subscribe(
      (result) => {
        this.ngOnInit();
      }
    );
    this.modalService.dismissAll();
}

  // tslint:disable-next-line:typedef
  readDetails(targetModal, user: User) {
    this.modalService.open(targetModal);
    document.getElementById('idn').setAttribute('value', String(user.id));
    document.getElementById('uname').setAttribute('value', user.username);
    document.getElementById('fname').setAttribute('value', user.firstname);
    document.getElementById('lname').setAttribute('value', user.lastname);
    document.getElementById('email-2').setAttribute('value', user.email);
  }

  // tslint:disable-next-line:typedef
  updateDetails(targetModal, user: User) {
    this.modalService.open(targetModal);
    this.editForm.patchValue({
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email
    });

  }

  // tslint:disable-next-line:typedef
  update() {
    const updateUrl = 'http://localhost:9002/user/' + this.editForm.value.id + '/edit';
    this.httpClient.put(updateUrl, this.editForm.value).subscribe(
      (results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      }
    );
  }

  // tslint:disable-next-line:typedef
  deleteRecord(targetModal, user: User) {
    this.deleteId = user.id;
    this.modalService.open(targetModal);
  }


  // tslint:disable-next-line:typedef
  doDelete() {
    const deleteUrl = 'http://localhost:9002/user/' + this.deleteId + '/delete';
    this.httpClient.delete(deleteUrl).subscribe(
      (results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }
}
