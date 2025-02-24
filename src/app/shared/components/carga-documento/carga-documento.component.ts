


import { Component, ViewChild, ElementRef, EventEmitter, Output, Input, OnInit, inject } from '@angular/core';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SharedModule } from 'primeng/api';
import { AlertaService, TipoAlerta } from '../alert/service/alerta.service';
import { ModalDialogService } from '../message-dialog/service/modal-dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
    standalone: true,
    imports: [FileUploadModule, CommonModule, ProgressSpinnerModule, SharedModule],
    selector: 'app-carga-documento',
    templateUrl: './carga-documento.component.html',
    styleUrls: ['./carga-documento.component.scss'],
    providers: [ModalDialogService, NgxSpinnerService]
})
export class CargaDocumentoComponent implements OnInit {

    @ViewChild('fileUpload') fileUpload!: FileUpload;

    @ViewChild('fileInput') fileInput!: ElementRef;

    @Output() archivoCargadoEvent = new EventEmitter<File[]>();

    @Input() maximoArchivos: number = 1;

    @Input() readOnly!: boolean;

    @Input() public archivosCargados: File[] = [];

    private spinner = inject(NgxSpinnerService);

    readonly maxFileSize: number = 5000000;

    public cargandoArchivo: boolean = true;

    constructor(
        private alertaService: AlertaService
    ) { }

    ngOnInit(): void {
        if (this.archivosCargados.length === 0) {
            this.cargandoArchivo = true;
        } else {
            this.cargandoArchivo = false;
        }
    }

    public triggerFileInputClick() {
        if (!this.readOnly && this.fileInput && this.fileInput.nativeElement) {
            this.fileInput.nativeElement.value = '';
            this.fileInput.nativeElement.click();
        }
    }

    public handleFileSelect(event: any) {
        const files = event.files;
        this.procesarArchivos(files);
    }

    public handleFileInput(event: any) {
        const files = event.target.files;
        this.procesarArchivos(files);
    }

    private procesarArchivos(files: File[]) {
        const validFiles: File[] = [];
        const totalFiles = (this.archivosCargados ? this.archivosCargados.length : 0) + files.length;

        if (totalFiles > this.maximoArchivos) {
            this.alertaService.mostrar(TipoAlerta.Precaucion, '', 'El límite máximo es de ' + this.maximoArchivos + ' archivos.', false);
            this.spinner.show();
            return;
        }

        Array.from(files).forEach((file: File) => {

            const archivoDuplicado = this.archivosCargados?.some(archivo => archivo.name === file.name);

            if (!archivoDuplicado && this.validarArchivo(file)) {
                validFiles.push(file);
            }

            if(archivoDuplicado) {
                this.alertaService.mostrar(TipoAlerta.Error, '', 'Documento duplicado', false);
            }
        });

        if (validFiles.length > 0) {
            validFiles.forEach((file: File) => {
                this.leerArchivo(file);
            });
        } else {
            this.spinner.hide();
        }
    }

    private validarArchivo(file: File): boolean {
        if (file.size <= this.maxFileSize &&
            (file.type === 'application/pdf' || file.type === 'application/xml' || file.type === 'text/xml')) {
            return true;
        } else {
            this.alertaService.mostrar(TipoAlerta.Error, '¡Alerta!', 'Archivo no válido', false);
            return false;
        }
    }

    private leerArchivo(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.archivosCargados = [...(this.archivosCargados || []), file];
            this.archivoCargadoEvent.emit(this.archivosCargados);
            this.spinner.hide();
        };
    }

    public confirmarEliminarArchivo(index: number) {
        this.archivosCargados.splice(index, 1);
    }
}
