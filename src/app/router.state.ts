import { Action } from '@ngxs/store';

export class Navigate{
static readonly type = '[router] navigate';
constructor(public payload:string){}

}

/* @State<boolean>({
    name:'router',
    defaults:''
})

export class RouterState {
constructor(private router: Router){}

@Action(Navigate)
async changeRoute(context: StateContext<boolean>, action:Navigate){
    const path = action.payload;
    await this.router.navigate([path]);
    context.setState(path);
 }

} */