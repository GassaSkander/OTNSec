import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { AddProjectComponent } from './add.project/add.project.component';
import { DropdownModule } from 'primeng/dropdown';
import { ProjectsComponent } from './projects/projects.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';



@NgModule({
  declarations: [AddProjectComponent, ProjectsComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FileUploadModule,
    FormsModule,
    DropdownModule,
    TableModule,
    MultiSelectModule,
    SliderModule,
    DialogModule,
    RadioButtonModule,
    InputNumberModule
  ]
})
export class ProjectModule { }
