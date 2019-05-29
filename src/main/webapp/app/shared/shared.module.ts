import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MyshowcaseSharedLibsModule, MyshowcaseSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [MyshowcaseSharedLibsModule, MyshowcaseSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [MyshowcaseSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyshowcaseSharedModule {
  static forRoot() {
    return {
      ngModule: MyshowcaseSharedModule
    };
  }
}
