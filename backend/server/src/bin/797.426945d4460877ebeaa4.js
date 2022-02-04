"use strict";(self.webpackChunkapp_videoclub=self.webpackChunkapp_videoclub||[]).push([[797],{9797:(L,S,i)=>{i.r(S),i.d(S,{SignInModule:()=>_});var d=i(8583),c=i(6983),r=i(3679),x=i(841),u=i(7844),M=i(963),n=i(7716),C=i(3065),P=i(7556),m=i(8295),T=i(6627),A=i(9983),y=i(1095);function O(t,s){if(1&t&&(n.TgZ(0,"div",14),n.TgZ(1,"p"),n._uU(2),n.qZA(),n.qZA()),2&t){const e=s.ngIf;n.xp6(2),n.Oqu(e)}}function q(t,s){if(1&t&&(n.TgZ(0,"mat-error"),n._uU(1),n.qZA()),2&t){const e=n.oxw();n.xp6(1),n.hij(" ",e.getErrorMessage("email")," ")}}function E(t,s){if(1&t&&(n.TgZ(0,"mat-error"),n._uU(1),n.qZA()),2&t){const e=n.oxw();n.xp6(1),n.hij(" ",e.getErrorMessage("password")," ")}}const F=[{path:"",component:(()=>{class t{constructor(e,o,a){this.store=e,this.fb=o,this._authService=a,this.hide=!0,this.patternEmail=/^[0-9a-zA-Z._-]+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/,this.patternPassword=/^[0-9a-zA-Z\xf1]+$/,this.formSignIn=this.fb.group({email:["",[r.kI.required,r.kI.pattern(this.patternEmail)]],password:["",[r.kI.required,r.kI.minLength(6),r.kI.maxLength(15),r.kI.pattern(this.patternPassword)]]})}ngOnInit(){this.ServerErrorMessage(),this.ExpiredTokenMessage()}ServerErrorMessage(){this.store.dispatch((0,u.uH)({message:""})),this.errorMessage=this.store.select(M.e$)}ExpiredTokenMessage(){this._authService.getMessageTokenExpired().subscribe(e=>{this.store.dispatch((0,u.uH)({message:e}))})}signIn(){this.store.dispatch((0,x.NT)({user:this.formSignIn.value})),this.store.dispatch((0,u.Tc)({status:!0}))}isValidField(e){var o;return null===(o=this.formSignIn.get(e))||void 0===o?void 0:o.valid}isInvalidField(e){var o,a,g;return(null===(o=this.formSignIn.get(e))||void 0===o?void 0:o.invalid)&&((null===(a=this.formSignIn.get(e))||void 0===a?void 0:a.dirty)||(null===(g=this.formSignIn.get(e))||void 0===g?void 0:g.touched))}getErrorMessage(e){var o,a,g,p,f,h,v,I,Z,b;let l;if(null===(a=null===(o=this.formSignIn.get(e))||void 0===o?void 0:o.errors)||void 0===a?void 0:a.required)switch(e){case"email":l="Por favor, ingrese su direcci\xf3n de correo electr\xf3nico.";break;case"password":l="Por favor, ingrese su contrase\xf1a."}else if(null===(p=null===(g=this.formSignIn.get(e))||void 0===g?void 0:g.errors)||void 0===p?void 0:p.pattern)switch(e){case"email":l="Por favor, ingrese una direcci\xf3n de correo electr\xf3nico v\xe1lida.";break;case"password":l="Formato incorrecto, ingrese solo letras y n\xfameros."}else(null===(f=this.formSignIn.get(e))||void 0===f?void 0:f.hasError("minlength"))?l=`La contrase\xf1a debe tener m\xednimo ${null===(v=null===(h=this.formSignIn.get(e))||void 0===h?void 0:h.errors)||void 0===v?void 0:v.minlength.requiredLength} caracteres`:(null===(I=this.formSignIn.get(e))||void 0===I?void 0:I.hasError("maxlength"))&&(l=`La contrase\xf1a no debe exceder m\xe1s de ${null===(b=null===(Z=this.formSignIn.get(e))||void 0===Z?void 0:Z.errors)||void 0===b?void 0:b.maxlength.requiredLength} caracteres`);return l}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(C.yh),n.Y36(r.qu),n.Y36(P.e))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-sign-in-page"]],decls:33,vars:17,consts:[[1,"sign-in-container"],["class","error-message",4,"ngIf"],[1,"sign-in-form"],[3,"formGroup","submit"],["appearance","fill"],["matPrefix",""],["matInput","","type","email","autocomplete","off","placeholder","someone@example.com","formControlName","email"],[4,"ngIf"],["matInput","","autocomplete","off","formControlName","password",3,"type"],["mat-icon-button","","matSuffix","","type","button",3,"click"],["type","checkbox"],["mat-raised-button","","color","primary","type","submit",1,"btn","btn-submit",3,"disabled"],[1,"signup-button-container"],["mat-raised-button","","color","warn","routerLink","/signup",1,"btn"],[1,"error-message"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0),n.YNc(1,O,3,1,"div",1),n.ALo(2,"async"),n.TgZ(3,"div",2),n.TgZ(4,"form",3),n.NdJ("submit",function(){return o.signIn()}),n.TgZ(5,"mat-form-field",4),n.TgZ(6,"mat-label"),n._uU(7,"Email"),n.qZA(),n.TgZ(8,"mat-icon",5),n._uU(9,"email"),n.qZA(),n._UZ(10,"input",6),n.YNc(11,q,2,1,"mat-error",7),n.qZA(),n.TgZ(12,"mat-form-field",4),n.TgZ(13,"mat-label"),n._uU(14,"Contrase\xf1a"),n.qZA(),n.TgZ(15,"mat-icon",5),n._uU(16,"vpn_key"),n.qZA(),n._UZ(17,"input",8),n.TgZ(18,"button",9),n.NdJ("click",function(){return o.hide=!o.hide}),n.TgZ(19,"mat-icon"),n._uU(20),n.qZA(),n.qZA(),n.YNc(21,E,2,1,"mat-error",7),n.qZA(),n.TgZ(22,"div"),n._UZ(23,"input",10),n.TgZ(24,"label"),n._uU(25," Recu\xe9rdame"),n.qZA(),n.qZA(),n.TgZ(26,"button",11),n._uU(27,"Iniciar Sesi\xf3n"),n.qZA(),n.qZA(),n.TgZ(28,"div",12),n.TgZ(29,"p"),n._uU(30,"\xbfEres nuevo en HomeMovie?"),n.qZA(),n.TgZ(31,"button",13),n._uU(32,"Crea tu cuenta de HomeMovie"),n.qZA(),n.qZA(),n.qZA(),n.qZA()),2&e&&(n.xp6(1),n.Q6J("ngIf",n.lcZ(2,15,o.errorMessage)),n.xp6(3),n.Q6J("formGroup",o.formSignIn),n.xp6(6),n.ekj("is-valid",o.isValidField("email"))("is-invalid",o.isInvalidField("email")),n.xp6(1),n.Q6J("ngIf",o.isInvalidField("email")),n.xp6(6),n.ekj("is-valid",o.isValidField("password"))("is-invalid",o.isInvalidField("password")),n.Q6J("type",o.hide?"password":"text"),n.xp6(3),n.Oqu(o.hide?"visibility_off":"visibility"),n.xp6(1),n.Q6J("ngIf",o.isInvalidField("password")),n.xp6(5),n.Q6J("disabled",o.formSignIn.invalid))},directives:[d.O5,r._Y,r.JL,r.sg,m.KE,m.hX,T.Hw,m.qo,A.Nt,r.Fj,r.JJ,r.u,y.lW,m.R9,c.rH,m.TO],pipes:[d.Ov],styles:[".sign-in-container[_ngcontent-%COMP%]{max-width:400px;margin:0 auto;padding:20px 5px}.error-message[_ngcontent-%COMP%]{max-width:400px;height:40px;margin-bottom:15px;background-color:#f44336;border-radius:5px;display:flex;justify-content:center;align-items:center}.error-message[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]{font-size:18px;font-weight:500;color:#fff;margin-bottom:0}.sign-in-form[_ngcontent-%COMP%]{background:#05070ccc;padding:30px;border-radius:10px}mat-form-field[_ngcontent-%COMP%]{width:100%;height:90px}mat-icon[_ngcontent-%COMP%]{margin-right:8px}input[_ngcontent-%COMP%], label[_ngcontent-%COMP%], mat-label[_ngcontent-%COMP%], mat-icon[_ngcontent-%COMP%], mat-checkbox[_ngcontent-%COMP%]{color:#fff;caret-color:#fff}input[_ngcontent-%COMP%]::placeholder{color:#ffffff52}.signup-button-container[_ngcontent-%COMP%]{color:#fff;margin-top:40px;text-align:center}.btn[_ngcontent-%COMP%]{width:100%}.btn-submit[_ngcontent-%COMP%]{margin-top:20px}.btn[_ngcontent-%COMP%]:disabled{color:#242222af!important;background-color:#706c6cc2!important}"]}),t})()}];let U=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[c.Bz.forChild(F)],c.Bz]}),t})();var k=i(9673);let _=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[[d.ez,U,r.UX,k.q]]}),t})()}}]);