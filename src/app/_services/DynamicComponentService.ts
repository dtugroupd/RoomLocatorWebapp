/**
 * Code taken from stackoverflow
 */

import { Injectable, Injector, ApplicationRef, ComponentFactoryResolver, ComponentRef, Type } from '@angular/core';

/* ### EXAMPLE OF USE

        const popupContent = this.dynamicComponentService.injectComponent(
          SurveyComponent,
          x => {
            x.model = section.survey;
            x.sectionId = section.id;
          });

        this.popup = new Mazemap.Popup({ closeOnClick: true, offset: [0, -6] })
            .setLngLat(e.lngLat)
            .setDOMContent(popupContent)
            .addTo(this.map);

*/

@Injectable()
export class DynamicComponentService {

    private compRef: ComponentRef<any>;

    constructor(private injector: Injector,
                private resolver: ComponentFactoryResolver,
                private appRef: ApplicationRef) { }


    public injectComponent<T>(component: Type<T>, propertySetter?: (type: T) => void): HTMLDivElement {
        // Remove the Component if it Already Exists
        if (this.compRef) {
            this.compRef.destroy();
        }

        // Resolve the Component and Create
        const compFactory = this.resolver.resolveComponentFactory(component);
        this.compRef = compFactory.create(this.injector);

        // Allow a Property Setter to be Passed in (To Set a Model Property, etc)
        if (propertySetter) {
            propertySetter(this.compRef.instance);
        }

        // Attach to Application
        this.appRef.attachView(this.compRef.hostView);

        // Create Wrapper Div and Inject Html
        const div = document.createElement('div');
        div.appendChild(this.compRef.location.nativeElement);

        // Return the Rendered DOM Element
        return div;
    }
}
