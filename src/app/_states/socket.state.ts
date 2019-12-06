import { State, Selector, Action, StateContext } from '@ngxs/store';
import { SocketConnecting, SocketConnected, SetSocketStatus } from '../_actions/socket.actions';

export class SocketStateModel {
    status: string;
    isConnecting: boolean;
    connectionId: string;
}

@State<SocketStateModel>({
    name: 'socket'
})
export class SocketState {
    @Selector()
    static status(state: SocketStateModel): string {
        return state.status;
    }

    @Selector()
    static isConnecting(state: SocketStateModel): boolean {
        return state.isConnecting;
    }

    @Action(SocketConnecting)
    socketConnecting({ setState }: StateContext<SocketStateModel>) {
        setState({ isConnecting: true, status: "Reconnecting...", connectionId: null });
    }

    @Action(SocketConnected)
    socketConnected({ setState }: StateContext<SocketStateModel>, { connectionId }) {
        setState({ isConnecting: false, status: "Connected", connectionId })
    }
}
