import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Observable, map } from "rxjs";

export class UserInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const res = ctx.getResponse();

        return next.handle().pipe(
            map((data: any) => {
                if(!data) return res.send({});
                // run some code before the response is sent out
                const isObject = !Array.isArray(data) && typeof data === 'object';
                
                if(isObject) {
                    data = [data];
                }

                const results = data.map(item => ({
                    id: item.id,
                    name: item.name,
                    username: item.username,
                    email: item.email,
                    address: {
                        street: item.street,
                        suite: item.suite,
                        city: item.city,
                        zipcode: item.zipcode,
                        geo: {
                            lat: item.lat,
                            lng: item.lng
                        }
                    },
                    phone: item.phone,
                    website: item.website,
                    company: {
                        name: item.companyName,
                        catchPhrase: item.companyCatchPhrase,
                        bs: item.companyBs
                    }
                }))

                res.send(isObject ? results[0] : results);
            })
        );
    }
}