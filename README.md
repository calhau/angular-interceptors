Config projeto

Projeto configurado com docker-compose porem ainda não está funcionando,
Rodar somente com ng serve 

===============================================================================================================
Resumo

Esse projeto resolvi estudar um pouco sobre Interceptors no Angular...

Praticamente criei uma classe 'custom-http-interceptors', que extende da interface HttpInterceptors,
sendo assim necessita implementar o metodo intercept()


===============================================================================================================
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        //Add AuthToken
        //In production you would get the token value from an auth service

        const hardcodedToken = '1234-1234-1234-1234';
        const reqWithAuth = req.clone({
            setHeaders: {
                Authorization: `Bearer ${hardcodedToken}`
            }
        });

        // Nesse return demonstra o token de autorizacao
        // return next.handle(reqWithAuth);

        return next.handle(req)
            .pipe(
                retry(2),
                catchError((error: HttpErrorResponse) => {
                    alert(`HTTP Error: ${req.url}`);
                    return throwError(error)
                })
            )

    }
}
===============================================================================================================

Depois precisamos adicionar o importe no app.module em providers

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    }
  ],

===============================================================================================================
  
Feito isso realizei o import do HttpClientModule no appmodule

e depois fui direto no app.component.ts, fiz inject do httpClient e adicionei a interface OnInit...

dentro do metodo ngOnInit() fiz a chamada para o serviço do **https://jsonplaceholder.typicode.com/**

  ngOnInit(){
    this.http.get('http://jsonplaceholder.typicode.com/users')
      .subscribe( data => 
        console.log('Aqui Bruno: ', data))
  }


===============================================================================
COmando node não funcionando no terminal

Rodar comandos abaixo no terminal:

echo 'eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)' >> /home/calhau/.zprofile

eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)
