import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        //Add AuthToken
        //In production you would get the token value from an auth service

        const hardcodedToken = '1234-1234-1234-1234-Funcionou';
        const reqWithAuth = req.clone({
            setHeaders: {
                Authorization: `Bearer ${hardcodedToken}`
            }
        });

        // Nesse return demonstra o token de autorizacao
        return next.handle(reqWithAuth)


        // Comentar aqui para retirar o token
        // return next.handle(req)
            .pipe(
                retry(2),
                catchError((error: HttpErrorResponse) => {
                    alert(`HTTP Error: ${req.url}`);
                    return throwError(error)
                })
            )

    }
}
