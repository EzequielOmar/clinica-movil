import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Star, Users,Calendar,Plus } from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  Star,Users,Calendar,Plus
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
