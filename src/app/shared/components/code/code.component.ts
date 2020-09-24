import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import * as ace from 'ace-builds';
import 'ace-builds/src-min-noconflict/ext-beautify';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-min-noconflict/mode-javascript';
import 'ace-builds/src-min-noconflict/snippets/javascript';
import 'ace-builds/src-min-noconflict/snippets/text';
import 'ace-builds/src-min-noconflict/theme-github';

@Component({
  selector: 'm-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
})
export class CodeComponent implements AfterViewInit {
  @Input() public code: AbstractControl;

  @ViewChild('codeEditorRef') private codeEditorRef: ElementRef;
  private codeEditor: ace.Ace.Editor;

  constructor() {}

  ngAfterViewInit() {
    this.initCodeEditor();
  }

  private initCodeEditor() {
    ace.require('ace/ext/language_tools');

    this.codeEditor = ace.edit(this.codeEditorRef.nativeElement, this.getEditorOptions());
    this.codeEditor.setValue(this.code.value, 1);
    this.codeEditor.setTheme('ace/theme/github');
    this.codeEditor.getSession().setMode('ace/mode/javascript');

    this.subscribeCodeEditor();
  }

  private subscribeCodeEditor(): void {
    this.codeEditor.on('change', () => {
      this.code.setValue(this.codeEditor.getValue());
    });
    this.codeEditor.on('blur', () => {
      ace.require('ace/ext/beautify').beautify(this.codeEditor.getSession());
      this.code.setValue(this.codeEditor.getValue());
    });
  }

  private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean } {
    const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: true,
      highlightSelectedWord: true,
      minLines: 10,
      maxLines: Infinity,
      useWorker: false,
      cursorStyle: 'smooth',
      showPrintMargin: false,
      highlightGutterLine: true,
      displayIndentGuides: true,
    };

    const extraEditorOptions = {
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      wrap: true,
      enableMultiselect: true,
    };

    return Object.assign(basicEditorOptions, extraEditorOptions);
  }
}
