import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';
import { ScriptService } from 'src/app/demo/service/script.service';

@Component({
  selector: 'app-add.project',
  templateUrl: './add.project.component.html',
  providers: [MessageService],
  styleUrls: ['./add.project.component.scss']

})
export class AddProjectComponent implements OnInit {

  upload: boolean = false;
  updated_upload: boolean = false;
  uploadedFiles: any[] = [];
  value1: any;
  selectedDrop: SelectItem = { value: '' };
  cities: SelectItem[] = [];


  constructor(private messageService: MessageService, private scriptService: ScriptService) { }

  ngOnInit(): void {
    this.cities = [
      { label: 'Votre ordinateur', value: { id: 1, name: 'Ordinateur' } },
      { label: 'Github', value: { id: 2, name: 'Github' } },

    ];
  }

  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }

  onBasicUpload() {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }

  onSelectedDropChange(event: any) {
    // update boolean "upload" based on selection option choice
    this.upload = event != null ? event.id == 1 : false;
    this.updated_upload = true;
  }

  executeScript() {
    this.scriptService.executeScript().pipe(
      tap(res => {
        alert("Script launched successfully");

      }),
      catchError(error => {
        console.log(error);
        alert('Script failed to launch');
        return of(); // Returning an empty observable to gracefully handle the error
      })
    ).subscribe();
  }
}
