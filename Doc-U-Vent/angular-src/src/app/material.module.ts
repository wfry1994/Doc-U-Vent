import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule,MatTooltipModule,MatDialogModule,MatProgressSpinnerModule,MatInputModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule,MatTooltipModule,MatDialogModule,MatProgressSpinnerModule,MatInputModule],
  exports: [MatButtonModule,MatTooltipModule,MatDialogModule,MatProgressSpinnerModule,MatInputModule]
})
export class MaterialModule {}
