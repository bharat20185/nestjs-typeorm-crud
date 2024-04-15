import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

export class GlobalInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        console.log("I'm global interceptor: before");
        return next.handle().pipe(
            map((data: any) => {
                // run some code before the response is sent out
                console.log("I'm global interceptor: after");
                return data;
            })
        );
    }
}