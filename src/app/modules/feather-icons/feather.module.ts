import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import {
  Star,
  Users,
  Calendar,
  Plus,
  UserCheck,
  CheckCircle,
  Lock,
  Unlock,
  Crosshair
} from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  Star,
  Users,
  Calendar,
  Plus,
  UserCheck,
  CheckCircle,
  Lock,
  Unlock,
  Crosshair
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
