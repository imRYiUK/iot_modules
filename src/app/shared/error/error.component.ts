import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
  standalone: true
})
export class ErrorComponent implements OnInit{
  @Input() type: string = '';
  @Input() color: string = '';
  @Input() message: string = '';

  classColor: string[] = [
    "animate-bounce fixed top-24 right-10 bg-red-100 border-t-4 border-red-500 rounded-b text-red-600 px-4 py-3 shadow-md",
    "animate-bounce fixed top-24 right-10 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-600 px-4 py-3 shadow-md"
  ]

  svgColor: string[] = [
    "fill-current h-6 w-6 text-red-500 mr-4",
    "fill-current h-6 w-6 text-teal-500 mr-4"
  ]

  ngOnInit(): void {
  }
}
