export class GetCoordinates {
    static readonly type = '[Mazemap] Get';
}

export class GetLibrarySections {
    static readonly type = '[LibrarySection] Get';
}

export class SetActiveSection {
    static readonly type = '[Any] Set';
    constructor(public section: any) {}
}

export class SetActivateFeedbackAndStatus {
    static readonly type = '[Boolean] Set';
    constructor(public activate: boolean) {}
}