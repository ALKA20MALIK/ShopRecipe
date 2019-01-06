import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService{
    Token:string

    constructor(private router:Router){

    }

    signupUser(email:string,password:string){
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .catch(
            error=>console.log(error)
        )
        
    }

    signinUser(email:string,password:string){
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then( 
            response=>
            {
            this.router.navigate(['/']);
            firebase.auth().currentUser.getIdToken()
                .then(
                    (token:string)=> this.Token=token
                )
            }
        )
        .catch(
            error=>console.log(error)
        );
    }

    getToken(){
        console.log(firebase.auth().currentUser.getIdToken());
         firebase.auth().currentUser.getIdToken()
        .then(
            (token:string)=> this.Token=token
        );
        return this.Token;
    }
    isAuthenticated(){
        return this.Token!=null;
    }
    logoutUser(){
        firebase.auth().signOut();
        this.Token=null;
    }
}