import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddProjectComponent } from './add.project/add.project.component';
import { ProjectsComponent } from './projects/projects.component';



@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forChild([
      { path: 'addProject', component: AddProjectComponent },
      { path: 'listProjects', component: ProjectsComponent }

    ])],

  ], exports: [RouterModule]
})
export class ProjectRoutingModule { }
