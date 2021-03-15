import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { UserService } from "../services/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private userService: UserService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: string = this.userService.getLoginData();

        console.log('interceptor is being used');
        console.log(req.body);
        

        let authorizedReq: HttpRequest<any> = req;
        if (token) {
            authorizedReq = req.clone(({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            }))
        }
        return next.handle(authorizedReq)
            .pipe(
                finalize(() => console.log('request complete, heres the token:', token)
            ));
    }

}