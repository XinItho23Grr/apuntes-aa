import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userdata: any;

  loginForm: FormGroup;

  usuario={
    id: 0,
    username:"",
    password:"",
    role:"",
    isactive: false
  }

  constructor(private authservice: AuthService,
              private router: Router,
              private alertcontroller: AlertController,
              private toastcontroller: ToastController,
              private fbuilder: FormBuilder) {
                this.loginForm = this.fbuilder.group({
                  'username' : new FormControl("", [Validators.required, Validators.minLength(4)]),
                  'password' : new FormControl("", [Validators.required, Validators.minLength(4)])
                })
               }

  ngOnInit() {
  }

  login(){
    if (this.loginForm.valid){
      this.authservice.GetUserById(this.loginForm.value.username).subscribe(resp=>{
        this.userdata = resp;
        console.log(this.userdata);
        if (this.userdata.length >0){     //si es mayor a cero, se ha encontrado el usuario 
          this.usuario ={
            id : this.userdata[0].id,
            username: this.userdata[0].username,
            password: this.userdata[0].password,
            role: this.userdata[0].role,
            isactive: this.userdata[0].isactive
          }
          if (this.usuario.password === this.loginForm.value.password){
            //iniciamos session
            sessionStorage.setItem('username', this.usuario.username);
            sessionStorage.setItem('role', this.usuario.role);
            sessionStorage.setItem('ingresado', 'true');
            this.showToast('Sesión iniciada');
            this.router.navigateByUrl("/listar");
          }
        }

      })
    }
  }//fin de login

  async showToast(msg: any){
    const toast = await this.toastcontroller.create({ 
      message: msg,
      duration: 3000
    })
    toast.present();
  }


}
