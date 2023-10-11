import { Component, OnInit, ComponentFactoryResolver, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import { PdfTestComponent } from './pdf-test/pdf-test.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('pdf-test', { read: ViewContainerRef }) pdfTest?: ViewContainerRef;
  title = 'pdf-test';
  html!: string;

 constructor(private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector) {}

 ngOnInit() {
  const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PdfTestComponent);
  const componentRef = componentFactory.create(this.injector);
  this.pdfTest?.insert(componentRef.hostView)

  const contentElement = componentRef.location.nativeElement.querySelector('#pdf-content');
  if (contentElement) {
    this.html = contentElement.innerHTML;
  }
 }

 generatePDF() {
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.html, {
      callback: (pdf) => {
        pdf.save('example.pdf');
      },
    });
  }
}
